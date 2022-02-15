const createNewTaskController = async (req, res, next) => {
  try {
    const { task } = req.body;

    const newTask = await createNewTaskService(task);

    res.status(create).json(newTask);

  }catch (error) {
    console.log('createNewTaskController', error.message);
    next(error);
  }
};

module.exports = {
  createNewTaskController,
}