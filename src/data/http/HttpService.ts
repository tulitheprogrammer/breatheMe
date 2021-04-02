import { HttpRequest } from '../HttpRequest';
import { HttpResponse } from '../HttpResponse';
import { LocalRepository } from '../repository/LocalRepository';
import { ErrorEntity } from '../../model/entity/ErrorEntity';

export class HttpService {
  public makeUnsignedRequest(request: HttpRequest): Promise<HttpResponse> {
    return new Promise<HttpResponse>((resolve, reject) => {
      try {
        fetch(request.endpoint, {
          method: request.method,
          body: request.body,
          headers: { 'Content-Type': 'Application/JSON' },
        })
          .then((httpResult: Response) => {
            const response: HttpResponse = new HttpResponse();
            httpResult.json().then((result: any) => {
              if (result.token !== undefined) {
                response.token = result.token as string;
              } else if (result.Error !== undefined) {
                response.error = result.Error as ErrorEntity;
              }
              resolve(response);
            });
          })
          .catch(httpError => {
            console.warn('HttpService: Error with fetch request!');
            reject(httpError);
          });
      } catch (error) {
        console.warn(error);
      }
    });
  }

  public makeSignedRequest(request: HttpRequest): Promise<HttpResponse> {
    return new Promise<HttpResponse>((resolve, reject) => {
      // getting the JWT Token
      LocalRepository.getInstance()
        .isAuthTokenPersisted()
        .then(result => {
          if (result) {
            LocalRepository.getInstance()
              .getAuthToken()
              .then(token => {
                request.sign(token);
                fetch(request.endpoint, {
                  method: request.method,
                  body: request.body,
                  headers: request.headers,
                })
                  .then((httpResult: Response) => {
                    const response: HttpResponse = new HttpResponse();
                    httpResult.json().then((result: any) => {
                      response.token = result.token;
                      httpResult.toString();
                      resolve(response);
                    });
                  })
                  .catch(httpError => {
                    reject(httpError);
                  });
              });
          }
        });
    });
  }
}
