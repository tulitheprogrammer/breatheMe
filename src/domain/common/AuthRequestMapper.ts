import { AuthRequest } from '../auth/model/AuthRequest';

export class AuthRequestMapper {
  mapRequest(email: string, password: string, username?: string) {
    return new AuthRequest(email, password, username);
  }
}
