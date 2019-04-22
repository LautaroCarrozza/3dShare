let submitButton;
updateView();

$(function() {
    $('.submitbutton').click(function () {
        submitButton = $(this).attr('name')
    });

});

$('#login-form').on('submit', function (event) {
    event.preventDefault();

    $.post("/api/login", {
            name: $("#username").val(),
            pwd: $("#password").val()
        })
        .done(function () {
            console.log("login ok");
            $('#loginSuccess').show( "slow" ).delay(2000).hide( "slow" );
            $("#password").val("");
            location.href = "home.html"
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

});

$('#signup-form').on('submit', function (event) {
    event.preventDefault();
    location.href = "signup.html";
});

function updateView() {
    if (submitButton == "login") {
        $('#signup-form').hide("slow");
        $('#login-form').show("slow");

    }
    else if (submitButton == "signup") {
        $('#login-form').hide("slow");
        $('#signup-form').show("slow");
    }
}

