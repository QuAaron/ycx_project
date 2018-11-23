var baseUrl = window.location.origin;

function login() {
    var userId = $('#log-in-user-name').val();
    var userPassword = $('#log-in-password').val();
    console.log(userId);
    console.log(userPassword);
    console.log(baseUrl)
    if(userId === 'user') {
        window.location.href = baseUrl+'/main'
    } else if(userId === 'admin') {
        window.location.href = baseUrl+'/admin'
    }
}

function signup() {
    window.location.href = baseUrl+'/signup'
}

function register() {
    window.location.href = baseUrl
}