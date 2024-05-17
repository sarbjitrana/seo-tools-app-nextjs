// pages/api/check-http-status-code.js
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const response = await axios.head(url);
    const statusCode = response.status;

    res.status(200).json({ message: `HTTP Status Code: ${statusCode}` });
  } catch (error) {
    res.status(500).json({ message: 'Error checking HTTP status code: ' + error.message });
  }
}
