import { AuthRequest } from './model/AuthRequest';
import { AuthEntity } from '../../model/entity/AuthEntity';

export interface AuthGateway {
  signIn(request: AuthRequest): Promise<AuthEntity>;

  register(request: AuthRequest): Promise<AuthEntity>;

  signOut(): Promise<AuthEntity>;

  changePassword(request: AuthRequest): Promise<AuthEntity>;

  deleteUser(request: AuthRequest): Promise<AuthEntity>;
}
