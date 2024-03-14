require('dotenv').config();
const mariadb = require('mariadb');

// Connexion à la BDD
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_BDD,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 100,
    connectTimeout: 30000,
});
console.log(pool)
module.exports = {pool: pool};