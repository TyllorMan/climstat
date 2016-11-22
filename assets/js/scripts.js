var familias = new Array();
function imprimirFamilias() {
    var i=0;
    for(i=0;i<familias.length;i++) {
        familias[i].print();
    }
}

var openFileFam = function(event) {
var input = event.target;

var reader = new FileReader();

reader.onload = function(){
  var text = reader.result;
  var node = document.getElementById('output');
  node.innerHTML = "Carregando...</br>";

  var tamanho = reader.result.length;
  console.log(tamanho);
  var ponteiro = 0;
  var flag = 0;
  var count = 0;

  while(ponteiro!=-1) {

     var linhaF = reader.result.indexOf('FAMILY',ponteiro);
     var linhaS = reader.result.indexOf('SYS#',ponteiro);
     var str_familia = reader.result.substring(linhaF, linhaS);
     //console.log(str_familia.trim());
     var inicioDalinha=0;
     // fimDalinha=linhaS;
     fimDalinha=ponteiro;
     var fimFamilia = reader.result.indexOf('TOTAL TIME',ponteiro);
     //console.log('fimFamilia:'+fimFamilia);
     while(fimDalinha<fimFamilia) {
        inicioDalinha = reader.result.indexOf('\n',fimDalinha)+1;
        //console.log('inicioDaLinha:'+inicioDalinha);
        fimDalinha = reader.result.indexOf('\n',inicioDalinha+2);
        if(flag==0) {
            inicioDalinha=0;
        }
        flag=1;
        //console.log('fimDalinha:'+fimDalinha);
        var vetor = new Array();
        var vfinal = new Array();
        var linha = reader.result.substring(inicioDalinha, fimDalinha);

        vetor = linha.trim().split(' ');
        var i;

        for(i=0;i<vetor.length;i++) {
          if(vetor[i]!="")
            vfinal.push(vetor[i]);
        }



        if(count==0) {
          var familia = new Familia();
          //console.log("Criando familia "+familias.length);

          familia.numero = vfinal[1];
          //console.log(familia.numero+" = "+vfinal[1]);
          familia.ano = vfinal[3].substring(vfinal[3].indexOf('=')+1,vfinal[3].length);
          familia.mes = vfinal[5];
          familia.dia = vfinal[7];
          familia.hora = vfinal[8].substring(vfinal[8].indexOf('=')+1,vfinal[8].length);
          familias.push(familia);

          count++;
        } else {
            if(vfinal[0]=="TOTAL") {
              count=0;

              familias[familias.length-1].total_time=vfinal[2];
              familias[familias.length-1].deltax=vfinal[4];
              familias[familias.length-1].deltay=vfinal[6];
              //familias[familias.length-1].last_image=vfinal[9];
              //familias[familias.length-1].end=vfinal[10].substring(vfinal[10].indexOf('=')+1,vfinal[10].length);

              //console.log("   -  Terminando ");
            } else {
              if(vfinal[0]!="SYS#") {
                //console.log("   -  Criando tempo "+vfinal[1]);
                 var t = new Tempo();
                 if(vfinal[0]=='*') {
                     t.asterisco=vfinal[0];
                     t.sys=vfinal[1];
                     t.xlat=vfinal[2];
                     t.xlon=vfinal[3];
                     t.time=vfinal[4];
                     t.size=vfinal[5];
                     t.dsize=vfinal[6];
                     t.tmed=vfinal[7];
                     t.dtmed=vfinal[8];
                     t.tmin=vfinal[9];
                     t.dtmin=vfinal[10];
                     t.tmin9=vfinal[11];
                     t.dtmin9=vfinal[12];
                     t.cbnum=vfinal[13];
                     t.cbmed=vfinal[14];
                     t.vel=vfinal[15];
                     t.dir=vfinal[16];
                     t.incli=vfinal[17];
                     t.ecce=vfinal[18];
                     t.t_ini=vfinal[19];
                     t.t_fin=vfinal[20];
                     t.clas=vfinal[21];
                     t.sys_ant=vfinal[22];
                 }else {
                    t.asterisco='';
                     t.sys=vfinal[0];
                     t.xlat=vfinal[1];
                     t.xlon=vfinal[2];
                     t.time=vfinal[3];
                     t.size=vfinal[4];
                     t.dsize=vfinal[5];
                     t.tmed=vfinal[6];
                     t.dtmed=vfinal[7];
                     t.tmin=vfinal[8];
                     t.dtmin=vfinal[9];
                     t.tmin9=vfinal[10];
                     t.dtmin9=vfinal[11];
                     t.cbnum=vfinal[12];
                     t.cbmed=vfinal[13];
                     t.vel=vfinal[14];
                     t.dir=vfinal[15];
                     t.incli=vfinal[16];
                     t.ecce=vfinal[17];
                     t.t_ini=vfinal[18];
                     t.t_fin=vfinal[19];
                     t.clas=vfinal[20];
                     t.sys_ant=vfinal[21];
                 }
                 familias[familias.length-1].addTempo(t);
               }
            }

        }

        //console.log(linha);
        //console.log(vfinal);
        //console.log(familia.numero);

     }

     ponteiro = reader.result.indexOf('END',ponteiro+1);
     //console.log(ponteiro);
     //COLOCAR OS IFs aqui
     if(familia.hora>=6&&familia.hora<=24)
      console.log(familia.print());



  }
  node.innerHTML = node.innerText+familias.length+ " Familias Carregadas!</br>";


};
reader.readAsText(input.files[0]);
};
