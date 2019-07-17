function loadOrdersDetailProducer(orderId, printerName, materialName, clientID, fileDirectory2) {
    $.ajax({
        type: 'GET',
        url:'/users/'+ clientID,
        async: false,
        success: function (data) {
            $('#clientDetails-producerHistory').append($("<strong><u>Datos Cliente</u></strong>"));
            $('#clientDetails-producerHistory').append($("<br><strong>Username: </strong>" +data.name+ "</br><strong> Mail: </strong>" + "\n" +data.email+"</br></br><strong>Calificiacion cliente: </strong>"+ data.customerRating.toFixed(2)+ "</br> <strong>Total calificaciones: </strong>"+data.totalCustomerRating+"</br><strong>Ciudad: </strong>"+"\n"+data.city+"</br>"));
            $('#printerAndMaterialDetails-producerHistory').append($("<strong><u>Impresora y material</u></strong>"));
            $('#printerAndMaterialDetails-producerHistory').append($("<br><strong> Impresora: </strong>" +printerName+ "</br><strong>Material: </strong>" + "\n" +materialName+"</br>"));
            $('#file-Details-producerHistor').append($("<strong><u>Diseño:</u></strong>"));
            $('#file-Details-producerHistor').append($("<p><a href='localhost:8080/downloadFile/"+fileDirectory2+"' target='_blank'>localhost:8080/downloadFile/"+fileDirectory2+"</a></p>" ))



        },
        error: function (error) {
        }
    });


}

function loadPageProducer() {
    var historyRows = 1;
    console.log(userId);
    $.ajax({
        type: 'GET',
        url: '/orders/producer/' + userId,
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, element) {if (element.inProgress === false && element.status === "Finalizado") {
                var row = $("<tr id= "+element.id+">");
                row.append($(
                        "            <th scope=\"row\">" + historyRows + "</th>\n" +
                        "            <td>" + currentUserName + "</td>\n" +
                        "            <td>" + element.id + "</td>\n" +
                        "            <td>" + element.printer + "</td>\n" +
                        "            <td>" + element.material + "</td>\n" +
                        "            <td style='text-align: right'>" +
                        "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Client-Order-details-modal-history\"" +
                        "               onclick='loadOrdersDetailProducer("+element.id+","+ "\""+ element.printer+"\""+","+"\""+element.material+"\""+","+element.client+","+ "\""+ element.fileDirectory+"\""+")'>Detalles</button>" +
                        "            </td>"
                    ));
                    $('#tbodyProdHistory').append(row);
                    historyRows = historyRows + 1;
                }
            });
        }
    });
}

function clearModalProducerHistory() {
    $('#clientDetails-producerHistory').empty();
    $('#printerAndMaterialDetails-producerHistory').empty();
    $('#file-Details-producerHistor').empty();


}