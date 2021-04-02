import { AbstractController, ViewStoreState } from '../common/AbstractController';
import { AuthAction } from './AuthAction';

export interface AuthState extends ViewStoreState {
  isTokenPersisted: boolean;
  authenticationFailed: boolean;
  isAuthenticated: boolean;
  checkedIfTokenIsPersisted: boolean;
}

export class AuthController extends AbstractController<AuthState> {
  /** This Store is ment to be used only by the entry point App.tsx */

  constructor(
    private readonly authAction: AuthAction,
    component: React.Component,
  ) {
    super(component);
    this.persistToken = this.persistToken.bind(this);
    this.authFailed = this.authFailed.bind(this);
    this.state = this.getInitialState();
  }

  async signIn(email: string, password: string) {
    this.state = this.getInitialState();
    await this.authAction
      .signIn(email, password)
      .then(
        result => {
          this.persistToken(result)
            .then(
              persistResult => {
                if (persistResult) {
                  this.updateState({
                    isAuthenticated: true,
                    isTokenPersisted: persistResult,
                    checkedIfTokenIsPersisted: true,
                  });
                } else {
                  this.authFailed();
                }
              },
              _persistTokenReject => {
                this.authFailed();
              },
            )
            .catch(() => {
              this.authFailed();
            });
        },
        _ => {
          this.authFailed();
        },
      )
      .catch(() => {
        this.authFailed();
      });
  }

  private authFailed() {
    this.updateState({
      authenticationFailed: true,
      isAuthenticated: false,
      isTokenPersisted: false,
      checkedIfTokenIsPersisted: true,
    });
  }

  persistToken(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authAction.persistToken(token).then(
        result => {
          resolve(result);
        },
        error => {
          reject(error);
        },
      );
    });
  }

  getInitialState(): AuthState {
    return {
      isTokenPersisted: false,
      authenticationFailed: false,
      isAuthenticated: false,
      checkedIfTokenIsPersisted: false,
    };
  }

  getState(): AuthState {
    return this.state;
  }

  updateState(values: {}) {
    this.state = { ...this.getState(), ...values };
    this.updateView();
  }
}
