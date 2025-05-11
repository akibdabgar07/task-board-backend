import { TaskList } from '../models/TaskList';
import { TaskListAttributes } from '../types/types';

export const createTaskListService = async (
  data: TaskListAttributes
): Promise<TaskList> => {
  return await TaskList.create(data);
};
