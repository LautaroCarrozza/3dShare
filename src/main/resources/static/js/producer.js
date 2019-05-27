var userId;
var submitButton;

getUserId();

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
