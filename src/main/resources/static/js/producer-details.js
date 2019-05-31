function loadProducersWithPrinter() {
    var printerName=getQueryVariable(window.location.href);
    $.ajax({
        type:'GET',
        url:'/printers',
        async: false,
        success: function (data) {
            $.each(data,function (index,element) {
                if (printerName===element.model){
                    console.log(element.owner.id);
                    var li=$('<li><a data-toggle="modal" href="#details-modal">'+element.owner.name+'</a></li>');
                    li.attr('onClick','loadModal("'+element.owner.id+'","'+element.owner.name+'")');
                    $("#my2ndUL").append(li);


                }
                
            })
            

        }



        }
    )

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
    var button=$('<input type="submit" class="form-control submitbutton btn btn-success" onclick="realizarPedido()" id="submitOrderButton">');
    button.attr('onClick','realizarPedido("'+ownerID+')"');
    $.("#addButtonDiv").append(button);
    $.ajax({
        type:'GET',
        dataType: "json",
        url:'/materials/byOwnerId/'+ownerID,
        async:false,
        success: function (data) {
            // var nameh4= $('<p class="modal-title" id="producer-name">'+ownerName+'</p>');
            // var idh4= $('<p class="modal-title" id="producer-id">'+ownerID+'</p>');
            //
            //
            // $("#modal-body").append(nameh4).append(idh4);


            $.each(data,function (index,element) {
                var option= $('<option><a href="#">'+element.name+'</a></option>');
                $("#exampleFormControlSelect1").append(option);

            });


        }
    })


}

function realizarPedido(producerID) {


    
}

function clearModal() {
    $("#exampleFormControlSelect1").empty();
    $("#ownerData").empty();
}