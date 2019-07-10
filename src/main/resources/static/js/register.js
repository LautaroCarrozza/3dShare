function register() {
    $('#locationModal').on('show.bs.modal', function(){
        setTimeout(function() {
            map.invalidateSize();
        }, 10);
    });
    if($("#password").val() === $("#confirm_password").val()) {
        $.post({
            url: "/api/user",
            data: JSON.stringify({
                name: $("#username").val(),
                password: $("#password").val(),
                email: $("#email").val(),
                latitude: $("#lat").html(),
                longitude: $("#lng").html(),
                city: $("#city").val()
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
                    .fail(function (error) {
                        console.log(error);
                        window.alert("login failed");
                    })
            })
            .fail(function () {
                window.alert("Nombre de usuario no disponible");
                $('#loginFailed').show("slow").delay(2000).hide("slow");
                $("#username").val("");
                $("#username").focus();
            })

            .always(function () {

            });
    }
    else {

        window.alert("Ingrese la misma contraseña");
        $("#password").val("");
        $("#username").focus();
    }
}