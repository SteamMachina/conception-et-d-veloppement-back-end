const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/some-html', (req, res) => {
    let code = `<html><body><h1>bonjour html</h1></body></html>`;
  res.send(code);
});

app.get('/some-json', (req, res) => {
    const person = {
        "age": 22, 
        "nom" : "Jane"
    };
  res.json(person);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
