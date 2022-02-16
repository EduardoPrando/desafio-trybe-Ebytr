const express = require('express')
const { createNewTaskController } = require('./src/controllers/task.controller');
const errorHandler = require('./src/middleware/errorHandler');

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/task', createNewTaskController)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(errorHandler);

module.exports = app;
