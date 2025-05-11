import { Router } from 'express';

import { validateData } from '../middlewares/validate.middleware';
import { taskListSchema } from '../validators/taskList.validator';
import { createTaskList } from '../controllers/taskList.controller';
import { authMiddleware } from '../models/Card';

const taskListRouter = Router();

taskListRouter.post(
  '/create-task-list',
  authMiddleware,
  validateData(taskListSchema),
  createTaskList
);

export default taskListRouter;
