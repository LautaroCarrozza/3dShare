var currentUserName;
var userId;

$.when(getUserId()).then(loadHomePage());


function getUserId() {
    $.ajax({
        url: "/api/user",
        type: 'GET',
        async: false,
        success: function (data) {
            userId = data;

        },
        error: function(error){
            console.log(error);
            $('#printer-form').hide();
            $('#material-form').hide();
        }
    });
}

function getUserName(user) {
    $.ajax({
        type: 'GET',
        url:'/users/getName/'+ user,
        async: false,
        success: function (data) {
            currentUserName = data;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function loadOrderDetails(orderId, printerName, materialName, prodId, filename){
    $.ajax({
        type: 'GET',
        url:'/users/'+ prodId,
        success: function (data) {
            $('#producerDetails').append($("<br><strong> Nombre Usuario: </strong>" +data.name+ "</br><strong>Email: </strong>" + "\n" +data.email+"</br><strong> CP: </strong>" + "\n" +data.postalCode+ "</br>"));
            $('#home-printerAndMaterialDetails').append($("<br> <strong>Impresora: </strong>" +printerName+ "</br><strong>Material: </strong>" + "\n" +materialName+"</br>"));
            $('#file-details').append($("<p><a href='localhost:8080/downloadFile/"+filename+"' target='_blank'>localhost:8080/downloadFile/"+filename+"</a></p>" ))

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function loadHomePage() {
    var rowCOUNT=1;
    var historyCount = 1;

    $.ajax({
        type: 'GET',
        url:'/orders/client/'+ userId,
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                getUserName(element.producer);
                var row = $("<tr>");
                //element.producer returns producer id
                if (element.status!== "Entregado" & element.status!== "Finalizado") {

                    row.append($(
                        "            <th scope=\"row\">" + rowCOUNT + "</th>\n" +
                        "            <td>" + currentUserName + "</td>\n" +
                        "            <td>" + element.status + "</td>\n" +
                        "            <td>" + element.id + "</td>\n" +
                        "            <td style='text-align: right'>" +
                        "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Client-Order-details-modal\"" +
                        "               onclick='loadOrderDetails(" + element.id + "," + "\"" + element.printer + "\"" + "," + "\"" + element.material + "\"" + "," + element.producer + "," + "\"" + element.fileDirectory + "\"" + ")'>Detalles</button>" +
                        "            </td>\n"
                    ));

                    rowCOUNT = rowCOUNT + 1;

                    $('#tbodyOfMyOrders').append(row)
                }

                else if (element.status=== "Entregado") {
                    getUserName(element.producer);

                    row.append($(
                        "            <th scope=\"row\">" + rowCOUNT + "</th>\n" +
                        "            <td>" + currentUserName + "</td>\n" +
                        "            <td>" + element.status + "</td>\n" +
                        "            <td>" + element.id + "</td>\n" +
                        "            <td style='text-align: right'>" +
                        "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Client-Order-details-modal\"" +
                        "               onclick='loadOrderDetails(" + element.id + "," + "\"" + element.printer + "\"" + "," + "\"" + element.material + "\"" + "," + element.producer +"," + "\""+ element.fileDirectory+"\""+")'>Detalles</button> " +
                        "               <button type=\"button\" class=\"btn btn-success\" data-toggle='modal' data-target='#rateModal' onclick='confirmRatingButton("+element.id+","+element.producer+")'>Confirmar</button>" +
                        "            </td>\n"

                    ));

                    rowCOUNT = rowCOUNT + 1;

                    $('#tbodyCompletedOrders').append(row)
                }
            });

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function goBack() {
    window.location.href= "home.html";
}

function showLoadPrinterForm() {
    $('#printer-form').show();
}

function showLoadMaterialForm() {
    $('#material-form').show();
}

function logOut(){
    $.ajax({
        url: "/api/logout",
        type: 'POST',
        success: function () {
            location.href = "login.html";
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function redirectProducer() {
    window.location.href= "pedidos-productor.html";
}

function redirectClient() {
    window.location.href= "home.html";
}

function redirectsClientHistory() {
    window.location.href= "historial-cliente.html";
}

function redirectProducerHistory() {
    window.location.href= "historial-productor.html";
}

function redirectMaterials() {
    window.location.href='mis-materiales.html';
}

function redirectOrders() {
    window.location.href='realizar-pedido.html'
}

function redirectPrinters() {
    window.location.href='mis-impresoras.html'
}

function redirectHome() {
    window.location.href='home.html'
}

function clearModal() {
    $("#producerDetails br").remove();
    $("#producerDetails").html('');
    $("#producerDetails").append("<strong><u>Datos productor</u></strong>");
    $("#home-printerAndMaterialDetails").html('');
    $("#home-printerAndMaterialDetails").append("<strong><u>Impresora y material</u></strong>")
    $("#file-details").html('')
    $("#file-details").append("<strong><u>Diseño:</u></strong>")


}

function confirmRatingButton(orderID, producerID) {
    var button= $('<button  type="button" class="btn btn-success" onclick="rateProducer('+orderID+','+producerID+')">Confirmar</button>')
    $('#rateModalFooter').append(button);

}


