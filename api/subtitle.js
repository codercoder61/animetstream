export default async function handler(req, res) {
  const subtitleUrl = req.query.url;

  // Basic validation: Only allow .vtt files from megastatics.com
  if (
    !subtitleUrl ||
    !subtitleUrl.startsWith('https://s.megastatics.com/') ||
    !subtitleUrl.endsWith('.vtt')
  ) {
    return res.status(400).json({ error: 'Invalid or missing subtitle URL' });
  }

  try {
    const response = await fetch(subtitleUrl);
    const text = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/vtt');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subtitle file' });
  }
}
