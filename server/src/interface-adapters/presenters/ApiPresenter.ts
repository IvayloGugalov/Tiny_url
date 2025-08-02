export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export class ApiPresenter {
  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    }
  }

  static error(message: string, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
    }
  }
}
