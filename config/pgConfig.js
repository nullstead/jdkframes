import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const DBHost = process.env.DBHost;
const DBPort = process.env.DBPort;
const DBName = process.env.DBName;
const DBUsername = process.env.DBUsername;
const DBPassword = process.env.DBPassword;

const DatabaseURL = `postgres://${DBUsername}:${DBPassword}@${DBHost}:${DBPort}/${DBName}`;

const pgClient = new Client({
    connectionString: DatabaseURL,
    ssl: {
      rejectUnauthorized: false // Should be true if there's a valid SSL certificate
    }
});

try {
    await pgClient.connect();
    console.log('Successfully connected to the database! :)');
} catch (error) {
    console.error(':( Database connection error! ', error);
    process.exit(1);
}

export default pgClient;