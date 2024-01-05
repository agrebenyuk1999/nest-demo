import {HttpService} from "@nestjs/axios";
import {firstValueFrom, catchError} from "rxjs";
import {get} from "lodash";
import {AxiosError} from "axios";
import {NotFoundException, UnauthorizedException} from "@nestjs/common";


export class SubsystemBaseService {

    protected methods: object = {
        GET: 'get',
        POST: 'post',
    };

    constructor(
        protected readonly _httpService: HttpService,
        protected readonly baseUrl: string,
        protected readonly login: string,
        protected readonly token: string,
    ) {}

    async send(method: string, suffix: string, requestData?: object) {
        const fullUrl = `${this.baseUrl}/${suffix}`;
        const config = {
            headers: {
                'Signature': `${this.login}:${this.token}`,
            }
        };

        const attrs = requestData
            ? [fullUrl, requestData, config]
            : [fullUrl, config];

        const source = this._httpService[method](...attrs);

        const res = await firstValueFrom(
            source
                .pipe(
                    catchError((error: AxiosError) => {
                        const errorCode = get(error, 'response.status');
                        switch (errorCode) {
                            case 401: throw new UnauthorizedException('Wrong login or token');
                            case 404: throw new NotFoundException('Wrong external url');
                            default: throw 'An error happened!';
                        }
                    }),
                ),
        );

        return get(res, 'data', null);
    }
}