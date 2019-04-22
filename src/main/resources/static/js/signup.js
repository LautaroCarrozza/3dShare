let submitButton;
updateView();

$(function() {
    $('.submitbutton').click(function () {
        submitButton = $(this).attr('name')
    });

});

$('#signup-form').on('submit', function (event) {
    event.preventDefault();

    if (submitButton == "signup") {
        if($("#password") === $("#confirmPwd")){
            $.post("/users/add",
                {
                    name: $("#username").val(),
                    password: $("#password").val(),
                    email: $("#email").val()
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
                    console.log("login failed");
                    $('#loginFailed').show( "slow" ).delay(2000).hide( "slow" );
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
    }
    else if (submitButton == "loginpage") {
        location.href = "login.html"
    }

});

function updateView() {
    $('#signup-form').show("slow");
}
