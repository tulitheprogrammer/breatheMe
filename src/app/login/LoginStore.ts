import { AuthResponse } from '../../domain/auth/model/AuthResponse';
import { ActionType } from '../common/ActionType';

export interface LoginStateModel {
  userEmail: string;
  userPassword: string;
  isAuthInProgress: boolean;
  isLoggedIn: boolean;
  logInFailed: boolean;
  message: string;
}

export class LoginStore {
  state: LoginStateModel;

  receive(actionType: ActionType, _response: AuthResponse) {
    switch (actionType) {
      case ActionType.ON_LOG_IN_SUCCESS:
        this.state = {
          ...this.getInitialState(),
          isAuthInProgress: false,
          isLoggedIn: true,
          message: 'Login Successful',
        };
        break;
      case ActionType.ON_LOG_IN:
        this.state = {
          ...this.getInitialState(),
          isAuthInProgress: true,
          message: 'Please wait while sign in is processing',
        };
        break;
      case ActionType.ON_LOG_IN_FAIL:
        this.state = {
          ...this.getInitialState(),
          isAuthInProgress: false,
          logInFailed: true,
          isLoggedIn: false,
          message: 'Login Failed',
        };
    }
  }

  getInitialState(): LoginStateModel {
    return {
      userEmail: '',
      userPassword: '',
      isAuthInProgress: false,
      isLoggedIn: false,
      logInFailed: false,
      message: '',
    };
  }
}
