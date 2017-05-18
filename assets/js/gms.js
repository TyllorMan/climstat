//function showCoordenadasMinutos(gDec, x) {
function showCoordenadasMinutos(gDec, latLon) {
    var graus;
    var minutos;
    var aux;
    var segundos;
    var milisegundos;
    var direcao;

    var graus2;
    var minutos2;
    var aux2;
    var segundos2;
    var milisegundos2;
    var direcao2;

    var grauAux;
    var minAux;
    var segaux;

    // Separa os graus
    graus = parseInt(gDec);

    // Pega a fração dos graus e converte em minutos
    aux = (graus - gDec) * 60;
    minutos = parseInt(aux);

    // Pega a fração dos minutos e converte em segundos
    aux = (aux - minutos) * 60;
    segundos = parseInt(aux);

    // Pega a fração dos segundos e converte em milisegundos
    milisegundos = parseInt((aux - segundos) * 60);

    /************************************************************/

    // Separa os graus
    graus2 = parseInt(latLon);

    // Pega a fração dos graus e converte em minutos
    aux2 = (graus2 - latLon) * 60;
    minutos2 = parseInt(aux2);

    // Pega a fração dos minutos e converte em segundos
    aux2 = (aux2 - minutos2) * 60;
    segundos2 = parseInt(aux2);

    // Pega a fração dos segundos e converte em milisegundos
    milisegundos2 = parseInt((aux2 - segundos2) * 60);

    // Essa parte eu verifico se é o eixo X ou Y para substituir o simbolo de negativo  pelas iniciais de norte ou sul para o eixo Y, leste ou oeste para o eixo X
    // if (x) {
    //     // Eixo X
    //     if (graus < 0)
    //         direcao = "O";
    //     else
    //         direcao = "L";
    // } else {
    //     // Eixo Y
    //     if (graus < 0)
    //         direcao = "S";
    //     else
    //         direcao = "N";
    // }
    // Devolvo a string formatada, a função Math.abs é para retornar o valor absoluto // (retirar o valor negativo) já que estou usando a notação norte, sul, leste ou oeste
    //return Math.abs(graus) + "° " + minutos + "' " + segundos + "." + milisegundos + "'' " + direcao;
    //return Math.abs(graus) + "° " + minutos + "' " + segundos + "." + milisegundos + "''";
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

    grauAux = graus - graus2;
    minAux = minutos - minutos2;
    segaux = segundos - segundos2;

    var dla = (((grauAux * 60) + (minAux * 1) + (segaux / 60)) * MICE).toFixed(2);

    if (dla < 0) {
        dla = dla * -1;
    }

    // return Math.abs(graus) + " " + minutos + " " + segundos + " | " +  Math.abs(graus2) + " " + minutos2+ " " + segundos2 + " | " + grauAux + " " + minAux + " " + segaux;
    console.log(Math.abs(graus) + " " + minutos + " " + segundos);
    console.log("DL a o: " + dla);

  //  return dla;
    //return Math.abs(graus) + " " + minutos + " " + segundos + " | " +  Math.abs(graus2) + " " + minutos2+ " " + segundos2;
    //valor de ponto flutuante no padrão NMEA
    //return ((graus * 100) + minutos) + (((segundos * 100) + milisegundos) / 10000);
}
