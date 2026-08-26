import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  try {
    const file = path.join(process.cwd(), 'db.json')
    const raw = fs.readFileSync(file, 'utf8')
    const json = JSON.parse(raw)
    const blogs = json.blogs || json
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json(blogs)
  } catch (err) {
    console.error('api/blogs error:', err && err.stack ? err.stack : err)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'failed to load blogs', detail: err && err.message ? err.message : String(err) })
  }
}
