import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

  const { Client } = pg;

  const DBHost = process.env.DBHost;
  const DBPort = process.env.DBPort;
  const DBName = process.env.DBName;
  const DBUsername = process.env.DBUsername;
  const DBPassword = process.env.DBPassword;

  const DatabaseURL =  `postgres://${DBUsername}:${DBPassword}@${DBHost}:${DBPort}/${DBName}`;

  const pgClient = new Client({
    connectionString: DatabaseURL
  });

  await pgClient.connect();

  export default pgClient;