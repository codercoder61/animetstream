// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).send("Missing URL");

  try {
    const response = await axios.get(url, { responseType: 'stream' });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/vtt");
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Proxy error");
  }
}
