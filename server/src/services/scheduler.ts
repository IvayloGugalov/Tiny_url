import { LinkService } from './linkService'
import { logger } from './logger'

export class SchedulerService {
  private intervals: NodeJS.Timeout[] = []

  constructor(private linkService: LinkService) {}

  startLinkCleanupJob(): void {
    // Run cleanup daily (24 hours in milliseconds)
    const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000

    const intervalId = setInterval(async () => {
      try {
        const deletedCount = await this.linkService.cleanupExpiredLinks()
        logger.info('Scheduled link cleanup completed', { deletedCount })
      } catch (error) {
        logger.error('Scheduled link cleanup failed', error)
      }
    }, CLEANUP_INTERVAL)

    this.intervals.push(intervalId)
    logger.info('Link cleanup job scheduled', { intervalMs: CLEANUP_INTERVAL })
  }

  stopAllJobs(): void {
    this.intervals.forEach(intervalId => {
      clearInterval(intervalId)
    })
    this.intervals = []
    logger.info('All scheduled jobs stopped')
  }
}
