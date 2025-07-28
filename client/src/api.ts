import type { Link } from 'shared';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiLog = {
  info: (message: string, data?: any) => {
    console.log(`[API] ${message}`, data || '')
  },
  error: (message: string, error?: any) => {
    console.error(`[API] ${message}`, error)
  },
  warn: (message: string, data?: any) => {
    console.warn(`[API] ${message}`, data || '')
  }
}

function getAuthHeaders(): HeadersInit | undefined {
  const jwt = localStorage.getItem('jwt')
  return jwt ? { Authorization: `Bearer ${jwt}` } : undefined
}

async function handleApiResponse<T>(response: Response, endpoint: string): Promise<T> {
  apiLog.info(`Response from ${endpoint}`, {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries())
  })

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text()
    apiLog.error(`Non-JSON response from ${endpoint}`, {
      contentType,
      status: response.status,
      body: text.substring(0, 200)
    })
    throw new Error(`Server returned ${contentType || 'unknown content type'} instead of JSON`)
  }

  const data = await response.json()

  if (!response.ok) {
    apiLog.error(`API error from ${endpoint}`, {
      status: response.status,
      error: data.error || data.message,
      data
    })
    throw new Error(data.error || data.message || `HTTP ${response.status}: ${response.statusText}`)
  }

  apiLog.info(`Success from ${endpoint}`, data)
  return data.data
}

export async function createShortLink(target: string): Promise<{ id: string; shortUrl: string }> {
  try {
    apiLog.info('Creating short link', { target, apiUrl: API_BASE_URL })

    const response = await fetch(`${API_BASE_URL}/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ target }),
    });

    return await handleApiResponse<{ id: string; shortUrl: string }>(response, '/api/links')
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
        'Accept': 'application/json',
        ...getAuthHeaders(),
      },
    });

    return await handleApiResponse<Link[]>(response, '/api/links')
  } catch (error) {
    apiLog.error('Failed to fetch links', error)
    throw error
  }
}

export async function checkServerHealth(): Promise<{ status: string; message: string }> {
  try {
    apiLog.info('Checking server health', { apiUrl: API_BASE_URL })

    const response = await fetch(`${API_BASE_URL}/api/health`, {
      headers: {
        'Accept': 'application/json'
      },
    });

    return await handleApiResponse<{ status: string; message: string }>(response, '/api/health')
  } catch (error) {
    apiLog.error('Health check failed', error)
    throw error
  }
}

export async function registerUser(email: string, name?: string): Promise<{ token: string; user: { id: string; email: string; name: string | null } }> {
  try {
    apiLog.info('Registering user', { email, apiUrl: API_BASE_URL })

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, name }),
    });

    return await handleApiResponse<{ token: string; user: { id: string; email: string; name: string | null } }>(response, '/api/auth/register')
  } catch (error) {
    apiLog.error('Failed to register user', error)
    throw error
  }
}

export function getShortUrl(id: string): string {
  return `${API_BASE_URL}/${id}`;
}