var baseUrl = window.location.origin;
_hideErrorMsg();
_clearSession();

function _clearSession() {
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
        url: 'http://127.0.0.1:8081/users/login',
        type: "GET",
        data: {
            userId: userId,
            password: userPassword
        },
        success: function (response) {
            console.log(response.msg)
            if (response.success) {
                if (response.data.type === 'user') {
                    sessionStorage.setItem('userType','user');
                    window.location.href = baseUrl + '/main'
                } else if (response.data.type === 'admin') {
                    sessionStorage.setItem('userType','admin');
                    window.location.href = baseUrl + '/admin'
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

function register() {
    window.location.href = baseUrl
}