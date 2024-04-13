import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/GoogleAuthGuard';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/AuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/signin')
  @UseGuards(GoogleAuthGuard)
  signinWithGoogle() {
    return { msg: 'Google signing' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect() {
    return { msg: 'Singin successful' };
  }

  @Get('test')
  test() {
    return this.authService.getAll();
  }

  @Get('/status')
  checkStatus(@Req() req) {
    return { authStatus: Boolean(req.user) };
  }
}
