function redirectCustomer() {
    window.location.href= "home-customer.html"
}

function redirectProducer() {
    window.location.href= "home-Producer.html"

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

function redirectSearchPage() {
    window.location.href= "place-order.html"

}