import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/GoogleAuthGuard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import JwtPayload from 'src/common/types/JwtPayload';
import { Role } from './types/Role';
import { SigninDto } from './dto/signin.dto';
import { SignupComapnyDto } from './dto/signup-company.dto';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/signin')
  @UseGuards(GoogleAuthGuard)
  signinUser() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Req() req: Request) {
    const payload = req.user as JwtPayload;
    const accessToken = this.authService.signJwt(payload);

    return { accessToken };
  }

  @Post('/signup/company')
  async signupCompany(@Body() dto: SignupComapnyDto) {
    const company = await this.authService.signupCompany(dto);
    const accessToken = this.authService.signJwt({
      sub: company.id,
      email: company.email,
      role: Role.Company,
    });

    return { accessToken };
  }

  @HttpCode(200)
  @Post('/signin/company')
  async signinCompany(@Body() dto: SigninDto) {
    const company = await this.authService.signinCompany(dto);
    const accessToken = this.authService.signJwt({
      sub: company.id,
      email: company.email,
      role: Role.Company,
    });

    return { accessToken };
  }

  @UseGuards(AccessTokenGuard(Role.Company))
  @Get('profile/company')
  getCompanyProfile(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.authService.getCompanyProfile(payload.sub);
  }

  @UseGuards(AccessTokenGuard(Role.Client))
  @Get('profile/client')
  getClientProfile(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.authService.getClientProfile(payload.sub);
  }
}
