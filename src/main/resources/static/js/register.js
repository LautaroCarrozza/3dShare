function register() {

    if($("#password").val() === $("#confirm_password").val()) {
        $.post({
            url: "/api/user",
            data: JSON.stringify({
                name: $("#username").val(),
                password: $("#password").val(),
                email: $("#email").val(),
                postalCode: $("#postalCode").val()
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
                window.alert("Nombre de usuario no disponible");
                location.reload();
                $('#loginFailed').show("slow").delay(2000).hide("slow");
                $("#username").val("");
                $("#password").val("");
                $("#username").focus();
            })

            .always(function () {

            });
    }
    else {


        window.alert("Ingrese la misma contraseña");
        location.reload();
        $("#username").val("");
        $("#password").val("");
        $("#username").focus();
    }
}