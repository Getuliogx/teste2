const express = require('express');
const path = require('path');
const { buildTheme } = require('./themes');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TMDB_TOKEN;
const KEY = process.env.TMDB_API_KEY;
const PASS = process.env.PANEL_PASSWORD;

app.use(express.json());
app.use((req, res, next) => { // o overlay do OBS/StreamElements roda em outro domínio
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, x-panel-password');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

async function tmdb(p, params = {}) {
  const url = new URL('https://api.themoviedb.org/3' + p);
  url.searchParams.set('language', 'pt-BR');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const headers = { accept: 'application/json' };
  if (TOKEN) headers.Authorization = 'Bearer ' + TOKEN;
  else if (KEY) url.searchParams.set('api_key', KEY);
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error('TMDB ' + r.status);
  return r.json();
}

app.get('/api/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const d = await tmdb('/search/multi', { query: q, include_adult: 'false' });
    res.json(d.results.filter(x => x.media_type === 'movie' || x.media_type === 'tv').slice(0, 18).map(x => ({
      id: x.id, type: x.media_type, title: x.title || x.name,
      year: (x.release_date || x.first_air_date || '').slice(0, 4),
      poster: x.poster_path, rating: x.vote_average
    })));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

let current = null;
const clients = new Set();
const broadcast = () => clients.forEach(c => c.write(`data: ${JSON.stringify(current)}\n\n`));

app.get('/api/theme', (req, res) => res.json(current));
app.get('/api/stream', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  res.flushHeaders();
  res.write(`data: ${JSON.stringify(current)}\n\n`);
  clients.add(res);
  const ping = setInterval(() => res.write(': ping\n\n'), 25000);
  req.on('close', () => { clearInterval(ping); clients.delete(res); });
});

function auth(req, res) {
  if (PASS && req.get('x-panel-password') !== PASS) { res.status(401).json({ error: 'senha incorreta' }); return false; }
  return true;
}

app.post('/api/select', async (req, res) => {
  if (!auth(req, res)) return;
  try {
    const { type, id } = req.body;
    if (!['movie', 'tv'].includes(type) || !Number.isInteger(+id)) return res.status(400).json({ error: 'dados inválidos' });
    const d = await tmdb(`/${type}/${+id}`);
    current = {
      id: d.id, type, title: d.title || d.name, poster: d.poster_path,
      genres: d.genres.map(g => g.name), overview: d.overview,
      vars: buildTheme(d.genres)
    };
    broadcast();
    res.json(current);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/clear', (req, res) => {
  if (!auth(req, res)) return;
  current = null; broadcast(); res.json({ ok: true });
});

app.listen(PORT, () => console.log('Rodando na porta ' + PORT));
