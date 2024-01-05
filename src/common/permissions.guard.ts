import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly _prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const userPermissions = await this.getUserPermissions(user.userId);

    return requiredPermissions.every((permission) => userPermissions.includes(permission));
  }

  private async getUserPermissions(userId: number) {
    const userPermissions = await this._prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    return userPermissions.roles.reduce((acc, role) => {
      acc.push(...role.permissions.map((permission) => permission.name));

      return acc;
    }, []);
  }
}
