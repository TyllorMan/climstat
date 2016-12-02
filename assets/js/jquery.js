//inicializacao de componentes
$(document).ready(function() {
    new WOW().init();
    $("#sucesso").hide();
    $("#EPs").hide();
    $("#progress-bar").hide();
    $("#canvass ").hide();
    $(":file").filestyle({buttonName: "btn-primary"});

    $("#inputFamilias").change(function() {
        console.log(this.files);
    });
});

//carrega arquivos EPI EPF
$(document).ready(function() {
    //declaracao de variaveis
    var EPS = new Array();
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
                var eps = new EPs();

                temp = linha[i];

                eps.lat = temp[0];
                eps.lon = temp[1];
                eps.ano = temp[2];
                eps.mes = temp[3];
                eps.dia = temp[4];

                //cria nova linha
                $("#EPs > tbody").append($('<tr>').append($('<td>').append(eps.dia)).append($('<td>').append(eps.mes)).append($('<td>').append(eps.ano)).append($('<td>').append(eps.lat)).append($('<td>').append(eps.lon)));
                //adiciona novo eps em EPs
                EPS.push(eps);
            } //fim for linha
            //monta a paginacao da tabela
            $("#EPs").simplePagination({perPage: 7, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});
            //debugger;
        } //fim onload
        fileReader.readAsText(input.files[0]);
        $("#EPs").show();
    }); //fim inputEPs change
}); //fim document ready

$(document).ready(function() {
    //decalaracao de variaveis
    var DMA = new Array();
    $("#arquivo").change(function() {
        //saida de dados no console Crtl+Shift+i
        console.log(this.files);

        //declaracao de variaveis
        var input = event.target;
        var fileReader = new FileReader();
        var linhas = new Array();
        var linha = new Array();

        //leitura do arquivo
        fileReader.onload = function() {

            var resultado = fileReader.result;
            //cria cada linha ao final do caractere \n
            linhas = resultado.split('\n');
            //percorretodas as linhas e separa pelo caractere \t
            for (var i = 0; i < linhas.length; i++) {
                linha.push(linhas[i].split('\t'));
            }
            //percorre linha por linha e controi o objeto DMA
            for (var i = 0; i < linha.length; i++) {
                var temp = new Array();
                var dma = new diaMesAno();

                temp = linha[i];

                dma.dia = temp[2];
                dma.mes = temp[1];
                dma.ano = temp[0];

                DMA.push(dma);
            } //fim for linha
        } //fim onload
        fileReader.readAsText(input.files[0]);
        $("#EPs").show();
        console.log(DMA);
    }); //fim inputEPs change
});

$(document).ready(function() {
    //decalaracao de variaveis
    var EPS = new Array();
    $("#comparaDias").change(function() {
        //saida de dados no console (Crtl+Shift+i)
        console.log(this.files);
        //declaracao de variaveis
        var input = event.target;
        var fileReader = new FileReader();
        var linhas = new Array();
        var linha = new Array();

        //leitura do arquivo
        fileReader.onload = function() {

            var resultado = fileReader.result;
            //cria cada linha ao final do caractere \n
            linhas = resultado.trim().split('\n');
            //percorretodas as linhas e separa pelo caractere \t
            for (var i = 0; i < linhas.length; i++) {
              linha.push(linhas[i].split(';'));
            }

            //percorre linha por linha e controi o objeto DMA
            for (var i = 0; i < linha.length; i++) {
                var temp = new Array();
                var eps = new EPs();

                temp = linha[i];

                eps.dia = temp[1];
                eps.mes = temp[2];
                eps.ano = temp[3];
                eps.ano = temp[4];
                eps.ano = temp[5];
                eps.ano = temp[6];
                eps.ano = temp[7];

                EPS.push(eps);
            } //fim for linha
        } //fim onload
        fileReader.readAsText(input.files[0]);
        $("#EPs").show();
        console.log(DMA);
    }); //fim inputEPs change
});
