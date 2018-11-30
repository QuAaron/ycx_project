var baseUrl = window.location.origin; 
_validateUser();

function _validateUser() {
    validated = sessionStorage.getItem('userType') === 'admin' ? true : false;
    if(!validated) {
        window.location.href = baseUrl
    }
}

function logout() {
    console.log(window.location.origin)
    window.location.href = baseUrl
}