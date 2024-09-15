import {Pool, PoolConfig} from "pg"
import * as dotenv from "dotenv";
dotenv.config();

const config: PoolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT as string) || 5432,
};

const db = new Pool(config);
db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully:', res.rows[0]);
    }
});
export default db;