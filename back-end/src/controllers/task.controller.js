const { createNewTaskService } = require('../services/task.service');
const { created } = require('../utils/dictionary/statusCode');

const createNewTaskController = async (req, res, next) => {
  try {
    const { task, idTask, description } = req.body;

    const newTask = await createNewTaskService(task, idTask, description);

    res.status(created).json({ task, idTask, description });

  }catch (error) {
    next(error);
  }
};

module.exports = {
  createNewTaskController,
}