var baseUrl = window.location.origin;
_hideErrorMsg();
_clearSession();

function _clearSession() {
    sessionStorage.setItem('customerId', null);
    sessionStorage.setItem('userType', null);
}

function _hideErrorMsg() {
    $('#log-in-error-msg').hide();
};

function _showErrorMsg() {
    $('#log-in-error-msg').show();
};

function login() {
    var userId = $('#log-in-user-name').val();
    var userPassword = $('#log-in-password').val();
    console.log(userId);
    console.log(userPassword);
    console.log(baseUrl)
    $.ajax({
        url: '/users/login',
        type: "GET",
        data: {
            userId: userId,
            password: userPassword
        },
        success: function (response) {
            console.log(response)
            if (response.success) {
                sessionStorage.setItem('customerId', userId);
                if (response.data.type === 'admin') {
                    sessionStorage.setItem('userType','admin');
                    window.location.href = baseUrl + '/admin'
                } else if (response.data.type === 'home' || response.data.type === 'business') {
                    sessionStorage.setItem('userType','user');
                    window.location.href = baseUrl + '/main'
                }
            }else {
                _showErrorMsg();
            }
        },
        error: function () {
            _showErrorMsg();
            console.log('http request error')
        }
    })
}

function signup() {
    window.location.href = baseUrl + '/signup'
}

function backToLogIn() {
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
    var newUserName = newUserFirstName + newUserLastName;
    var newUserEmail = $('#sign-up-email').val();
    var newUserType = $('input[name=options]:checked').val();
    console.log(newUserId,newPassword,newUserName,newUserEmail)
    console.log(newUserType)
    if(!newUserId || !newPassword || !newUserFirstName || !newUserLastName || !newUserEmail || !validateEmail(newUserEmail)){
        _showErrorMsg();
    } else {
        $.ajax({
            url: '/users/register',
            type: "GET",
            data: {
                id: newUserId,
                name: newUserName + newUserLastName,
                type: newUserType === 1? 'home' : 'business',
                email: newUserEmail,
                password: newPassword
            },
            success: function (response) {
                console.log(response)
                if (response.success) {
                    alert('successfully registered')
                    window.location.href = baseUrl
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