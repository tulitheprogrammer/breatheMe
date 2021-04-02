import { AuthGateway } from '../../domain/auth/AuthGateway';
import { AuthRequest } from '../../domain/auth/model/AuthRequest';
import { AuthEntity } from '../../model/entity/AuthEntity';
import { HttpRequest } from '../HttpRequest';
import { HttpService } from '../http/HttpService';
import { HttpResponse } from '../HttpResponse';

export class AuthGatewayImpl implements AuthGateway {
  constructor(private readonly httpService: HttpService) {}

  signIn(request: AuthRequest): Promise<AuthEntity> {
    return new Promise<AuthEntity>((resolve, reject) => {
      let httpRequest: HttpRequest;

      httpRequest = new HttpRequest(
        'http://localhost:5000/profile/sign_in',
        'POST',
        JSON.stringify({ email: request.email, password: request.password }),
      );

      this.httpService
        .makeUnsignedRequest(httpRequest)
        .then((http_resolve: HttpResponse) => {
          if (http_resolve.error !== undefined) {
            reject(http_resolve.error);
          }
          const auth: AuthEntity = new AuthEntity(http_resolve.token);
          resolve(auth);
        })
        .catch(http_error => {
          reject(http_error);
        });
    });
  }

  register(request: AuthRequest) {
    return new Promise<AuthEntity>((resolve, reject) => {
      let httpRequest: HttpRequest;

      httpRequest = new HttpRequest(
        'http://localhost:5000/profile/register',
        'POST',
        JSON.stringify({
          email: request.email,
          password: request.password,
          display_name: request.username,
        }),
      );

      this.httpService
        .makeUnsignedRequest(httpRequest)
        .then((http_resolve: HttpResponse) => {
          if (http_resolve.error !== undefined) {
            reject(http_resolve.error);
          } else {
            const auth: AuthEntity = new AuthEntity(http_resolve.token);
            resolve(auth);
          }
        })
        .catch(http_error => {
          console.warn('AuthGatewayImpl: Error within catch');
          reject(http_error);
        });
    });
  }

  signOut(): Promise<AuthEntity> {
    return new Promise<AuthEntity>(resolve => {
      resolve(new AuthEntity(''));
    });
  }

  changePassword(request: AuthRequest): Promise<AuthEntity> {
    // todo
    request.email;
    return undefined;
  }

  deleteUser(request: AuthRequest): Promise<AuthEntity> {
    // todo
    request.email;
    return undefined;
  }
}
