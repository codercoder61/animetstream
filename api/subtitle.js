export default async function handler(req, res) {
  const { url: subtitleUrl } = req.query;

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  // Basic validation
  if (!subtitleUrl || !subtitleUrl.endsWith('.vtt')) {
    return res.status(400).json({ error: 'Invalid or missing subtitle URL' });
  }

  try {
    const response = await fetch(subtitleUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtitle: ${response.status}`);
    }

    let text = await response.text();

    // Ensure file starts exactly with "WEBVTT"
    text = text.replace(/^\uFEFF/, ''); // Remove BOM
    text = text.trimStart(); // Remove leading spaces/newlines
    if (!text.startsWith('WEBVTT')) {
      throw new Error('Invalid WebVTT format');
    }

    // Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch subtitle file' });
  }
}
