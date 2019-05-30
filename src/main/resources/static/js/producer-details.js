function loadProducersWithPrinter() {
    var id=getQueryVariable(window.location.href);
    $.ajax(
        type:'GET';
    )

}

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        return pair[1];
    }
    return (false);
}