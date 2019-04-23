
$('#printer-form').click(function (event) {
    event.preventDefault();

    let url = "/users/producer/" + $("#username").val() + "/addPrinter";

    $.post({
        url: url,
        data: JSON.stringify({
            model: $("#printer-model").val()
        }),
        dataType: "text",
        contentType: "application/json"
    })
        .done(function () {
            console.log("Printer added");
            $('#printer-form').hide();

        })
        .fail(function () {
            console.log("Fail to add printer");
            $('#printer-form').hide();
        })

        .always(function () {

        });

});
// $('#printer-form').on('submit', function (event) {
//     event.preventDefault();
//
//     let url = "/users/producer/" + $("#username").val() + "/addPrinter";
//
//     $.post({
//         url: url,
//         data: JSON.stringify({
//             model: $("#printer-model").val()
//         }),
//         dataType: "text",
//         contentType: "application/json"
//     })
//         .done(function () {
//             console.log("Printer added");
//             $('#printer-form').hide();
//
//         })
//         .fail(function () {
//             console.log("Fail to add printer");
//             $('#printer-form').hide();
//         })
//
//         .always(function () {
//
//         });
//
// });