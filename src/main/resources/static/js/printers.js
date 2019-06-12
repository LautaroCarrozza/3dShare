function loadPrinters() {
    var rowCOUNT=1;
    $.ajax({
        type: 'GET',
        url:'/printers/byOwnerId/'+ userId,
        success: function (data) {
            $.each(data, function(index, element) {
                var row = $("<tr>");

                row.append($("<td>"+rowCOUNT+")"+"</td>"))
                    .append($("<td>"+element.model+"</td>"))
                    .append($("<td>"+element.id+"</td>"))
                    .append($('<td style="text-align: right" <button type="button" class="btn btn-danger" onclick="deletePrinterById('+element.id+')">X</button></td>'));

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
    location.reload();



}
function showDeletePrinterForm() {
    $('#deletePrinterForm').show();

}

function clearTable(){
    var elmtTable = document.getElementById('table01');
    var tableRows = elmtTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>0; x--) {
        elmtTable.deleteRow(x)
    }
}
