var tableData = [
    {
        material: 'test1',
        Quantity: 10,
        price: 11
    },
    {
        material: 'test2',
        Quantity: 20,
        price: 21
    },
    {
        material: 'test3',
        Quantity: 30,
        price: 31
    }
]
var baseUrl = window.location.origin; 

$(document).ready(function() {
    $('#items-list').DataTable( {
        "ajax": '../ajax/data/arrays.txt'
    } );
} );

$('#search-input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

$('#search-input').on("enterKey",function(e){
    console.log('search')
    // $("tbody").append("<tr><td class='mdl-data-table__cell--non-numeric'>Laminate (Gold on Blue)</td><td>10</td><td>$2.35</td><tr>");
});

function logout() {
    window.location.href = baseUrl
}