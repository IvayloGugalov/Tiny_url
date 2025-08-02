import type { Link } from 'shared'

export interface LinkPresenter {
  present(link: Link): {
    id: string
    target: string
    clicks: number
    createdAt: string
  }
}

export class ApiLinkPresenter implements LinkPresenter {
  present(link: Link): {
    id: string
    target: string
    clicks: number
    createdAt: string
  } {
    return {
      id: link.id,
      target: link.target,
      clicks: link.clicks,
      createdAt: link.createdAt.toISOString(),
    }
  }
}
