import { config } from './config';
import { User } from '../models/User';
import { Card } from '../models/Card';
import { Sequelize, Model } from 'sequelize-typescript';
import { TaskList } from '../models/TaskList';
import { CardComment } from '../models/CardComments';
import { TaskActivityLog } from '../models/TaskActivityLog';

const db = config.development;

export const sequelize = new Sequelize({
  database: db.database,
  username: db.username,
  password: db.password,
  host: db.host,
  dialect: db.dialect,
  logging: false,
  models: [User, Card, TaskList, CardComment, TaskActivityLog], // ✅ Pass models here
});
