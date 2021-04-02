import { Action } from '../common/AbstractAction';
import { AuthResponse } from '../../domain/auth/model/AuthResponse';
import { AuthManager } from '../../domain/auth/AuthManager';
import { ManagerFactory } from '../../domain/ManagerFactory';

export class AuthAction implements Action {
  constructor(
    private authManager: AuthManager = ManagerFactory.buildAuthManager(),
  ) {}

  signIn(email: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.authManager
        .signIn(email, password)
        .then(
          (result: AuthResponse) => {
            if (result.jwtToken.length > 0) {
              resolve(result.jwtToken);
            } else {
              reject(result.errorCode);
            }
          },
          error => {
            reject(error);
          },
        )
        .catch(error => {
          reject(error);
        });
    });
  }

  register(
    email: string,
    password: string,
    displayName: string,
  ): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      this.authManager.createAccount(email, password, displayName).then(
        (result: AuthResponse) => {
          resolve(result);
        },
        error => {
          reject(error);
        },
      );
    });
  }

  async isTokenPersisted(): Promise<boolean> {
    return new Promise<boolean>((resolve, _reject) => {
      this.authManager
        .isAuthenticated()
        .then(
          (_result: AuthResponse) => {
            resolve(true);
          },
          _error => {
            resolve(false);
          },
        )
        .catch(_error => {
          resolve(false);
        });
    });
  }

  persistToken(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authManager
        .cacheToken(token)
        .then(
          (result: string) => {
            if (result.length > 0) {
              resolve(true);
            } else {
              reject(false);
            }
          },
          error => {
            reject(error);
          },
        )
        .catch(error => {
          reject(error);
        });
    });
  }
}
