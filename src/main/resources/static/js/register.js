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
                        Swal.fire({
                                type: 'error',
                                title: 'Credenciales Incorrectas',
                                text: 'redireccionando en 10s',
                                timer: 10000

                            }

                        ).then(function (value) {
                            location.reload();
                        });
                    })
            })
            .fail(function () {
                Swal.fire({
                        type: 'error',
                        title: 'Nombre de usuario no disponible',
                        text: 'redireccionando en 10s',
                        timer: 10000

                    }

                ).then(function (value) {
                    location.reload();
                });

                $('#loginFailed').show("slow").delay(2000).hide("slow");
                $("#username").val("");
                $("#username").focus();
            })

            .always(function () {

            });
    }
    else {

        Swal.fire({
                type: 'error',
                title: 'Ingrese la misma contraseña',
                text: 'redireccionando en 10s',
                timer: 10000

            }

        ).then(function (value) {
            location.reload();
        });
        $("#password").val("");
        $("#username").focus();
    }
}