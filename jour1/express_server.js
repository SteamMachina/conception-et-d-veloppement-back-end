const express = require('express')
const app = express()
const port = 3000

// 4. Installation express et première utilisation
// 10. L'objet request - exercice
app.get('/', (req, res) => {
    console.log(req.headers);
    console.log(req.body);
  res.send('Hello World!');
});

// 6. Renvoyer du html
app.get('/some-html', (req, res) => {
    let code = `<html><body><h1>bonjour html</h1></body></html>`;
  res.send(code);
});

// 7. Renvoyer du JSON
app.get('/some-json', (req, res) => {
    const person = {
        "age": 22, 
        "nom" : "Jane"
    };
  res.json(person);
});

// 8. Renvoyer du JSON 2
app.get('/transaction', (req, res) => {
    const numbers = [100, 2000, 3000];
  res.json(numbers);
});

// 13. Query string
app.get('/exo-query-string', (req, res) => {
  const person = req.query;
  console.log(person);
  const message = `<h1>${person.age}</h1>`;
  res.send(message);
});

// 14. Url avec paramètre
app.get('/get-user/:userId', (req, res) => {
  const user = req.params.userId;
  console.log(user);
  const message = `<h1>${user}</h1>`;
  res.send(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
