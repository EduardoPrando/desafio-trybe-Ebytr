const Joi = require('@hapi/joi');

const taskSchema = Joi.object({
  task: Joi.string().min(3).required(),
});

module.exports = { 
  taskSchema,
}