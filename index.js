const http = require('http');

const mysql  = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PWD,
  database:process.env.DEFAULT_DB
});


app.use(express.json());

app.post('/hello', (req, res) => {
  const value = req.body.name;
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
