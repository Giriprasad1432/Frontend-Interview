const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Prefer bundling the JSON at build-time (require). If that fails, read the file at runtime.
    let json;
    try {
      // This will be bundled by Vercel at build time and is the most reliable in serverless.
      // eslint-disable-next-line global-require
      json = require('../db.json');
    } catch (e) {
      // Fallback to reading from disk (useful during local vercel dev or unexpected layouts)
      const file = path.join(process.cwd(), 'db.json');
      const raw = fs.readFileSync(file, 'utf8');
      json = JSON.parse(raw);
    }

    const blogs = json.blogs || json;
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(blogs);
  } catch (err) {
    console.error('api/blogs error:', err && err.stack ? err.stack : err);
    // Provide helpful error details (safe for debugging). Remove `detail` before sharing publicly.
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'failed to load blogs', detail: err && err.message ? err.message : String(err) });
  }
};
