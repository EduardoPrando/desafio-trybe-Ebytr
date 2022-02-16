const connection = require('./connection.model');

const DB_COLLECTION = 'task';

const createNewTaskModule = async (task, idTask, description) => {
  const con = await connection();
  const { insertedId } = await con.collection(DB_COLLECTION).insertOne({ task, idTask, description })
  return insertedId
};

const findTaskByIdModule = async (idTask) => {
  const con = await connection();
  const response = await con.collection(DB_COLLECTION).findOne({idTask})
  return response;
}

module.exports = {
  createNewTaskModule,
  findTaskByIdModule,
};