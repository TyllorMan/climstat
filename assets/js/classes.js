var familias = {
	familia: new Number(),
	ano: new Number(),
	mes: new Number(),
	tempo_total: new Number(),
	hora: new Number(),
	array: []
};

	function EPI() {

	this.lat;
	this.lon;
	this.ano;
	this.mes;
	this.dia;

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

  this.addTempo = function (t) {
   	this.tempos.push(t);
  }

	this.print = function () {
		console.log("Familia: " + this.numero + " Ano: " + this.ano + " Mes: " + this.mes + " t.total: " + this.total_time + " hora: " + this.hora);

		familias.familia =  this.numero;
		familias.ano=this.ano
		familias.mes =this.mes;
		familias.tempo_total=this.total_time;
		familias.hora= this.hora;


		var i;
 		for(i = 0; i < this.tempos.length; i++) {
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
		// $("#tabela")
		// 	.append($('<tr>')
		// 			.append($('<td>')
		// 					.append(" - Tempo: " + this.sys + " Lat: " + this.xlat + " Long: " + this.xlon + " Size: " + this.size)
		// 			)
		// 	);

			// var objeto = {
      //       familia: new Number(0),
			// 			ano: 0,
			// 			mes: 0,
			// 			tempo_total: 0,
			// 			hora: 0,
             familias.array = [{'tempo': new Number(this.sys), 'latitude': new Number(this.xlat), 'longitude':new Number(this.xlon), 'size':new Number(this.xlat)}]
      //   };

		//var json = JSON.stringify({'tempo': new Number(this.sys), 'latitude': new Number(this.xlat), 'longitude':new Number(this.xlon), 'size':new Number(this.xlat)});
		//console.log(json);
  	console.log(JSON.stringify(familias));
	}
}
