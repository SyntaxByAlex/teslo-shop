import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: String[] = this.reflector.get(META_ROLES, context.getHandler());
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) throw new UnauthorizedException('User not found');

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }

    throw new UnauthorizedException('User not authorized');
  }
}
