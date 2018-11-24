var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port :'8889',
  password: 'root',
  database: 'ycx_schema',
  Socket:'/Applications/MAMP/tmp/mysql/mysql.sock'
});
connection.connect(function(err) {
  if (err) throw err
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  console.log(req.query);
  var userId = req.query.userId;
  var passWord = parseInt(req.query.password);
  var sql = 'SELECT * From `user` where userid =' + userId;
  var response = {code: 'user not found', type: null};

  new Promise(function(resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        if(rows[0].password == passWord) {
          response.code = 'success';
          response.type = rows[0].type;
        } else if (rows[0].password !== passWord) {
          response.code = 'invalid password'
        }
        resolve(response);
        res.send(response);
      }
      catch(error){
        res.send(response);
        console.log(error)
      }
    });
  });
});

module.exports = router;