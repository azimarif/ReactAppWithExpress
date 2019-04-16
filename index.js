const http = require('http');

const mysql  = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
  host:'mysql://b802ac9efcda40:c1973dcf@us-cdbr-iron-east-02.cleardb.net/heroku_8c2951a2b3c6ac6?reconnect=true',
  user:'b802ac9efcda40',
  port:3303,
  password:'c1973dcf',
});


app.use(express.json());

app.post('/hello', (req, res) => {
  console.log('here we go');
  const value = req.body.name;
  console.log(value);
  connection.connect((err)=> {
    if(err) throw err;
    connection.query('use civilwar', (err, result, fields )=> {
      if(err) {
        connection.query('create database civilwar');
      }
    })
    connection.query(`insert into tblMovie1(name) values(?)`, value, (err, result, fields )=> {
      if(err) {
        connection.query("Create table tblMovie1 (id int, name varchar(50))");
      }
      console.log(err);
      res.send(result);
    });
  });
});

app.get('/', (req, res) => {
  console.log('init');
  res.sendFile(__dirname + '/app/build/index.html');
});

app.use(express.static('app/build'));

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
