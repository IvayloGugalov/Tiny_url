export type ApiResponse = {
  message: string;
  success: true;
}

export interface Link {
  id: string;
  target: string;
  clicks: number;
  createdAt: string;
}
