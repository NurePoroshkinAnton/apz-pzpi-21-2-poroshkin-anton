import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/AccessTokenGuard';

@Module({
  imports: [JwtService, ConfigService],
  providers: [AccessTokenGuard],
  exports: [AccessTokenGuard],
})
export class CommonModule {}
