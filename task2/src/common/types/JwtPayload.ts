import { Role } from 'src/auth/types/Role';

export default interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
