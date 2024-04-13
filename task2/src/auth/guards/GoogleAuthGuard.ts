import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(ctx: ExecutionContext) {
    const activate = (await super.canActivate(ctx)) as boolean;
    const req = ctx.switchToHttp().getRequest();

    await super.logIn(req);

    return activate;
  }
}
