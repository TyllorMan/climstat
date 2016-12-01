$(document).ready(function() {
    new WOW().init();
    $("#sucesso").hide();
    $("#EPs").hide();
    $("#progress-bar").hide();
    $("#canvass ").hide();

    //$("#tabela ").DataTable();
    $(":file").filestyle({buttonName: "btn-primary"});

    // detect a change in a file input with an id of “the-file-input”
    $("#inputFamilias").change(function() {
        // will log a FileList object, view gifs below
        console.log(this.files);
    });
});

//carrega arquivos EPI EPF
$(document).ready(function() {
    //acesssa input inputEPs
    $("#inputEPs").change(function() {
        console.log(this.files);

        var input = event.target;
        var fileReader = new FileReader();
        var linhas = new Array();

        fileReader.onload = function() {

            var linha = new Array();
            var resultado = fileReader.result;
            linhas = resultado.split('\n');

            for (var i = 0; i < linhas.length; i++) {
                linha.push(linhas[i].split('\t'));
            }

            for (var i = 0; i < linha.length; i++) {
                var temp = new Array();
                var eps = new EPI();

                temp = linha[i];

                eps.lat = temp[0];
                eps.lon = temp[1];
                eps.ano = temp[2];
                eps.mes = temp[3];
                eps.dia = temp[4];
                $("#EPs > tbody").append($('<tr>').append($('<td>').append(eps.dia)).append($('<td>').append(eps.mes)).append($('<td>').append(eps.ano)).append($('<td>').append(eps.lat)).append($('<td>').append(eps.lon)));
                //adiciona novo eps em EPs
                EPs.push(eps);
            } //fim for linha
            $("#EPs").simplePagination({perPage: 10, containerClass: '', previousButtonClass: '', nextButtonClass: '', currentPage: 1});
            debugger;
        } //fim onload
        fileReader.readAsText(input.files[0]);
        $("#EPs").show();

    });//fim inputEPs change
});//fim document ready
