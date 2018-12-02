var tableData = null;
var baseUrl = window.location.origin;
var storelist = null;
_validateUser();

function _validateUser() {
    validated = sessionStorage.getItem('userType') === 'user' ? true : false;
    if(!validated) {
        window.location.href = baseUrl
    }
}

$(document).ready(function() {
    var table = $('#items-list').DataTable({
        "autoWidth": false,
        "columnDefs": [
            { 
            "targets": 0,
            "width": "35%",
            "data": "name" },
            { 
            "targets": 1,
            "width": "10%",
            "data": "price" },
            { 
            "targets": 2,
            "width": "10%",
            "data": "brand" },
            { 
            "targets": 3,
            "width": "10%",
            "data": "type" },
            { 
                "targets": 4,
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
                }},
            {
            "targets": 5,
            "data": null,
            "width": "20%",
            "render": function ( data, type, full, meta ) {
                return "<div class='item-quality-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>"
                +"<input class='mdl-textfield__input' id='" +data.product_id+ "' type='text' pattern='-?[0-9]*(\.[0-9]+)?'>"
            }
        },
        {
            "targets": 6,
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
        tryPurchase(data.product_id);
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
    var keyword = $('#search-input').val();
    console.log(keyword)
    if(!keyword) {
        $('#items-table').hide();
        $('#init-msg').show();
    } else {
        $('#items-table').show();
        $('#init-msg').hide();
    }

    var keyword = $('#search-input').val();
    getStoreList();
    searchItems(keyword);
});

function getStoreList() {
    $.ajax({
        url: 'http://127.0.0.1:8081/users/storelist',
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

function searchItems(keyword) {
    $.ajax({
        url: 'http://127.0.0.1:8081/users/items',
        type: "GET",
        data: {
            keyword: keyword
        },
        success: function (response) {
            console.log(response)
            if (response.success) {
                tableData = response.data;
                console.log(tableData)
                var datatable = $('#items-list').dataTable().api()
                datatable.clear();
                datatable.rows.add(tableData);
                datatable.draw();
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function checkInventory(id,storeName,quantity) {
    $.ajax({
        url: 'http://127.0.0.1:8081/users/iteminventory',
        type: "GET",
        data: {
            product_id: id,
            storeName: storeName,
            quantity: quantity
        },
        success: function (response) {
            console.log(response)
            if (response.success) {
                purchase(id, storeName, quantity);
            } else {
                alert('not enough inventory')
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function purchase(id, storeName, quantity) {
    $.ajax({
        url: 'http://127.0.0.1:8081/users/updateinventory',
        type: "GET",
        data: {
            product_id: id,
            storeName: storeName,
            quantity: quantity
        },
        success: function (response) {
            console.log(response)
            if (response.success) {
                alert('good choice')
            } else {
                alert('not enough inventory')
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function logout() {
    window.location.href = baseUrl
}

function tryPurchase(id) {
    console.log(id)
    var quantity = $('#'+id).val()
    console.log(quantity)
    var storeName = $('#'+ id +'-select').find(":selected").text();
    console.log(storeName)

    if(isNaN(quantity) || !quantity) {
        alert("invalid amount")
    } else {
        checkInventory(id,storeName,quantity);
    }
    console.log('purchase')
}