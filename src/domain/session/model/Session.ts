import { AbstractRequest } from '../../../model/request/AbstractRequest';

export class Session extends AbstractRequest {
  constructor(
    public readonly date: number,
    public readonly amountOfRounds: number,
    public readonly custom: boolean,
    public readonly retentionTimeMap: Map<number, number>,
    public readonly amountOfBreathsPreRetention: Map<number, number>,
    public readonly notes: string,
    public readonly localId?: number,
    public readonly globalId?: number, // ID from the Backend
  ) {
    super();
  }
}
