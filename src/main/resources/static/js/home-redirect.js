var producersCounter = 1;

function checkAuthUser() {
    document.onload(function (ev) {
        ev.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/authUser',
            success: function (data) {
                if (data.element[0].response === 403)
                    window.location.href= "login.html";
            }
        })
    })
}
function redirectCustomer() {
    window.location.href= "home-customer.html";
}

function redirectProducer() {
    window.location.href= "home.html";

}

function goBack() {
    window.location.href= "home.html";
}

function showLoadPrinterForm() {
    $('#printer-form').show();
}

function showLoadMaterialForm() {
    $('#material-form').show();
}

function logOut(){
    $.ajax({
        url: "/api/logout",
        type: 'POST',
        success: function () {
            location.href = "login.html";
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
            $('#accordion').find('.card').remove();
            const div = document.getElementById("accordion");

            $.each(data, function(index, element) {
            const card = document.createElement("DIV");
            const card_header = document.createElement("DIV");
            const collapseDiv = document.createElement("DIV");
            const card_body = document.createElement("DIV");
            const h = document.createElement("H5");
            const button = document.createElement("BUTTON");
            const orderButton = document.createElement("BUTTON");
            const orderDiv= document.createElement("DIV");

            card.className = "card";

            card_header.className = "card-header";
            card_header.id = "headingOne";

            h.className = "mb-0";

            button.className = "btn btn-link";
            button.dataset.toggle = "collapse";
            button.dataset.target = "#collapse" + producersCounter;


            //aria expanded is false by default

            //Producers name
            button.innerHTML = element.name;

            collapseDiv.className = "collapse";
            collapseDiv.id = "collapse" + producersCounter;
            collapseDiv.dataset.parent = "#accordion";

            card_body.className = "card-body";

            //producers extra data
            card_body.innerHTML = element.email;


            orderDiv.className = "col align-self-end pl-0";
            orderButton.className = "btn btn-primary";
            orderButton.innerHTML = "Send Request";
            orderButton.dataset.toggle = "modal";
            orderButton.dataset.target = "#orderModal";
            orderButton.onclick = function () {orderForm(userId, element.id)};

            //Link everything
            orderDiv.append(orderButton);
            card_body.append(orderDiv);
            collapseDiv.append(card_body);
            h.append(button);
            card_header.append(h);
            card.append(card_header);
            card.append(collapseDiv);
            div.append(card);

            console.log(producersCounter);
            producersCounter = producersCounter + 1;
            });
        }
    });
}

function redirectMaterials() {
    window.location.href='misMateriales.html';
}
