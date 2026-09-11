require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

    // SSL ON
    ssl: process.env.DB_HOST?.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : false,
});


// Verificar conexión al iniciar
pool.connect()
    .then(client => {
        console.log('Conectado a PostgreSQL');
        client.release();
    })
    .catch(err => console.error('Error de conexión:', err.stack));

module.exports = pool;