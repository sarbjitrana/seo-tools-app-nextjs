// pages/api/signup.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Implement your user registration logic here
      const { name, email, password } = req.body;
  
      // Example: Simple validation (replace this with your actual registration logic)
      if (name && email && password) {
        res.status(200).json({ success: true, message: 'Registration successful' });
      } else {
        res.status(400).json({ success: false, message: 'Invalid registration data' });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  }
  