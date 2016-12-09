//declaracao de variaveis
var dma = new Array();
var ep = new Array();
var epCompara = new Array();
var EPSTeste = new Array();
var comparacao = "";

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
    $("#salvarAVE").hide();
    $("#ave").hide();
    $("#comparaTextarea").hide();
    $("#inputFamilias").change(function() {
        //console.log(this.files);
    });
});

//carrega arquivos EPI.txt EPF.txt
$(document).ready(function() {
    //declaracao de variaveis
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
                ep.push(eps);
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
                var diaMesAno = new DiaMesAno();

                temp = linha[i];

                diaMesAno.dia = parseInt(temp[2]);
                diaMesAno.mes = parseInt(temp[1]);
                diaMesAno.ano = parseInt(temp[0]);

                dma.push(diaMesAno);
            } //fim for linha
        } //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim inputEPs change
});

//carrega arquivos DOL_FRA1.txt
$(document).ready(function() {
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

                eps.estacao = parseInt(temp[1]);
                eps.lat = parseInt(temp[2]);
                eps.lon = parseInt(temp[3]);
                eps.ano = parseInt(temp[4]);
                eps.mes = parseInt(temp[5]);
                eps.dia = parseInt(temp[6]);
                eps.chuva = parseInt(temp[7]);
                //debugger;
                epCompara.push(eps);
            } //fim for linha

            var j = 0;
            var achou = false;
            //exclui linhas conhecidentes por ano mes dia
            try {
                for (var i = 0; i < epCompara.length; i++) {
                    while (achou == false && j < dma.length) {
                        if (epCompara[i].ano == dma[j].ano) { //verifica se os anos sao iguais
                            if (epCompara[i].mes == dma[j].mes) {//verifica se os meses sao iguais
                                if (epCompara[i].dia == dma[j].dia) {//verifica se os dias sao iguais
                                    achou = true; //informa que achou linhas coincidentes
                                    epCompara.splice(i, 1); //remove o indice duplicado entre os arquivos
                                } //fim if
                            } //fim if
                        } //fim if
                        j++; //incremente o j (j = j + 1)
                    } //fim while
                    j = 0; //zera o j
                    achou = false; //reseta a variavel para o estado inicial
                } //fim for

                for (var i = 0; i < epCompara.length; i++) {
                    //cria nova linha
                    $("#comparaTable > tbody").append($('<tr>').append($('<td>').append(epCompara[i].estacao)).append($('<td>').append(epCompara[i].lat)).append($('<td>').append(epCompara[i].lon)).append($('<td>').append(epCompara[i].dia)).append($('<td>').append(epCompara[i].mes)).append($('<td>').append(epCompara[i].ano)).append($('<td>').append(epCompara[i].chuva)));
                    comparacao += (";" + epCompara[i].estacao + ";" + epCompara[i].lat + ";" + epCompara[i].lon + ";" + epCompara[i].ano + ";" + epCompara[i].mes + ";" + epCompara[i].dia + ";" + epCompara[i].chuva + ";");
                    comparacao += '<br/>'
                } //fim for

                $("#comparaTable").simplePagination({perPage: 10, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});
                $("#comparaTextarea").val(JSON.stringify(epCompara));
                $("#comparaTable").fadeIn("fast");
                $("#salvar").fadeIn("slow");
                $("#salvar").click(function() {
                    downloadInnerHtml('resultado', comparacao, 'text/html');
                });
            } catch (err) {
                console.log(err.message);
            } //fim catch
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
            $("#salvarAVE").fadeIn("slow");
            $("#salvarAVE").click(function() {
                downloadInnerHtml('resultado', texto, 'text/html');
            });
        } //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim AVEs change
}); //fim document ready

function downloadInnerHtml(filename, elId, mimeType) {
    var link = document.createElement('a');
    mimeType = mimeType || 'text/html';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elId));
    link.click();
}
