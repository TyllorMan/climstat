//function showCoordenadasMinutos(gDec, x) {
function showCoordenadasMinutos(gDec, latLon) {
    var graus = 0;
    var minutos = 0;
    var aux = 0;
    var segundos = 0;
    var milisegundos = 0;
    var direcao = 0;

    var graus2 = 0;
    var minutos2 = 0;
    var aux2 = 0;
    var segundos2 = 0;
    var milisegundos2 = 0;
    var direcao2 = 0;

    var grauAux = 0;
    var minAux = 0;
    var segaux = 0;

    // Separa os graus
    graus = parseInt(gDec);
    // Pega a fração dos graus e converte em minutos
    aux = ((graus - gDec) * 60).toFixed(2);
    minutos = parseInt(aux);
    // Pega a fração dos minutos e converte em segundos
    aux = ((aux - minutos) * 60).toFixed(2);
    segundos = parseInt(Math.round(aux));
    // Pega a fração dos segundos e converte em milisegundos
    milisegundos = parseInt((aux - segundos) * 60);

    /************************************************************/

    // Separa os graus
    graus2 = parseInt(latLon);
    // Pega a fração dos graus e converte em minutos
    aux2 = ((graus2 - latLon) * 60).toFixed(2);
    minutos2 = parseInt(aux2);
    // Pega a fração dos minutos e converte em segundos
    aux2 = ((aux2 - minutos2) * 60).toFixed(2);
    segundos2 = parseInt(Math.round(aux2));
    // Pega a fração dos segundos e converte em milisegundos
    milisegundos2 = parseInt((aux2 - segundos2) * 60);

    if (graus < 0) {
        graus = graus *= -1;
    }
    if (minutos < 0) {
        minutos = minutos *= -1;
    }
    if (segundos < 0) {
        segundos = segundos *= -1;
    }

    /************************************************************/

    if (graus2 < 0) {
        graus2 = graus2 *= -1;
    }
    if (minutos2 < 0) {
        minutos2 = minutos2 *= -1;
    }
    if (segundos2 < 0) {
        segundos2 = segundos2 *= -1;
    }

    // console.log('\n');
    // console.log(graus + '°' + minutos + '\'' + segundos + '\'\'');
    // console.log(graus2 + '°' + minutos2 + '\'' + segundos2 + '\'\'');
    // console.log('\n');

    grauAux = graus - graus2;
    minAux = minutos - minutos2;
    segaux = segundos - segundos2;

    //  console.log('segaux: ' + parseInt(segaux));

    if (grauAux < 0) {
        grauAux = grauAux *= -1;
    }
    if (minAux < 0) {
        minAux = minAux *= -1;
    }
    if (segaux < 0) {
        segaux = segaux *= -1;
    }

    // console.log('grauAux ' + grauAux);
    // console.log('minAux ' + minAux);
    // console.log('segaux ' + segaux);

    var dla = (((grauAux * 60) + (minAux * 1) + (segaux / 60)) * MICE).toFixed(2);

    if (dla < 0) {
        dla = dla * -1;
    }

    //console.log("DL a o: " + dla);

    return dla;
    //valor de ponto flutuante no padrão NMEA
    //return ((graus * 100) + minutos) + (((segundos * 100) + milisegundos) / 10000);
}
