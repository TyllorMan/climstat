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

    $("#div-tabela-1").hide();
    $("#div-tabela-2").hide();
    $("#div-tabela-3").hide();
    $("#div-tabela-4").hide();
    $("#div-tabela-6").hide();
});

//carrega arquivos EPI.txt EPF.txt
$(document).ready(function() {
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

        var input = event.target;
        var quantidadeArquivos = $("#inputFamilias")[0].files.length;
        var quantidadeFamilias = 0;
        var linhas = new Array();
        var fileReader = new FileReader();

        fileReader.onload = function() {

            var resultado = fileReader.result;
            var familia;
            var fam = 0;

            //cria cada linha ao final do caractere \n
            linhas = resultado.trim().split('\n');

            for (var i = 0; i < linhas.length; i++) {
                linhas[i] = linhas[i].trim().replace(/  +/g, ' ').replace('FAMILY= ', 'FAMILY=').replace(' -  ', ' ').replace('MONTH= ', 'MONTH=').replace('DAY= ', 'DAY=').replace('MEMBER= ', 'MEMBER=').replace('CLASSIF= ', 'CLASSIF=').replace('TOTAL TIME= ', 'TOTAL TIME=').replace('LAST IMAGE= ', 'LAST IMAGE=').replace('DELTAX', 'DELTAX=').replace('DELTAY', 'DELTAY=').replace('*  ', '').replace('* ', '').replace('END= ', ' END=').replace('- NSYS: ', 'NSYS=');
            } //fim for

            for (var i = 0; i < linhas.length; i++) {
                //verifica se ha linhas em branco
                if (linhas[i] == "" || linhas[i] == '') {
                    //deleta linha em branco
                    //delete linhas[i];
                    linhas.splice(i, 2);
                } //fim if
            } //fim for

            for (var i = 0; i < linhas.length; i++) {
                if (linhas[i].search("FAMILY=") != -1) {
                    familia = new Familia();
                    familia.numero = parseInt(linhas[i].substr((linhas[i].search("FAMILY=") + ("FAMILY=".length)), 999999));
                    familia.ano = parseInt(linhas[i].substr((linhas[i].search("YEAR=") + ("YEAR=".length)), 4));
                    familia.mes = parseInt(linhas[i].substr((linhas[i].search("MONTH=") + ("MONTH=".length)), 2));
                    familia.dia = parseInt(linhas[i].substr((linhas[i].search("DAY=") + ("DAY=".length)), 2));
                    familia.hora = parseFloat(linhas[i].substr((linhas[i].search("HOUR=") + ("HOUR=".length)), 5));
                    familia.primeiro_membro = parseInt(linhas[i].substr((linhas[i].search("FIRST MEMBER=") + ("FIRST MEMBER=".length)), 3));
                    familia.classificacao = linhas[i].substr((linhas[i].search("CLASSIF=") + ("CLASSIF=".length)), 1);
                    familias.push(familia);
                } else if (linhas[i].search("SYS#") != -1) {
                    var contador = i + 1;

                    while (linhas[contador].search("TOTAL TIME=") == -1) {
                        var tempo = new Tempo();
                        var temp = new Array();
                        temp = linhas[contador].trim().split(' ');

                        tempo.sys = parseFloat(temp[0]);
                        tempo.xlat = parseFloat(temp[1]);
                        tempo.xlon = parseFloat(temp[2]);
                        tempo.time = parseFloat(temp[3]);
                        tempo.size = parseFloat(temp[4]);
                        tempo.dsize = parseFloat(temp[5]);
                        tempo.tmed = parseFloat(temp[6]);
                        tempo.dtmed = parseFloat(temp[7]);
                        tempo.tmin = parseFloat(temp[8]);
                        tempo.dtmin = parseFloat(temp[9]);
                        tempo.tmin9 = parseFloat(temp[10]);
                        tempo.dtmin9 = parseFloat(temp[11]);
                        tempo.cbnum = parseFloat(temp[12]);
                        tempo.cbmed = parseFloat(temp[13]);
                        tempo.vel = parseFloat(temp[14]);
                        tempo.dir = parseFloat(temp[15]);
                        tempo.incli = parseFloat(temp[16]);
                        tempo.ecce = parseFloat(temp[17]);
                        tempo.t_ini = parseFloat(temp[18]);
                        tempo.t_fin = parseFloat(temp[19]);
                        tempo.clas = temp[20];
                        tempo.sys_ant = parseFloat(temp[21]);

                        familias[fam].addTempo(tempo);
                        contador++;
                    } //fim while
                } else if (linhas[i].search("TOTAL TIME=") != -1) {
                    familias[fam].total_time = parseFloat(linhas[i].substr((linhas[i].search("TOTAL TIME=") + ("TOTAL TIME=".length)), 4));
                    familias[fam].deltax = parseFloat(linhas[i].substr((linhas[i].search("DELTAX=") + ("DELTAX=".length + 1)), 5));
                    familias[fam].deltay = parseFloat(linhas[i].substr((linhas[i].search("DELTAY=") + ("DELTAY=".length + 1)), 5));
                    familias[fam].last_image = linhas[i].substr((linhas[i].search("LAST IMAGE=") + ("LAST IMAGE=".length)), 1);
                    familias[fam].end = linhas[i].substr((linhas[i].search("END=") + ("END=".length)), 3);
                    fam++;
                    quantidadeFamilias++;
                } //fim else if
            } //fim for
            tabela6(familias.length);
        };
        fileReader.readAsText(input.files[0]);
    }); //fim change
}); //fim document ready

