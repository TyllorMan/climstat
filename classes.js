function EPI() {

	this.lat;
	this.lon;
	this.ano;
	this.mes;
	this.dia;

	this.print = function() {
		console.log("lat:"+this.lat+" lon:"+this.lon+" dia:"+this.dia+"/"+this.mes+"/"+this.ano);
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


  	this.addTempo = function (t) {
   		this.tempos.push(t);
  	}

  	this.print = function () {
  		console.log("Familia: " + this.numero + " Ano: " + this.ano + " Mes: " + this.mes+ " t.total: "+this.total_time+" hora:"+this.hora);
   		var i=0;
   		for(i=0;i<this.tempos.length;i++) {
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

    this.print = function () {
    	console.log(" - Tempo: "+this.sys+" Lat:" + this.xlat + " Long: " + this.xlon + " Size: " + this.size);
  	}
}