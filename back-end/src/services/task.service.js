const { taskSchema } = require("../../schemas/task.schema");
const errorHandlerUtils = require("../../utils/function/errorHandlerUtils");
const { badRequest } = require("../utils/dictionary/statusCode");


const createNewTaskService = (task) => {
  const { error } = taskSchema.validate({ task });

  if (error) throw errorHandlerUtils(badRequest, error.message);

  const newTaskCreated = createNewTaskModule(task);
};


module.exports = {
  createNewTaskService,
}