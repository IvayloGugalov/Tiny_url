import type { Link } from 'shared';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchLinks(): Promise<Link[]> {
  const response = await fetch(`${API_BASE_URL}/api/links`);
  if (!response.ok) {
    throw new Error(`Failed to fetch links: ${response.statusText}`);
  }
  return response.json();
}

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

export function getShortUrl(id: string): string {
  return `${API_BASE_URL}/${id}`;
}