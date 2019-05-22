function loadPrinters() {
    var rowCOUNT=1;
    $.ajax({
        type: 'GET',
        url:'/printers/byOwnerId/'+ userId,
        success: function (data) {
            $.each(data, function(index, element) {
                var row = $("<tr>");

                row.append($("<td>"+rowCOUNT+"</td>"))
                    .append($("<td>"+element.model+"</td>"));

                $("#table01 tbody").append(row);

                rowCOUNT=rowCOUNT+1

            });

        }

    })

}

function clearTable(){
    var elmtTable = document.getElementById('table01');
    var tableRows = elmtTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>0; x--) {
        elmtTable.deleteRow(x)
    }
}
