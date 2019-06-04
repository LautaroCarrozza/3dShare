function getUserId2() {
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

function loadProducersWithPrinter() {
    var printerName=getQueryVariable(window.location.href);
    $.ajax({
        type: 'GET',
        url: '/printers',
        success: function (data) {
            $.each(data, function (index, element) {
                if (printerName === element.model) {
                    console.log(element.owner.id);
                    var li = $('<li><a data-toggle="modal" href="#details-modal">' + element.owner.name + '</a></li>');
                    li.attr('onClick', 'loadModal("' + element.owner.id + '","' + element.owner.name + '")');
                    $("#my2ndUL").append(li);


                }

            })

        }

    })
}

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        return pair[1];
    }
    return (false);
}

function loadModal(ownerID,ownerName) {
    console.log(ownerID);
    console.log(ownerName);
    $.ajax({
        type:'GET',
        dataType: "json",
        url:'/materials/byOwnerId/'+ownerID,
        async:false,
        success: function (data) {


            $.each(data,function (index,element) {
                console.log(element);
                var option= $('<option><a href="#">'+element.name+'</a></option>');
                jQuery("#materialSelect").append(option);

            });
            var button2= $("<button type=\"button\" class=\"btn btn-success\" onclick='realizarPedido("+ownerID+")'>Realizar Pedido</button>");

            jQuery("#inner").append(button2);


        }

    })


}

function realizarPedido(producerID) {
    var printername = getQueryVariable(window.location.href);
    //getUserId2();

    $.post("/users/addOrder/client/" + userId + "/producer/" + producerID,{
        materialName: $('#materialSelect').val(),
        printerName: printername
    })
        .done(function () {
            window.alert('Solicitud enviada correctamente');
            location.href="home.html";
        })
        .fail(function (error) {
            console.log(error);
        });


    
}

function clearModal() {
    $("#exampleFormControlSelect1").empty();
    $("#ownerData").empty();
    $("#inner").empty();
}