function loadMaterials() {
    console.log(userId);
    localStorage.clear();
    var rowCOUNT=1;

    console.log(userId);
    console.log('coorio el log');
    $.ajax({
        type: 'GET',
        url:'/materials/byOwnerId/'+ userId ,
        success: function (data) {
            $.each(data,function (index,element) {
                var row = $("<tr>");

                row.append($("<td>"+rowCOUNT+"</td>"))
                    .append($("<td>"+element.name+"</td>"))
                    .append($("<td>"+element.id+"</td>"));

                $("#table02 tbody").append(row);

                rowCOUNT=rowCOUNT+1

            })
        }
    })

}

function deleteMaterialById(id) {
    $.ajax({
        type: 'PUT',
        url:'materials/delete/' +id
    });
    location.reload();

}

function clearTableMaterials(){
    var elmtTable = document.getElementById('table02');
    var tableRows = elmtTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>0; x--) {
        elmtTable.deleteRow(x)
    }
}

function showDeleteMaterialForm() {
    $('#deleteMaterialForm').show()

}