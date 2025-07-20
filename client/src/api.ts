import type { Link } from 'shared';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getAuthHeaders(): HeadersInit | undefined {
  const jwt = localStorage.getItem('jwt')
  return jwt ? { Authorization: `Bearer ${jwt}` } : undefined
}

// Public function - no auth required
export async function createShortLink(target: string): Promise<{ id: string; shortUrl: string }> {
  const response = await fetch(`${API_BASE_URL}/api/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ target }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create short link');
  }

  return response.json();
}

// Protected function - requires auth for analytics
export async function fetchLinks(): Promise<Link[]> {
  const response = await fetch(`${API_BASE_URL}/api/links`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch links: ${response.statusText}`);
  }
  return response.json();
}

export function getShortUrl(id: string): string {
  return `${API_BASE_URL}/${id}`;
}