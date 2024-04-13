import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Company } from 'src/companies/entities/company.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: Company, done: any) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: any) {
    const user = await this.authService.findById(payload.id);

    if (user) {
      return done(null, user);
    }

    return done(null, null);
  }
}
