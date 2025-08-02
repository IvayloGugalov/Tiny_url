import type { Link, LinkId, UserId } from 'shared'

export interface ILinkRepository {
  create(link: Link): Promise<Link>
  findById(id: LinkId): Promise<Link | null>
  findByUserId(userId: UserId): Promise<Link[]>
  findAll(): Promise<Link[]>
  update(link: Link): Promise<Link>
  delete(id: LinkId): Promise<void>
  deleteExpired(ttlDays: number): Promise<number>
}
