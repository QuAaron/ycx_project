var baseUrl = window.location.origin;
var editor
_validateUser();
_hideErrorMsg();
initialMsg();
function _validateUser() {
    validated = sessionStorage.getItem('userType') === 'admin' ? true : false;
    if (!validated) {
        window.location.href = baseUrl
    }
}

$(document).ready(function () {
    var table = $('#items-list-admin').DataTable({
        'autoWidth': false,
    })

    $(document).ready(function () {
        editor = new $.fn.dataTable.Editor({
            table: '#items-list-admin',
            fields: [{
                label: "First name:",
                name: "first_name"
            }, {
                label: "Last name:",
                name: "last_name"
            }, {
                label: "Position:",
                name: "position"
            }, {
                label: "Office:",
                name: "office"
            }, {
                label: "Extension:",
                name: "extn"
            }, {
                label: "Start date:",
                name: "start_date",
                type: "datetime"
            }, {
                label: "Salary:",
                name: "salary"
            }
            ]
        });

        $('#items-list-admin').on('click', 'tbody td:not(:first-child)', function (e) {
            console.log('ddd')
            editor.inline(this);
        });
    })
})

function logout() {
    console.log(window.location.origin)
    window.location.href = baseUrl
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function register() {
    var newUserId = $('#sign-up-user-id').val();
    var newPassword = $('#sign-up-password').val();
    var newUserFirstName = $('#sign-up-firstname').val();
    var newUserLastName = $('#sign-up-lastname').val();
    var newUserName = newUserFirstName + ' ' + newUserLastName;
    var newUserEmail = $('#sign-up-email').val();
    var newUserType = $('input[name=options]:checked').val();
    if (newUserType == 1) {
        newUserType = 'home'
    } else if (newUserType == 2) {
        newUserType = 'business'
    } else if (newUserType == 3) {
        newUserType = 'admin'
    }
    console.log(newUserId, newPassword, newUserName, newUserEmail, newUserType)
    if (!newUserId || !newPassword || !newUserFirstName || !newUserLastName || !newUserEmail || !validateEmail(newUserEmail)) {
        _showErrorMsg();
    } else {
        $.ajax({
            url: 'http://127.0.0.1:8081/users/register',
            type: "GET",
            data: {
                id: newUserId,
                name: newUserName,
                type: newUserType,
                email: newUserEmail,
                password: newPassword
            },
            success: function (response) {
                console.log(response)
                if (response.success) {
                    alert('successfully registered')
                } else {
                }
            },
            error: function () {
                console.log('http request error')
            }
        })
        _hideErrorMsg()
    }
    //window.location.href = baseUrl
}

function _hideErrorMsg() {
    $('#log-in-error-msg').hide();
};

function _showErrorMsg() {
    $('#log-in-error-msg').show();
};

function showAnalytics(index) {
    switch (index) {
        case 1:
            showAnalytics1();
            break;
        case 2:
            showAnalytics2();
            break;
        case 3:
            showAnalytics3();
            break;
        case 4:
            showAnalytics4();
            break;
        case 5:
            showAnalytics5();
            break;
        case 6:
            showAnalytics6();
            break;
        case 7:
            showAnalytics7();
            break;
        case 8:
            showAnalytics8();
            break;
    }
}

function initialMsg() {
    $('#analytics-header').text('Select the Analytics you like!!');
    $('#analytics-chart').empty();
}
function showAnalytics1() {
    initialMsg();
    $('#analytics-header').text('Obtaining customer who made most orders');
    $.ajax({
        url: 'http://127.0.0.1:8081/users/analytics1',
        type: "GET",
        success: function (response) {
            console.log(response)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td> Name</td><td>Amount</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>'+element.name+'</td><td>'+element.count+'</td></tr>';
                    console.log(row)
                    table.append(row);
                });
            } else {
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function showAnalytics2() {
    initialMsg();
    $('#analytics-header').text('Count number of customer in each region');
    $.ajax({
        url: 'http://127.0.0.1:8081/users/analytics2',
        type: "GET",
        success: function (response) {
            console.log(response.data)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Customer Count</td><td>Region</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>'+element.count+'</td><td>'+element.region+'</td></tr>';
                    console.log(row)
                    table.append(row);
                });
            } else {
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function showAnalytics3() {
    initialMsg();
    $('#analytics-header').text('Count number of brand');
    $.ajax({
        url: 'http://127.0.0.1:8081/users/analytics3',
        type: "GET",
        success: function (response) {
            console.log(response.data)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Order Count</td><td>Brand</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>'+element.count+'</td><td>'+element.brand+'</td></tr>';
                    console.log(row)
                    table.append(row);
                });
            } else {
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function showAnalytics4() {
    initialMsg();
    $('#analytics-header').text('Obtaining number of salesmen in each product type in North region');
    $.ajax({
        url: 'http://127.0.0.1:8081/users/analytics4',
        type: "GET",
        success: function (response) {
            console.log(response.data)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Salesmen Count</td><td>Product Type</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>'+element.number_of_salesmen+'</td><td>'+element.product_type+'</td></tr>';
                    console.log(row)
                    table.append(row);
                });
            } else {
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function showAnalytics5() {
    initialMsg();
    $('#analytics-header').text('Find the most popular brand sold in our website');
    $.ajax({
        url: 'http://127.0.0.1:8081/users/analytics5',
        type: "GET",
        success: function (response) {
            console.log(response)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Name</td><td>Store</td><td>Region</td></tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>'+element.name+'</td><td>'+element.store+'</td><td>'+element.region+'</td></tr>';
                    console.log(row)
                    table.append(row);
                });
            } else {
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function showAnalytics6() {
    initialMsg();
}

function showAnalytics7() {
    initialMsg();
}

function showAnalytics8() {
    initialMsg();
}