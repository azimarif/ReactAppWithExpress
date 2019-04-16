const http = require('http');

const mysql  = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
  host:'us-cdbr-iron-east-02.cleardb.net',
  user:'b802ac9efcda40',
  password:'c1973dcf',
  database='heroku_8c2951a2b3c6ac6'
});


app.use(express.json());

app.post('/hello', (req, res) => {
  console.log('here we go');
  const value = req.body.name;
  console.log(value);
  connection.connect((err)=> {
    
    connection.query(`insert into tblMovie1(name) values(?)`, value, (err, result, fields )=> {
      if(err) {
        connection.query("Create table tblMovie1 (id int, name varchar(50))");
      }
      connection.query('select * from tblMovie1', (e,r,f)=>{
        let data= {}
        if(e) {
          res.send(data);
        }
        res.send(r);

      })
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
