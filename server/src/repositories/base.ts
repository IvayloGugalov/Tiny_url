import { databaseService } from '../services/database'

export abstract class BaseRepository {
  protected get db() {
    return databaseService.db
  }
}
