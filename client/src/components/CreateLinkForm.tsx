import { useState } from 'react';
import { createShortLink } from '../api';

interface CreateLinkFormProps {
  onLinkCreated: () => void;
}

export function CreateLinkForm({ onLinkCreated }: CreateLinkFormProps) {
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!targetUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(targetUrl);
    } catch {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await createShortLink(targetUrl);
      setSuccess(`Short link created: ${result.shortUrl}`);
      setTargetUrl('');
      onLinkCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create short link');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-link-form">
      <h2>Create New Short Link</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="targetUrl">Target URL:</label>
          <input
            type="url"
            id="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            disabled={loading}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>
    </div>
  );
}