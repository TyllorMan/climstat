//declaracao de variaveis
var comparacao = "";
var dma = new Array();
var ep = new Array();
var epCompara = new Array();
var epListado = new Array();
var familias = new Array();
var tabelas = new Array();
var testeArray = new Array();
var madrugada = 0;
var manha = 0;
var tarde = 0;
var noite = 0;

//inicializacao de componentes
$(document).ready(function() {
    new WOW().init();

    $("#sucesso").hide();
    $(":file").filestyle({buttonName: "btn-primary"});
    $("#comparaTextarea").hide();
    $("#ave").hide();
    $("#comparaTable").hide();
    $("#salvar").hide();
    $("#salvarAVE").hide();
    $("#comparaTextarea").hide();

    $("#loader").hide();

    $("#combobox").hide();

    $("#bt-salvar-eps").hide();

    $(".dropdown-menu a").click(function() {
        tabela6(familias.length, $(this).text());
    });

    //tabelas
    $("#tabela-EPs").hide();
    $("#div-tabela-1").hide();
    $("#div-tabela-2").hide();
    $("#div-tabela-3").hide();
    $("#div-tabela-4").hide();
    $("#div-tabela-5").hide();
    $("#div-tabela-6").hide();
    $("#div-tabela-7").hide();
});

//carrega arquivos EPI.txt EPF.txt
$(document).ready(function() {
    //acesssa input inputEPs
    $("#inputEPs").change(function() {
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
                $("#tabela-EPs > tbody").append($('<tr>').append($('<td>').append(eps.dia)).append($('<td>').append(eps.mes)).append($('<td>').append(eps.ano)).append($('<td>').append(eps.lat)).append($('<td>').append(eps.lon)));
                //adiciona novo eps em EPs
                ep.push(eps);
            } //fim for linha
            //monta a paginacao da tabela
            $("#tabela-EPs").simplePagination({perPage: 5, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});
        }; //fim onload
        fileReader.readAsText(input.files[0]);
        //mostra a tabela
        $("#tabela-EPs").fadeIn("slow");
        //mostra o botao salvar
        $("#bt-salvar-eps").fadeIn("slow");
        //funcao para slavar a tabela em aruqivo .xls
        $("#bt-salvar-eps").click(function() {
            $("#tabela-EPs").table2excel({
                name: "Excel Document Name",
                filename: "EPs",
                fileext: ".xls",
                exclude_img: true,
                exclude_links: true,
                exclude_inputs: true
            });
        });
    }); //fim inputEPs change
}); //fim document ready

//carrega arquivos dias_dol_for.txt
$(document).ready(function() {
    //decalaracao de variaveis
    $("#arquivo").change(function() {
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
                        j++; //incrementa o j (j = j + 1)
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
        var files = $("#inputFamilias")[0].files;
        var quantidadeArquivos = $("#inputFamilias")[0].files.length;
        var quantidadeFamilias = 0;
        var soma = 0;
        var file;
        var familia;
        var cont = 0;

        for (cont = 0; cont < quantidadeArquivos; cont++) {
            const fileReader = new FileReader();

            fileReader.onload = function(evento) {
                var resultado = fileReader.result;
                var fam = 0;
                var linhas = new Array();

                //cria cada linha ao final do caractere \n
                linhas = resultado.trim().split('\n');

                for (var i = 0; i < linhas.length; i++) {
                    linhas[i] = linhas[i].trim().replace(/  +/g, ' ').replace('FAMILY= ', 'FAMILY=').replace(' -  ', ' ').replace('MONTH= ', 'MONTH=').replace('DAY= ', 'DAY=').replace('MEMBER= ', 'MEMBER=').replace('CLASSIF= ', 'CLASSIF=').replace('TOTAL TIME= ', 'TOTAL TIME=').replace('LAST IMAGE= ', 'LAST IMAGE=').replace('DELTAX', 'DELTAX=').replace('DELTAY', 'DELTAY=').replace('*  ', '').replace('* ', '').replace('END= ', ' END=').replace('- NSYS: ', 'NSYS=');
                } //fim for linhas.length

                for (var i = 0; i < linhas.length; i++) {
                    //verifica se ha linhas em branco
                    if (linhas[i] == "" || linhas[i] == '') {
                        //deleta linha em branco
                        //delete linhas[i];
                        linhas.splice(i, 2);
                    } //fim if linhas
                } //fim for linhas.length

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
                } //fim for new familia

                tabela7(familias.length);
            }; //fim fileReader.onload
            fileReader.readAsText(input.files[cont]);
        }
    }); //fim change
}); //fim document ready

