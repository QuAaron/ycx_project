var baseUrl = window.location.origin;
var editor
_validateUser();

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