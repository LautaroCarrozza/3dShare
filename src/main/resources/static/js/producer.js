var submitButton;
var lastRow = 0;
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


function acceptRequest(orderId, printer, material, client) {

    $.ajax({
        type: 'POST',
        url: '/orders/request/accept/' + orderId,
        success: function () {
            console.log('request aceptada');
            var idRow = document.getElementById(orderId);
            idRow.remove();

            var row = $("<tr id= "+orderId+">");
            lastRow = lastRow +1;

            row.append($(
                "            <th scope=\"row\">" + lastRow + "</th>\n" +
                "            <td>"+currentUserName+"</td>\n" +
                "            <td>En proceso</td>\n" +
                "            <td>"+orderId+"</td>\n" +
                "            <td style='text-align: right' class='dropdown'>\n"+
                "               <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownStatusButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n"+
                "                   Status</button>" +
                "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Order-details-modal\"" +
                "               onclick='loadOrderDetails("+orderId+","+ "\""+ printer+"\""+","+"\""+material+"\""+","+client+","+ "\""+ element.fileDirectory+"\""+")'>Detalles</button>" +
                "               <ul id=\"contextMenu\" class=\"dropdown-menu\" role=\"menu\">\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 1, lastRow,"+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">En proceso</a></li>\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 2, lastRow,"+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">En produccion</a></li>\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 3, lastRow,"+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">En trafico</a></li>\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 4, lastRow,"+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">Entregado</a></li>\n"+
                "               </ul>"+
                "            </td>"
            ));
            $('#tbodyProdOrders').append(row);

        },
        error: function (error) {
        }
    });

}

function rejectRequest(orderId) {
    $.ajax({
        type: 'POST',
        url: '/orders/request/reject/' + orderId,
        success: function () {
            console.log('request rechazada');
            var idRow = document.getElementById(orderId);
            idRow.remove();
        },
        error: function (error) {

        }
    });

}

//Shows Order details in producers Orders
function loadOrderDetails(orderId, printerName, materialName, clientId,fileDirectory2){
    $.ajax({
        type: 'GET',
        url:'/users/'+ clientId,
        success: function (data) {
            $('#clientDetails').append($("<br><strong>Username: </strong>" +data.name+ "</br><strong> Mail: </strong>" + "\n" +data.email+"</br><strong>CP: </strong>" + "\n" +data.postalCode+ "</br><strong>Calificiacion cliente: </strong>"+ data.customerRating.toFixed(2)+ "</br> <strong>Total calificaciones: </strong>"+data.totalCustomerRating+"</br><strong>Ciudad: </strong>"+"\n"+data.city+"</br>"));
            $('#printerAndMaterialDetails').append($("<br><strong> Impresora: </strong>" +printerName+ "</br><strong>Material: </strong>" + "\n" +materialName+"</br>"));
            $('#file-Details').append($("<p><a href='localhost:8080/downloadFile/"+fileDirectory2+"' target='_blank'>localhost:8080/downloadFile/"+fileDirectory2+"</a></p>" ))



        },
        error: function (error) {
        }
    });
}

