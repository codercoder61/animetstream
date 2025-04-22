// /pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.body;  // Get the URL from query parameters
  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  try {
    const response = await axios.get(url, {
      responseType: 'stream',  // Stream the file data
      headers: {
        'User-Agent': 'Mozilla/5.0',  // Optional: Mimic browser user-agent
        'Accept': 'text/vtt',  // Specify that you're expecting a subtitle file (VTT)
      },
    });

    res.setHeader('Access-Control-Allow-Origin', '*');  // CORS headers
    res.setHeader('Content-Type', 'text/vtt');  // Set the content type as VTT
    response.data.pipe(res);  // Pipe the data to the response
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Error while fetching the subtitle');
  }
}
