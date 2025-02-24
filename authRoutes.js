const router = require('express').Router();
const pool = require('./db'); // Import database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JSON Web Token for session handling

// Register a new user endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Get username and password from request body
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt
  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword] // Insert new user into database
    );
    res.json(newUser.rows[0]); // Send the new user data back to the client
  } catch (err) {
    res.status(500).json(err); // Handle errors
  }
});

// Login user endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Get username and password from request body
  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]); // Find user in database

  if (user.rows.length === 0) {
    return res.status(404).send('User not found'); // User not found
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password); // Check password validity
  if (!validPassword) return res.status(400).send('Invalid password'); // Wrong password

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET); // Create JWT token
  res.header('auth-token', token).send(token); // Send token in response header
});

module.exports = router; // Export the router for use in the main server setup
