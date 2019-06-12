var submitButton;
loadProducerPage();

$(function() {
    $('.submitbutton').click(function () {
        submitButton = $(this).attr('name');
        if (submitButton === "loadPrinter") {
            $('#printer-form').show();
        }
        else if (submitButton === "loadMaterial") {
            $('#material-form').show();
        }

    });

});


$('#printer-form').on('submit', function () {

        let url = "/users/producer/" + userId + "/addPrinter";

        $.post(url, {
            model: $("#printer-model").val()
        })
            .done(function () {
                console.log("Printer added");
                $('#printer-form').hide();
                $('#LoadSuccess').show( "slow" ).delay(2000).hide( "slow" );

            })
            .fail(function () {
                console.log("Fail to add printer");
                $('#printer-form').hide();
                $('#LoadFailed').show( "slow" ).delay(2000).hide( "slow" );
            })

            .always(function () {

            });
});

$('#material-form').on('submit', function () {

    let url = "/users/producer/" + userId + "/addMaterial";

    $.post(url, {
        name: $("#material-model").val()
    })
        .done(function () {
            console.log("Material added");
            $('#material-form').hide();
            $('#LoadSuccess').show( "slow" ).delay(2000).hide( "slow" );

        })
        .fail(function () {
            console.log("Fail to add printer");
            $('#material-form').hide();
            $('#LoadFailed').show( "slow" ).delay(2000).hide( "slow" );
        })

        .always(function () {

        });
});

function acceptRequest(orderId) {
    $.ajax({
        type: 'POST',
        url: '/orders/request/accept/' + orderId,
        success: function () {
            console.log('request aceptada');
            location.reload();
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function rejectRequest(orderId) {
    $.ajax({
        type: 'POST',
        url: '/orders/request/reject/' + orderId,
        success: function () {
            console.log('request rechazada');
            location.reload();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//Shows Order details in producers Orders
function loadOrderDetails(orderId, printerName, materialName, clientId){
    $.ajax({
        type: 'GET',
        url:'/users/'+ clientId,
        success: function (data) {
            $('#clientDetails').append($("<br><strong>Username: </strong>" +data.name+ "</br><strong> Mail: </strong>" + "\n" +data.email+"</br><strong>CP: </strong>" + "\n" +data.postalCode+ "</br>"));
            $('#printerAndMaterialDetails').append($("<br><strong> Impresora: </strong>" +printerName+ "</br><strong>Material: </strong>" + "\n" +materialName+"</br>"));

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function updateStatus(orderId, status) {

    $.post("/orders/status/"+ orderId,{
        status: status
    })
        .done(function () {
            window.alert('Estado actualizado');
            location.href="pedidos-productor.html";
        })
        .fail(function (error) {
            console.log(error);
        });

}

function rateClient(orderId, clientId){
    $.post("users/producer/" + clientId + "/order/" + orderId, {
        rate: parseInt(document.querySelector('.stars').getAttribute('data-rating'))
    })
        .done(function () {
            location.reload()

        })
        .fail(function () {
            console.log("la cagaste gioba")

        })
}

function confirmClientRating(orderId, clientId) {
    var button= $('<button  type="button" class="btn btn-success" onclick="rateClient('+orderId+ ','+clientId+')">Confirmar</button>');
    $('#rateClientModalFooter').append(button)
}

//Loads producer orders and requests
function loadProducerPage() {
    var rowOrdersCount = 1;
    var rowPendingReqCount = 1;
    var rowFinishedOrdersCount = 1;
    $.ajax({
        type: 'GET',
        url:'/orders/producer/'+ userId,
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                //element.client returns client id
                console.log(data);
                getUserName(element.client);
                console.log(element.printer);
                console.log(element.material);
                var status;
                var row = $("<tr>");
                if (element.inProgress === true && element.status !== "Finalizado"){
                    row.append($(
                        "            <th scope=\"row\">" + rowFinishedOrdersCount + "</th>\n" +
                        "            <td>"+currentUserName+"</td>\n" +
                        "            <td>"+element.status+"</td>\n" +
                        "            <td>"+element.id+"</td>\n" +
                        "            <td style='text-align: right' class='dropdown'>\n"+
                        "               <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownStatusButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n"+
                        "                   Status</button>" +
                        "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Order-details-modal\"" +
                        "               onclick='loadOrderDetails("+element.id+","+ "\""+ element.printer+"\""+","+"\""+element.material+"\""+","+element.client+")'>Detalles</button>" +
                        "               <ul id=\"contextMenu\" class=\"dropdown-menu\" role=\"menu\">\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 1)' class=\"dropdown-item\">En proceso</a></li>\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 2)' class=\"dropdown-item\">En produccion</a></li>\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 3)' class=\"dropdown-item\">En trafico</a></li>\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 4)' class=\"dropdown-item\">Entregado</a></li>\n"+
                        "               </ul>"+
                        "            </td>"
                    ));
                    $('#tbodyProdOrders').append(row);
                    rowFinishedOrdersCount=rowFinishedOrdersCount+1;
                }
                else if (element.status === "Finalizado") {
                    row.append($(
                        "            <th scope=\"row\">" + rowOrdersCount + "</th>\n" +
                        "            <td>"+currentUserName+"</td>\n" +
                        "            <td>"+element.status+"</td>\n" +
                        "            <td>"+element.id+"</td>\n" +
                        "            <td style='text-align: right'>"+
                        "               <button type=\"button\" class=\"btn btn-success\" data-toggle='modal' data-target='#rateClientModal' onclick='confirmClientRating("+element.id+","+element.client+")'>Rate Client</button>\n" +
                        "            </td>"
                    ));
                    $('#tbodyPedFin').append(row);
                    rowOrdersCount=rowOrdersCount+1;
                }

                else{
                    row.append($(
                        "            <th scope=\"row\">" + rowPendingReqCount + "</th>\n" +
                        "            <td>"+currentUserName+"</td>\n" +
                        "            <td>"+element.status+"</td>\n" +
                        "            <td>"+element.id+"</td>\n" +
                        "            <td style='text-align: right'>" +
                        "            <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Order-details-modal\"" +
                        "            onclick='loadOrderDetails("+element.id+","+ "\""+ element.printer+"\""+","+"\""+element.material+"\""+","+element.client+")'>Detalles</button>\n" +
                        "               <button id='button' type=\"button\" class=\"btn btn-success\" onclick='acceptRequest("+element.id+")'>✓</button>" +
                        "               <button type=\"button\" class=\"btn btn-danger\" onclick='rejectRequest("+element.id+")'>✕</button>" +
                        "            </td>\n"

                    ));

                    $('#tbodyReqProdOrders').append(row);
                    rowPendingReqCount=rowPendingReqCount+1;
                }

            });

        },
        error: function (error) {
            console.log(error);
        }
    });

}


function clearModal() {
    $("#clientDetails br").remove();
    $("#clientDetails").html('');
    $("#clientDetails").append("<strong>Datos cliente</strong>");
    $("#printerAndMaterialDetails").html('');
    $("#printerAndMaterialDetails").append("<strong>Impresora y material</strong>")
}

