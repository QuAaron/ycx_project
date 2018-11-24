var baseUrl = window.location.origin;
// var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'ycx_schema'
// });
// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()

function login() {
    var userId = $('#log-in-user-name').val();
    var userPassword = $('#log-in-password').val();
    console.log(userId);
    console.log(userPassword);
    console.log(baseUrl)
    $.ajax({
        url: 'http://127.0.0.1:8081/users/login',
        type: "GET",
        data: {
            userId: userId,
            password: userPassword
        },
        success: function (response) {
            console.log(response)
            if (response.code === 'success') {
                if (response.type === 'user') {
                    window.location.href = baseUrl + '/main'
                } else if (response.type === 'admin') {
                    window.location.href = baseUrl + '/admin'
                }
            }
        },
        error: function () {
            console.log('http request error')
        }

    })
}

function signup() {
    window.location.href = baseUrl + '/signup'
}

function register() {
    window.location.href = baseUrl
}