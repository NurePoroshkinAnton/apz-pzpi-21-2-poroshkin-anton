import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/GoogleAuthGuard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Company } from 'src/companies/entities/company.entity';
import JwtPayload from 'src/common/types/JwtPayload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/signin')
  @UseGuards(GoogleAuthGuard)
  signinWithGoogle() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Req() req: Request) {
    const payload = req.user as JwtPayload;
    const accessToken = this.authService.signJwt(payload);

    return { accessToken };
  }

  @Get('/status')
  checkStatus(@Req() req: Request) {
    return { authStatus: Boolean(req.user) };
  }
}
