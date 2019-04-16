const http = require('http');

const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send(' world');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/build/index.html');
});

app.use(express.static('app/build'));

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
