import { AuthGateway } from '../AuthGateway';
import { Manager } from '../../Manager';
import { AuthResponse } from '../model/AuthResponse';
import { AuthRequest } from '../model/AuthRequest';
import { AuthEntity } from '../../../model/entity/AuthEntity';
import { InMemoryRepository } from '../../UserRepository';
import { AuthManager } from '../AuthManager';
import { AuthResponseMapper } from '../../common/AuthResponseMapper';
import { ErrorCodes } from '../../../model/ErrorCodes';
import { ErrorResponseMapper } from '../../common/ErrorResponseMapper';
import { AuthRequestMapper } from '../../common/AuthRequestMapper';

export class AuthManagerImpl implements Manager, AuthManager {
  public constructor(
    private authGateway: AuthGateway,
    private repository: InMemoryRepository,
    private responseMapper: AuthResponseMapper,
    private requestMapper: AuthRequestMapper,
    private errorMapper: ErrorResponseMapper,
  ) {}

  run(request: AuthRequest): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      this.authGateway.signIn(request).then(
        (result: AuthEntity) => {
          resolve(this.responseMapper.mapEntity(result));
        },
        error => {
          reject(error);
        },
      );
    });
  }

  tryAutoLogIn(): Promise<boolean> {
    /**
     * Method to check whether a Token has been persisted before or not.
     * Useful for auto-login
     */
    return new Promise<boolean>((resolve, reject) => {
      this.repository
        .isAuthTokenPersisted()
        .then(isPersisted => {
          resolve(isPersisted);
        })
        .catch(error => {
          reject(this.errorMapper.mapEntity(error));
        });
    });
  }

  signIn(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      this.authGateway
        .signIn(this.requestMapper.mapRequest(email, password))
        .then(
          (result: AuthEntity) => {
            const response: AuthResponse = this.responseMapper.mapEntity(result);
            resolve(response);
          },
          error => {
            reject(this.errorMapper.mapEntity(error));
          },
        )
        .catch((error: string) => {
          reject(error);
        });
    });
  }

  createAccount(
    email: string,
    password: string,
    displayName: string,
  ): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      this.authGateway
        .register(this.requestMapper.mapRequest(email, password, displayName))
        .then(
          (result: AuthEntity) => {
            resolve(this.responseMapper.mapEntity(result));
          },
          error => {
            reject(this.errorMapper.mapEntity(error));
          },
        )
        .catch((error: string) => {
          reject(error);
        });
    });
  }

  isAuthenticated(): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, _reject) => {
      this.repository.getAuthToken().then(
        result => {
          resolve(new AuthResponse(result, true));
        },
        _error => {
          resolve(
            new AuthResponse(
              undefined,
              false,
              ErrorCodes.CHECK_PERSISTED_JWT_FAILED,
            ),
          );
        },
      );
    });
  }

  cacheToken(token: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.repository
        .refreshAuthToken(token)
        .then(
          result => {
            resolve(result);
          },
          error => {
            reject(this.errorMapper.mapEntity(error));
          },
        )
        .catch(error => {
          reject(this.errorMapper.mapEntity(error));
        });
    });
  }

  signOut(): Promise<boolean> {
    return this.repository.clearAuthToken();
  }
}
