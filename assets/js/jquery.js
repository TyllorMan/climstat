//declaracao de variaveis
var dma = new Array();
var ep = new Array();
var epCompara = new Array();
var comparacao = "";
var familias = new Array();

//inicializacao de componentes
$(document).ready(function() {
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
    $("#div-tabela-2").hide();
    $("#div-tabela-3").hide();
    $("#div-tabela-4").hide();
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
        }; //fim onload

        fileReader.readAsText(input.files[0]);
        $("#EPs").show();
    }); //fim inputEPs change
}); //fim document ready

//carrega arquivos dias_dol_for.txt
$(document).ready(function() {
    //decalaracao de variaveis
    $("#arquivo").change(function() {
        //saida de dados no console Crtl+Shift+i
        console.log(this.files);
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
                var temp = new Array(); //a cada iteracao cria novo objeto temp
                var diaMesAno = new DiaMesAno(); //a cada iteracao cria novo objeto diaMesAno

                temp = linha[i];

                diaMesAno.dia = parseInt(temp[2]);
                diaMesAno.mes = parseInt(temp[1]);
                diaMesAno.ano = parseInt(temp[0]);

                dma.push(diaMesAno); //a cada iteracao do laco adiciona novo objeto
            } //fim for linha
        }; //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim inputEPs change
}); //document ready

