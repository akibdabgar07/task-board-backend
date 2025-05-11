import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';
import { sequelize } from './config/database';
import logger from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import { commonErrorHandler } from './middlewares/error.middleware';
import taskListRouter from './routes/taskList.routes';

require('dotenv').config();

var corsOptions = {
  origin: '*',
};

// var indexRouter = require("./routes/index");

var app = express();

async function createDB() {
  try {
    await sequelize.sync({ alter: true }); // Creates or updates tables automatically
    console.log('Database synced ✅');

    // Start your express server or other logic here
    // app.listen(3000, () => console.log('Server is running on port 3000'));
  } catch (error) {
    console.error('Unable to connect to the database or sync:', error);
  }
}

createDB();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRouter);
app.use('/api', taskListRouter);

app.use(commonErrorHandler);
// simple route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUN ON PORT :- ${process.env.PORT}`);
});

// routes
// app.use("/api", indexRouter);

module.exports = app;
