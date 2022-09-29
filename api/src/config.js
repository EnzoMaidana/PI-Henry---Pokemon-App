const PORT = process.env.PORT || 3001;

const DB_HOST = process.env.DB_HOST || 'localhost';

const DB_USER = process.env.DB_USER || 'postgres';

const DB_PASSWORD = process.env.DB_HOST || '38772607';

const DB_PORT = process.env.DB_PORT || 5432;

const DB_NAME = process.env.DB_NAME || 'pokemon';



module.exports = {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_NAME,
}