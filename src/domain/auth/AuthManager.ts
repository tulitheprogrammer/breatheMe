import { AuthResponse } from './model/AuthResponse';

export interface AuthManager {
  tryAutoLogIn(): Promise<boolean>;

  signIn(email: string, password: string): Promise<AuthResponse>;

  signOut(): Promise<boolean>;

  cacheToken(token: string): Promise<string>;

  createAccount(
    email: string,
    password: string,
    displayName: string,
  ): Promise<AuthResponse>;

  isAuthenticated(): Promise<AuthResponse>;
}
