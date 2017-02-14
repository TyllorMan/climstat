//declaracao de variaveis
var comparacao = "";
var dma = new Array();
var ep = new Array();
var epCompara = new Array();
var epListado = new Array();
var familias = new Array();
var madrugada = 0;
var manha = 0;
var tarde = 0;
var noite = 0;

const MICE = 1.852;
const PIXEL = 16;

var hor = ["Madrugada", "Manhã", "Tarde", "Noite"];

var tabTemp = new Array(4);

for (var i = 0; i < tabTemp.length; i++) {
    tabTemp[i] = new Array(4);
}

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        tabTemp[i][j] = 0;
    }
}

for (var i = 0; i < tabTemp.length; i++) {
    tabTemp[i][0] = hor[i];
}

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

    //div tabelas
    $("#tabela-EPs").hide();
    $("#div-tabela-1").hide();
    $("#div-tabela-2").hide();
    $("#div-tabela-3").hide();
    $("#div-tabela-4").hide();
    $("#div-tabela-5").hide();
    $("#div-tabela-6").hide();
    $("#div-tabela-7").hide();
    $("#div-tabela-8").hide();
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

                // eps.lat = temp[0].replace(".", ",");
                // eps.lon = temp[1].replace(".", ",");
                eps.lat = parseFloat(temp[0]);
                eps.lon = parseFloat(temp[1]);
                eps.ano = parseInt(temp[2]);
                eps.mes = parseInt(temp[3]);
                eps.dia = parseInt(temp[4]);

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
                //var diaMesAno = new DiaMesAno(); //a cada iteracao cria novo objeto diaMesAno
                var EPSDiaMesAno = new EPs(); //a cada iteracao cria novo objeto diaMesAno

                temp = linha[i];

                //  EPSDiaMesAno.estacao = "";
                EPSDiaMesAno.dia = parseInt(temp[4]);
                EPSDiaMesAno.mes = parseInt(temp[3]);
                EPSDiaMesAno.ano = parseInt(temp[2]);
                EPSDiaMesAno.lat = temp[0].replace(".", ",");
                EPSDiaMesAno.lon = temp[1].replace(".", ",");
                EPSDiaMesAno.chuva = temp[5].replace(".", ",");

                dma.push(EPSDiaMesAno); //a cada iteracao do laco adiciona novo objeto
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
                //linha.push(linhas[i].split(';'));
                linha.push(linhas[i].split('\t'));
            } //fim for linhas

            //percorre linha por linha e controi o objeto DMA
            for (var i = 0; i < linha.length; i++) {
                var temp = new Array();
                var eps = new EPs();

                temp = linha[i];

                //eps.estacao = parseInt(temp[1]);
                eps.lat = temp[0].replace(".", ",");
                eps.lon = temp[1].replace(".", ",");
                eps.ano = parseInt(temp[2]);
                eps.mes = parseInt(temp[3]);
                eps.dia = parseInt(temp[4]);
                eps.chuva = temp[5].replace(".", ",");
                //debugger;
                epCompara.push(eps);
            } //fim for linha

            var j = 0; //necessario para percorrer todos os dias, meses e anos
            var achou = false;
            console.log(epCompara);

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

                if (epCompara.length > 0) {
                    for (var i = 0; i < epCompara.length; i++) {
                        //cria nova linha
                        //$("#comparaTable > tbody").append($('<tr>').append($('<td>').append(epCompara[i].estacao)).append($('<td>').append(epCompara[i].lat)).append($('<td>').append(epCompara[i].lon)).append($('<td>').append(epCompara[i].dia)).append($('<td>').append(epCompara[i].mes)).append($('<td>').append(epCompara[i].ano)).append($('<td>').append(epCompara[i].chuva)));
                        //epCompara[i] = epCompara[i].toString();
                        $("#comparaTable > tbody").append($('<tr>').append($('<td>').append(epCompara[i].lat)).append($('<td>').append(epCompara[i].lon)).append($('<td>').append(" " + epCompara[i].dia)).append($('<td>').append(" " + epCompara[i].mes)).append($('<td>').append(epCompara[i].ano)).append($('<td>').append(" " + epCompara[i].chuva)));

                        //comparacao += (";" + epCompara[i].estacao + ";" + epCompara[i].lat + ";" + epCompara[i].lon + ";" + epCompara[i].ano + ";" + epCompara[i].mes + ";" + epCompara[i].dia + ";" + epCompara[i].chuva + ";");
                        comparacao += ("," + epCompara[i].lat + "," + epCompara[i].lon + "," + epCompara[i].ano + "," + epCompara[i].mes + "," + epCompara[i].dia + "," + epCompara[i].chuva + ",");
                        comparacao += '<br/>'
                    } //fim for

                    $("#comparaTable").simplePagination({perPage: 10, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});
                    $("#comparaTextarea").val(JSON.stringify(epCompara));
                    $("#comparaTable").fadeIn("fast");
                } //fim if epCompara.length

                $("#salvar").fadeIn("slow");
                $("#salvar").click(function() {
                    downloadInnerHtml('resultado', comparacao, 'text/html');
                });

                $("#bts10").click(function() {
                    $("#comparaTable").table2excel({
                        name: "compara",
                        filename: "compara",
                        fileext: ".xls",
                        exclude_img: false,
                        exclude_links: false,
                        exclude_inputs: true
                    });
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
                        familia.classificacao = linhas[i].substr((linhas[i].search("CLASSIF=") + ("CLASSIF=".length)), 3);
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
                verificaRaio(familias.length);
            }; //fim fileReader.onload
            fileReader.readAsText(input.files[cont]);
        }

    }); //fim change
}); //fim document ready

