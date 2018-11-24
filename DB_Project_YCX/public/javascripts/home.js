var tableData = [
    [
        'test1',
        10,
        11
    ],
    [
        'test2',
        20,
        21
    ],
    [
        'test3',
        30,
        31
    ],
    [
        'test3',
        30,
        31
    ],
    [
        'test3',
        30,
        31
    ],
    [
        'test3',
        30,
        31
    ]
]
var baseUrl = window.location.origin; 
var showTable = false;

$(document).ready(function() {
    $('#items-list').DataTable({
    });
} );

$('#search-input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

$('#search-input').on("enterKey",function(e){
    console.log('search')
    if(showTable) {
        $('#items-table').hide();
    } else {
        $('#items-table').show();
    }
    showTable = !showTable;
});

function logout() {
    window.location.href = baseUrl
}