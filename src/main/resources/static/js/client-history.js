function loadOrderDetailsClient(orderId, printerName, materialName, producerID, fileDirectory2){
    $.ajax({
        type: 'GET',
        url:'/users/'+ producerID,
        success: function (data) {
            $('#clientDetails').append($("<strong><u>Datos Productor</u></strong>"));
            $('#clientDetails').append($("<br><strong>Username: </strong>" +data.name+ "</br><strong> Mail: </strong>" + "\n" +data.email+"</br></br><strong>Calificiacion productor: </strong>"+ data.producerRating.toFixed(2)+ "</br> <strong>Total calificaciones: </strong>"+data.totalProducerRating+"</br><strong>Ciudad: </strong>"+"\n"+data.city+"</br>"));
            $('#printerAndMaterialDetails').append($("<strong><u>Impresora y material</u></strong>"));
            $('#printerAndMaterialDetails').append($("<br><strong> Impresora: </strong>" +printerName+ "</br><strong>Material: </strong>" + "\n" +materialName+"</br>"));
            $('#file-Details').append($("<strong><u>Diseño:</u></strong>"));
            $('#file-Details').append($("<p><a href='localhost:8080/downloadFile/"+fileDirectory2+"' target='_blank'>localhost:8080/downloadFile/"+fileDirectory2+"</a></p>" ))



        },
        error: function (error) {
        }
    });
}

function loadPageProducer(){
    var historyCount = 1;
    $.ajax({
        type: 'GET',
        url:'/orders/client/'+ userId,
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                var row = $("<tr>");

                if (element.inProgress === false && element.status === "Finalizado") {
                row.append($(
                    "            <th scope=\"row\">" + historyCount + "</th>\n" +
                    "            <td>" + currentUserName + "</td>\n" +
                    "            <td>" + element.id + "</td>\n" +
                    "            <td>" + element.printer + "</td>\n" +
                    "            <td>" + element.material + "</td>\n" +
                    "            <td style='text-align: right'>" +
                    "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Client-Order-details-modal-history\"" +
                    "               onclick='loadOrderDetailsClient("+element.id + ","+ "\"" + element.printer + "\"" + "," + "\"" + element.material  + "\"" + ","  +element.producer+ "," + "\"" + element.fileDirectory + "\"" + ")'>Detalles</button>" +
                    "            </td>"
                ));
                $('#tbodyClientHistory').append(row);
                historyCount = historyCount + 1;
            }

        });
        }
    });

}

function clearModalHistoryClient() {
    $('#clientDetails').empty();
    $('#printerAndMaterialDetails').empty();
    $('#file-Details').empty();




}