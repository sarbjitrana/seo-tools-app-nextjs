// pages/api/login.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Implement your authentication logic here
      const { email, password } = req.body;
  
      // Example: Simple validation (replace this with your actual authentication logic)
      if (email === 'user@example.com' && password === 'password') {
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  }
  