import dotenv from 'dotenv';

dotenv.config();

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql'; 
}

export interface AppConfig {
  development: DBConfig;
}

export const config: AppConfig = {
  development: {
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || '', 
    dialect: 'mysql',
  },
};
