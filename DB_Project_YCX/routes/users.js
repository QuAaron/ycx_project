var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
    var sql = 'SELECT * From `customer` where id =' + userId;
    var response = {success: false, msg: null, data: null};
  
    new Promise(function(resolve, reject) {
      connection.query(sql, function (err, rows, fields) {
        try {
          if(rows[0].password == passWord) {
            response.success = true;
            response.msg = 'success';
            response.data = {type: rows[0].Type};
          } else if (rows[0].password !== passWord) {
            response.msg = 'invalid password';
          }
          resolve(response);
          res.send(response);
        }
        catch(error){
          response.msg = 'DB response error'
          res.send(response);
        }
      });
    });
});

module.exports = router;