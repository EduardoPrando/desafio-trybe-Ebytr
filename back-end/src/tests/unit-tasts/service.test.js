const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { getConnection } = require('../connectionMock');
const { createNewTaskService } = require('../../services/task.service');
const TaskModel = require('../../models/task.model');

const ResponseNewTask = {
  task: 'Sinuca',
  idTask: 1,
  description: 'a litle despription',
  _id: new ObjectId("61fc08f8f91762802a95516c")
};

const newTask = {
  task: 'Sinuca',
  idTask: 1,
  description: 'a litle despription',
};

const errorTask = {
  one: {
    task: 'Sc',
    idTask: 1,
    description: 'a litle despription',
  },
  two: {
    idTask: 1,
    description: 'a litle despription',
  }
}

const errorId = {
  one: {
    task: 'Sinuca',
    idTask: 'one',
    description: 'a litle despription',
  },
  two: {
    task: 'Sinuca',
    description: 'a litle despription',
  }
}

const errorDescription = {
  one: {
  task: 'Sinuca',
  idTask: 1,
  description: 'as',
  },
  two: {
    task: 'Sinuca',
    idTask: 1,
  }

}

describe('Unit: Task service tests:', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db('toDoEbyTr').dropDatabase();

    sinon.stub(TaskModel, 'createNewTaskModule').resolves(ResponseNewTask);
  });
  
  after(async () => {
    await MongoClient.connect.restore();
    await TaskModel.createNewTaskModule.restore();
  });
  
  describe('createNewTaskService function', () => {
    describe('Valid data', () => {
      const { task, idTask, description } = ResponseNewTask;

      it('should return a object whit a task', async () => {
        const response = await createNewTaskService(task, idTask, description);

        expect(response).to.be.an('object');
        expect(response).to.deep.equal(ResponseNewTask);
      });
    });
  
    describe('Invalid data:', () => {
      describe('Task error:', () => {
        it('if task already exist, should return a message: status: 409, and message: "task already registered"', async () => {
          try {
            const { task, idTask, description } = newTask;
            await createNewTaskService(task, idTask, description);
          } catch (error) {
            expect(error).to.be.an('object');
            expect(error).to.have.property('status');
            expect(error).to.have.property('message');
            expect(error.status).to.be.equal(409);
            expect(error.message).to.be.equal('Task already created')
          };
        });

        it('if task has insufficient characters, should return a message: status: 400, and message: "task" length must be at least 3 characters long', async () => {
          try {
            const { task, idTask, description } = errorTask.one;
            await createNewTaskService(task, idTask, description);
          } catch (error) {
            expect(error).to.be.an('object');
            expect(error).to.have.property('status');
            expect(error).to.have.property('message');
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"task" length must be at least 3 characters long')
          };
        });

        it('if task not informed, should return a message: status: 400, and message: "task" is required', async () => {
          try {
            const { task, idTask, description } = errorTask.two;
            await createNewTaskService(task, idTask, description);
          } catch (error) {
            expect(error).to.be.an('object');
            expect(error).to.have.property('status');
            expect(error).to.have.property('message');
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"task" is required')
          };
        });
      });

      describe('IdTask error:', () => {
        it('if idTask has wrong id format:, should return a message: status: 400, and message: "idTask" must be a number', async () => {
          try {
            const { task, idTask, description } = errorId.one;
            await createNewTaskService(task, idTask, description);
          } catch (error) {
            expect(error).to.be.an('object');
            expect(error).to.have.property('status');
            expect(error).to.have.property('message');
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"idTask" must be a number')
          };
        });

        it('if idTask not informed, should return a message: status: 400, and message: "idTask" is required', async () => {
          try {
            const { task, idTask, description } = errorId.two;
            await createNewTaskService(task, idTask, description);
          } catch (error) {
            expect(error).to.be.an('object');
            expect(error).to.have.property('status');
            expect(error).to.have.property('message');
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"idTask" is required')
          };
        });
      });
      describe('Description error:', () => {
        it('if description has insufficient characters, should return a message: status: 400, and message: "description" length must be at least 3 characters long', async () => {
          try {
            const { task, idTask, description } = errorDescription.one;
            await createNewTaskService(task, idTask, description);
          } catch (error) {
            expect(error).to.be.an('object');
            expect(error).to.have.property('status');
            expect(error).to.have.property('message');
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"description" length must be at least 3 characters long')
          };
        });
        
        it('if description not informed, should return a message: status: 400, and message: "description" is required', async () => {
          try {
            const { task, idTask, description } = errorDescription.two;
            await createNewTaskService(task, idTask, description);
          } catch (error) {
            expect(error).to.be.an('object');
            expect(error).to.have.property('status');
            expect(error).to.have.property('message');
            expect(error.status).to.be.equal(400);
            expect(error.message).to.be.equal('"description" is required')
          };
        });
      });
    });
  });
});