function tabela1(quantidadeFamilias) {
    const QUANTIDADE_EPS = ep.length;

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
                        for (var j = 0; j < QUANTIDADE_EPS; j++) {
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
                                                }
                                            } //fim else if
                                        } //fim else if
                                    } //fim if dia
                                } //fim if mes
                            } //fim if ano
                        } //fim for quantidadeEPS
                    } //fim if xlon
                } //fim if xlat
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

    //imprime a tabela1
    for (var i = 0; i < 13; i++) {
        var row = $('<tr></tr>').appendTo("#tabela-1");
        for (var j = 0; j < 27; j++) {
            $('<td></td>').text(matriz[i][j]).appendTo(row);
        }
    }

    for (var i = 0; i < epListado.length; i++) {
        for (var k = i + 1; k < epListado.length; k++) {
            if (epListado[i].dia == epListado[k].dia) {
                epListado.splice(k, 1);
                k--;
            }
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
                            for (var j = 0; j < quantidadeEPS; j++) {
                                if (familias[i].ano == ep[j].ano) {
                                    if (familias[i].mes == ep[j].mes) {
                                        if (familias[i].dia == ep[j].dia) {
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
                                } //fim dia
                            } //fim mes
                        } //fim ano
                    } //fim for quantidadeEPS
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

    var maiorSize = 0;

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
                                    if (maiorSize < parseInt(familias[i]['tempos'][j].size)) {
                                        maiorSize = parseInt(familias[i]['tempos'][j].size);
                                        if (familias[i].mes == 1) {
                                            matriz[indice][1] = maiorSize;
                                        } else if (familias[i].mes == 2) {
                                            matriz[indice][2] = maiorSize;
                                        } else if (familias[i].mes == 3) {
                                            matriz[indice][3] = maiorSize;
                                        } else if (familias[i].mes == 4) {
                                            matriz[indice][4] = maiorSize;
                                        } else if (familias[i].mes == 5) {
                                            matriz[indice][4] = maiorSize;
                                        } else if (familias[i].mes == 6) {
                                            matriz[indice][6] = maiorSize;
                                        } else if (familias[i].mes == 7) {
                                            matriz[indice][7] = maiorSize;
                                        } else if (familias[i].mes == 8) {
                                            matriz[indice][8] = maiorSize;
                                        } else if (familias[i].mes == 9) {
                                            matriz[indice][9] = maiorSize;
                                        } else if (familias[i].mes == 10) {
                                            matriz[indice][10] = maiorSize;
                                        } else if (familias[i].mes == 11) {
                                            matriz[indice][11] = maiorSize;
                                        } else if (familias[i].mes == 12) {
                                            matriz[indice][12] = maiorSize;
                                        } //fim else if
                                    } //fim if
                                } //fim for
                            } else if (familias[i].total_time >= index && familias[i].total_time < (index + 2)) {
                                for (var j = 0; j < familias[i]['tempos'].length; j++) { //percorre todos tempos da familia
                                    if (maiorSize < parseInt(familias[i]['tempos'][j].size)) {
                                        maiorSize = parseInt(familias[i]['tempos'][j].size);
                                        if (familias[i].mes == 1) {
                                            matriz[indice][1] = maiorSize;
                                        } else if (familias[i].mes == 2) {
                                            matriz[indice][2] = maiorSize;
                                        } else if (familias[i].mes == 3) {
                                            matriz[indice][3] = maiorSize;
                                        } else if (familias[i].mes == 4) {
                                            matriz[indice][4] = maiorSize;
                                        } else if (familias[i].mes == 5) {
                                            matriz[indice][5] = maiorSize;
                                        } else if (familias[i].mes == 6) {
                                            matriz[indice][6] = maiorSize;
                                        } else if (familias[i].mes == 7) {
                                            matriz[indice][7] = maiorSize;
                                        } else if (familias[i].mes == 8) {
                                            matriz[indice][8] = maiorSize;
                                        } else if (familias[i].mes == 9) {
                                            matriz[indice][9] = maiorSize;
                                        } else if (familias[i].mes == 10) {
                                            matriz[indice][10] = maiorSize;
                                        } else if (familias[i].mes == 11) {
                                            matriz[indice][11] = maiorSize;
                                        } else if (familias[i].mes == 12) {
                                            matriz[indice][12] = maiorSize;
                                        } //fim else if
                                    } //fim if
                                } //fim for
                            } //fim else if
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
        var maiorSize = 0;
        var quantidadeEPS = ep.length;
        for (var i = 0; i < quantidadeFamilias; i++) {
            famTemp = new Familia();
            if (familias[i].classificacao == "N") {
                if (familias[i].total_time >= 6) {
                    if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                        if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                            for (var j = 0; j < quantidadeEPS; j++) {
                                if (familias[i].ano == ep[j].ano) {
                                    if (familias[i].mes == ep[j].mes) {
                                        if (familias[i].dia == ep[j].dia) {
                                            for (var k = 0; k < familias[i]['tempos'].length; k++) {
                                                if (maiorSize < parseInt(familias[i]['tempos'][k].size)) {
                                                    maiorSize = parseInt(familias[i]['tempos'][k].size);
                                                    famTemp['tempos'] = familias[i]['tempos'][k];
                                                } //fim if maiorSize
                                            } //fim for j
                                            $("#tabela-4 > tbody").append($('<tr>').append($('<td>').append(familias[i].numero)).append($('<td>').append(familias[i].ano)).append($('<td>').append(familias[i].mes)).append($('<td>').append(familias[i].dia)).append($('<td>').append(familias[i].hora)).append($('<td>').append(familias[i].primeiro_membro)).append($('<td>').append(familias[i].classificacao)).append($('<td>').append(familias[i].total_time)).append($('<td>').append(familias[i].deltax)).append($('<td>').append(familias[i].deltay)).append($('<td>').append(familias[i].last_image)).append($('<td>').append(familias[i].end)).append($('<td>').append(famTemp['tempos'].sys)).append($('<td>').append(famTemp['tempos'].xlat)).append($('<td>').append(famTemp['tempos'].xlon)).append($('<td>').append(famTemp['tempos'].time)).append($('<td>').append(famTemp['tempos'].size)).append($('<td>').append(famTemp['tempos'].dsize)).append($('<td>').append(famTemp['tempos'].tmed)).append($('<td>').append(famTemp['tempos'].dtmed)).append($('<td>').append(famTemp['tempos'].tmin)).append($('<td>').append(famTemp['tempos'].dtmin)).append($('<td>').append(famTemp['tempos'].tmin9)).append($('<td>').append(famTemp['tempos'].dtmin9)).append($('<td>').append(famTemp['tempos'].cbnum)).append($('<td>').append(famTemp['tempos'].cbmed)).append($('<td>').append(famTemp['tempos'].vel)).append($('<td>').append(famTemp['tempos'].dir)).append($('<td>').append(famTemp['tempos'].incli)).append($('<td>').append(famTemp['tempos'].ecce)).append($('<td>').append(famTemp['tempos'].t_ini)).append($('<td>').append(famTemp['tempos'].t_fin)).append($('<td>').append(famTemp['tempos'].clas)).append($('<td>').append(famTemp['tempos'].sys_ant)));
                                        } //fim dia
                                    } //fim mes
                                } //fim ano
                            } //fim for quantidadeEPS
                        } //fim if xlon
                    } //fim if xlat
                } //fim if total_time
            } //fim if classificacao
            maiorSize = 0;
        } //fim for quantidadeFamilias
    } catch (err) {
        console.log(err.message);
    } //fim catch

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
    var maiorSize = 0;

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
        "MÉDIA"
    ];

    for (var i = 0; i < 13; i++) {
        matriz[i][0] = monthNames[i];
    }

    var indice = 0;

    try {
        for (var temp = 0; temp < 13; temp++) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i].classificacao == "N") {
                    if (familias[i].total_time >= 24 && indice >= 24) {
                        for (var j = 0; j < familias[i]['tempos'].length; j++) {
                            if (maiorSize < parseInt(familias[i]['tempos'][j].size)) {
                                maiorSize = parseInt(familias[i]['tempos'][j].size);
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
                            if (maiorSize < parseInt(familias[i]['tempos'][j].size)) {
                                maiorSize = parseInt(familias[i]['tempos'][j].size);
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
                                    matriz[9][indice + 1] = familias[i]['tempos'][j].ecce;
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
            maiorSize = 0; //zera variavel maiorSize
        } //fim for
    } catch (err) {
        console.log(err.message);
    } //fim catch

    for (var i = 0; i < 12; i++) {
        for (var j = 1; j < 27; j++) {
            matriz[12][j] += matriz[i][j];
        }
    }

    for (var i = 0; i < 13; i++) {
        var row = $('<tr></tr>').appendTo("#tabela-5");
        for (var j = 0; j < 27; j++) {
            $('<td></td>').text(matriz[i][j]).appendTo(row);
        }
    }

    $("#div-tabela-5").fadeIn(300);

    $("#tab5").click(function() {
        $("#tabela-5").table2excel({
            name: "Excel Document Name",
            filename: "tabela",
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });
} //fim function tabela4

function tabela6(quantidadeFamilias) {
    var classificacao = "N";
    for (var j = 0; j < 24; j++) {
        if (j % 2 == 0) {
            for (var i = 0; i < quantidadeFamilias; i++) {
                if (familias[i].classificacao == classificacao) {
                    if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                        if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                            if (familias[i].total_time >= j && familias[i].total_time < (j + 2)) {
                                $("#tabela-6 > tbody").append($('<tr>').append($('<td>').append(j + ' ~ ' + (j + 2))).append($('<td>').append(familias[i].classificacao)).append($('<td>').append(familias[i].numero)).append($('<td>').append(familias[i].total_time)).append($('<td>').append(familias[i]['tempos'][0].xlat)).append($('<td>').append(familias[i]['tempos'][0].xlon)));
                            } //fim if total_time
                        } //fim if xlon
                    } //fim if xlat
                } //fim if classificacao
            } //fim for quantidadeFamilias
        } //fim if j % 2
    } //fim j

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
} //fim tabela6

function tabela7(quantidadeFamilias) {
    var quantidadeEPS = ep.length;
    var maiorSize = 0;
    var maturacao = 0;

    for (var i = 0; i < quantidadeFamilias; i++) {
        if (familias[i].classificacao == "N") {
            if (familias[i].total_time >= 6) {
                if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                    if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                        for (var j = 0; j < quantidadeEPS; j++) {
                            if (familias[i].ano == ep[j].ano) {
                                if (familias[i].mes == ep[j].mes) {
                                    if (familias[i].dia == ep[j].dia) {

                                        var soma = familias[i].hora + familias[i]['tempos'][0].time;
                                        var time = familias[i]['tempos'][0].time;

                                        tab7(familias[i].numero, familias[i].hora, time, Math.round(soma), 1, Math.round(soma), familias[i]['tempos'][0].xlat, familias[i]['tempos'][0].xlon);
                                        var ultimaHora = familias[i]['tempos'][familias[i]['tempos'].length - 1].time;

                                        var lat = 0;
                                        var lon = 0;

                                        for (var k = 3; k < (familias[i]['tempos'].length - 4); k++) {
                                            if (familias[i]['tempos'][k].time != ultimaHora) {
                                                if (maiorSize < familias[i]['tempos'][k].size) {
                                                    maiorSize = familias[i]['tempos'][k].size;
                                                    maturacao = familias[i]['tempos'][k].time;

                                                    lat = familias[i]['tempos'][k].xlat;
                                                    lon = familias[i]['tempos'][k].xlon;
                                                } //fim if familias['tempos']
                                            } //fim if time != ultimaHora
                                        } //fim for familias['tempos']

                                        soma = familias[i].hora + maturacao;
                                        tab7(familias[i].numero, familias[i].hora, maturacao, Math.round(soma), 2, Math.round(soma), lat, lon);
                                        soma = familias[i].hora + ultimaHora;

                                        lat = familias[i]['tempos'][familias[i]['tempos'].length - 1].xlat;
                                        lon = familias[i]['tempos'][familias[i]['tempos'].length - 1].xlon;

                                        tab7(familias[i].numero, familias[i].hora, ultimaHora, Math.round(soma), 3, Math.round(soma), lat, lon);
                                    } //fim if dia
                                } //fim if mes
                            } //fim if ano
                        } //fim for quantidadeEPS
                    } //fim if xlon
                } //fim if xlat
            } //fim if total_time
        } //fim if classificacao
        maiorSize = 0;
        maturacao = 0;
    } //fim quantidadeFamilias

    $("#div-tabela-7").fadeIn("slow");
    $("#tabela-7").simplePagination({perPage: 9, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});

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
    tabela8();
}

