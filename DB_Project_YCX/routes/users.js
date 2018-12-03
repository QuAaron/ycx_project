var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'fq-wifi-10-215-195-234.wireless.pitt.edu',//'fq-wifi-10-215-203-29.wireless.pitt.edu',
  user: 'dbuser',
  port: '3306',
  password: 'database1234!',
  database: 'DB_final',
  Socket: '/tmp/mysql.sock'
});

connection.connect(function (err) {
  if (err) throw err
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  var userId = req.query.userId;
  var password = req.query.password;
  var sql = 'SELECT * From `customer` where id =' + userId;
  var response = { success: false, msg: null, data: null };

  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        if (rows[0].password == password) {
          response.success = true;
          response.msg = 'success';
          response.data = rows[0];
        } else if (rows[0].password !== password) {
          response.msg = 'invalid password';
        }
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
});

router.get('/items', function (req, res, next) {
  var keyword = req.query.keyword;
  var sql = "SELECT * FROM `DB_Final`.product where name like '%" + keyword + "%'";
  var response = { success: false, msg: null, data: null };

  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success';
        response.data = rows;
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/iteminventory', function (req, res, next) {
  var id = req.query.product_id;
  var quantity = req.query.quantity;
  var storeName = req.query.storeName;
  var sql = "select quantity from product_store where store = '" + storeName + "' and product_id = '" + id + "'";
  console.log(sql)
  var response = { success: false, msg: null, data: null };

  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        serviceQuantity = rows[0].quantity;
        console.log(quantity)
        console.log(serviceQuantity)
        if (serviceQuantity < quantity) {
          response.success = false;
          response.msg = 'not enough inventory'
        } else {
          response.success = true;
          response.msg = 'can purchase'
        }
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/orderid', function (req, res, next) {
  var response = { success: false, msg: null, data: null };
  var sql = "SELECT order_id FROM customer_order1 ORDER BY order_id * 1, order_id DESC LIMIT 1";

  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success get lateset order id';
        response.data = rows;
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/storelist', function (req, res, next) {
  var response = { success: false, msg: null, data: null };
  var sql = "select name from store";

  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success';
        response.data = rows;
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/order1', function (req, res, next) {
  var id = req.query.id;
  var orderid = req.query.orderid;
  var region = req.query.region;
  var response = { success: false, msg: null, data: null };
  var sql = "insert into customer_order1 values ('"+id+"', '"+orderid+"', '"+region+"')"
  console.log(sql)
  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success update order1';
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/order2', function (req, res, next) {
  var address = req.query.address;
  var orderid = req.query.orderid;
  var orderCardNumber = req.query.orderCardNumber;
  var orderPhoneNumber = req.query.orderPhoneNumber;
  var orderName = req.query.orderName;

  var response = { success: false, msg: null, data: null };
  var sql = "insert into customer_order2 values ('"+address+"', '"+orderid+"', '"+orderCardNumber+"', '"+orderPhoneNumber+"', '"+orderName+"')"
  console.log(sql)
  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success update order2';
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/order3', function (req, res, next) {
  var id = req.query.product_id;
  var quantity = req.query.quantity;
  var orderid = req.query.orderid;
  var response = { success: false, msg: null, data: null };
  var sql = "insert into customer_order3 values ('"+id+"', '"+orderid+"', '"+quantity+"')"
  console.log(sql)
  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success update order3';
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/updateinventory', function (req, res, next) {
  var id = req.query.product_id;
  var quantity = req.query.quantity;
  var storeName = req.query.storeName;
  var response = { success: false, msg: null, data: null };
  var sql = "update product_store set quantity = quantity - " + quantity + " where store ='" + storeName + "' and product_id = '" + id + "';";
  console.log(sql)
  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success';
        response.data = rows;
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})

router.get('/register', function (req, res, next) {
  var id = req.query.id;
  var name = req.query.name;
  var type = req.query.type;
  var email = req.query.email;
  var password = req.query.password;
  var response = { success: false, msg: null, data: null };
  var sql = "insert into customer values('"+id+"', '"+name+"', '"+type+"', '"+email+"', '"+password+"')";
  console.log(sql)
  new Promise(function (resolve, reject) {
    connection.query(sql, function (err, rows, fields) {
      try {
        response.success = true;
        response.msg = 'success registered';
        resolve(response);
        res.send(response);
      }
      catch (error) {
        response.msg = 'DB response error'
        res.send(response);
      }
    });
  });
})
module.exports = router;