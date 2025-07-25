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

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}
