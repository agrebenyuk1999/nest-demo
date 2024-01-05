import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { get, split } from "lodash";
import { ExternalAgentService } from "../external-agent/external-agent.service";
import {Reflector} from "@nestjs/core";

@Injectable()
export class ExternalAgentsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly _prismaService: ExternalAgentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const param = this.reflector.getAllAndOverride<string[]>('externalAgent', [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!param) {
      return true;
    }

    const signature = get(context.switchToHttp().getRequest(), 'headers.signature');

    if(signature) {
      const [name, token] = split(signature, ':');
      const externalAgent = await this._prismaService.findByParam(name, 'name');

      return get(externalAgent, 'api_token') === token;
    }

    return false;
  }
}
