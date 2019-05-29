var producersCounter = 1;
var currentProducerName;
var userId;

$.when(getUserId()).then(loadHomePage());


function getUserId() {
    $.ajax({
        url: "/api/user",
        type: 'GET',
        async: false,
        success: function (data) {
            userId = data;

        },
        error: function(error){
            console.log(error);
            $('#printer-form').hide();
            $('#material-form').hide();
        }
    });
}

function redirectCustomer() {
    window.location.href= "home-customer.html";
}

function redirectProducer() {
    window.location.href= "home.html";

}

function getProducerName(producerId) {
    $.ajax({
        type: 'GET',
        url:'/users/getName/'+ producerId,
        async: false,
        success: function (data) {
            currentProducerName = data;
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function loadHomePage() {
    var rowCOUNT=1;

    $.ajax({
        type: 'GET',
        url:'/orders/client/'+ userId,
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                //element.producer returns producer id
                console.log(data);
                getProducerName(element.producer);

                var status;
                if (element.inProgress === true)
                    status = "En progreso";
                else status = "Comunicarse con productor";

                var row = $("<tr>");

                row.append($(
                    "            <th scope=\"row\">" + rowCOUNT + "</th>\n" +
                    "            <td>"+currentProducerName+"</td>\n" +
                    "            <td>"+status+"</td>\n" +
                    "            <td>"+element.id+"</td>\n"
                ));

                rowCOUNT=rowCOUNT+1;

                $('#tbodyOfMyOrders').append(row)
            });

        },
        error: function (error) {
            console.log(error);
        }
    });
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
    window.location.href='mis-materiales.html';
}

function redirectOrders() {
    window.location.href='realizar-pedido.html'
}

function redirectPrinters() {
    window.location.href='mis-impresoras.html'
}

function redirectHome() {
    window.location.href='home.html'
}
