const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const file = path.join(process.cwd(), 'db.json');
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    const blogs = json.blogs || json;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to read db.json' });
  }
};
