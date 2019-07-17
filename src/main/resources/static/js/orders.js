var producerId;

//Me falta mandarle el nombre de material a la orden
function orderForm(userId, prodCurrentId) {
    producerId = prodCurrentId;
    $.ajax({
        type: 'GET',
        url:'/materials/byOwnerId/'+ producerId,
        success: function (data) {
            $.each(data, function(index, element) {
                //<option value="...">Nombre del material</option>
                var option = $('<option value='+element.name+'>'+element.name+'</option>');

                $("#material-name").append(option);
            });

            $("#orderModal-footer").find('#buttonRequest').remove();
            var requestButton = $('<button onclick= "startOrder(userId, producerId)" id="buttonRequest" type="button" class="btn btn-primary">Send request</button>');
            $('#orderModal-footer').append(requestButton);
        }
    })
}

function startOrder(userId, id) {
    console.log($('#material-name').val());
    $.post("/users/addOrder/client/" + userId + "/producer/" + id, {
        materialName: $('#material-name').val()
    })
        .done(function () {
            window.alert('Solicitud enviada correctamente');
            location.reload();
        })
        .fail(function (error) {
            console.log(error);
        });

}

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

function clearMatForm() {
    $('#material-name').find('option').remove();
    $('#orderModal-footer').remove('#buttonRequest');
}


