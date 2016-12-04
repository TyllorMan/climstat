//declaracao de variaveis
var DMA = new Array();
var teste = "";
var testeArray = new Array();

$(document).ready(function() {
    //inicializacao de componentes

    new WOW().init();
    $("#sucesso").hide();
    $("#EPs").hide();
    $("#progress-bar").hide();
    $("#canvass ").hide();
    $(":file").filestyle({buttonName: "btn-primary"});

    $("#comparaTextarea").hide();
    $("#ave").hide();
    $("#comparaTable").hide();
    $("#salvar").hide();

    $("#comparaTextarea").hide();

    $("#inputFamilias").change(function() {
        //console.log(this.files);
    });
});

//carrega arquivos EPI.txt EPF.txt
$(document).ready(function() {
    //declaracao de variaveis
    var EPS = new Array();
    //acesssa input inputEPs
    $("#inputEPs").change(function() {
        //console.log(this.files);

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
        } //fim onload
        fileReader.readAsText(input.files[0]);
        $("#EPs").show();
    }); //fim inputEPs change
}); //fim document ready

//carrega arquivos dias_dol_for.txt
$(document).ready(function() {
    //decalaracao de variaveis
    $("#arquivo").change(function() {
        //saida de dados no console Crtl+Shift+i
        //console.log(this.files);
        //declaracao de variaveis
        var input = event.target;
        var fileReader = new FileReader();
        var linhas = new Array();

        //leitura do arquivo
        fileReader.onload = function() {
            var linha = new Array();
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
            //console.log(DMA.length);
        } //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim inputEPs change
});

//carrega arquivos DOL_FRA1.txt
$(document).ready(function() {
    //decalaracao de variaveis
    var EPS = new Array();
    $("#comparaDias").change(function() {
        //saida de dados no console (Crtl+Shift+i)
        //console.log(this.files);
        //declaracao de variaveis
        var input = event.target;
        var fileReader = new FileReader();
        var linhas = new Array();
        //leitura do arquivo
        fileReader.onload = function() {
            var linha = new Array();
            var resultado = fileReader.result;
            //cria cada linha ao final do caractere \n
            linhas = resultado.trim().split('\n');
            //percorretodas as linhas e separa pelo caractere \t
            for (var i = 0; i < linhas.length; i++) {
                linha.push(linhas[i].split(';'));
            } //fim for linhas
            //percorre linha por linha e controi o objeto DMA
            for (var i = 0; i < linha.length; i++) {
                var temp = new Array();
                var eps = new EPs();

                temp = linha[i];

                eps.estacao = temp[1];
                eps.lat = temp[2];
                eps.lon = temp[3];
                eps.ano = temp[4];
                eps.mes = temp[5];
                eps.dia = temp[6];
                eps.chuva = temp[7];

                EPS.push(eps);
            } //fim for linha
            //exclui linhas conhecidentes por dia mes ano
            for (var i = 0; i < EPS.length; i++) {
                for (var j = 0; j < DMA.length; j++) {
                    if (parseInt(EPS[i].ano) == parseInt(DMA[j].ano)) {
                        if (parseInt(EPS[i].mes) == parseInt(DMA[j].mes)) {
                            if (parseInt(EPS[i].dia) == parseInt(DMA[j].dia)) {
                                EPS.splice(i, 1);
                            } //fim if
                        } //fim if
                    } //fim if
                } //fim for
            } //fim for

            for (var i = 0; i < EPS.length; i++) {
                //cria nova linha
                $("#comparaTable > tbody").append($('<tr>')
                  .append($('<td>').append(EPS[i].estacao))
                  .append($('<td>').append(EPS[i].lat))
                  .append($('<td>').append(EPS[i].lon))
                  .append($('<td>').append(EPS[i].dia))
                  .append($('<td>').append(EPS[i].mes))
                  .append($('<td>').append(EPS[i].ano))
                  .append($('<td>').append(EPS[i].chuva)));

                  teste
                  += (";"
                  + EPS[i].estacao + ";"
                  + EPS[i].lat + ";"
                  + EPS[i].lon + ";"
                  + EPS[i].ano + ";"
                  + EPS[i].mes + ";"
                  + EPS[i].dia + ";"
                  + EPS[i].chuva + ";");

                  teste += '<br/>'
                  testeArray.push(teste);
            }
            console.log(teste);

          // /  console.log(testeArray);

            $("#comparaTable").simplePagination({perPage: 10, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});

            $("#comparaTextarea").val(JSON.stringify(EPS));
            $("#comparaTable").fadeIn("fast");
            $("#salvar").fadeIn("slow");

            $("#salvar").click(function() {
              downloadInnerHtml('resultado', 'comparaTextarea','text/html');
            });

        } //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim inputEPs change
}); //fim document ready

//carrega arquivos AVE_uwnd.txt
$(document).ready(function() {
    //decalaracao de variaveis
    var texto = "'define u=(ave(uwnd,t=";
    $("#AVEs").change(function() {
        //saida de dados no console (Crtl+Shift+i)
        console.log(this.files);
        //declaracao de variaveis
        var input = event.target;
        var fileReader = new FileReader();
        var linhas = new Array();

        //leitura do arquivo
        fileReader.onload = function() {
            var resultado = fileReader.result;
            //cria cada linha ao final do caractere \n
            linhas = resultado.trim().split('\n');
            //percorretodas as linhas e separa pelo caractere \t
            for (var i = 1; i <= linhas.length; i++) {
                if (i % 2 != 0) {
                    if (i == (linhas.length - 1)) {
                        texto += (linhas[i - 1] + ",t=" + linhas[(i)]);
                    } else {
                        texto += (linhas[i - 1] + ",t=" + linhas[(i)] + ')+ave(uwnd,t=');
                    } //fim else
                } //fim if
            } //fim for
            texto += ('))/' + ((linhas.length) / 2) + "'");
            console.log(texto);
        } //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim AVEs change
}); //fim document ready

function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(teste));
    link.click();
}
