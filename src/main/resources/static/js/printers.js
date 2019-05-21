function loadPrinters() {

}

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