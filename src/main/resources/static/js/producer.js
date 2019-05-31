var submitButton;
var idList;
loadProducerPage();

$(function() {
    $('.submitbutton').click(function () {
        submitButton = $(this).attr('name');
        if (submitButton === "loadPrinter") {
            $('#printer-form').show();
        }
        else if (submitButton === "loadMaterial") {
            $('#material-form').show();
        }

    });

});


$('#printer-form').on('submit', function () {

        let url = "/users/producer/" + userId + "/addPrinter";

        $.post(url, {
            model: $("#printer-model").val()
        })
            .done(function () {
                console.log("Printer added");
                $('#printer-form').hide();
                $('#LoadSuccess').show( "slow" ).delay(2000).hide( "slow" );

            })
            .fail(function () {
                console.log("Fail to add printer");
                $('#printer-form').hide();
                $('#LoadFailed').show( "slow" ).delay(2000).hide( "slow" );
            })

            .always(function () {

            });
});

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

function acceptRequest(orderId) {
    $.ajax({
        type: 'POST',
        url: '/orders/request/accept/' + orderId,
        success: function () {
            console.log('request aceptada');
            location.reload();
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function rejectRequest(orderId) {
    $.ajax({
        type: 'POST',
        url: '/orders/request/reject/' + orderId,
        success: function () {
            console.log('request rechazada');
            location.reload();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function loadOrderDetails(orderId, printerName, materialName, clientId){
    $.ajax({
        type: 'GET',
        url:'/users/'+ clientId,
        async: false,
        success: function (data) {
            $.each(data, function(index, element) {
                $('#clientDetails').append($("<br>\n" +
                    "                                \"\n" +
                    "                                "+element.name+"\n" +
                    "                                <br>\n" +
                    "                                \""+element.email+"\n" +
                    "                                \""+element.postalCode+"\n"

                ));
                $('#printerAndMaterialDetails').append($("<br>\n" +
                    "                                \"\n" +
                    "                                "+printerName+"\n" +
                    "                                <br>\n" +
                    "                                \""+materialName+"\n"
                ));
            })
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function loadProducerPage() {
    var rowOrdersCount = 1;
    var rowPendingReqCount = 1;
    $.ajax({
        type: 'GET',
        url:'/orders/producer/'+ userId,
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                //element.client returns client id
                console.log(data);
                getUserName(element.client);

                var status;
                var row = $("<tr>");
                if (element.inProgress === true){
                    row.append($(
                        "            <th scope=\"row\">" + rowOrdersCount + "</th>\n" +
                        "            <td>"+currentUserName+"</td>\n" +
                        "            <td>En proceso</td>\n" +
                        "            <td>"+element.id+"</td>\n" +
                        "            <td style='text-align: right'>" +
                        "               <button type=\"button\" class=\"btn btn-secondary\" " +
                        "                   onclick='loadOrderDetails("+element.id+", "+element.printer+","+element.material+", "+element.client+")'>Detalles</button>" +
                        "            </td>\n"

                    ));
                    // <button type="button" class="btn btn-success">Success</button>
                    // <button type="button" class="btn btn-danger">Danger</button>

                    $('#tbodyProdOrders').append(row);
                    rowOrdersCount=rowOrdersCount+1;
                }

                else{
                    row.append($(
                        "            <th scope=\"row\">" + rowPendingReqCount + "</th>\n" +
                        "            <td>"+currentUserName+"</td>\n" +
                        "            <td>Esperando respuesta</td>\n" +
                        "            <td>"+element.id+"</td>\n" +
                        "            <td style='text-align: right'>" +
                        "               <button type=\"button\" class=\"btn btn-success\" onclick='acceptRequest("+element.id+")'>/</button>" +
                        "               <button type=\"button\" class=\"btn btn-danger\" onclick='rejectRequest("+element.id+")'>X</button>" +
                        "            </td>\n"

                    ));

                    $('#tbodyReqProdOrders').append(row);
                    rowPendingReqCount=rowPendingReqCount+1;
                }

            });

        },
        error: function (error) {
            console.log(error);
        }
    });

}

