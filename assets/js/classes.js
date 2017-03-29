function EPs() {
    this.estacao
    this.lat;
    this.lon;
    this.ano;
    this.mes;
    this.dia;
    this.chuva;
}

function Familia() {
    this.numero;
    this.ano;
    this.mes;
    this.dia;
    this.hora;
    this.primeiro_membro;
    this.classificacao;
    this.tempos = [];
    this.total_time;
    this.deltax;
    this.deltay;
    this.last_image;
    this.end;

    this.addTempo = function(t) {
        this.tempos.push(t);
    }

    this.print = function() {
        console.log("Familia: " + this.numero + " Ano: " + this.ano + " Mes: " + this.mes + " t.total: " + this.total_time + " hora: " + this.hora);

        familias.familia = this.numero;
        familias.ano = this.ano
        familias.mes = this.mes;
        familias.tempo_total = this.total_time;
        familias.hora = this.hora;

        for (var i = 0; i < this.tempos.length; i++) {
            this.tempos[i].print();
        } //fim for
    } //fim print
} //fim Familia

function Tempo() {
    var asterisco;
    var sys;
    var xlat;
    var xlon;
    var time;
    var size;
    var dsize;
    var tmed;
    var dtmed;
    var tmin;
    var dtmin;
    var tmin9;
    var dtmin9;
    var cbnum;
    var cbmed;
    var vel;
    var dir;
    var incli;
    var ecce;
    var t_ini;
    var t_fin;
    var clas;
    var sys_ant;

    this.print = function() {
        console.log(JSON.stringify(familias));
    }
}

function UTM() {
  this.numero
  this.ano;
  this.mes;
  this.dia;
  this.lat;
  this.lon;
  this.size;
}
