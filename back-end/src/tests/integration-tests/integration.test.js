const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const Joi = require('@hapi/joi');

const taskController = require('../../controllers/task.controller');

const { getConnection } = require('../connectionMock');
const { MongoClient } = require('mongodb');

const server = require('../../../index')

chai.use(chaiHttp);

const validData = { 
  task: "Inovação",
  idTask: 1,
  description: "a litle despription",
  };

describe('Integration: Testing /POST task:', () => {
  let response
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    
  });
  
  after(async () => {
    await connectionMock.db('toDoEbyTr').collection('task').drop();
    MongoClient.connect.restore();
  })
  
  describe('valid data:', () => {
    before(async () => {
      response = await chai.request(server).post('/task').send(validData);
    })

    it('should create a new task whit status 201', () => {
      expect(response).to.have.status(201);
    });
    it('should return a object', () => {
      expect(response.body).to.be.an('object');
    });
    it('should have the property task', () => {
      expect(response.body).to.have.property('task');
    });
    it('should have the property idTask', () => {
      expect(response.body).to.have.property('idTask');
    });
    it('should have the property description', () => {
      expect(response.body).to.have.property('description');
    });
  });

  describe('invalid data:',  () => {
    describe('invalid idTask:', () => {
      describe('duplicated task id:', async () => {
        before(async () => {
          const createTask = connectionMock.db('toDoEbyTr').collection('task');

          await createTask.insertOne(validData);

          response = await chai.request(server).post('/task').send(validData);
        });

        it('should throw an error 409', () => {
          expect(response).to.have.status(409);
        });
        it('should send a message "Task already created"', () => {
          expect(response.body.message).to.be.equal('Task already created');
        });
      });

      describe('wrong id format:', async () => {
        before(async () => {
          response = await chai.request(server).post('/task').send({
            task: 'Sinuca',
            idTask: 'xa',
            description: 'a litle despription',
          });
        });

        it('should throw an error 400', () => {
          expect(response).to.have.status(400);
        });
        it('should send a message "idTask" must be a number', () => {
          expect(response.body.message).to.be.equal('"idTask" must be a number');
        });
      });

      describe('id not informed', async () => {
        before(async () => {
          response = await chai.request(server).post('/task').send({
            task: 'Sinuca',
            description: 'a litle despription',
            });
        });

        it('should throw an error 400', () => {
          expect(response).to.have.status(400);
        });
        it('should send a message ""idTask" is required"', () => {
          expect(response.body.message).to.be.equal('"idTask" is required');
        });
      });
    });
    describe('invalid task:', () => {
      describe('insufficient characters:', async () => {
        before(async () => {
          response = await chai.request(server).post('/task').send({
            task: "Si",
            idTask: 1,
            description: "a litle despription",
          });
        });

        it('should throw an error 400', () => {
          expect(response).to.have.status(400);
        });
        it('should send a message "task" length must be at least 3 characters long', () => {
          expect(response.body.message).to.be.equal('"task" length must be at least 3 characters long');
        });
      });

      describe('Task not informed', async () => {
        before(async () => {
          response = await chai.request(server).post('/task').send({
            idTask: 1,
            description: 'a litle despription',
            });
        });

        it('should throw an error 400', () => {
          expect(response).to.have.status(400);
        });
        it('should send a message "task" is required', () => {
          expect(response.body.message).to.be.equal('"task" is required');
        });
      });
    });
    describe('invalid description:', () => {
      describe('insufficient characters:', async () => {
        before(async () => {
          response = await chai.request(server).post('/task').send({
            task: 'Sinuca',
            idTask: 1,
            description: 'a',
          });
        });

        it('should throw an error 400', () => {
          expect(response).to.have.status(400);
        });
        it('should send a message "description" length must be at least 3 characters long', () => {
          expect(response.body.message).to.be.equal('"description" length must be at least 3 characters long');
        });
      });

      describe('Description not informed', async () => {
        before(async () => {
          response = await chai.request(server).post('/task').send({
            task: 'Sinuca',
            idTask: 1,
            });
        });

        it('should throw an error 400', () => {
          expect(response).to.have.status(400);
        });
        it('should send a message "description" is required', () => {
          expect(response.body.message).to.be.equal('"description" is required');
        });
      });
    });
  });
});
