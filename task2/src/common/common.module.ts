import { Module } from '@nestjs/common';
import { AccessTokenGuard } from './guards/AccessTokenGuard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [AccessTokenGuard],
  exports: [AccessTokenGuard],
})
export class CommonModule {}
