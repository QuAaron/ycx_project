var tableData = [
]
var baseUrl = window.location.origin; 
var showTable = false;

$(document).ready(function() {
    var table = $('#items-list').DataTable({
        "autoWidth": false,
        "columnDefs": [{
            "targets": 4,
            "data": null,
            "width": "20%",
            "render": function ( data, type, full, meta ) {
                return "<div class='item-quality-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>"
                +"<input class='mdl-textfield__input' id='" +data[0]+ "' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='sample4'>"
                +"<label class='mdl-textfield__label' for='sample4'>Number...</label>"
                +"<span class='mdl-textfield__error'>Input is not a number!</span></div>"
            }
        },
        {
            "targets": 5,
            "data": null,
            "render": function ( data, type, full, meta ) {
                return "<button class='mdl-button mdl-js-button mdl-button--icon'>"
                + "<i class='material-icons'>shopping_cart</i></button>";
            }
        }]
    });

    $('#items-list tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        console.log(data)
        purchase(data[0]);
    } );

    $('#items-table').hide();
} );

$('#search-input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

$('#search-input').on("enterKey",function(e){
    if(showTable) {
        $('#items-table').hide();
        $('#init-msg').show();
    } else {
        $('#items-table').show();
        $('#init-msg').hide();
    }
    showTable = !showTable;
});

function logout() {
    window.location.href = baseUrl
}

function purchase(id) {
    console.log(id)
    var quality = $('#'+id).val()
    if(isNaN(quality) || !quality) {
        alert("invalid amount")
    } else {
        alert("you bought "+quality+ ' '+id)
    }
    console.log('purchase')
}