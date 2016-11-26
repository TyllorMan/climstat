$(document).ready(function() {
    new WOW().init();
    $("#sucesso").hide();
    $("#progress-bar").hide();
    $("#output").hide();

    $(":file").filestyle({buttonName: "btn-primary"});
});
