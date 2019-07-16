var markers = [];
var producers = [];

var userCity;

var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
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
            var markersCounter = 0;
            $.each(data, function (index, element) {
                if (printerName === element.model) {

                    var popUpContent = "<h4 style='text-align: center'>"+element.owner.name+"</h4>"+
                        "<p><strong>Email: </strong>" + "\n" +element.owner.email+"</br>" +
                        "<strong> Ciudad: </strong>"+"\n"+element.owner.city+"</br>" +
                        "<strong>Calificacion: "+element.owner.producerRating.toFixed(2)+"/5</strong></p>" +
                        "<button type='button' class='btn btn-success' data-toggle='modal' data-target='#details-modal' onclick='loadModal("+element.owner.id+","+"\""+element.owner.name+"\""+")'>More</button>";

                    var marker = L.marker([element.owner.latitude, element.owner.longitude]).addTo(map);
                    marker.bindPopup(popUpContent);

                    producers.push(element.owner.name);
                    markers.push(marker);

                    var li = $('<li><a href="#" onclick="openPopUp('+markersCounter+');return false;">' + element.owner.name + '</a></li>');
                    $("#my2ndUL").append(li);
                    markersCounter ++;
                }

            })

        }

    });

}

function openPopUp(marker) {
    markers[marker].openPopup();
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

function getMarkerIndex(producerName) {
    for (var i = 0; i < producers.length; i++) {
        if (producers[i] === producerName) {
            return i;
        }
    }
    return -1;
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

                    var markerIndex = getMarkerIndex(element.owner.name);
                    if (markerIndex !== -1) {
                        var li = $('<li><a href="#" onclick="openPopUp('+markerIndex+');return false;">' + element.owner.name + '</a></li>');
                        $("#my2ndUL").append(li);
                    }

                }

            })

        }

    })
    
}

function realizarPedido(producerID) {
    var printername = getQueryVariable(window.location.href);
    var filePath= $('#singleFileUploadInput').val();
    var files = singleFileUploadInput.files;
    if(files.length === 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }
    uploadSingleFile(files[0]);

    $.post("/users/addOrder/client/" + userId + "/producer/" + producerID,{
        materialName: $('#materialSelect').val(),
        printerName: printername,
        fileDirectory: filePath.slice(12)
    })
        .done(function () {
            Swal.fire({
                type: 'success',
                title: 'Pedido creado correctamente',
                text: 'redireccionando en 10s',
                timer: 10000

            }
                // 'Good job!',
                // 'You clicked the button!',
                // 'success'
            ).then(function (value) {
                location.href="home.html";
            });

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

    var printerName=getQueryVariable(window.location.href);
    $.ajax({
        type: 'GET',
        url: '/printers',
        success: function (data) {
            $.each(data, function (index, element) {
                if (printerName === element.model && element.owner.city=== userCity) {

                    var markerIndex = getMarkerIndex(element.owner.name);
                    if (markerIndex !== -1) {
                        var li = $('<li><a href="#" onclick="openPopUp('+markerIndex+');return false;">' + element.owner.name + '</a></li>');
                        $("#my2ndUL").append(li);
                    }

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

function uploadSingleFile(file) {
    var formData = new FormData();
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFile");

    xhr.onload = function() {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
            singleFileUploadError.style.display = "none";
            singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" + response.fileDownloadUri + "' target='_blank'>" + response.fileDownloadUri + "</a></p>";
            singleFileUploadSuccess.style.display = "block";
        } else {
            singleFileUploadSuccess.style.display = "none";
            singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
    };

    xhr.send(formData);
}