var userId;

getUserId();

$(function() {
    $('.submitbutton').click(function () {
        $('#printer-form').show();
    });

});


$('#printer-form').on('submit', function () {

        let url = "/users/producer/" + userId + "/addPrinter";

        $.post(url, {
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

function getUserId() {
    $.ajax({
        url: "/api/user",
        type: 'GET',
        success: function (data) {
            userId = data;
        },
        error: function(error){
            console.log(error);
            $('#printer-form').hide();
        }
    });
}
