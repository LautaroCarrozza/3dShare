function redirectCustomer() {
    window.location.href= "home-customer.html"
}

function redirectProducer() {
    window.location.href= "home.html"

}

function goBack() {
    window.location.href= "home.html"
}

function showLoadPrinterForm() {
    $('#printer-form').show()
}

function showLoadMaterialForm() {
    $('#material-form').show()
}

function logOut(){
    $.ajax({
        url: "/api/logout",
        type: 'POST',
        success: function () {
            location.href = "login.html"
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getProducers() {

    $.ajax({
        type: 'GET',
        url: '/users/customer/getProducers',
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                $('body').append($('<div>', {
                    text: "Name: " + element.name
                        + ", Email: " + element.email
                }));
            });
        }
    });
}