/*
  todas as tebelas devem ser verificadas por:
  classificação
  latitude
  longitude
*/

/*
  Tipos de classificação

  N (geracao expontanea)
  NOR (dissipacao natural)
  S (split)
  C (continuidade)
  M (merger)
*/

function tabela1(quantidadeFamilias) {
    var quantidadeEPS = ep.length;

    var meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
        "Total"
    ];

    var matriz = new Array(13);

    //monta a matriz matriz[13][24]
    for (var i = 0; i < 13; i++) {
        matriz[i] = new Array(26);
    }

    //inicializa a matriz
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 27; j++) {
            //percorre 26 colunas
            matriz[i][j] = 0;
        }
    }

    //inicializa a matriz
    for (var i = 0; i < 13; i++) {
        matriz[i][0] = meses[i];
    }

    try {
        var index = 0;
        for (var temp = 0; temp < 13; temp++) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                    if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                        for (var j = 0; j < quantidadeEPS; j++) {
                            if (familias[i].ano == ep[j].ano) {
                                if (familias[i].mes == ep[j].mes) {
                                    if (familias[i].dia == ep[j].dia) {
                                        if (index >= 24 && familias[i].total_time >= 24) {
                                            epListado.push(ep[j]);
                                            if (familias[i].mes == 1) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[0][25] += 1;
                                                } else {
                                                    matriz[0][26] += 1;
                                                }
                                            } else if (familias[i].mes == 2) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[1][25] += 1;
                                                } else {
                                                    matriz[1][26] += 1;
                                                }
                                            } else if (familias[i].mes == 3) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[2][25] += 1;
                                                } else {
                                                    matriz[2][26] += 1;
                                                }
                                            } else if (familias[i].mes == 4) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[3][25] += 1;
                                                } else {
                                                    matriz[3][26] += 1;
                                                }
                                            } else if (familias[i].mes == 5) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[4][25] += 1;
                                                } else {
                                                    matriz[4][26] += 1;
                                                }
                                            } else if (familias[i].mes == 6) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[5][25] += 1;
                                                } else {
                                                    matriz[5][26] += 1;
                                                }
                                            } else if (familias[i].mes == 7) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[6][25] += 1;
                                                } else {
                                                    matriz[6][26] += 1;
                                                }
                                            } else if (familias[i].mes == 8) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[7][25] += 1;
                                                } else {
                                                    matriz[7][26] += 1;
                                                }
                                            } else if (familias[i].mes == 9) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[8][25] += 1;
                                                } else {
                                                    matriz[8][26] += 1;
                                                }
                                            } else if (familias[i].mes == 10) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[9][25] += 1;
                                                } else {
                                                    matriz[9][26] += 1;
                                                }
                                            } else if (familias[i].mes == 11) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[10][25] += 1;
                                                } else {
                                                    matriz[10][26] += 1;
                                                }
                                            } else if (familias[i].mes == 12) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[11][25] += 1;
                                                } else {
                                                    matriz[11][26] += 1;
                                                } //fim if total_time
                                            } //fim else if
                                        } else if (familias[i].total_time >= index && familias[i].total_time < (index + 2)) {
                                            epListado.push(ep[j]);
                                            if (familias[i].mes == 1) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[0][index + 1] += 1;
                                                } else {
                                                    matriz[0][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 2) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[1][index + 1] += 1;
                                                } else {
                                                    matriz[1][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 3) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[2][index + 1] += 1;
                                                } else {
                                                    matriz[2][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 4) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[3][index + 1] += 1;
                                                } else {
                                                    matriz[3][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 5) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[4][index + 1] += 1;
                                                } else {
                                                    matriz[4][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 6) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[5][index + 1] += 1;
                                                } else {
                                                    matriz[5][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 7) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[6][index + 1] += 1;
                                                } else {
                                                    matriz[6][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 8) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[7][index + 1] += 1;
                                                } else {
                                                    matriz[7][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 9) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[8][index + 1] += 1;
                                                } else {
                                                    matriz[8][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 10) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[9][index + 1] += 1;
                                                } else {
                                                    matriz[9][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 11) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[10][index + 1] += 1;
                                                } else {
                                                    matriz[10][index + 2] += 1;
                                                }
                                            } else if (familias[i].mes == 12) {
                                                if (familias[i].classificacao == "N") {
                                                    matriz[11][index + 1] += 1;
                                                } else {
                                                    matriz[11][index + 2] += 1;
                                                } //fim if total_time
                                            } //fim else if
                                        }
                                    } //fim if xlon
                                } //fim if xlat
                            } //fim dia
                        } //fim mes
                    } //fim ano
                } //fim for quantidadeEPS WHILE
            } //fim for quantidadeFamilias
            index += 2;
        } //fim for temp
    } catch (err) {
        console.log(err.message);
    } //fim catch

    for (var i = 0; i < 12; i++) {
        for (var j = 1; j < 27; j++) {
            matriz[12][j] += matriz[i][j];
        }
    }

    for (var i = 0; i < 13; i++) {
        var row = $('<tr></tr>').appendTo("#tabela-1");
        for (var j = 0; j < 27; j++) {
            $('<td></td>').text(matriz[i][j]).appendTo(row);
        }
    }

    for (var i = 0; i < epListado.length; i++) {
        $("#tabela-1-dias-liastados > tbody").append($('<tr>').append($('<td>').append(epListado[i].dia)).append($('<td>').append(epListado[i].mes)).append($('<td>').append(epListado[i].ano)).append($('<td>').append(epListado[i].lat)).append($('<td>').append(epListado[i].lon)));
    }

    $("#bt-salvar-tabela-1").click(function() {
        $("#tabela-1").table2excel({
            name: "Excel Document Name",
            filename: "Tabela 1 " + new Date($.now()),
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });

    $("#bt-salvar-tabela-1-dias-liastados").click(function() {
        $("#tabela-1-dias-liastados").table2excel({
            name: "Worksheet Name",
            filename: "Tabela 1 - dias liastados" + new Date($.now()),
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });

    //mostra tabela 1
    $("#div-tabela-1").fadeIn(300);
}

function tabela2(quantidadeFamilias) {
    var quantidadeEPS = ep.length;

    var horarios = [
        "0 ~ 2",
        "2 ~ 4",
        "4 ~ 6",
        "6 ~ 8",
        "8 ~ 10",
        "10 ~ 12",
        "12 ~ 14",
        "14 ~ 16",
        "16 ~ 18",
        "18 ~ 20",
        "20 ~ 22",
        "22 ~ 24",
        "> 24"
    ];
    var matriz = new Array(13);

    //monta a matriz matriz[13][24]
    for (var i = 0; i < 13; i++) {
        matriz[i] = new Array(13);
    }

    //inicializa a matriz
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 13; j++) {
            //percorre 26 colunas
            matriz[i][j] = 0;
        }
    }

    //inicializa a matriz
    for (var i = 0; i < 13; i++) {
        matriz[i][0] = horarios[i];
    }

    try {
        var index = 0;

        for (var temp = 0; temp < 13; temp++) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i].classificacao == "N") {
                    if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                        if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                            // for (var j = 0; j < quantidadeEPS; j++) {
                            //     if (familias[i].ano == ep[j].ano) {
                            //         if (familias[i].mes == ep[j].mes) {
                            //             if (familias[i].dia == ep[j].dia) {
                            if (index >= 24 && familias[i].total_time >= 24) {
                                if (familias[i].mes == 1) {
                                    matriz[temp][1] += 1;
                                } else if (familias[i].mes == 2) {
                                    matriz[temp][2] += 1;
                                } else if (familias[i].mes == 3) {
                                    matriz[temp][3] += 1;
                                } else if (familias[i].mes == 4) {
                                    matriz[temp][4] += 1;
                                } else if (familias[i].mes == 5) {
                                    matriz[temp][5] += 1;
                                } else if (familias[i].mes == 6) {
                                    matriz[temp][6] += 1;
                                } else if (familias[i].mes == 7) {
                                    matriz[temp][7] += 1;
                                } else if (familias[i].mes == 8) {
                                    matriz[temp][8] += 1;
                                } else if (familias[i].mes == 9) {
                                    matriz[temp][9] += 1;
                                } else if (familias[i].mes == 10) {
                                    matriz[temp][10] += 1;
                                } else if (familias[i].mes == 11) {
                                    matriz[temp][11] += 1;
                                } else if (familias[i].mes == 12) {
                                    matriz[temp][12] += 1;
                                } //fim else if
                            } else if (familias[i].total_time >= index && familias[i].total_time < (index + 2)) {
                                if (familias[i].mes == 1) {
                                    matriz[temp][1] += 1;
                                } else if (familias[i].mes == 2) {
                                    matriz[temp][2] += 1;
                                } else if (familias[i].mes == 3) {
                                    matriz[temp][3] += 1;
                                } else if (familias[i].mes == 4) {
                                    matriz[temp][4] += 1;
                                } else if (familias[i].mes == 5) {
                                    matriz[temp][5] += 1;
                                } else if (familias[i].mes == 6) {
                                    matriz[temp][6] += 1;
                                } else if (familias[i].mes == 7) {
                                    matriz[temp][7] += 1;
                                } else if (familias[i].mes == 8) {
                                    matriz[temp][8] += 1;
                                } else if (familias[i].mes == 9) {
                                    matriz[temp][9] += 1;
                                } else if (familias[i].mes == 10) {
                                    matriz[temp][10] += 1;
                                } else if (familias[i].mes == 11) {
                                    matriz[temp][11] += 1;
                                } else if (familias[i].mes == 12) {
                                    matriz[temp][12] += 1;
                                } //fim else if
                            }
                        } //fim if xlon
                    } //fim if xlat
                    //         } //fim dia
                    //     } //fim mes
                    // } //fim ano
                    //} //fim for quantidadeEPS
                }
            } //fim for quantidadeFamilias
            index += 2;
        } //fim for temp
    } catch (err) {
        console.log(err.message);
    } //fim catch

    for (var i = 0; i < 13; i++) {
        var row = $('<tr></tr>').appendTo("#tabela-2");
        for (var j = 0; j < 13; j++) {
            $('<td></td>').text(matriz[i][j]).appendTo(row);
        }
    }

    $("#bts2").click(function() {
        $("#tabela-2").table2excel({
            name: "Excel Document Name",
            filename: "Tabela 2",
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });

    $("#bts3").click(function() {
        $("#tabela-2-1").table2excel({
            name: "Excel Document Name",
            filename: "Tabela 2.1",
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });

    $("#div-tabela-2").fadeIn(300);
}

function tabela3(quantidadeFamilias) {

    var horarios = [
        "0 ~ 2",
        "2 ~ 4",
        "4 ~ 6",
        "6 ~ 8",
        "8 ~ 10",
        "10 ~ 12",
        "12 ~ 14",
        "14 ~ 16",
        "16 ~ 18",
        "18 ~ 20",
        "20 ~ 22",
        "22 ~ 24",
        "> 24"
    ];

    var maior = 0;

    var matriz = new Array(13);

    for (var i = 0; i < 13; i++) {
        matriz[i] = new Array(13);
    }

    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 13; j++) {
            matriz[i][j] = 0;
        }
    }

    for (var i = 0; i < 13; i++) {
        matriz[i][0] = horarios[i];
    }

    try {
        var index = 0;
        var indice = 0;

        for (var temp = 0; temp < 13; temp++) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i].classificacao == "N") {
                    if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                        if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                            if (index >= 24 && familias[i].total_time >= 24) {
                                for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                                    if (maior < parseInt(familias[i]['tempos'][j].size)) {
                                        maior = parseInt(familias[i]['tempos'][j].size);
                                        if (familias[i].mes == 1) {
                                            matriz[indice][1] = maior;
                                        } else if (familias[i].mes == 2) {
                                            matriz[indice][2] = maior;
                                        } else if (familias[i].mes == 3) {
                                            matriz[indice][3] = maior;
                                        } else if (familias[i].mes == 4) {
                                            matriz[indice][4] = maior;
                                        } else if (familias[i].mes == 5) {
                                            matriz[indice][4] = maior;
                                        } else if (familias[i].mes == 6) {
                                            matriz[indice][6] = maior;
                                        } else if (familias[i].mes == 7) {
                                            matriz[indice][7] = maior;
                                        } else if (familias[i].mes == 8) {
                                            matriz[indice][8] = maior;
                                        } else if (familias[i].mes == 9) {
                                            matriz[indice][9] = maior;
                                        } else if (familias[i].mes == 10) {
                                            matriz[indice][10] = maior;
                                        } else if (familias[i].mes == 11) {
                                            matriz[indice][11] = maior;
                                        } else if (familias[i].mes == 12) {
                                            matriz[indice][12] = maior;
                                        } //fim else if
                                    } //fim if
                                } //fim for
                            } else if (familias[i].total_time >= index && familias[i].total_time < (index + 2)) {
                                for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                                    if (maior < parseInt(familias[i]['tempos'][j].size)) {
                                        maior = parseInt(familias[i]['tempos'][j].size);
                                        if (familias[i].mes == 1) {
                                            matriz[indice][1] = maior;
                                        } else if (familias[i].mes == 2) {
                                            matriz[indice][2] = maior;
                                        } else if (familias[i].mes == 3) {
                                            matriz[indice][3] = maior;
                                        } else if (familias[i].mes == 4) {
                                            matriz[indice][4] = maior;
                                        } else if (familias[i].mes == 5) {
                                            matriz[indice][5] = maior;
                                        } else if (familias[i].mes == 6) {
                                            matriz[indice][6] = maior;
                                        } else if (familias[i].mes == 7) {
                                            matriz[indice][7] = maior;
                                        } else if (familias[i].mes == 8) {
                                            matriz[indice][8] = maior;
                                        } else if (familias[i].mes == 9) {
                                            matriz[indice][9] = maior;
                                        } else if (familias[i].mes == 10) {
                                            matriz[indice][10] = maior;
                                        } else if (familias[i].mes == 11) {
                                            matriz[indice][11] = maior;
                                        } else if (familias[i].mes == 12) {
                                            matriz[indice][12] = maior;
                                        } //fim else if
                                    } //fim if
                                } //fim for
                            }
                        } //fim if xlon
                    } //fim if xlat
                } //fim for quantidadeEPS WHILE
            } //fim for quantidadeFamilias
            indice++;
            index += 2;
        } //fim for temp
    } catch (err) {
        console.log(err.message);
    } //fim catch

    for (var i = 0; i < 12; i++) {
        var row = $('<tr></tr>').appendTo("#tabela-3");
        for (var j = 0; j < 13; j++) {
            $('<td></td>').text(matriz[i][j]).appendTo(row);
        }
    }

    $("#div-tabela-3").fadeIn(300);

    $("#bts4").click(function() {
        $("#tabela-3").table2excel({
            name: "Excel Document Name",
            filename: "Tabela 2.1",
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });
} //fim function

function tabela4(quantidadeFamilias) {
    var famTemp;

    try {
        var maior = 0;
        var quantidadeEPS = ep.length;
        for (var i = 0; i < quantidadeFamilias; i++) {
            famTemp = new Familia();
            if (familias[i].classificacao == "N") {
                if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                    if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                        for (var j = 0; j < quantidadeEPS; j++) {
                            if (familias[i].ano == ep[j].ano) {
                                if (familias[i].mes == ep[j].mes) {
                                    if (familias[i].dia == ep[j].dia) {
                                        for (var j = 0; j < familias[i]['tempos'].length; j++) {
                                            if (maior < parseInt(familias[i]['tempos'][j].size)) {
                                                maior = parseInt(familias[i]['tempos'][j].size);
                                                famTemp['tempos'] = familias[i]['tempos'][j];
                                            } //fim if maior
                                        } //fim for j
                                    } //fim dia
                                } //fim mes
                            } //fim ano
                        } //fim for quantidadeEPS
                    } //fim if xlon
                } //fim if xlat
                famTemp.numero = familias[i].numero;
                famTemp.ano = familias[i].ano;
                famTemp.mes = familias[i].mes;
                famTemp.dia = familias[i].dia;
                famTemp.hora = familias[i].hora;
                famTemp.primeiro_membro = familias[i].primeiro_membro;
                famTemp.classificacao = familias[i].classificacao;
                famTemp.total_time = familias[i].total_time;
                famTemp.deltax = familias[i].deltax;
                famTemp.deltay = familias[i].deltay;
                famTemp.last_image = familias[i].last_image;
                famTemp.end = familias[i].end;
                testeArray.push(famTemp);
            } //fim for quantidadeEPS WHILE
            maior = 0;
        } //fim for quantidadeFamilias
    } catch (err) {
        console.log(err.message);
    } //fim catch

    for (var i = 0; i < testeArray.length; i++) {
        $("#tabela-4 > tbody").append($('<tr>').append($('<td>').append(testeArray[i].numero)).append($('<td>').append(testeArray[i].ano)).append($('<td>').append(testeArray[i].mes)).append($('<td>').append(testeArray[i].dia)).append($('<td>').append(testeArray[i].hora)).append($('<td>').append(testeArray[i].primeiro_membro)).append($('<td>').append(testeArray[i].classificacao)).append($('<td>').append(testeArray[i].total_time)).append($('<td>').append(testeArray[i].deltax)).append($('<td>').append(testeArray[i].deltay)).append($('<td>').append(testeArray[i].last_image)).append($('<td>').append(testeArray[i].end)).append($('<td>').append(testeArray[i]['tempos'].sys)).append($('<td>').append(testeArray[i]['tempos'].xlat)).append($('<td>').append(testeArray[i]['tempos'].xlon)).append($('<td>').append(testeArray[i]['tempos'].time)).append($('<td>').append(testeArray[i]['tempos'].size)).append($('<td>').append(testeArray[i]['tempos'].dsize)).append($('<td>').append(testeArray[i]['tempos'].tmed)).append($('<td>').append(testeArray[i]['tempos'].dtmed)).append($('<td>').append(testeArray[i]['tempos'].tmin)).append($('<td>').append(testeArray[i]['tempos'].dtmin)).append($('<td>').append(testeArray[i]['tempos'].tmin9)).append($('<td>').append(testeArray[i]['tempos'].dtmin9)).append($('<td>').append(testeArray[i]['tempos'].cbnum)).append($('<td>').append(testeArray[i]['tempos'].cbmed)).append($('<td>').append(testeArray[i]['tempos'].vel)).append($('<td>').append(testeArray[i]['tempos'].dir)).append($('<td>').append(testeArray[i]['tempos'].incli)).append($('<td>').append(testeArray[i]['tempos'].ecce)).append($('<td>').append(testeArray[i]['tempos'].t_ini)).append($('<td>').append(testeArray[i]['tempos'].t_fin)).append($('<td>').append(testeArray[i]['tempos'].clas)).append($('<td>').append(testeArray[i]['tempos'].sys_ant)));
    }

    $("#div-tabela-4").fadeIn(300);

    $("#btsteste").click(function() {
        $("#tabela-4").table2excel({
            name: "Excel Document Name",
            filename: "Tabela",
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });
}

function tabela5(quantidadeFamilias) {
    var maior = 0;

    var matriz = new Array(13);

    for (var i = 0; i < 13; i++) {
        matriz[i] = new Array(27);
    }

    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 27; j++) {
            matriz[i][j] = 0;
        }
    }

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

    for (var i = 0; i < 13; i++) {
        matriz[i][0] = monthNames[i];
    }

    var indice = 0;

    try {
        for (var temp = 0; temp < 13; temp++) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i].classificacao == "N") { //verifica condicoes ncessarias para tabela
                    if (familias[i].total_time >= 24 && indice >= 24) { //verifica condicoes ncessarias para tabela
                        for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                            if (maior < parseInt(familias[i]['tempos'][j].size)) {
                                maior = parseInt(familias[i]['tempos'][j].size);
                                if (familias[i].mes == 1) {
                                    matriz[0][25] = familias[i]['tempos'][j].ecce;
                                    matriz[0][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 2) {
                                    matriz[1][25] = familias[i]['tempos'][j].ecce;
                                    matriz[1][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 3) {
                                    matriz[2][25] = familias[i]['tempos'][j].ecce;
                                    matriz[2][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 4) {
                                    matriz[3][25] = familias[i]['tempos'][j].ecce;
                                    matriz[3][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 5) {
                                    matriz[4][25] = familias[i]['tempos'][j].ecce;
                                    matriz[4][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 6) {
                                    matriz[5][25] = familias[i]['tempos'][j].ecce;
                                    matriz[5][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 7) {
                                    matriz[6][25] = familias[i]['tempos'][j].ecce;
                                    matriz[6][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 8) {
                                    matriz[7][25] = familias[i]['tempos'][j].ecce;
                                    matriz[7][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 9) {
                                    matriz[8][25] = familias[i]['tempos'][j].ecce;
                                    matriz[8][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 10) {
                                    matriz[9][25] = familias[i]['tempos'][j].ecce;
                                    matriz[9][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 11) {
                                    matriz[10][25] = familias[i]['tempos'][j].ecce;
                                    matriz[10][26] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 12) {
                                    matriz[11][25] = familias[i]['tempos'][j].ecce;
                                    matriz[11][26] = familias[i]['tempos'][j].tmin;
                                } //fim else if
                            } //fim if //fim if
                        } //fim for
                    } else if (familias[i].total_time >= indice && familias[i].total_time < (indice + 2)) { //verifica condicoes ncessarias para tabela
                        for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                            if (maior < parseInt(familias[i]['tempos'][j].size)) {
                                maior = parseInt(familias[i]['tempos'][j].size);
                                if (familias[i].mes == 1) {
                                    matriz[0][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[0][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 2) {
                                    matriz[1][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[1][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 3) {
                                    matriz[2][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[2][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 4) {
                                    matriz[3][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[3][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 5) {
                                    matriz[4][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[4][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 6) {
                                    matriz[5][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[5][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 7) {
                                    matriz[6][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[6][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 8) {
                                    matriz[7][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[7][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 9) {
                                    matriz[8][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[8][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 10) {
                                    matriz[9][indiceindice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[9][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 11) {
                                    matriz[10][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[10][indice + 2] = familias[i]['tempos'][j].tmin;
                                } else if (familias[i].mes == 12) {
                                    matriz[11][indice + 1] = familias[i]['tempos'][j].ecce;
                                    matriz[11][indice + 2] = familias[i]['tempos'][j].tmin;
                                } //fim else if
                            } //fim if
                        } //fim for
                    } //fim if
                } //fim
            } //fim for
            indice += 2; //incrementa variavel indice
            maior = 0; //zera variavel maior
        } //fim for
    } catch (err) {
        console.log(err.message);
    } //fim catch

    for (var i = 0; i < 12; i++) {
        for (var j = 1; j < 27; j++) {
            matriz[12][j] += matriz[i][j] / 12;
        }
    }

    for (var i = 0; i < 13; i++) {
        var row = $('<tr></tr>').appendTo("#tabela-5");
        for (var j = 0; j < 27; j++) {
            $('<td></td>').text(matriz[i][j]).appendTo(row);
        }
    }

    $("#div-tabela-5").fadeIn(300);
} //fim function tabela4

function tabela6(quantidadeFamilias) {
    var classf = "N";
    var teste = 0;
    for (var j = 0; j < 24; j++) {
        if (j % 2 == 0) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                //if (familias[i].classificacao == "N") {
                if (familias[i].classificacao == classf) {
                    if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                        if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                            if (familias[i].total_time >= j && familias[i].total_time < (j + 2)) {
                                $("#tabela-6 > tbody").append($('<tr>').append($('<td>').append(j + ' ~ ' + (j + 2))).append($('<td>').append(familias[i].classificacao)).append($('<td>').append(familias[i].numero)).append($('<td>').append(familias[i].total_time)).append($('<td>').append(familias[i]['tempos'][0].xlat)).append($('<td>').append(familias[i]['tempos'][0].xlon)));
                            } //fim if total_time
                        } //fim if xlon
                    } //fim if xlat
                } //fim if classificacao
            } //fim for quantidadeFamilias
            teste += 2;
        } //fim if mod 2
    }
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

function tabela7(quantidadeFamilias) {
    var quantidadeEPS = ep.length;
    var maior = 0;
    var maturacao = 0;
    for (var i = 0; i < quantidadeFamilias; i++) {
        if (familias[i].classificacao == "N") {
            if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                    for (var j = 0; j < quantidadeEPS; j++) {
                        if (familias[i].ano == ep[j].ano) {
                            if (familias[i].mes == ep[j].mes) {
                                if (familias[i].dia == ep[j].dia) {
                                    var temp = familias[i].hora + familias[i]['tempos'][0].time;
                                    tab7(familias[i].numero, familias[i].hora, Math.round(familias[i]['tempos'][0].time), temp, 1, hora(familias[i].hora));

                                    for (var k = 0; k < familias[i]['tempos'].length; k++) {
                                        if (maior < familias[i]['tempos'][k].size) {
                                            maior = familias[i]['tempos'][k].size;
                                            maturacao = Math.round(familias[i]['tempos'][k].time);
                                        } //fim if familias['tempos']
                                    } //fim for familias['tempos']

                                    tab7(familias[i].numero, familias[i].hora, Math.round(familias[i]['tempos'][0].time), temp, 2, hora(Math.round(maturacao + familias[i].hora)));
                                    tab7(familias[i].numero, familias[i].hora, maturacao, familias[i].hora + maturacao, 3, hora(Math.round(maturacao + familias[i].hora)));
                                    $("#tabela-7 > tbody").append($('<tr>').append($('<td colspan="3">').append('Latitude: ' + familias[i]['tempos'][0].xlat)).append($('<td colspan="3">').append('Longitude: ' + familias[i]['tempos'][0].xlon)));
                                } //fim if dia
                            } //fim if mes
                        } //fim if ano
                    } //fim for quantidadeEPS
                } //fim if xlon
            } //fim if xlat
        } //fim if classificacao

        maior = 0;
    } //fim quantidadeFamilias

    $("#div-tabela-7").fadeIn("slow");
    $("#tabela-7").simplePagination({perPage: 8, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});

    $("#bts7").click(function() {
        $("#tabela-7").table2excel({
            name: "Excel Document Name",
            filename: "Tabela 7",
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });
}

function tabela8() {
  
}

function tab7(numero, hora, time, soma, vez, horario) {
    var tipo = "";

    if (vez == 1) {
        tipo = "Iniciação";
    } else if (vez == 2) {
        tipo = "Maturação";
    } else if (vez == 3) {
        tipo = "Dissipação";
    }
    $("#tabela-7 > tbody").append($('<tr>').append($('<td>').append(numero)).append($('<td>').append(hora)).append($('<td>').append(time)).append($('<td>').append(soma)).append($('<td>').append(tipo)).append($('<td>').append(horario)));
}

function hora(hora) {

    if (hora > 24) {
        hora = hora - 24
    }

    if (hora > 3 && hora <= 9) {
        madrugada++;
        return "madrugada";
    } else if (hora > 9 && hora <= 15) {
        manha++;
        return "manha";
    } else if (hora > 15 && hora <= 21) {
        tarde++;
        return "tarde";
    } else {
        noite++;
        return "noite";
    }
}

function downloadInnerHtml(filename, elId, mimeType) {
    var link = document.createElement('a');
    mimeType = mimeType || 'text/html';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elId));
    link.click();
} //fim downloadInnerHtml
