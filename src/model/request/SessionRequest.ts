import { HttpRequest } from '../../data/HttpRequest';
import { RoundEntity } from '../session/RoundEntity';

export class SessionRequest extends HttpRequest {
  /*
    {"notes": "Custom Created ",
        "rounds": [
            { "round_order": 1,
                "breathes": 30,
                "retention_time": 50
            },
            {
                "round_order": 2,
                "breathes": 20,
                "retention_time": 60
            }]
    }
    */
  constructor(
    public readonly id: number = Date.now(),
    public readonly rounds: Array<RoundEntity>,
    public readonly notes: string,
    public readonly sessionEndpoint: string = 'session/create',
    public readonly sessinoMethod: string = 'POST',
  ) {
    super(sessionEndpoint, sessinoMethod, {
      id,
      rounds,
      notes,
    });
  }

  static empty(): SessionRequest {
    // Use the empty construct if you would like to parse an Entity from JSON
    return new SessionRequest(undefined, undefined, undefined);
  }

  toJSONString(): string {
    return JSON.stringify(this);
  }

  fromJSONString(json: string): SessionRequest {
    return JSON.parse(json);
  }
}
