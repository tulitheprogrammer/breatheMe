import { Manager } from '../Manager';
import { SessionEntity } from '../../model/session/SessionEntity';

/**
 * The Session Manager handles all the error specific logic
 * and calls methods from the data layer (gateway) which gets returned then
 * to the app layer
 */

export interface SessionManager extends Manager {
  /**
   * Creates a SessionEntity out of the given parameters.
   * The session will be given an ID each by the persisting backends
   * (local: localId and backend: globalId)
   * @param {number} amountOfRounds
   * @param {boolean} custom
   * @param {Map<number, number>} retentionTimeMap
   * @param {Map<number, number>} amountOfBreathsPerRetention
   * @param {string} notes
   * @returns {Promise<SessionResponse>}
   */
  createAndSaveSession(
    amountOfRounds: number,
    custom: boolean,
    retentionTimeMap: Map<number, number>,
    amountOfBreathsPerRetention: Map<number, number>,
    notes: string,
  ): Promise<SessionEntity>;

  createSessionGlobal(localSession: SessionEntity): Promise<SessionEntity>;

  getAllSessions(): Promise<Array<SessionEntity>>;

  getSessionById(id: number): Promise<SessionEntity>;
}
