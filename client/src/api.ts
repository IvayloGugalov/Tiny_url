import type {
  Link,
  CreateLinkResponse,
  HealthResponse,
  ClientRegisterResponse,
} from 'shared'
import { CreateLinkRequestSchema, RegisterRequestSchema } from 'shared'

const apiLog = {
  info: (message: string, data?: unknown) => {
    console.log(`[API] ${message}`, data ?? '')
  },
  error: (message: string, error?: unknown) => {
    console.error(`[API] ${message}`, error)
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[API] ${message}`, data ?? '')
  },
}

function getAuthHeaders(): HeadersInit | undefined {
  const jwt = localStorage.getItem('jwt')
  return jwt ? { Authorization: `Bearer ${jwt}` } : undefined
}

async function handleApiResponse<T>(
  response: Response,
  endpoint: string,
): Promise<T> {
  apiLog.info(`Response from ${endpoint}`, {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
  })

  const contentType = response.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    const text = await response.text()
    apiLog.error(`Non-JSON response from ${endpoint}`, {
      contentType,
      status: response.status,
      body: text.substring(0, 200),
    })
    throw new Error(
      `Server returned ${contentType ?? 'unknown content type'} instead of JSON`,
    )
  }

  const data = await response.json()

  if (!response.ok) {
    apiLog.error(`API error from ${endpoint}`, {
      status: response.status,
      error: data.error ?? data.message,
      data,
    })
    throw new Error(
      data.error ??
        data.message ??
        `HTTP ${response.status}: ${response.statusText}`,
    )
  }

  apiLog.info(`Success from ${endpoint}`, data)
  return data.data
}

export async function createShortLink(
  target: string,
): Promise<CreateLinkResponse> {
  try {
    const requestData = { target }
    CreateLinkRequestSchema.parse(requestData)

    apiLog.info('Creating short link', { target, apiUrl: API_BASE_URL })

    const response = await fetch(`${API_BASE_URL}/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    return await handleApiResponse<CreateLinkResponse>(response, '/api/links')
  } catch (error) {
    apiLog.error('Failed to create short link', error)
    throw error
  }
}

export async function fetchLinks(): Promise<Link[]> {
  try {
    apiLog.info('Fetching links', { apiUrl: API_BASE_URL })

    const response = await fetch(`${API_BASE_URL}/api/links`, {
      headers: {
        Accept: 'application/json',
        ...getAuthHeaders(),
      },
    })

    return await handleApiResponse<Link[]>(response, '/api/links')
  } catch (error) {
    apiLog.error('Failed to fetch links', error)
    throw error
  }
}

export async function checkServerHealth(): Promise<HealthResponse> {
  try {
    apiLog.info('Checking server health', { apiUrl: API_BASE_URL })

    const response = await fetch(`${API_BASE_URL}/api/health`, {
      headers: {
        Accept: 'application/json',
      },
    })

    return await handleApiResponse<HealthResponse>(response, '/api/health')
  } catch (error) {
    apiLog.error('Health check failed', error)
    throw error
  }
}

export async function registerUser(
  email: string,
  name?: string,
): Promise<ClientRegisterResponse> {
  try {
    const requestData = { email, name }
    RegisterRequestSchema.parse(requestData)

    apiLog.info('Registering user', { email, apiUrl: API_BASE_URL })

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    return await handleApiResponse<ClientRegisterResponse>(
      response,
      '/api/auth/register',
    )
  } catch (error) {
    apiLog.error('Failed to register user', error)
    throw error
  }
}

export function getShortUrl(id: string): string {
  return `${API_BASE_URL}/${id}`
}