//carrega arquivos DOL_FRA1.txt
$(document).ready(function() {
    $("#comparaDias").change(function() {
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

            var j = 0; //necessario para percorrer todos os dias, meses e anos
            var achou = false;
            //exclui linhas conhecidentes por ano mes dia
            try {
                for (var i = 0; i < epCompara.length; i++) {
                    while (achou == false && j < dma.length) {
                        if (epCompara[i].ano == dma[j].ano) { //verifica se os anos sao iguais
                            if (epCompara[i].mes == dma[j].mes) { //verifica se os meses sao iguais
                                if (epCompara[i].dia == dma[j].dia) { //verifica se os dias sao iguais
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
        }; //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim inputEPs change
}); //fim document ready

//carrega arquivos AVE_uwnd.txt
$(document).ready(function() {
    //decalaracao de variaveis
    var texto = "'define u=(ave(uwnd,t=";
    $("#AVEs").change(function() {
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
        }; //fim onload
        fileReader.readAsText(input.files[0]);
    }); //fim AVEs change
}); //fim document ready

//carrega arquivos fam1005_s2.txt
$(document).ready(function() {
    $("#inputFamilias").change(function() {
        var reader = new FileReader();
        var input = event.target;
        var concat = "";

        console.log(concat);

        reader.onload = function() {
            var text = reader.result;
            //var tamanho = reader.result.length;
            //console.log("result.length: " + tamanho);
            var ponteiro = 0;
            var flag = 0;
            var count = 0;

            while (ponteiro != -1) { //implementacao Aquiles
                //console.log("result.length: " + tamanho);
                var linhaF = reader.result.indexOf('FAMILY', ponteiro);
                var linhaS = reader.result.indexOf('SYS#', ponteiro);
                var str_familia = reader.result.substring(linhaF, linhaS);
                //console.log(str_familia.trim());
                var inicioDalinha = 0;
                // fimDalinha=linhaS;
                fimDalinha = ponteiro;
                var fimFamilia = reader.result.indexOf('TOTAL TIME', ponteiro);
                //console.log('fimFamilia:'+fimFamilia);
                while (fimDalinha < fimFamilia) {
                    inicioDalinha = reader.result.indexOf('\n', fimDalinha) + 1;
                    //console.log('inicioDaLinha:'+inicioDalinha);
                    fimDalinha = reader.result.indexOf('\n', inicioDalinha + 2);

                    if (flag == 0) {
                        inicioDalinha = 0;
                    }

                    flag = 1;
                    //console.log('fimDalinha:'+fimDalinha);
                    var vetor = new Array();
                    var vfinal = new Array();
                    var linha = reader.result.substring(inicioDalinha, fimDalinha);

                    vetor = linha.trim().split(' ');

                    for (var i = 0; i < vetor.length; i++) {
                        if (vetor[i] != "")
                            vfinal.push(vetor[i]);
                        }

                    if (count == 0) {
                        var familia = new Familia();
                        //console.log("Criando familia " + familias.length);
                        familia.numero = vfinal[1];
                        //console.log(familia.numero+" = " + vfinal[1]);
                        familia.ano = vfinal[3].substring(vfinal[3].indexOf('=') + 1, vfinal[3].length);
                        familia.mes = vfinal[5];
                        familia.dia = vfinal[7];
                        familia.hora = vfinal[8].substring(vfinal[8].indexOf('=') + 1, vfinal[8].length);
                        familias.push(familia);
                        count++;
                    } else {
                        if (vfinal[0] == "TOTAL") {
                            count = 0;

                            familias[familias.length - 1].total_time = vfinal[2];
                            familias[familias.length - 1].deltax = vfinal[4];
                            familias[familias.length - 1].deltay = vfinal[6];
                            familias[familias.length - 1].last_image = vfinal[9];
                            //familias[familias.length-1].end=vfinal[10].substring(vfinal[10].indexOf('=')+1,vfinal[10].length);
                            //console.log("   -  Terminando ");
                        } else {
                            if (vfinal[0] != "SYS#") {
                                //console.log("   -  Criando tempo "+vfinal[1]);
                                var tempo = new Tempo();
                                if (vfinal[0] == '*') {
                                    tempo.asterisco = vfinal[0];
                                    tempo.sys = vfinal[1];
                                    tempo.xlat = vfinal[2];
                                    tempo.xlon = vfinal[3];
                                    tempo.time = vfinal[4];
                                    tempo.size = vfinal[5];
                                    tempo.dsize = vfinal[6];
                                    tempo.tmed = vfinal[7];
                                    tempo.dtmed = vfinal[8];
                                    tempo.tmin = vfinal[9];
                                    tempo.dtmin = vfinal[10];
                                    tempo.tmin9 = vfinal[11];
                                    tempo.dtmin9 = vfinal[12];
                                    tempo.cbnum = vfinal[13];
                                    tempo.cbmed = vfinal[14];
                                    tempo.vel = vfinal[15];
                                    tempo.dir = vfinal[16];
                                    tempo.incli = vfinal[17];
                                    tempo.ecce = vfinal[18];
                                    tempo.t_ini = vfinal[19];
                                    tempo.t_fin = vfinal[20];
                                    tempo.clas = vfinal[21];
                                    tempo.sys_ant = vfinal[22];
                                } else {
                                    tempo.asterisco = '';
                                    tempo.sys = vfinal[0];
                                    tempo.xlat = vfinal[1];
                                    tempo.xlon = vfinal[2];
                                    tempo.time = vfinal[3];
                                    tempo.size = vfinal[4];
                                    tempo.dsize = vfinal[5];
                                    tempo.tmed = vfinal[6];
                                    tempo.dtmed = vfinal[7];
                                    tempo.tmin = vfinal[8];
                                    tempo.dtmin = vfinal[9];
                                    tempo.tmin9 = vfinal[10];
                                    tempo.dtmin9 = vfinal[11];
                                    tempo.cbnum = vfinal[12];
                                    tempo.cbmed = vfinal[13];
                                    tempo.vel = vfinal[14];
                                    tempo.dir = vfinal[15];
                                    tempo.incli = vfinal[16];
                                    tempo.ecce = vfinal[17];
                                    tempo.t_ini = vfinal[18];
                                    tempo.t_fin = vfinal[19];
                                    tempo.clas = vfinal[20];
                                    tempo.sys_ant = vfinal[21];
                                } //fim else
                                familias[familias.length - 1].addTempo(tempo);
                            } //fim if SYS
                        } //fim else
                    } //fim else
                } //fim while
                ponteiro = reader.result.indexOf('END', ponteiro + 1);
            } //fim while
            tabela2(familias.length);
            tabela3(familias.length);
            tabela4(familias.length);
        }; //fim onload

        reader.readAsText(input.files[0]);
    }); //fim onchange
}); //fim document ready

function tabela2(quantidadeFamilias) {
    var linha = new Tabela();
    var linhas = 12;
    var colunas = 13;

    //inicia matriz para guardar as informacoes
    for (i = 0; i < linhas; i++) {
        linha[i] = new Linha();
        for (j = 0; j < colunas; j++) {
            linha[i][j] = 0;
        } //fim for
    } //fim for

    var indice = 0;

    for (var h = 0; h < 25; h++) {
        if ((h % 2 == 0)) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i].hora >= (h + 0) && familias[i].hora < (h + 2)) {
                    if (familias[i].mes == 1) {
                        linha[indice][0] += 1;
                    } else if (familias[i].mes == 2) {
                        linha[indice][1] += 1;
                    } else if (familias[i].mes == 3) {
                        linha[indice][2] += 1;
                    } else if (familias[i].mes == 4) {
                        linha[indice][3] += 1;
                    } else if (familias[i].mes == 5) {
                        linha[indice][4] += 1;
                    } else if (familias[i].mes == 6) {
                        linha[indice][5] += 1;
                    } else if (familias[i].mes == 7) {
                        linha[indice][6] += 1;
                    } else if (familias[i].mes == 8) {
                        linha[indice][7] += 1;
                    } else if (familias[i].mes == 9) {
                        linha[indice][8] += 1;
                    } else if (familias[i].mes == 10) {
                        linha[indice][9] += 1;
                    } else if (familias[i].mes == 11) {
                        linha[indice][10] += 1;
                    } else if (familias[i].mes == 12) {
                        linha[indice][11] += 1;
                    }
                } //fim for
            } //fim for quantidadeFamilias
            indice++;
        } //fim if
    } //fim for linhas

    var temp1 = 0;
    var temp2 = 2;

    //imprime a tabela
    for (var i = 0; i < linhas; i++) {
        $("#tabela-2 > tbody").append($('<tr>').append($('<td>').append((temp1 + 0) + " ~ " + (temp2))). //.addClass("info")
                append($('<td>').append(linha[i][0])).append($('<td>').append(linha[i][1])).append($('<td>').append(linha[i][2])).append($('<td>').append(linha[i][3])).append($('<td>').append(linha[i][4])).append($('<td>').append(linha[i][5])).append($('<td>').append(linha[i][6])).append($('<td>').append(linha[i][7])).append($('<td>').append(linha[i][8])).append($('<td>').append(linha[i][9])).append($('<td>').append(linha[i][10])).append($('<td>').append(linha[i][11])));
        temp1 += 2; //temp1 = temp1 + 2
        temp2 += 2 //temp2 = temp2 + 2
    } //fim for

    $("#div-tabela-2").fadeIn(300);
}

function tabela3(quantidadeFamilias) {
    //definicao de variaveis
    var maior = 0;
    var linhas = 12;
    var colunas = 13;
    var linha = new Tabela();

    //inicia matriz para guardar as informacoes
    for (i = 0; i < linhas; i++) {
        linha[i] = new Linha();
        for (j = 0; j < colunas; j++) {
            linha[i][j] = 0;
        } //fim for
    } //fim for

    var indice = 0;

    for (var h = 0; h < 25; h++) {
        if ((h % 2 == 0)) {
            for (var i = 0; i < quantidadeFamilias; i++) { //percorre todas as familias
                if (familias[i].hora >= (h + 0) && familias[i].hora < (h + 2)) { //verifica condicoes ncessarias para tabela
                    for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                        if (maior < parseInt(familias[i]['tempos'][j].size)) {
                            maior = parseInt(familias[i]['tempos'][j].size);
                            if (familias[i].mes == 1) {
                                linha[indice][0] = maior;
                            } else if (familias[i].mes == 2) {
                                linha[indice][1] = maior;
                            } else if (familias[i].mes == 3) {
                                linha[indice][2] = maior;
                            } else if (familias[i].mes == 4) {
                                linha[indice][3] = maior;
                            } else if (familias[i].mes == 5) {
                                linha[indice][4] = maior;
                            } else if (familias[i].mes == 6) {
                                linha[indice][5] = maior;
                            } else if (familias[i].mes == 7) {
                                linha[indice][6] = maior;
                            } else if (familias[i].mes == 8) {
                                linha[indice][7] = maior;
                            } else if (familias[i].mes == 9) {
                                linha[indice][8] = maior;
                            } else if (familias[i].mes == 10) {
                                linha[indice][9] = maior;
                            } else if (familias[i].mes == 11) {
                                linha[indice][10] = maior;
                            } else if (familias[i].mes == 12) {
                                linha[indice][11] = maior;
                            } //fim else if
                        } //fim if
                    } //fim for
                } //fim if
            } //fim for
            indice++; //incrementa variavel indice
            maior = 0; //zera variavel maior
        } //fim if
    } //fim for

    var temp1 = 0;
    var temp2 = 2;

    //imprime a tabela
    for (var i = 0; i < linhas; i++) {
        $("#tabela-3 > tbody").append($('<tr>').append($('<td>').append((temp1 + 0) + " ~ " + (temp2))). //.addClass("info")
                append($('<td>').append(linha[i][0])).append($('<td>').append(linha[i][1])).append($('<td>').append(linha[i][2])).append($('<td>').append(linha[i][3])).append($('<td>').append(linha[i][4])).append($('<td>').append(linha[i][5])).append($('<td>').append(linha[i][6])).append($('<td>').append(linha[i][7])).append($('<td>').append(linha[i][8])).append($('<td>').append(linha[i][9])).append($('<td>').append(linha[i][10])).append($('<td>').append(linha[i][11])));

        temp1 += 2; //temp1 = temp1 + 2
        temp2 += 2 //temp2 = temp2 + 2
    } //fim for
    $("#div-tabela-3").fadeIn(300);
} //fim function

function tabela4(quantidadeFamilias) {
    var maior = 0;
    var linhas = 13;
    var colunas = 8;
    var linha = new Tabela();

    var monthNames = [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ",
        "MEDIA"
    ];

    //inicia matriz para guardar as informacoes
    for (i = 0; i < linhas; i++) {
        linha[i] = new Linha();
        for (j = 0; j < colunas; j++) {
            linha[i][j] = 0;
        }
    }

    var indice = 0; //variavel pra percorrer os indices das linhas

    for (var h = 0; h < 25; h++) {
        if ((h % 2 == 0)) {
            for (var i = 0; i < quantidadeFamilias; i++) { //percorre todas as familias
                if (familias[i].hora >= (h + 0) && familias[i].hora < (h + 2)) { //verifica condicoes ncessarias para tabela
                    for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                        if (maior < parseInt(familias[i]['tempos'][j].size)) {
                            maior = parseInt(familias[i]['tempos'][j].size);
                            if (familias[i].mes == 1) {
                                linha[indice][0] = maior;
                            } else if (familias[i].mes == 2) {
                                linha[indice][1] = maior;
                            } else if (familias[i].mes == 3) {
                                linha[indice][2] = maior;
                            } else if (familias[i].mes == 4) {
                                linha[indice][3] = maior;
                            } else if (familias[i].mes == 5) {
                                linha[indice][4] = maior;
                            } else if (familias[i].mes == 6) {
                                linha[indice][5] = maior;
                            } else if (familias[i].mes == 7) {
                                linha[indice][6] = maior;
                            } else if (familias[i].mes == 8) {
                                linha[indice][7] = maior;
                            } //fim else if
                        } //fim if
                    } //fim for
                } //fim if
            } //fim for
            indice++; //incrementa variavel indice
            maior = 0; //zera variavel maior
        } //fim else if
    } //fim for

    var temp1 = 0;
    var temp2 = 2;

    //imprime a tabela
    for (var i = 0; i < linhas; i++) {
        $("#tabela-4 > tbody").append($('<tr>').append($('<td>').append(monthNames[i])). //.addClass("info")
                append($('<td>').append(linha[i][0])).append($('<td>').append(linha[i][1])).append($('<td>').append(linha[i][2])).append($('<td>').append(linha[i][3])).append($('<td>').append(linha[i][4])).append($('<td>').append(linha[i][5])).append($('<td>').append(linha[i][6])).append($('<td>').append(linha[i][7])));
    } //fim for
    $("#div-tabela-4").fadeIn(300);
} //fim function tabela4

function downloadInnerHtml(filename, elId, mimeType) {
    var link = document.createElement('a');
    mimeType = mimeType || 'text/html';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elId));
    link.click();
} //fim downloadInnerHtml

function imprimirFamilias() {
    for (var i = 0; i < familias.length; i++) {
        familias[i].print();
    }
} //fim imprimirFamilias
