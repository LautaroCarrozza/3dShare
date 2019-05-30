function filterRealTime() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');


    for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
    li[i].style.display = "";
    }
    else {
    li[i].style.display = "none";
    }
    }
}

function getUniquePrinters() {

    $.ajax({
        type:'GET',
        url:'/printers/unique',
        success:function (data) {
            $.each(data,function (index,element) {
                // $("#myUL").append('<li><a href="#">'+element+'</a></li>');
                var li=$('<li><a href="#">'+element+'</a></li>');
                li.attr('onClick','relocateWithParameter("'+element+'")');
                $("#myUL").append(li);
            })
        }
    })
}

function relocateWithParameter(printer) {
    location.replace("http://localhost:8080/producer-details.html?printer="+printer);

}


