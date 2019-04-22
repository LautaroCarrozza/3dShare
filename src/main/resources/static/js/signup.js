let submitButton;
updateView();

$(function() {
    $('.submitbutton').click(function () {
        submitButton = $(this).attr('name')
    });

});

$('#signup-form').on('submit', function (event) {
    event.preventDefault();

        if($("#password").val() === $("#confirmPwd").val()){
            $.post({
                url: "/api/user",
                data: JSON.stringify({
                    name: $("#username").val(),
                    password: $("#password").val(),
                    email: $("#email").val()
                }),
                dataType: "text",
                contentType: "application/json"
            })
                .done(function () {
                    console.log("login ok");
                    $('#signupSuccess').show("slow").delay(2000).hide("slow");
                    $.post("/api/login",
                        {
                            name: $("#username").val(),
                            pwd: $("#password").val()
                        })
                        .done(function () {
                            console.log("login ok");
                            $('#loginSuccess').show("slow").delay(2500).hide("slow");
                            $("#username").val("");
                            $("#password").val("");
                            location.href = "home.html"
                        })
                })
                .fail(function () {
                    console.log("Sign up failed");
                    $('#signupFailed').show( "slow" ).delay(2000).hide( "slow" );
                    $("#username").val("");
                    $("#password").val("");
                    $("#username").focus();
                })

                .always(function () {

                });
        }
        else {
            $('#signupFailed').show("slow").delay(2000).hide("slow");
        }

});

$('#login-page').on('submit', function (event) {
    event.preventDefault();
    location.href = "login.html"

});

function updateView() {
    if (submitButton == "loginpage") {
        $('#signup-form').hide("slow");
        $('#login-page').show("slow");
    }
    else if (submitButton == "signup") {
        $('#login-page').hide("slow");
        $('#signup-form').show("slow");
    }
}
