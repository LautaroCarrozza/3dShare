let submitButton;
updateView();

$(function() {
    $('.submitbutton').click(function () {
        submitButton = $(this).attr('name')
    });

});

$('#login-form').on('submit', function (event) {
    event.preventDefault();

    if (submitButton == "login") {
        $.post("/api/login",
            {
                name: $("#username").val(),
                pwd: $("#password").val()
            })
            .done(function () {
                console.log("login ok");
                $('#loginSuccess').show( "slow" ).delay(2000).hide( "slow" );
                $("#password").val("");
            })
            .fail(function () {
                console.log("login failed");
                $('#loginFailed').show( "slow" ).delay(2000).hide( "slow" );
                $("#username").val("");
                $("#password").val("");
                $("#username").focus();
                // $('#loginFailed').hide( "slow" );
            })
            .always(function () {

            });
    }
});

function updateView() {
    $('#login-form').show("slow");
}

