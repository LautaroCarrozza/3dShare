function loadPrinters() {
    var rowCOUNT=1;
    $.ajax({
        type: 'GET',
        url:'/printers/byOwnerId/'+ userId,
        success: function (data) {
            $.each(data, function(index, element) {
                var row = $("<tr id="+element.id+">");

                row.append($("<td>"+rowCOUNT+")"+"</td>"))
                    .append($("<td>"+element.model+"</td>"))
                    .append($("<td>"+element.id+"</td>"))
                    .append($('<td style="text-align: right"> <button type="button" class="btn btn-danger" onclick="deletePrinterById('+element.id+')">✕</button></td>'));

                $("#table01 tbody").append(row);

                rowCOUNT=rowCOUNT+1

            });

        }

    })

}

function deletePrinterById(id) {
    console.log(id);
    $.ajax({
        type: 'PUT',
        url: 'printers/delete/'+id


    });
    var idRow = document.getElementById(id);
    idRow.remove();
}

function showDeletePrinterForm() {
    $('#deletePrinterForm').show();

}

function addPrinter() {
    var printer = $('#PrinterCatalogSelect').val();
    let url = "/users/producer/" + userId + "/addPrinter"
    $.post(url,{
        model: printer
    })
        .done(function () {
            location.reload();

        });

}

function clearTable(){
    var elmtTable = document.getElementById('table01');
    var tableRows = elmtTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>0; x--) {
        elmtTable.deleteRow(x)
    }
}

function redirectProducer() {
    window.location.href= "pedidos-productor.html";
}

function redirectClient() {
    window.location.href= "home.html";
}

function redirectMaterials() {
    window.location.href='mis-materiales.html';
}

function redirectOrders() {
    window.location.href='realizar-pedido.html'
}


function redirectHome() {
    window.location.href='home.html'
}

function loadPrinterSelectForm(){

    $.ajax({
        type: 'GET',
        url: "/printers/catalogo",
        success: function (data) {
            $.each(data, function (index,element) {
                $('#PrinterCatalogSelect').append("<option>"+element.model+"</option>");

            })

        }
    })
}

function clearSelectFormPrinter() {
    $('#PrinterCatalogSelect').empty();

}
