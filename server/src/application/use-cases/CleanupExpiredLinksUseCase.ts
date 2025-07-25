import { ILinkRepository } from '../interfaces'

export class CleanupExpiredLinksUseCase {
  constructor(private linkRepository: ILinkRepository) {}

  async execute(ttlDays: number): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - ttlDays)
    
    return await this.linkRepository.deleteExpiredLinks(cutoffDate)
  }
}
