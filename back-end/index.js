const express = require('express')
const { createNewTaskController } = require('./src/controllers/task.controller');
const errorHandler = require('./src/middleware/errorHandler');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/task', createNewTaskController)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

app.use(errorHandler);

module.exports = app;
