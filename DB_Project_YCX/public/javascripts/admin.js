var baseUrl = window.location.origin;
var storelist = null;
var editor
_validateUser();
_hideErrorMsg();
initialMsg();
getStoreList();

function _validateUser() {
    validated = sessionStorage.getItem('userType') === 'admin' ? true : false;
    if (!validated) {
        window.location.href = baseUrl
    }
}
function getStoreList() {
    $.ajax({
        url: '/users/storelist',
        type: "GET",
        success: function (response) {
            console.log(response)
            if (response.success) {
                storelist = response.data;
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
};

$(document).ready(function () {
    editor = new $.fn.dataTable.Editor({
        "table": '#items-list-admin',
        "idSrc": "product_id",
        "fields": [ {
            "label": "product_id:",
            "name": "product_id"
        }, {
            "label": "name:",
            "name": "name"
        }, {
            "label": "price:",
            "name": "price"
        }, {
            "label": "brand:",
            "name": "brand"
        },{
            "label": "type",
            "name": "type"
        }
    ]
    });

    var table = $('#items-list-admin').DataTable({
        "ajax": '/users/getallitems',
        "columnDefs": [
            {
                "targets": 0,
                "width": "10%",
                "data": "product_id"
            },
            {
                "targets": 1,
                "width": "20%",
                "data": "name"
            },
            {
                "targets": 2,
                "width": "20%",
                "data": "price"
            },
            {
                "targets": 3,
                "width": "20%",
                "data": "brand"
            },
            {
                "targets": 4,
                "width": "20%",
                "data": "type"
            },
            { 
                "targets": 5,
                "data": null,
                "width": "15%",
                "render": function ( data, type, full, meta ) {
                    var selectElement = '<select id="'+ data.product_id + '-select" name="dynamic_select">\n\
                    <option id="0" value="">Select Store</option/>\n\
                    ';
                    storelist.forEach(element => {
                        selectElement = selectElement + '<option id="" value="">'+element.name+'</option/>'
                    });
                    return selectElement
                }
            },
            {
                "targets": 6,
                "data": null,
                "width": "5%",
                "render": function ( data, type, full, meta ) {
                    return "<div class='item-quality-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>"
                    +"<input class='mdl-textfield__input' id='" +data.product_id+ "' type='text' pattern='-?[0-9]*(\.[0-9]+)?'>"
                }
            },
            {
                "targets": 7,
                "data": null,
                "render": function ( data, type, full, meta ) {
                    return "<button class='mdl-button mdl-js-button mdl-button--icon'>"
                    + "<i class='material-icons'>edit</i></button>";
                }
            }
        ]
    })
    $('#items-list-admin').on('click', 'tbody td:nth-child(3)', function (e) {
        console.log('ddd1')
        editor.inline(this, {
            submit: 'changed'
        });
    });
    $('#items-list-admin').on('click', 'tbody td:nth-child(8)', function () {
        console.log('ddds')
        var newData = table.row( $(this).parents('tr') ).data();
        var newQuantiy = $('#'+newData.product_id).val();
        console.log(newData)
        console.log(newQuantiy);
        updatePrice(newData.price, newData.product_id);
        if(isNaN(newQuantiy) || !newQuantiy ){
            alert('invalid quantity');
        } else {
            updateQuantity(newQuantiy, newData.product_id);  
        }
    } );
})

function updatePrice(newprice,product_id) {
    console.log('dd')
    $.ajax({
        url: '/users/updateprice',
        type: "GET",
        data: {
            newprice: parseInt(newprice),
            product_id: product_id
        },
        success: function (response) {
            console.log(response)
            if (response.success) {
                alert('successfully update price')
            } else {
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}
function updateQuantity(newQuantiy, product_id) {
    var storeName = $('#'+ product_id +'-select').find(":selected").text();
    $.ajax({
        url: '/users/updatequantity',
        type: "GET",
        data: {
            storeName: storeName,
            product_id: product_id,
            newQuantiy: parseInt(newQuantiy)
        },
        success: function (response) {
            console.log(response)
            if (response.success) {
                alert('successfully update quantity')
            } else {
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

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
            url: '/users/register',
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
        url: '/users/analytics1',
        type: "GET",
        success: function (response) {
            console.log(response)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td> Name</td><td>Amount</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>' + element.name + '</td><td>' + element.count + '</td></tr>';
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
        url: '/users/analytics2',
        type: "GET",
        success: function (response) {
            console.log(response.data)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Customer Count</td><td>Region</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>' + element.count + '</td><td>' + element.region + '</td></tr>';
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
        url: '/users/analytics3',
        type: "GET",
        success: function (response) {
            console.log(response.data)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Order Count</td><td>Brand</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>' + element.count + '</td><td>' + element.brand + '</td></tr>';
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
        url: '/users/analytics4',
        type: "GET",
        success: function (response) {
            console.log(response.data)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Salesmen Count</td><td>Product Type</td> </tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>' + element.number_of_salesmen + '</td><td>' + element.product_type + '</td></tr>';
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
    $('#analytics-header').text('Calculate the proportion of orders for all brands ');
    $.ajax({
        url: '/users/analytics5',
        type: "GET",
        success: function (response) {
            console.log(response)
            if (response.success) {
                console.log('successfully get Analytics1');
                $('#analytics-chart').append('<table class="table table-striped table-bordered" id="analytics1-table"> <thead> <tr><td>Proportion</td><td>Brand</td></tr> </thead> </table>')
                var table = $('#analytics1-table');
                response.data.forEach(element => {
                    var row = '<tr><td>' + element.proportion + '</td><td>' + element.brand + '</td></tr>';
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