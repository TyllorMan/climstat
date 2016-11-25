var familias = new Array();
var EPs = new Array();

function imprimirFamilias() {
    for (var i = 0; i < familias.length; i++) {
        familias[i].print();
    }
}

//funcao para carregar os arquivos EP
var openFileEP = function(event) {
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
            EPs.push(eps);
        } //fim for linha
        //console.log(JSON.stringify(EPs));
        console.log(EPs);
    } //fim onload
    fileReader.readAsText(input.files[0]);
} //fimopenFileEP

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
            console.log("result.length: " + tamanho);
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
                    //console.log("Criando familia "+familias.length);
                    familia.numero = vfinal[1];
                    //console.log(familia.numero+" = "+vfinal[1]);
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
                            }
                            familias[familias.length - 1].addTempo(tempo);
                        }
                    }
                }
            } //fim while

            ponteiro = reader.result.indexOf('END', ponteiro + 1);
            //console.log(ponteiro);
            //COLOCAR OS IFs aqui

            // if(familia.hora >= 6 && familia.hora <= 24)
            //   console.log(familia.print());
            //
            //  $("#tabela")
            //    .append($('<tr>')
            //        .append($('<td>')
            //            .append('Família: ' + familia.numero + ' Ano: ' + familia.ano +
            //            ' Mês: ' + familia.mes + ' Tempo total: ' + familia.total_time +
            //            ' Hora: ' + familia.hora)
            //        )
            //    );
        }//fim while

        if (familia.hora >= 6 && familia.hora <= 24) {
            console.log(familia.print());
        }
    };//fim onload
    reader.readAsText(input.files[0]);
};
