import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

  const { Client } = pg;

  const pgClient = new Client({
    connectionString: process.env.DatabaseURL
  });

  await pgClient.connect();

  export default pgClient;