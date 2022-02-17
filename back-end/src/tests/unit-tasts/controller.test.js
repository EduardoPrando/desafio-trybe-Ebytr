const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId, MongoClient } = require('mongodb');
const { getConnection } = require('../connectionMock');

const { createNewTaskController } = require('../../controllers/task.controller');

const TaskService = require('../../services/task.service');
const { taskConflict } = require('../../utils/dictionary/messages');
const { conflict } = require('../../utils/dictionary/statusCode');

const errorHandlerUtils = require('../../utils/function/errorHandlerUtils');

const ResponseNewTask = {
  task: 'Kart',
  idTask: 1,
  description: 'a litle despription',
  _id: new ObjectId("61fc08f8f91762802a95515a")
};

describe('Unit: Task controller tests:', () => {
  describe('createNewTaskController function', () => {
    const req = {};
    const res = {};
    let next = () => {};
    let connectionMock;

    before(async () => {
      req.body = {
        task: ResponseNewTask.task,
        idTask: ResponseNewTask.idTask,
        description: ResponseNewTask.description,
      };
      
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await connectionMock.db('toDoEbyTr').dropDatabase();

      res.status = sinon.stub().returns(res);
      sinon.stub(TaskService, 'createNewTaskService').resolves(ResponseNewTask);
    });

    after(async () => {
      await TaskService.createNewTaskService.restore();
      await MongoClient.connect.restore();
    });

    it('should create a new task whit status 201', async () => {
      await connectionMock.db('toDoEbyTr').dropDatabase();

      await createNewTaskController(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
    });

    it('should expect a error 409', async () => {
      next = sinon.stub().throws(errorHandlerUtils(conflict, taskConflict));

      try {
      await createNewTaskController(req, res, next);
        
      } catch (error) {
        expect(error.status).to.be.equal(409);
        expect(error.message).to.be.equal('Task already created');
      };
    });
  });
});