function tabela8() {
    for (var i = 0; i < 4; i++) {
        var row = $('<tr></tr>').appendTo("#tabela-8");
        for (var j = 0; j < 4; j++) {
            $('<td></td>').text(tabTemp[i][j]).appendTo(row);
        } //fim for j
    } //fim for i

    $("#div-tabela-8").fadeIn("slow");

    $("#bts8").click(function() {
        $("#tabela-8").table2excel({
            name: "Excel Document Name",
            filename: "Tabela 8",
            fileext: ".xls",
            exclude_img: false,
            exclude_links: false,
            exclude_inputs: false
        });
    });
    console.log(tabTemp);
} //fim tabela8

function tab7(numero, hora, time, soma, vez, horario, lat, lon) {
    var tipo = "";
    var temp = "";

    if (horario > 24) {
        horario = (horario - 24);
    }
    if (horario > 3 && horario <= 9) {
        madrugada++;
        temp = "madrugada";
    } else if (horario > 9 && horario <= 15) {
        manha++;
        temp = "manha";
    } else if (horario > 15 && horario <= 21) {
        tarde++;
        temp = "tarde";
    } else {
        noite++;
        temp = "noite";
    }

    if (vez == 1) {
        tipo = "Iniciação";
        if (temp == "madrugada") {
            tabTemp[0][1] += 1;
        } else if (temp == "manha") {
            tabTemp[1][1] += 1;
        } else if (temp == "tarde") {
            tabTemp[2][1] += 1;
        } else if (temp == "noite") {
            tabTemp[3][1] += 1;
        }

    } else if (vez == 2) {
        tipo = "Maturação";
        if (temp == "madrugada") {
            tabTemp[0][2] += 1;
        } else if (temp == "manha") {
            tabTemp[1][2] += 1;
        } else if (temp == "tarde") {
            tabTemp[2][2] += 1;
        } else if (temp == "noite") {
            tabTemp[3][2] += 1;
        }
    } else if (vez == 3) {
        tipo = "Dissipação";
        if (temp == "madrugada") {
            tabTemp[0][3] += 1;
        } else if (temp == "manha") {
            tabTemp[1][3] += 1;
        } else if (temp == "tarde") {
            tabTemp[2][3] += 1;
        } else if (temp == "noite") {
            tabTemp[3][3] += 1;
        }
    }

    $("#tabela-7 > tbody").append($('<tr>').append($('<td>').append(numero)).append($('<td>').append(hora)).append($('<td>').append(time)).append($('<td>').append(soma)).append($('<td>').append(tipo)).append($('<td>').append(temp)).append($('<td>').append(lat)).append($('<td>').append(lon)));
}

