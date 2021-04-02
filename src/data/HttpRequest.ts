export class HttpRequest {
  endpoint: string;
  method: string;
  body: string;
  headers: {} = {};

  constructor(endpoint: string, method: string, body: {}) {
    this.endpoint = endpoint;
    this.method = method;
    this.body = JSON.stringify(body);
    this.headers['Content-Type'] = 'Application/JSON';
  }

  sign(token: string) {
    this.headers.Authorization = token;
  }
}
