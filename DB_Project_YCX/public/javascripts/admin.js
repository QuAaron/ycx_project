var baseUrl = window.location.origin;
var editor
_validateUser();
_hideErrorMsg();

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
    var newUserName = newUserFirstName + ' '+ newUserLastName;
    var newUserEmail = $('#sign-up-email').val();
    var newUserType = $('input[name=options]:checked').val();
    if(newUserType == 1) {
        newUserType = 'home'
    } else if(newUserType == 2) {
        newUserType = 'business'
    } else if(newUserType == 3) {
        newUserType = 'admin'
    }
    console.log(newUserId,newPassword,newUserName,newUserEmail, newUserType)
    if(!newUserId || !newPassword || !newUserFirstName || !newUserLastName || !newUserEmail || !validateEmail(newUserEmail)){
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
                }else {
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