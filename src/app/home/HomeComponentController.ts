import { HomeComponent } from './HomeComponent';
import { AuthManager } from '../../domain/auth/AuthManager';
import { ErrorEntity } from '../../model/entity/ErrorEntity';
import { AuthResponse } from '../../domain/auth/model/AuthResponse';
import { LocalRepository } from '../../data/repository/LocalRepository';

export class HomeComponentController {
  constructor(
    private readonly component: HomeComponent,
    private readonly authManager: AuthManager,
    private readonly repository: LocalRepository,
  ) {}

  public signIn(id: string, password: string) {
    this.authManager.signIn(id, password).then(
      _result => {
        // cache token
        this.component.updateState({
          ...this.component.getInitialState(),
          isLoggedIn: true,
          isProgressing: false,
          currentProgress: 0,
          currentUsername: '',
        });
      },
      (error: ErrorEntity) => {
        this.component.displayMessage(error.code * 123 + ':' + error.message);
      },
    );
  }

  public async signUp(id: string, password: string, username: string) {
    this.component.setState({
      isLoggedIn: false,
      isProgressing: true,
      currentProgress: 0.3,
    });
    this.authManager.createAccount(id, password, username).then(
      async (result: AuthResponse) => {
        this.component.setState({
          isLoggedIn: false,
          isProgressing: true,
          currentProgress: 0.6,
        });
        this.repository
          .refreshAuthToken(result.jwtToken)
          .then(async _result => {
            // this.component.setState({isLoggedIn: true, isProgressing: false});
            await this.repository.cacheUsername(username);
            this.component.displayMessage(
              'Congratulations! Your sign up was successful.',
            );
            this.component.updateState({
              ...this.component.getInitialState(),
              isLoggedIn: true,
              isProgressing: false,
              currentProgress: 0,
              currentUsername: username,
              welcomeText:
                "It's your first time using Breathe. Why don't you go ahead and do your first breathing SessionEntity?",
            });
          });
      },
      (error: ErrorEntity) => {
        alert(error.message);
      },
    );
  }

  public tryAuth(): Promise<boolean> {
    /**
     * Gets called on App Start to figure out if the user
     * was logged in already before
     */
    return new Promise<boolean>((resolve, _reject) => {
      this.component.updateState({
        ...this.component.getInitialState(),
        isProgressing: true,
        currentProgress: 0.1,
      });
      this.repository
        .isAuthTokenPersisted()
        .then(
          result => {
            if (result) {
              this.repository.getUsername().then(username => {
                this.component.updateState({
                  ...this.component.getInitialState(),
                  isLoggedIn: result,
                  currentUsername: username,
                  welcomeText: `Hey there, today is ${new Date(
                    Date.now(),
                  ).toISOString()}\nSo far you have 0 Sessions.\nThere are currently 0 new Posts.\nWhy don't you start your first Session or hang around in the Community?
                            `,
                });
              });
              resolve(true);
            } else {
              this.component.updateState({
                ...this.component.getInitialState(),
              });
              resolve(false);
            }
          },
          _error => {
            this.component.updateState({
              ...this.component.getInitialState(),
            });
          },
        )
        .catch(_error => {
          this.component.updateState({
            ...this.component.getInitialState(),
          });
          resolve(false);
        });
    });
  }
}
