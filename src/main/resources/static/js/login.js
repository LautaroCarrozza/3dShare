function logIn(){

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
        })

        .always(function () {

        });
}

function signUp() {
    location.href = "register.html";
}