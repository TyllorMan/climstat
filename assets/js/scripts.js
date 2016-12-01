var familias = new Array();
var EPs = new Array();
var celulasPreenchidas = new Array();

//funcao para imprimir as familias
function imprimirFamilias() {
    for (var i = 0; i < familias.length; i++) {
        familias[i].print();
    }
}

//funcao para carregar as familias
var openFileFam = function(event) {

    var input = event.target;
    var reader = new FileReader();

    reader.onload = function() {
        var text = reader.result;
        var tamanho = reader.result.length;
        //console.log("result.length: " + tamanho);
        var ponteiro = 0;
        var flag = 0;
        var count = 0;

        while (ponteiro != -1) {
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
        //tabela 2
        totalSistemas(familias.length);
        tabela3(familias.length);
        //console.log(JSON.stringify(familias));
    }; //fim onload
    reader.readAsText(input.files[0]);
}; //fim openFileFam

//imprime a tabela 2
function totalSistemas(quantidadeFamilias) {
    var temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 0 && json.hora <= 2) {
            temp.numero_mes = 1;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 0, 2);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 2 && json.hora <= 4) {
            temp.numero_mes = 1;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 2, 4);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 4 && json.hora <= 6) {
            temp.numero_mes = 1;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 4, 6);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 6 && json.hora <= 8) {
            temp.numero_mes = 1;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 6, 8);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 8 && json.hora <= 10) {
            temp.numero_mes = 2;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 8, 10);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 10 && json.hora <= 12) {
            temp.numero_mes = 3;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 10, 12);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 12 && json.hora <= 14) {
            temp.numero_mes = 4;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 12, 14);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 14 && json.hora <= 16) {
            temp.numero_mes = 5;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 14, 16);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 16 && json.hora <= 18) {
            temp.numero_mes = 6;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 16, 18);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 18 && json.hora <= 20) {
            temp.numero_mes = 7;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 18, 20);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 20 && json.hora <= 22) {
            temp.numero_mes = 8;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 20, 22);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 22 && json.hora <= 24) {
            temp.numero_mes = 9;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, 22, 24);
    temp = new Meses();
    for (var j = 0; j < (quantidadeFamilias); j++) {
        //verificar o tempo de vida dos SCM
        var json = JSON.parse(JSON.stringify(familias[j]));
        if (json.hora > 24) {
            temp.numero_mes = 10;
            if (json.mes == 1) {
                temp.janeiro += 1;
            } else if (json.mes == 2) {
                temp.fevereiro += 1;
            } else if (json.mes == 3) {
                temp.marco += 1;
            } else if (json.mes == 4) {
                temp.abril += 1;
            } else if (json.mes == 5) {
                temp.maio += 1;
            } else if (json.mes == 6) {
                temp.junho += 1;
            } else if (json.mes == 7) {
                temp.julho += 1;
            } else if (json.mes == 8) {
                temp.agosto += 1;
            } else if (json.mes == 9) {
                temp.setembro += 1;
            } else if (json.mes == 10) {
                temp.outubro += 1;
            } else if (json.mes == 11) {
                temp.novembro += 1;
            } else if (json.mes == 12) {
                temp.dezembro += 1;
            }
        }
    } //fim for
    escreveTabela2(temp, -1, 24);
}

function escreveTabela2(array, n1, n2) {
    var json = JSON.parse(JSON.stringify(array));
    if (n1 == -1) {
        $("#tabela > tbody").append($('<tr>').append($('<td>').append('> ' + n2).css("font-weight", "bold")).append($('<td>').append(json.janeiro)).append($('<td>').append(json.fevereiro)).append($('<td>').append(json.marco)).append($('<td>').append(json.abril)).append($('<td>').append(json.maio)).append($('<td>').append(json.junho)).append($('<td>').append(json.julho)).append($('<td>').append(json.agosto)).append($('<td>').append(json.setembro)).append($('<td>').append(json.outubro)).append($('<td>').append(json.novembro)).append($('<td>').append(json.dezembro)));
    } else {
        $("#tabela > tbody").append($('<tr>').append($('<td>').append(n1 + ' a ' + n2).css("font-weight", "bold")).append($('<td>').append(json.janeiro)).append($('<td>').append(json.fevereiro)).append($('<td>').append(json.marco)).append($('<td>').append(json.abril)).append($('<td>').append(json.maio)).append($('<td>').append(json.junho)).append($('<td>').append(json.julho)).append($('<td>').append(json.agosto)).append($('<td>').append(json.setembro)).append($('<td>').append(json.outubro)).append($('<td>').append(json.novembro)).append($('<td>').append(json.dezembro)));
    }
}

function tabela3(quantidadeFamilias) {
    //nova instancia Meses
    var temp = new Meses();
    //percorre todas as familias
    for (var i = 0; i < (quantidadeFamilias); i++) {
        //pega familia por familia
        var json = JSON.parse(JSON.stringify(familias[i]));
        //pega todos os tmepos de cada familia
        var array = JSON.parse(JSON.stringify(json.tempos));
        //percorre cada tmepo
        for (var h = 0; h < array.length; h++) {
            var pote = JSON.parse(JSON.stringify(array[h]))
            console.log(pote.size);
        }

        //  debugger;
        //percorre todos os meses e acha o maior
        // for (var j = 0; j < temp.length - 1; j++) {
        //     var maior = 0;
        //     if (mario < SIZE)
        //         marior = size;
        //     temp.mes = maior;
        // }
        //console.log(array);

    }
}

function escreveTabela3(array, n1) {
    var json = JSON.parse(JSON.stringify(array));
    $("#tabela3 > tbody").append($('<tr>').append($('<td>').append(n1)).append($('<td>').append(json.janeiro)).append($('<td>').append(json.fevereiro)).append($('<td>').append(json.marco)).append($('<td>').append(json.abril)).append($('<td>').append(json.maio)).append($('<td>').append(json.junho)).append($('<td>').append(json.julho)).append($('<td>').append(json.agosto)).append($('<td>').append(json.setembro)).append($('<td>').append(json.outubro)).append($('<td>').append(json.novembro)).append($('<td>').append(json.dezembro)));
}
