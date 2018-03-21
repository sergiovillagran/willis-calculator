
//var chData = new CHData;
//Entradas

var wetBulbTemperature;
var towerRange = [];
var chData;
var maxLCdWT;
var desiredRange;


//Salidas

var towerFlowFactor;
var maxRange;
var maxECdWT;
var resultingRange;
var lookUps = [];

var TowerModel = function(wetBulbTemperature_1,wetBulbTemperature_2,towerRange_1,towerRange_2,chData,desiredRange, designApproach) {
    this.wetBulbTemperature=[];
    this.wetBulbTemperature[0] = wetBulbTemperature_1;
    this.wetBulbTemperature[1] = wetBulbTemperature_2;
    this.towerRange=[];
    this.towerRange[0] = towerRange_1;
    this.towerRange[1] = towerRange_2;
    this.chData = chData;
    this.maxLCdWT = chData.getMaxLCdWT();
    this.desiredRange = desiredRange;
    this.designApproach = designApproach;
  this.calcularTowerModel();

}


TowerModel.prototype.ecuacion = function(x, y, z) {
  var resultado = (2.471006) - (0.1398551 * x) + (0.001325024 * x * x) + (0.7687214 * y) - (0.02337056 * x * y) + (0.000149476 * x * x * y) -
    (0.01116139 * y * y) + (0.000325406 * x * y * y) - (0.00000230183 * x * x * y * y) + (9.852804 * z) - (0.1736736 * x * z) +
    (0.000811069 * x * x * z) + (1.74992 * y * z) + (0.004930143 * x * y * z) - (0.00022193 * x * x * y * z) -
    (0.009865402 * y * y * z) - (0.000283361 * x * y * y * z) + (0.00000466261 * x * x * y * y * z) + (0.09746009 * z * z) -
    (0.01116796 * x * z * z) + (0.000138903 * x * x * z * z) - (0.1354148 * y * z * z) + (0.001004747 * x * y * z * z) +
    (0.0000119203 * x * x * y * z * z) - (0.002255673 * y * y * z * z) + (0.0000192893 * x * y * y * z * z) +
    (0.000000260086 * x * x * y * y * z * z);
  return resultado;
}



TowerModel.prototype.towerFailureMonteCarlo = function() {
  var respuesta = [];
  var aux = 1;
  for (i = 0; i <= 240; i++) {
    respuesta[i] = [aux, this.wetBulbTemperature[1], this.ecuacion(this.wetBulbTemperature[1], aux, towerFlowFactor)]
    respuesta[i][3] = respuesta[i][2] + this.wetBulbTemperature[1];
    respuesta[i][4] = this.wetBulbTemperature[1] + 35;
    respuesta[i][5] = (((respuesta[i][3] + respuesta[i][4]) / 2).toFixed(1)) / 1;
    respuesta[i][6] = respuesta[i][5] + respuesta[i][0];
    aux = ((aux + (1 / 10)).toFixed(1)) / 1;
  }
  return respuesta;
}


//Función para calcular lookups I26, I27, J26, J27
TowerModel.prototype.calcularLookUps = function(respuesta, maxLCdWT) {
  var arrayTemp = [];
  respuesta.forEach(function(valActual, pos) {
    arrayTemp[pos] = valActual[6];
  });
  lookUps[0] = [0, 0];
  lookUps[1] = [0, 0];
  for (var i = 0; i < 2; i++) {
    if (arrayTemp[163] <= maxLCdWT[i]) {
      var valActual = Math.max.apply(null, arrayTemp.filter(function(valor) {
        return valor <= maxLCdWT[i];
      }));
      var pos = arrayTemp.indexOf(valActual);
      lookUps[i] = [valActual, pos];
    }
  }
  return lookUps;
}


TowerModel.prototype.calcularOtrasMatrices = function(designApproach) {
  var matriz = [];
  var matriz2 = [];
  cont = 0;

  console.log("this.wetBulbTemperature[0]", this.wetBulbTemperature[0])
  
  for (i = 0.3; i <= 4; i = ((i + (0.005)).toFixed(3)) / 1) {
    var ecuacionCalculada = this.ecuacion(this.wetBulbTemperature[0], this.towerRange[0], i);
    matriz[cont] = [i, ecuacionCalculada, designApproach, designApproach - ecuacionCalculada];
    cont++;
  }
  var arrayTempPos3 = [];
  matriz.forEach(function(valActual, pos) {
    arrayTempPos3[pos] = valActual[3];
  });
  var pos = arrayTempPos3.indexOf(Math.min.apply(null, arrayTempPos3.filter(function(valor) {
    return valor >= 0;
  })));

  var temp0 = (matriz[pos - 1][0]);
  var temp1 = matriz[pos][1];

  respuestaMatriz = [temp0, temp1, pos];
  cont = 0;
  var inicial = ((temp0 - (0.0005)).toFixed(4)) / 1;
  var final = inicial + (((39 * (0.0005)).toFixed(4)) / 1);
  for (i = inicial; i <= final; i = ((i + (0.0005)).toFixed(4)) / 1) {
    var ecuacionCalculada = this.ecuacion(this.wetBulbTemperature[0], this.towerRange[0], i);
    matriz2[cont] = [i, ecuacionCalculada, designApproach, designApproach - ecuacionCalculada];
    cont++;
  }
  var arrayTempPos3 = [];
  matriz2.forEach(function(valActual, pos) {
    arrayTempPos3[pos] = valActual[3];
  });
  pos = arrayTempPos3.indexOf(Math.min.apply(null, arrayTempPos3.filter(function(valor) {
    return valor >= 0;
  })));


  temp0 = (matriz2[pos][0]);
  temp1 = matriz2[pos][1];

  var respuestaMatriz2 = [temp0, temp1, pos];
  //Matriz corresponde a celdas AA46-AD786
  //Matriz2 corresponde a celdas AA3 - AD42
  return [matriz, matriz2, respuestaMatriz, respuestaMatriz2];

}

TowerModel.prototype.calcularTowerModel = function() {


  //Calclo matrices entre AA45 hasta AD786 y entre AA3 y AD42
  //var designApproach = 7; // de Graphic Using Tree T26
  var matrices = this.calcularOtrasMatrices(this.designApproach);

  //console.log(matrices[2],matrices[3]);
  towerFlowFactor = matrices[3][0];

  //Matriz B17-H259
  respuesta = this.towerFailureMonteCarlo();
  lookUps = this.calcularLookUps(respuesta, this.maxLCdWT);
  //towerApproach = [this.ecuacion(wetBulbTemperature[0], towerRange[0], towerFlowFactor), this.ecuacion(wetBulbTemperature[1], towerRange[1], towerFlowFactor)];
  maxRange = [respuesta[lookUps[0][1]][0], respuesta[lookUps[1][1]][0]];
  maxECdWT = [respuesta[lookUps[0][1]][5], respuesta[lookUps[1][1]][5]];
  resultingRange = [Math.min(desiredRange, maxRange[0]), Math.min(desiredRange, maxRange[1])];
  //console.log(resultingRange);
}

TowerModel.prototype.getTowerFlowFactor = function () {
  return towerFlowFactor;
}

module.exports = TowerModel;
