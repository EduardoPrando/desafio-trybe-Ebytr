const Joi = require('@hapi/joi');
const sinon = require('sinon');
const { expect } = require('chai');
const taskController = require('../../controllers/task.controller');

const taskSchema = Joi.object({
  task: Joi.string().min(3).required(),
});

const testedTaskErrorOne = {
  task: '',
};

const testedTaskErrorTwo = {
  task: 'as',
};

const validTestOne = {
  task: 'Sinuca',
};

const validResponse = {
  _id: 1,
  taskId: '61fc08f8f91762802a95516c',
  task: 'Sinuca',
}


describe('Testing task controller:', () => {
  describe('creatingNewTaskController func', () => {
    describe('valid data', () => {
      const req = {};
      const res = {};

      before(() => {
        req.body = {
          task: validTestOne.task,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(taskController, 'createNewTaskController').resolves(validResponse);
      });

      after(() => {
        taskController.createNewTaskController.restore();
      });

      it('should create a new task whit status 201', async () => {
        await taskController.createNewTaskController(req, res);

        expect(res.status.calledWith(201)).to.be.true;
      });
    });
  });
});
// createNewTaskController