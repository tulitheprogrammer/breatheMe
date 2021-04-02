import { ResponseMapper } from './ResponseMapper';
import { AuthEntity } from '../../model/entity/AuthEntity';
import { AuthResponse } from '../auth/model/AuthResponse';
import { Response } from '../../model/response/Response';
import { ErrorCodes } from '../../model/ErrorCodes';

export class AuthResponseMapper
  implements ResponseMapper<AuthEntity, Response> {
  mapErrorCode(errorCode: number): number {
    switch (errorCode) {
      case ErrorCodes.SIGN_IN_FAILED_WRONG_PASSWORD:
        return ErrorCodes.SIGN_IN_FAILED_WRONG_PASSWORD;
      case ErrorCodes.SIGN_IN_FAILED_WRONG_USER:
        return ErrorCodes.SIGN_IN_FAILED_WRONG_USER;
      case ErrorCodes.SIGN_IN_FAILED_BANNED:
        return ErrorCodes.SIGN_IN_FAILED_BANNED;
      default:
        return ErrorCodes.SIGN_IN_FAILED;
    }
  }

  mapEntity(entity: AuthEntity): AuthResponse {
    return new AuthResponse(
      entity.jwtToken,
      entity.jwtToken !== null,
      entity.jwtToken === undefined
        ? this.mapErrorCode(entity.error)
        : undefined,
    );
  }
}
