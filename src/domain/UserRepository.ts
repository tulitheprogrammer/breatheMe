import { SessionEntity } from '../model/session/SessionEntity';

export interface InMemoryRepository {
  isAuthTokenPersisted(): Promise<boolean>;

  getAuthToken(): Promise<string>;

  refreshAuthToken(token: string): Promise<string>;

  cacheUsername(username: string): Promise<string>;

  getUsername(): Promise<string>;

  persistSession(
    amountOfRounds,
    custom,
    retentionTimeMap,
    amountOfBreathsPerRetention,
    notes,
  ): Promise<SessionEntity>;

  updateSession(session: SessionEntity): Promise<SessionEntity>;

  getAllPersistedSessionEntities(): Promise<Array<SessionEntity>>;

  getSessionById(id: string): Promise<SessionEntity>;

  clearAuthToken(): Promise<boolean>;

  deleteSession(id: string): Promise<boolean>;
}
