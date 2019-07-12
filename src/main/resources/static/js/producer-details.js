var userCity;
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
    var map = L.map('prodMap').setView([-34.47, -58.92], 14);
    L.esri.basemapLayer('Topographic').addTo(map);
    var searchControl = L.esri.Geocoding.geosearch().addTo(map);

    var results = L.layerGroup().addTo(map);

    searchControl.on('results', function(data){
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
        }
    });

    map.locate({setView: true});

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

                    var popUpContent = "<h4 style='text-align: center'>"+element.owner.name+"</h4>"+
                        "<p><strong>Email: </strong>" + "\n" +element.owner.email+"</br>" +
                        "<strong> Ciudad: </strong>"+"\n"+element.owner.city+"</br>" +
                        "<strong>Calificacion: "+element.owner.producerRating.toFixed(2)+"/5</strong></p>" +
                        "<button type='button' class='btn btn-success' data-toggle='modal' data-target='#details-modal' onclick='loadModal("+element.owner.id+","+"\""+element.owner.name+"\""+")'>More</button>";

                    var marker = L.marker([element.owner.latitude, element.owner.longitude]).addTo(map);
                    marker.bindPopup(popUpContent);
                }

            })

        }

    });

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

            $.ajax({
               type: 'GET',
               dataType: 'json',
               url: '/users/' +ownerID,
               success: function (user) {
                   $('#producerDetailsOrder').append($("<br> <strong> Nombre: </strong>" +user.name+ "</br><strong>Email: </strong>" + "\n" +user.email+"</br> <strong> CP: </strong>" + "\n" +user.postalCode+ "</br><strong> Ciudad: </strong>"+"\n"+user.city+"</br>"));
                   $('#producerDetailsOrder').append($("<br><strong>Calificacion: "+user.producerRating.toFixed(2)+"/5</strong></br>"));

                   $.each(data,function (index,element) {
                       console.log(element);
                       var option= $('<option><a href="#">'+element.name+'</a></option>');
                       jQuery("#materialSelect").append(option);

                   });
                   var button2= $("<button type=\"button\" class=\"btn btn-success\" onclick='realizarPedido("+ownerID+")'>Realizar Pedido</button>");

                   jQuery("#inner").append(button2);
                }
            });



        }

    })


}


function sortByRating() {
    clearLI();
    var printerName=getQueryVariable(window.location.href);
    $.ajax({
        type: 'GET',
        url: '/printers/byRating',
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

function realizarPedido(producerID) {
    var printername = getQueryVariable(window.location.href);
    //getUserId2();

    $.post("/users/addOrder/client/" + userId + "/producer/" + producerID,{
        materialName: $('#materialSelect').val(),
        printerName: printername
    })
        .done(function () {1
            window.alert('Solicitud enviada correctamente');
            location.href="home.html";
        })
        .fail(function (error) {
            console.log(error);
        });


    
}

function clearModal() {
    $("#producerDetailsOrder").empty();
    $("#exampleFormControlSelect1").empty();
    $("#ownerData").empty();
    $("#inner").empty();
}

function clearLI() {
    $('#my2ndUL').empty();

}

function sortByCity() {
    clearLI();
    getUserCity();
    console.log(userCity);
    var printerName=getQueryVariable(window.location.href);
    $.ajax({
        type: 'GET',
        url: '/printers',
        success: function (data) {
            $.each(data, function (index, element) {
                if (printerName === element.model && element.owner.city=== userCity) {
                    console.log(element.owner.id);
                    var li = $('<li><a data-toggle="modal" href="#details-modal">' + element.owner.name + '</a></li>');
                    li.attr('onClick', 'loadModal("' + element.owner.id + '","' + element.owner.name + '")');
                    $("#my2ndUL").append(li);

                }

            })

        }

    })
}

function getUserCity() {
    console.log('user id:'+ userId);
    $.ajax({
        type:'GET',
        url:'/users/'+userId,
        asyc: false,
        success:function (data) {
            console.log('aca corre' + data.city);
            userCity= data.city;

        }
    })

}