function tabela1(quantidadeFamilias) {
    var linha = new Tabela();
    var linhas = 13;
    var colunas = 25;

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
                if (familias[i].hora >= (h + 0) && familias[i].hora < (h + 2)) {
                    if (familias[i].mes == 1) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 2) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 3) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 4) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 5) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 6) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 7) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 8) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 9) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 10) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 11) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } else if (familias[i].mes == 12) {
                        if (familias[i].classificacao == "N") {
                            linha[0][h + 1] += 1;
                        } else {
                            linha[0][h + 2] += 1;
                        }
                    } //fim else if
                } //fim for
            } //fim for
            indice++; //incrementa variavel indice
        } //fim if
    } //fim for

    //imprime a tabela
    for (var i = 0; i < linhas; i++) {
        $('#tabela-1 > tbody:last-child').append('<tr>');
        for (var j = 0; j < colunas; j++) {
            $('#tabela-1 > tbody:last-child').append('<td>' + linha[i][j] + '</td>');
        } //fim for
    }

    $("#div-tabela-1").fadeIn(300);
}

function tabela2(quantidadeFamilias) {
    var linha = new Array(12);
    var indice = 0;
    var hora1 = 0;
    var hora2 = 2;

    for (var i = 0; i < linha.length; i++) {
        linha[i] = 0;
    }

    for (var iTeste = 0; iTeste < 25; iTeste++) {
        if (iTeste % 2 == 0) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i].classificacao == "N") {
                  var hora = familias[i].hora;

                    if (hora >= iTeste && hora < (iTeste + 2) && hora < 24)
                    {
                        if (familias[i].mes == 1) {
                            linha[0] += 1;
                        } else if (familias[i].mes == 2) {
                            linha[1] += 1;
                        } else if (familias[i].mes == 3) {
                            linha[2] += 1;
                        } else if (familias[i].mes == 4) {
                            linha[3] += 1;
                        } else if (familias[i].mes == 5) {
                            linha[4] += 1;
                        } else if (familias[i].mes == 6) {
                            linha[5] += 1;
                        } else if (familias[i].mes == 7) {
                            linha[6] += 1;
                        } else if (familias[i].mes == 8) {
                            linha[7] += 1;
                        } else if (familias[i].mes == 9) {
                            linha[8] += 1;
                        } else if (familias[i].mes == 10) {
                            linha[9] += 1;
                        } else if (familias[i].mes == 11) {
                            linha[10] += 1;
                        } else if (familias[i].mes == 12) {
                            linha[11] += 1;
                        } //fim else if
                    }
                    else if (hora >= 24) {
                        if (familias[i].mes == 1) {
                            linha[0] += 1;
                        } else if (familias[i].mes == 2) {
                            linha[1] += 1;
                        } else if (familias[i].mes == 3) {
                            linha[2] += 1;
                        } else if (familias[i].mes == 4) {
                            linha[3] += 1;
                        } else if (familias[i].mes == 5) {
                            linha[4] += 1;
                        } else if (familias[i].mes == 6) {
                            linha[5] += 1;
                        } else if (familias[i].mes == 7) {
                            linha[6] += 1;
                        } else if (familias[i].mes == 8) {
                            linha[7] += 1;
                        } else if (familias[i].mes == 9) {
                            linha[8] += 1;
                        } else if (familias[i].mes == 10) {
                            linha[9] += 1;
                        } else if (familias[i].mes == 11) {
                            linha[10] += 1;
                        } else if (familias[i].mes == 12) {
                            linha[11] += 1;
                        } //fim else if
                    }
                } //fim if classificacao
            } //fim for quantidadeFamilias

            if (iTeste == 24) {
                $("#tabela-2 > tbody").append($('<tr>').append($('<td>').append(' > ' + 24)).append($('<td>').append(linha[0])).append($('<td>').append(linha[1])).append($('<td>').append(linha[2])).append($('<td>').append(linha[3])).append($('<td>').append(linha[4])).append($('<td>').append(linha[5])).append($('<td>').append(linha[6])).append($('<td>').append(linha[7])).append($('<td>').append(linha[8])).append($('<td>').append(linha[9])).append($('<td>').append(linha[10])).append($('<td>').append(linha[11])));
            } else {
                $("#tabela-2 > tbody").append($('<tr>').append($('<td>').append(iTeste + ' ~ ' + (iTeste + 2))).append($('<td>').append(linha[0])).append($('<td>').append(linha[1])).append($('<td>').append(linha[2])).append($('<td>').append(linha[3])).append($('<td>').append(linha[4])).append($('<td>').append(linha[5])).append($('<td>').append(linha[6])).append($('<td>').append(linha[7])).append($('<td>').append(linha[8])).append($('<td>').append(linha[9])).append($('<td>').append(linha[10])).append($('<td>').append(linha[11])));
            }

            for (var e = 0; e < linha.length; e++) {
                linha[e] = 0;
            }
        }
    }

    $("#bts2").click(function() {
        $("#tabela-2").table2excel({
            name: "Excel Document Name",
            filename: "CLIMSTAT (tabela 6)",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    });

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
    var colunas = 27;
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

    /*LEVAR EM CONSNIDERACAO A CLASSIFICACAO N*/
    for (var h = 0; h < 27; h++) {
        if ((h % 2 == 0)) {
            for (var i = 0; i < quantidadeFamilias; i++) { //percorre todas as familias
                if (familias[i].hora >= (h + 0) && familias[i].hora < (h + 2)) { //verifica condicoes ncessarias para tabela
                    for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                        if (maior < parseInt(familias[i]['tempos'][j].size)) {
                            maior = parseInt(familias[i]['tempos'][j].size);
                            if (familias[i].mes == 1) {
                                linha[0][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[0][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 2) {
                                linha[1][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[1][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 3) {
                                linha[2][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[2][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 4) {
                                linha[3][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[3][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 5) {
                                linha[4][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[4][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 6) {
                                linha[5][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[5][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 7) {
                                linha[6][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[6][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 8) {
                                linha[7][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[7][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 9) {
                                linha[8][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[8][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 10) {
                                linha[9][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[9][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 11) {
                                linha[10][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[10][h + 2] = familias[i]['tempos'][j].tmin;
                            } else if (familias[i].mes == 12) {
                                linha[11][h + 1] = familias[i]['tempos'][j].ecce;
                                linha[11][h + 2] = familias[i]['tempos'][j].tmin;
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
        $('#tabela-4 > tbody:last-child').append('<tr>');
        for (var j = 0; j < colunas; j++) {
            $('#tabela-4 > tbody:last-child').append('<td>' + linha[i][j] + '</td>');
        } //fim for
    }

    $("#div-tabela-4").fadeIn(300);
} //fim function tabela4

function tabela5(quantidadeFamilias)
{

}

/*
  toadas as tebelas devem ser verificadas por:
    classificação
    latitude
    longitude
*/

function tabela6(quantidadeFamilias) {
      for (var i = 0; i < quantidadeFamilias; i++) {
        if (familias[i].classificacao == "N") {
          if(familias[i]['tempos'][0].xlat >= -2 && familias[i]['tempos'][0].xlat <= -19) {
            if (familias[i]['tempos'][0].xlon >= -34.9 && familias[i]['tempos'][0].xlon <= -47) {

            //cria nova linha
            $("#tabela-6 > tbody").append($('<tr>')
              .append($('<td>').append(familias[i].numero))
              .append($('<td>').append(familias[i].classificacao))
              .append($('<td>').append(familias[i].total_time))
              .append($('<td>').append(familias[i]['tempos'][0].xlat))
              .append($('<td>').append(familias[i]['tempos'][0].xlon)));
              }
            }
          }
    } //fim for

    $("#tabela-6").simplePagination({perPage: 10, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});

    $("#bts6").click(function() {
        $("#tabela-6").table2excel({
            name: "Excel Document Name",
            filename: "CLIMSTAT (tabela 6)",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    });

    $("#div-tabela-6").fadeIn(300);
} //fim function tabela 6

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
