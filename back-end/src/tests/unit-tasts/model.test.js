const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('../connectionMock');

const { createNewTaskModule, findTaskByIdModule } =  require('../../models/task.model');

const newTask = {
  task: 'Sinuca',
  idTask: 1,
  description: 'a litle despription',
};

describe('Unit: Task model tests:', () => {
  let connectionMock;
  let responseCreate;
  let response

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('toDoEbyTr').collection('task').drop();
    await MongoClient.connect.restore();
  });

  const { task, idTask, description } = newTask;

  describe('createNewTaskModule function:', () => {
    before(async () => {
      responseCreate = await createNewTaskModule(task, idTask, description);
    });

    it('should create a new task', async () => {
      const { _id, ...responseWhitOutId } = responseCreate;

      expect(responseCreate).to.be.a('object');
      expect(responseWhitOutId).to.deep.equal(newTask);
    });
  });

  describe('findTaskByIdModule function', () => {
    it('should return null if don\'t find anything', async () => {
      response = await findTaskByIdModule(2);

      expect(response).to.be.null;
    });

    it('should return a task', async () => {
      response = await findTaskByIdModule(idTask);

      expect(response).not.to.be.null;
      expect(response).to.deep.equal(responseCreate)
    });
  });
});
