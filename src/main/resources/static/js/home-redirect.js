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

function loadOrderDetails(orderId, printerName, materialName, prodId){
    $.ajax({
        type: 'GET',
        url:'/users/'+ prodId,
        success: function (data) {
            $('#producerDetails').append($("<br>" +data.name+ "</br>" + "\n" +data.email+"</br>" + "\n" +data.postalCode+ "</br>"));
            $('#home-printerAndMaterialDetails').append($("<br>" +printerName+ "</br>" + "\n" +materialName+"</br>"));

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function loadHomePage() {
    var rowCOUNT=1;

    $.ajax({
        type: 'GET',
        url:'/orders/client/'+ userId,
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                //element.producer returns producer id
                console.log(data);
                getUserName(element.producer);

                var row = $("<tr>");

                row.append($(
                    "            <th scope=\"row\">" + rowCOUNT + "</th>\n" +
                    "            <td>"+currentUserName+"</td>\n" +
                    "            <td>"+element.status+"</td>\n" +
                    "            <td>"+element.id+"</td>\n" +
                    "            <td style='text-align: right'>" +
                    "               <button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#Client-Order-details-modal\"" +
                    "               onclick='loadOrderDetails("+element.id+","+ "\""+ element.printer+"\""+","+"\""+element.material+"\""+","+element.producer+")'>Detalles</button>" +
                    "            </td>\n"
                ));

                rowCOUNT=rowCOUNT+1;

                $('#tbodyOfMyOrders').append(row)
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
    $("#producerDetails").append("<strong>Datos cliente</strong>");
    $("#home-printerAndMaterialDetails").html('');
    $("#home-printerAndMaterialDetails").append("<strong>Impresora y material</strong>")
}