var userId;
var lastPrinterRow = 0;
var lastMaterialRow = 0;
var currentId = 0;

function loadAdminPage() {

    var materialsRowCOUNT=1;
    $.ajax({
        type: 'GET',
        url:'/admin/materials',
        success: function (data) {
            $.each(data,function (index,element) {
                var row = $("<tr id = "+element.id+">");

                row.append($("<td>"+materialsRowCOUNT+")"+"</td>"))
                    .append($("<td>"+element.name+"</td>"))
                    .append($('<td style="text-align: right"><button type="button" class="btn btn-danger" onclick="deleteMaterialById('+element.id+')">✕</button></td>'));

                $("#tbodyAdminMaterial").append(row);

                materialsRowCOUNT=materialsRowCOUNT+1;
                lastMaterialRow ++;
            })
        }
    });

    var printersRowCOUNT=1;
    $.ajax({
        type: 'GET',
        url:'/admin/printers',
        success: function (data) {
            $.each(data, function(index, element) {
                var row = $("<tr id="+element.id+">");

                row.append($("<td>"+printersRowCOUNT+")"+"</td>"))
                    .append($("<td>"+element.model+"</td>"))
                    .append($('<td style="text-align: right"> <button type="button" class="btn btn-danger" onclick="deletePrinterById('+element.id+')">✕</button></td>'));

                $("#tbodyAdminPrinter").append(row);

                printersRowCOUNT=printersRowCOUNT+1
                lastPrinterRow ++;
            });

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
        url:'admin/materials/delete/' +id
    });

    lastMaterialRow--;
}

function deletePrinterById(id) {

    $.ajax({
        type: 'PUT',
        url: 'admin/printers/delete/'+id


    });
    var idRow = document.getElementById(id);
    idRow.remove();
    lastPrinterRow --;
}

function getPrinterId(model) {
    $.ajax({
        type: 'GET',
        url:'/admin/printers/byModel/' + model,
        async: false,
        success: function (data) {
            currentId = data.id;
        }

    })
}

function addPrinter() {

    var model = $("#printer-model").val();

    $.post("admin/printers/add",{
        model: model
    }).done(function () {

        getPrinterId(model);
        lastPrinterRow ++;
        var row = $("<tr id="+currentId+">");
        row.append($("<td>"+lastPrinterRow+")"+"</td>"))
            .append($("<td>"+$("#printer-model").val()+"</td>"))
            .append($('<td style="text-align: right"> <button type="button" class="btn btn-danger" onclick="deletePrinterById('+currentId+')">✕</button></td>'));

        $("#tbodyAdminPrinter").append(row);
    }).fail(function () {
        console.log("Fallo en agregar impresora")
    })
}

function getMaterialId(name) {
    $.ajax({
        type: 'GET',
        url:'/admin/materials/byName/' + name,
        async: false,
        success: function (data) {
            currentId = data.id;
        }

    })
}

function addMaterial() {
    var name = $("#material-model").val();
    $.post("/admin/materials/add",{
        name : name
    }).done(function () {
        lastMaterialRow ++;
        getMaterialId(name);
        var row = $("<tr id="+currentId+">");
        row.append($("<td>"+lastMaterialRow+")"+"</td>"))
            .append($("<td>"+name+"</td>"))
            .append($('<td style="text-align: right"><button type="button" class="btn btn-danger" onclick="deleteMaterialById('+currentId+')">✕</button></td>'));

        $("#tbodyAdminMaterial").append(row);
    }).fail(function () {
        console.log("Fallo en agregar material")
    })
}