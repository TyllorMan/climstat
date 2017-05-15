function showCoordenadasMinutos(gDec, x) {
    var graus;
    var minutos;
    var aux;
    var segundos;
    var milisegundos;
    var direcao;

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
    return Math.abs(graus) + "° " + minutos + "' " + segundos + "." + milisegundos + "'' " + direcao;
}
