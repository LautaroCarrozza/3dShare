let submitButton;
updateView();

$(function() {
    $('.submitbutton').click(function () {
        submitButton = $(this).attr('name')
        updateView();
    });

});


$('#printer-form').on('submit', function () {
    //$('.submitbutton').click(function () {

        //let url = "/users/producer/" + $("#username").val() + "/addPrinter";

        $.post("/users/producer/1/addPrinter", {
            model: $("#printer-model").val()
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

function updateView() {
    if (submitButton == "loadPrinter") {
        $('#printer-form').show();
    }
}

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
