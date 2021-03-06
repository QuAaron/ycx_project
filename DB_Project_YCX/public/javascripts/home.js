var tableData = null;
var baseUrl = window.location.origin;
var customerId = sessionStorage.getItem('customerId');
var storelist = null;
var product_id = null;
var orderStoreName = null;
var orderItemName = null;
var orderQuantity = null;
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
                return "<button class='mdl-button mdl-js-button mdl-button--icon' data-target='#purchaseModal'>"
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
        url: '/users/storelist',
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
        url: '/users/items',
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
        url: '/users/iteminventory',
        type: "GET",
        data: {
            product_id: id,
            storeName: storeName,
            quantity: quantity
        },
        success: function (response) {
            console.log(response)
            if (response.success) {
                $('#purchaseModal').modal('show');
                setOrderInfo(id, storeName, quantity)
            } else {
                alert('not enough inventory')
            }
        },
        error: function () {
            console.log('http request error')
        }
    })
}

function setOrderInfo(id, storeName, quantity) {
    product_id = id;
    orderStoreName = storeName;
    orderQuantity = quantity;
}

function resetOrderInfo() {
    product_id = null;
    orderStoreName = null;
    orderQuantity = null;
}

function purchase() {
    var orderCardNumber = $('#orderCardNumber').val();
    var orderPhoneNumber = $('#orderPhoneNumber').val();
    var orderAddress = $('#orderAddress').val();
    var orderName = $('#orderName').val();
    var orderID = null;
    var region = null;
    console.log(orderStoreName)
    switch(orderStoreName) {
        case 'CHI':
            region = 'North'
            break;
        case 'NYC':
            region = 'Northeast'
            break;
        case 'PITT':
            region = 'Northeast'
            break;
        case 'MIA':
            region = 'South'
            break;
        case 'LA':
            region = 'West'
            break;
    };
    purchaseData = {
        'customerId' : customerId,
        'product_id' : product_id,
        'orderID' : orderID,
        'orderName' : orderName,
        'orderAddress' : orderAddress,
        'orderPhoneNumber' : orderPhoneNumber,
        'orderCardNumber' : orderCardNumber,
        'storeName' : orderStoreName,
        'region' : region,
        'orderQuantity': orderQuantity
    }
    $.ajax({
        url: '/users/orderid',
        type: "GET",
        success: function (response) {
            if (response.success) {
                console.log(response.data[0])
                purchaseData.orderID = 'ABC' + (parseInt(response.data[0].order_id.match(/\d+$/)) + 1);
                console.log(purchaseData)
                $.ajax({
                    url: '/users/order1',
                    type: "GET",
                    data: {
                        id: purchaseData.customerId,
                        orderid: purchaseData.orderID,
                        region: purchaseData.region
                    },
                    success: function (response) {
                        if (response.success) {
                            $.ajax({
                                url: '/users/order2',
                                type: "GET",
                                data: {
                                    address: purchaseData.orderAddress,
                                    orderid: purchaseData.orderID,
                                    orderCardNumber: purchaseData.orderCardNumber,
                                    orderPhoneNumber: purchaseData.orderPhoneNumber,
                                    orderName: purchaseData.orderName
                                },
                                success: function (response) {
                                    if (response.success) {
                                        $.ajax({
                                            url: '/users/order3',
                                            type: "GET",
                                            data: {
                                                orderid: purchaseData.orderID,
                                                product_id: purchaseData.product_id,
                                                quantity: purchaseData.orderQuantity
                                            },
                                            success: function (response) {
                                                if (response.success) {
                                                    $.ajax({
                                                        url: '/users/updateinventory',
                                                        type: "GET",
                                                        data: {
                                                            storeName: purchaseData.storeName,
                                                            product_id: purchaseData.product_id,
                                                            quantity: purchaseData.orderQuantity
                                                        },
                                                        success: function (response) {
                                                            if (response.success) {
                                                                alert('success purchase')
                                                            } else {
                                                                alert('database error')
                                                            }
                                                        },
                                                        error: function () {
                                                            console.log('http request error')
                                                        }
                                                    })
                                                } else {
                                                    alert('database error')
                                                }
                                            },
                                            error: function () {
                                                console.log('http request error')
                                            }
                                        })
                                    } else {
                                        alert('database error')
                                    }
                                },
                                error: function () {
                                    console.log('http request error')
                                }
                            })
                        } else {
                            alert('database error')
                        }
                    },
                    error: function () {
                        console.log('http request error')
                    }
                })
            } else {
                alert('database error')
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

    if(isNaN(quantity) || !quantity || storeName == 'Select Store') {
        alert("invalid input")
    } else {
        checkInventory(id,storeName,quantity);
    }
    console.log('purchase')
}