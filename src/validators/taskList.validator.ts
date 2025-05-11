import Joi from 'joi';

export const taskListSchema = Joi.object({
  list_name: Joi.string().min(3).max(30).required(),
  position: Joi.number().default(0),
});
