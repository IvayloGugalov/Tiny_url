import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import type { ApiResponse } from 'shared/dist'
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { links } from './db/schema';
import { eq, lt } from 'drizzle-orm';

const app = new Hono()
app.use(cors())

// Set up Drizzle ORM with Bun's SQLite
const sqlite = new Database(process.env.DB_FILE_NAME || 'dev.sqlite');
const db = drizzle({ client: sqlite });

// Configuration
const LINK_TTL_DAYS = parseInt(process.env.LINK_TTL_DAYS || '90', 10);

function generateShortId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Cron job to prune expired links (runs daily at 2 AM)
// Note: Bun.cron is experimental, using setInterval as fallback
const CRON_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

setInterval(async () => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - LINK_TTL_DAYS);

    await db.delete(links)
      .where(lt(links.createdAt, cutoffDate))
      .run();

    console.log(`Pruned expired links (older than ${LINK_TTL_DAYS} days)`);
  } catch (error) {
    console.error('Error pruning expired links:', error);
  }
}, CRON_INTERVAL);

// Serve static files (React app)
app.use('/*', serveStatic({ root: './public' }))

app.get('/api/hello', async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true
  }
  return c.json(data, { status: 200 })
})

// POST /api/links – create short code
app.post('/api/links', async (c) => {
  try {
    const body = await c.req.json();
    const { target } = body;
    if (!target || typeof target !== 'string') {
      return c.json({ error: 'Missing or invalid target URL' }, 400);
    }
    // Generate unique short id
    let id;
    let exists = true;
    do {
      id = generateShortId();
      const found = await db.select().from(links).where(eq(links.id, id)).get();
      exists = !!found;
    } while (exists);
    // Insert into DB
    await db.insert(links).values({ id, target }).run();
    const shortUrl = `${c.req.url.replace(/\/api\/links$/, '')}/${id}`;
    return c.json({ id, shortUrl });
  } catch (err) {
    return c.json({ error: 'Failed to create short link' }, 500);
  }
});

// GET /:id – redirect & increment clicks
app.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const link = await db.select().from(links).where(eq(links.id, id)).get();
    if (!link) {
      return c.json({ error: 'Not found' }, 404);
    }
    await db.update(links).set({ clicks: (link.clicks || 0) + 1 }).where(eq(links.id, id)).run();
    return c.redirect(link.target, 302);
  } catch (err) {
    return c.json({ error: 'Failed to redirect' }, 500);
  }
});

// GET /api/links – list all links
app.get('/api/links', async (c) => {
  try {
    const allLinks = await db.select().from(links).all();
    return c.json(allLinks);
  } catch (err) {
    return c.json({ error: 'Failed to fetch links' }, 500);
  }
});

// Error-handling middleware
app.notFound((c) => c.json({ error: 'Not Found' }, 404))
app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

export default app
