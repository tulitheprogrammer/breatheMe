import { AuthResponse } from '../../domain/auth/model/AuthResponse';
import { ActionType } from '../common/ActionType';

export interface RegisterStateModel {
  validEmail: boolean;
  validPassword: boolean;
  validDisplayName: boolean;
  emailInput: string;
  passwordInput: string;
  displayName: string;
  inProgress: boolean;
  registerFailed: boolean;
  registerComplete: boolean;
}

export class RegisterStore {
  state: RegisterStateModel;

  receive(actionType: ActionType, _response: AuthResponse) {
    switch (actionType) {
      case ActionType.ON_REGISTER:
        this.state = {
          ...this.state,
          inProgress: true,
        };
        break;
      case ActionType.ON_REGISTER_SUCCESS:
        this.state = {
          ...this.state,
          inProgress: false,
          registerComplete: true,
          registerFailed: false,
        };
        break;
      case ActionType.ON_REGISTER_FAILED:
        this.state = {
          ...this.state,
          inProgress: false,
          registerComplete: true,
          registerFailed: true,
        };
        break;
    }
  }

  getInitialState(): RegisterStateModel {
    return {
      validEmail: false,
      validPassword: false,
      validDisplayName: false,
      emailInput: '',
      passwordInput: '',
      displayName: '',
      inProgress: false,
      registerFailed: false,
      registerComplete: false,
    };
  }
}
