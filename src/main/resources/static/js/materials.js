
function loadMaterials() {

    var rowCOUNT=1;
    $.ajax({
        type: 'GET',
        async: false,
        url:'/materials/byOwnerId/'+ userId ,
        success: function (data) {
            $.each(data,function (index,element) {
                var row = $("<tr id = "+element.id+">");
                row.append($("<td>"+rowCOUNT+")"+"</td>"))
                    .append($("<td>"+element.name+"</td>"))
                    .append($("<td>"+element.id+"</td>"))
                    .append($('<td style="text-align: right"><button type="button" class="btn btn-danger" onclick="deleteMaterialById('+element.id+')">✕</button></td>'));



                $("#table02 tbody").append(row);

                rowCOUNT=rowCOUNT+1

            })
        }
    })

}

function deleteMaterialById(id) {
    localStorage.clear();

    var idRow = document.getElementById(id);
    idRow.remove();

    $.ajax({
        type: 'PUT',
        async: false,
        url:'materials/delete/' +id
    });

}

function addMaterial(){
    var material= $('#MaterialCatalogSelectInput').val();
    let url = "/users/producer/" + userId + "/addMaterial";
     $.post(url,{
         name: material
     })
         .done(function () {
             location.reload();

         });



}


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

function loadMaterialSelectForm(){

    $.ajax({
        type: 'GET',
        url: "/materials/catalogo",
        success: function (data) {
            $.each(data, function (index,element) {
                $('#MaterialCatalogSelectInput').append("<option>"+element.name+"</option>");

            })

        }
    })
}
function clearSelectFormMaterial() {
    $('#MaterialCatalogSelectInput').empty();

}