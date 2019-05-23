//For Prodrucers
function loadPendingOrders() {
    $.ajax({
        url: "/orders/producer/" + userId,
        type: 'GET',
        data: { get_param: 'value' },
        dataType: 'json',
        
        success: function (data) {
            $.each(data, function(index, element) {

            })
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//For Clients
function loadOrdersStatus() {
    $.ajax({
        url: "/orders/client/" + userId,
        type: 'GET',
        data: { get_param: 'value' },
        dataType: 'json',

        success: function (data) {
            $.each(data, function(index, element) {

            })
        },
        error: function (error) {
            console.log(error);
        }
    })
}

