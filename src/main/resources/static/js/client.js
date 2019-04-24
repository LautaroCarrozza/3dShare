let userId

function getUserId() {
    $.ajax({
        url: "/api/user",
        type: 'GET',
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


function getListItems() {
    $.ajax({
        url:"/users/customer/getProducers",
        type:'GET',
        success:function (data) {
            $.each(data, function(k, v) {
                console.log(v.name);
                $('body').append($('<div>', {
                    text: "Name: " + v.name + ", Email: " + v.email
                }));

            });
        }
    })
}


function myGetListItems() {
    $.ajax({
        url:"/users/customer/getProducers",
        type:'GET',
        success:function (result) {
            var response = $.parseJSON(result);
                $.each(response,function (i,val) {
                    var producerName= JSON.stringify(val.name).replace(/\"/g, "");
                    console.log(val.name);
                    $("ul-1").append("<li><a data-toggle='tab' href=#"+producerName+">"+producerName+"</a></li>");

                });




        }
    });

}
