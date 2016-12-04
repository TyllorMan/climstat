function EPs() {
    this.estacao
    this.lat;
    this.lon;
    this.ano;
    this.mes;
    this.dia;
    this.chuva;

    this.print = function() {
        console.log("lat: " + this.lat + " lon: " + this.lon + " dia: " + this.dia + "/" + this.mes + "/" + this.ano);
    }
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
        }
    }
}

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
        // $("#tabela")
        // 	.append($('<tr>')
        // 			.append($('<td>')
        // 					.append(" - Tempo: " + this.sys + " Lat: " + this.xlat + " Long: " + this.xlon + " Size: " + this.size)
        // 			)
        // 	);
        console.log(JSON.stringify(familias));
        //console.log(familias);
    }
}

function Meses() {
    this.numero_mes = 0;
    this.janeiro = 0;
    this.fevereiro = 0;
    this.marco = 0;
    this.abril = 0;
    this.maio = 0;
    this.junho = 0;
    this.julho = 0;
    this.agosto = 0;
    this.setembro = 0;
    this.outubro = 0;
    this.novembro = 0;
    this.dezembro = 0;
    this.hora = 0;
}

function diaMesAno() {
    this.mes = 0;
    this.dia = 0;
    this.ano = 0;
}
