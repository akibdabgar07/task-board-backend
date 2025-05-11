import { Response, NextFunction } from 'express';
import { createTaskListService } from '../services/taskList.service';
import { TaskListAttributes } from '../types/types';
import { AuthenticatedRequest } from '../types/taskList.paylod';

export const createTaskList = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { list_name, position } = req.body;
    const user_id = req.body.userId;

    if (!list_name) {
      res.status(400).json({ error: 'List name is required' });
    }

    const taskList: TaskListAttributes = {
      list_name,
      position,
      user_id,
    };

    // const created = await createTaskListService(taskList);
    // res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