function updateStatus(orderId, status, row, printer, material, client) {
    getUserName(client);

    $.post("/orders/status/"+ orderId,{
        status: status
    })
        .done(function () {
            var newStatus;
            switch (status) {
                case 1:
                    newStatus = "En proceso";
                    break;
                case 2:
                    newStatus = "En produccion";
                    break;
                case 3:
                    newStatus = "En trafico";
                    break;
                case 4:
                    newStatus = "Entregado";
                    break;
                default:
                    newStatus = status;
                    break;
            }

            var rowId = document.getElementById(orderId);
            rowId.innerHTML =
                "            <th scope=\"row\">" + row + "</th>\n" +
                "            <td>"+currentUserName+"</td>\n" +
                "            <td>"+newStatus+"</td>\n" +
                "            <td>"+orderId+"</td>\n" +
                "            <td style='text-align: right' class='dropdown'>\n"+
                "               <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownStatusButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n"+
                "                   Status</button>" +
                "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Order-details-modal\"" +
                "               onclick='loadOrderDetails("+orderId+","+ "\""+ printer+"\""+","+"\""+material+"\""+","+client+","+ "\""+ element.fileDirectory+"\""+")'>Detalles</button>" +
                "               <ul id=\"contextMenu\" class=\"dropdown-menu\" role=\"menu\">\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 1,"+row+","+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">En proceso</a></li>\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 2,"+row+","+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">En produccion</a></li>\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 3,"+row+","+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">En trafico</a></li>\n" +
                "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+orderId+", 4,"+row+","+"\""+printer+"\""+","+"\""+material+"\""+","+client+"); return false;' class=\"dropdown-item\">Entregado</a></li>\n"+
                "               </ul>"+
                "            </td>"
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
    var historyRows = 1;
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
                var row = $("<tr id= "+element.id+">");
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
                        "               onclick='loadOrderDetails("+element.id+","+ "\""+ element.printer+"\""+","+"\""+element.material+"\""+","+element.client+","+ "\""+ element.fileDirectory+"\""+")'>Detalles</button>" +
                        "               <ul id=\"contextMenu\" class=\"dropdown-menu\" role=\"menu\">\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 1, "+rowFinishedOrdersCount+","+"\"" +element.printer+"\""+","+"\""+element.material+"\""+","+element.client+"); return false;' class=\"dropdown-item\">En proceso</a></li>\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 2, "+rowFinishedOrdersCount+","+"\"" +element.printer+"\""+","+"\""+element.material+"\""+","+element.client+"); return false;' class=\"dropdown-item\">En produccion</a></li>\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 3, "+rowFinishedOrdersCount+","+"\"" +element.printer+"\""+","+"\""+element.material+"\""+","+element.client+"); return false;' class=\"dropdown-item\">En trafico</a></li>\n" +
                        "                   <li><a tabindex=\"-1\" href=\"#\" onclick='updateStatus("+element.id+", 4, "+rowFinishedOrdersCount+","+"\"" +element.printer+"\""+","+"\""+element.material+"\""+","+element.client+"); return false;' class=\"dropdown-item\">Entregado</a></li>\n"+
                        "               </ul>"+
                        "            </td>"
                    ));
                    $('#tbodyProdOrders').append(row);
                    rowFinishedOrdersCount=rowFinishedOrdersCount+1;
                    lastRow = rowFinishedOrdersCount;
                }

                else if (element.inProgress === false && element.status === "Finalizado") {
                    row.append($(
                        "            <th scope=\"row\">" + historyRows + "</th>\n" +
                        "            <td>" + currentUserName + "</td>\n" +
                        "            <td>" + element.id + "</td>\n" +
                        "            <td>" + element.printer + "</td>\n" +
                        "            <td>" + element.material + "</td>\n" +
                        "            <td style='text-align: right'>" +
                        "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Order-details-modal\"" +
                        "               onclick='loadOrderDetails("+element.id+","+ "\""+ element.printer+"\""+","+"\""+element.material+"\""+","+element.client+","+ "\""+ element.fileDirectory+"\""+")'>Detalles</button>" +
                        "            </td>"
                    ));
                    $('#tbodyProdHistory').append(row);
                    historyRows = historyRows + 1;
                }

                else if (element.status === "Finalizado") {
                    row.append($(
                        "            <th scope=\"row\">" + rowOrdersCount + "</th>\n" +
                        "            <td>" + currentUserName + "</td>\n" +
                        "            <td>" + element.status + "</td>\n" +
                        "            <td>" + element.id + "</td>\n" +
                        "            <td style='text-align: right'>" +
                        "               <button type=\"button\" class=\"btn btn-success\" data-toggle='modal' data-target='#rateClientModal' onclick='confirmClientRating(" + element.id + "," + element.client + ")'>Rate Client</button>\n" +
                        "            </td>"
                    ));
                    $('#tbodyPedFin').append(row);
                    rowOrdersCount = rowOrdersCount + 1;

                }

                else{
                    row.append($(
                        "            <th scope=\"row\">" + rowPendingReqCount + "</th>\n" +
                        "            <td>"+currentUserName+"</td>\n" +
                        "            <td>"+element.status+"</td>\n" +
                        "            <td>"+element.id+"</td>\n" +
                        "            <td style='text-align: right'>" +
                        "            <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Order-details-modal\"" +
                        "            onclick='loadOrderDetails("+element.id+","+ "\""+ element.printer+"\""+","+"\""+element.material+"\""+","+element.client+","+ "\""+ element.fileDirectory+"\""+")'>Detalles</button>\n" +
                        "               <button id='button' type=\"button\" class=\"btn btn-success\" onclick='acceptRequest("+element.id+","+ "\""+ element.printer+"\""+"," +"\""+element.material+"\""+","+element.client+")'>✓</button>" +
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
    $("#clientDetails").append("<strong><u>Datos cliente</u></strong>");
    $("#printerAndMaterialDetails").html('');
    $("#printerAndMaterialDetails").append("<strong><u>Impresora y material</u></strong>")
    $("#file-Details").html('');
    $('#file-Details').append("<strong><u>Diseño:</u></strong>");

}

