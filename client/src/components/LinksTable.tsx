import { useState, useEffect } from 'react';
import { fetchLinks, getShortUrl } from '../api';

interface Link {
  id: string;
  target: string;
  clicks: number;
  createdAt: string;
}

export function LinksTable() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadLinks();
  }, []);

  async function loadLinks() {
    try {
      setLoading(true);
      const data = await fetchLinks();
      setLinks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load links');
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(id: string) {
    try {
      const shortUrl = getShortUrl(id);
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString();
  }

  if (loading) {
    return <div className="loading">Loading links...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (links.length === 0) {
    return <div className="empty">No links created yet. Create your first short link!</div>;
  }

  return (
    <div className="links-table">
      <h2>Your Short Links</h2>
      <table>
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Target URL</th>
            <th>Clicks</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td>
                <code>{link.id}</code>
              </td>
              <td>
                <a href={link.target} target="_blank" rel="noopener noreferrer">
                  {link.target.length > 50 ? `${link.target.substring(0, 50)}...` : link.target}
                </a>
              </td>
              <td>{link.clicks}</td>
              <td>{formatDate(link.createdAt)}</td>
              <td>
                <button
                  onClick={() => copyToClipboard(link.id)}
                  className={copiedId === link.id ? 'copied' : ''}
                >
                  {copiedId === link.id ? 'Copied!' : 'Copy'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}