function downloadInnerHtml(filename, elId, mimeType) {
    var link = document.createElement('a');
    mimeType = mimeType || 'text/html';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elId));
    link.click();
} //fim downloadInnerHtml

function verificaRaio(quantidadeFamilias) {
    const QUANTIDADE_EPS = ep.length;

    var maiorSize = 0;
    var areaCirculo = 0;
    var raioCirculo = 0;
    //calculo  da distancia do ponto da estacao ao centro do circulo
    //var dac = Math.sqrt( Math.pow((-5.26 - (-4.21)), 2) + Math.pow((-36.72 - (-35.41)), 2));
    var dac = 0;

    for (var i = 0; i < quantidadeFamilias; i++) {
        if (familias[i].classificacao == "N") {
            //if (familias[i].total_time >= 6) {
            //if (familias[i].mes > 4) {
            if (familias[i]['tempos'][0].xlat >= -19 && familias[i]['tempos'][0].xlat <= -3) {
                if (familias[i]['tempos'][0].xlon >= -47 && familias[i]['tempos'][0].xlon <= -34.9) {
                    for (var j = 0; j < QUANTIDADE_EPS; j++) {
                        if (familias[i].ano == ep[j].ano) {
                            if (familias[i].mes == ep[j].mes) {
                                if (familias[i].dia == ep[j].dia) {
                                    var lat = 0;
                                    var lon = 0;
                                    for (var k = 0; k < familias[i]['tempos'].length; k++) {
                                        if (maiorSize < familias[i]['tempos'][k].size) {
                                            maiorSize = familias[i]['tempos'][k].size;
                                            lat = familias[i]['tempos'][k].xlat;
                                            lon = familias[i]['tempos'][k].xlon;
                                        } //fim if maiorSize
                                    } //fim for familias['tempos']

                                    //dac = Math.sqrt((Math.pow((ep[j].lat - (lat)), 2)) + (Math.pow((ep[j].lon - (lon)), 2)));
                                    //dac = ((Math.pow(dla, 2)) + (Math.pow(dlo, 2)));

                                    var epLat = ep[j].lat;
                                    var epLon = ep[j].lon;

                                    console.log('maiorSize: ' + maiorSize);
                                    dac = parseFloat(teste(epLat, lat, epLon, lon));

                                    areaCirculo = PIXEL * maiorSize;
                                    raioCirculo = areaCirculo / Math.PI;
                                    raioCirculo = Math.sqrt(raioCirculo).toFixed(3);

                                    console.log("dac: " + dac);
                                    console.log("raioCirculo: " + raioCirculo);
                                    console.log('\n');

                                    if (dac < raioCirculo) {
                                        $("#tabela-9 > tbody").append($('<tr>').append($('<td>').append(familias[i].numero)).append($('<td>').append(familias[i].dia)).append($('<td>').append(familias[i].mes)).append($('<td>').append(familias[i].ano)).append($('<td>').append(lat)).append($('<td>').append(lon)).append($('<td>').append(parseFloat(epLat).toFixed(2))).append($('<td>').append(parseFloat(epLon).toFixed(2))).append($('<td>').append('X')).append($('<td>').append('')).append($('<td>').append('')));
                                    } else if (dac > raioCirculo) {
                                        $("#tabela-9 > tbody").append($('<tr>').append($('<td>').append(familias[i].numero)).append($('<td>').append(familias[i].dia)).append($('<td>').append(familias[i].mes)).append($('<td>').append(familias[i].ano)).append($('<td>').append(lat)).append($('<td>').append(lon)).append($('<td>').append(parseFloat(epLat).toFixed(2))).append($('<td>').append(parseFloat(epLon).toFixed(2))).append($('<td>').append('')).append($('<td>').append('X')).append($('<td>').append('')));
                                    } else {
                                        $("#tabela-9 > tbody").append($('<tr>').append($('<td>').append(familias[i].numero)).append($('<td>').append(familias[i].dia)).append($('<td>').append(familias[i].mes)).append($('<td>').append(familias[i].ano)).append($('<td>').append(lat)).append($('<td>').append(lon)).append($('<td>').append(parseFloat(epLat).toFixed(2))).append($('<td>').append(parseFloat(epLon).toFixed(2))).append($('<td>').append('')).append($('<td>').append('')).append($('<td>').append('X')));
                                    }
                                } //fim if dia
                            } //fim if mes
                        } //fim if ano
                    } //fim for quantidadeEPS
                } //fim if xlon
            } //fim if xlat
            //} //fim if mes
            //} //fim if total_time
        } //fim if classificacao
        maiorSize = 0;
        dac = 0;
    } //fim for quantidadeFamilias

    $("#tabela-9").simplePagination({perPage: 10, containerClass: '', previousButtonClass: 'btn btn-info', nextButtonClass: 'btn btn-info', currentPage: 1});

    $("#bts9").click(function() {
        $("#tabela-9").table2excel({
            name: "Excel Document Name",
            filename: "EPs",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    });
}

function teste(lat1, lat2, lon1, lon2) {
    lat1 = (lat1 * -1).toFixed(2);
    lat2 = (lat2 * -1).toFixed(2);
    lon1 = (lon1 * -1).toFixed(2);
    lon2 = (lon2 * -1).toFixed(2);

    if (lat1 < lat2) {
        var p1 = parseInt((lat1 - lat2).toFixed(2));
        var p2 = parseInt((((lat1 - lat2) % 1) * 100).toFixed(2));
    } else {
        var p1 = parseInt((lat2 - lat1).toFixed(2));
        var p2 = parseInt((((lat2 - lat1) % 1) * 100).toFixed(2));
    }

    // console.log("DLA: " + (lat1 - lat2).toFixed(2));
    // console.log("DLO: " + (lon1 - lon2).toFixed(2));
    // console.log('\n');

    // console.log("DLA parseInt: " + parseInt(lat1 - lat2));
    // console.log("DLA fracao: " + parseInt((((lat1 - lat2) % 1) * 100).toFixed(2)));

    // console.log("DLA: " + ((p1 * 60) + p2));
    // console.log(p1);
    // console.log(p2);
    // console.log("DLA: " + (((p1 * 60) + p2) * MICE).toFixed(2) + "Km");
    // console.log('\n');

    if (lon1 > lon2) {
        var p11 = parseInt(lon1 - lon2);
        var p22 = parseInt((((lon1 - lon2) % 1) * 100).toFixed(2));
    } else {
        var p11 = parseInt(lon2 - lon1);
        var p22 = parseInt((((lon2 - lon1) % 1) * 100).toFixed(2));
    }

    // console.log("DLO parseInt: " + parseInt(lon1 -lon2));
    // console.log("DLO fracao: " + parseInt((((lon1 - lon2) % 1) * 100).toFixed(2)));
    // console.log("DLO: " + ((p11 * 60) + p22));
    //  console.log("DLO: " + (((p11 * 60) + (p22 * 1)) * MICE).toFixed(2) + "Km");

    var dla = (((p1 * 60) + (p2 * 1)) * MICE).toFixed(2);

    if (dla < 0) {
        dla = dla * -1;
    }

    console.log("dla: " + dla);
    var dlo = (((p11 * 60) + (p22 * 1)) * MICE).toFixed(2);

    if (dlo < 0) {
        dlo = dlo * -1;
    }
    console.log("dlo: " + dlo);
    console.log('\n');

    var comprimento = ((Math.pow(dla, 2)) + (Math.pow(dlo, 2)));
    comprimento = Math.sqrt(comprimento).toFixed(3);
    console.log("comprimento: " + comprimento);
    console.log('\n');

    return comprimento;
}
/*
-------------------------------------------
todas as tebelas devem ser verificadas por:
-------------------------------------------
classificação N
latitude -19 a -3
longitude -47 q -34.9

-------------------------------------------
Tipos de classificação
-------------------------------------------
N (geracao expontanea)
NOR (dissipacao natural)
S (split)
C (continuidade)
M (merger)
*/
