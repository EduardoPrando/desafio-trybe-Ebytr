const { taskSchema } = require('../schemas/task.schema');
const errorHandlerUtils = require("../utils/function/errorHandlerUtils");
const { badRequest, conflict } = require("../utils/dictionary/statusCode");
const { createNewTaskModule, findTaskByIdModule } = require('../models/task.model');
const { taskConflict } = require('../utils/dictionary/messages');

const taskIsAlreadyCreated = async (idTask) => {
  const response = await findTaskByIdModule(idTask);

  if (response) throw errorHandlerUtils(conflict, taskConflict);
};

const createNewTaskService = async (task, idTask, description) => {
  const { error } = taskSchema.validate({ task, idTask, description });

  if (error) throw errorHandlerUtils(badRequest, error.message);

  await taskIsAlreadyCreated(idTask);

  const newTaskCreated = await createNewTaskModule(task, idTask, description);

  return newTaskCreated;
};

module.exports = {
  createNewTaskService,
};
