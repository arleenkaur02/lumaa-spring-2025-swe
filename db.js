const { Pool } = require('pg'); // Import PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL // Connect using connection string from environment variable
});

module.exports = pool; // Export the pool for use in other files
