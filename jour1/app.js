const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// 3. express - Une route post
app.post('/data', (req, res) => {
    const message = req.body;
    console.log(message);
  res.json(message);
});

// 4. La todo list le come back
var tasks = [];

app.get('/tasks', (req, res) => {
    console.log(tasks);
  res.json(tasks);
});

app.post('/new-task', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
  res.send(tasks);
});

app.post('/update-task/:id', (req, res) => {
    const id = req.params.id;
    let updatedTask = req.body;
    tasks[id]=(updatedTask);
  res.send(tasks);
});

app.post('/delete-task/:id', (req, res) => {
    const id = req.params.id;
    tasks[id]=({});
  res.send(tasks);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
