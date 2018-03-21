//Matriz prueba debe salir de Ch Data
var m1 = [
  [0.520, 0.520, 0.520, 0.520, 0.520, 0.524, 0.512, 0.547, 0.451, 0.478, 0.580, 0.716, 0.855, 1.013, 1.239, 1.240, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.348, 0.348, 0.348, 0.348, 0.348, 0.351, 0.343, 0.360, 0.343, 0.369, 0.447, 0.533, 0.623, 0.725, 0.866, 0.728, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.246, 0.246, 0.246, 0.246, 0.246, 0.243, 0.246, 0.254, 0.280, 0.341, 0.405, 0.475, 0.547, 0.632, 0.748, 0.880, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.225, 0.225, 0.225, 0.225, 0.225, 0.225, 0.228, 0.249, 0.276, 0.331, 0.390, 0.453, 0.522, 0.594, 0.686, 0.880, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.183, 0.183, 0.183, 0.183, 0.183, 0.187, 0.208, 0.236, 0.283, 0.335, 0.389, 0.449, 0.512, 0.578, 0.654, 0.750, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.163, 0.163, 0.163, 0.163, 0.163, 0.185, 0.210, 0.250, 0.295, 0.343, 0.394, 0.449, 0.510, 0.573, 0.643, 0.739, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.155, 0.155, 0.155, 0.155, 0.164, 0.174, 0.205, 0.240, 0.280, 0.324, 0.369, 0.417, 0.468, 0.524, 0.587, 0.687, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.186, 0.186, 0.186, 0.186, 0.191, 0.198, 0.225, 0.259, 0.293, 0.331, 0.373, 0.415, 0.462, 0.513, 0.568, 0.631, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.227, 0.227, 0.227, 0.227, 0.245, 0.274, 0.304, 0.334, 0.368, 0.406, 0.447, 0.492, 0.540, 0.593, 0.654, 0.720, 0.880, 0.880, 0.000, 0.000, 0.000],
  [0.294, 0.294, 0.294, 0.294, 0.294, 0.282, 0.291, 0.318, 0.347, 0.374, 0.403, 0.438, 0.477, 0.517, 0.564, 0.616, 0.880, 0.880, 0.000, 0.000, 0.000]
];

var LCdWTArray = [35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 120, 130, 140, 150, 160]; //E25-Y25
var Ld = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; //D26-D-35

// Entradas cada una es un arreglo de dos valores
// donde la posición 1 es para la ronda 1 y la posición 2 es para la ronda 2
// var CH1ChillerLoad = [250, 250]; //J6 N6 -- Tree D779 y Tree D836
// var CH1LCWT = [44, 44]; //J7 N7 -- Tree D786 y Tree D843
// var CH1LCdWT = [65.26, 65.5]; //J8 N8 -- Tree D787 y Tree D844
// var CH2ChillerLoad = [500, 500]; //J9 N9 -- Tree D791 y Tree D848
// var CH2LCWT = [47.333, 47.333]; // J10 N10 -- Tree D800 y Tree D857
// var CH2LCdWT = [120, 117.2]; //J11 N11 -- Tree D801 y Tree D858
// var CH1NominalLoad = [500, 0]; //J12 N12 -- Tree D30
// var CH2NominalLoad = [500, 0]; //J13 N13 -- Tree D31

//Salidas
var CH1kWTon; //J14, N14
var CH2kWTon; //J15, N15

var ChillersNew = function (ch1Loads, ch1LCWTs, ch1LCdWTs, ch2Loads, ch2LCWTs, ch2LCdWTs, CH1NominalLoad, CH2NominalLoad, chillerMapData) {
  this.CH1ChillerLoad = ch1Loads; //J6 N6 -- Tree D779 y Tree D836
  this.CH1LCWT = ch1LCWTs; //J7 N7 -- Tree D786 y Tree D843
  this.CH1LCdWT = ch1LCdWTs; //J8 N8 -- Tree D787 y Tree D844
  this.CH2ChillerLoad = ch2Loads; //J9 N9 -- Tree D791 y Tree D848
  this.CH2LCWT = ch2LCWTs; // J10 N10 -- Tree D800 y Tree D857
  this.CH2LCdWT = ch2LCdWTs; //J11 N11 -- Tree D801 y Tree D858
  this.CH1NominalLoad = CH1NominalLoad; //J12 N12 -- Tree D30
  this.CH2NominalLoad = CH2NominalLoad; //J13 N13 -- Tree D31
  this.chillerMapData = chillerMapData; // Comes from chdata.

  console.log('inside new chiller', this.chillerMapData.length)

  //Salidas
  this.CH1kWTon; //J14, N14
  this.CH2kWTon; //J15, N15
  
  this.calcularSalidas();
}


//Variables calculadas por ronda
ChillersNew.prototype.calcularSalidas = function () {
  console.log('this.CH1ChillerLoad', this.CH1ChillerLoad)
  console.log('this.CH1NominalLoad', this.CH1NominalLoad)
  var load = (this.CH1NominalLoad[0] != 0) ? (this.CH1ChillerLoad[0] / this.CH1NominalLoad[0]) * 100 : 0;
  console.log('load', load)  
  var temp = this.calcularBellowAbove(load, this.CH1LCdWT[0]);
  var bellowLd = temp[0];
  var aboveLd = temp[1];
  var diferenciaBellowAboveLd = temp[2];
  var bellowLCdWT = temp[3];
  var aboveLCdWT = temp[4];
  var diferenciaBellowAboveLCdWT = temp[5]; //Interpolation Caculation 1 A37-M41
  var respuesta = [this.calcularCorner(1, load, bellowLd, this.CH1LCdWT[0], bellowLCdWT, aboveLd, aboveLCdWT, diferenciaBellowAboveLCdWT, diferenciaBellowAboveLd)];

  //CH-1 Preliminary kW/TonsC_OfHeatR
  load = (load < 10) ? 10 : load;
  //El resto de variables permanecen igual que en las celdas A24-C34
  //Interpolation Calculation A61-M65
  respuesta[1] = this.calcularCorner(2, load, bellowLd, this.CH1LCdWT[0], bellowLCdWT, aboveLd, aboveLCdWT, diferenciaBellowAboveLCdWT, diferenciaBellowAboveLd);

  //Interpolation Calculation A82-M86
  temp = this.calcularBellowAbove(load, this.CH1LCdWT[1]);
  bellowLd = temp[0];
  aboveLd = temp[1];
  diferenciaBellowAboveLd = temp[2];
  bellowLCdWT = temp[3];
  aboveLCdWT = temp[4];
  diferenciaBellowAboveLCdWT = temp[5];

  load = (this.CH1NominalLoad[0] != 0) ? (this.CH1ChillerLoad[1] / this.CH1NominalLoad[0]) * 100 : 0;
  load = (load < 10) ? 10 : load;

  respuesta[2] = this.calcularCorner(2, load, bellowLd, this.CH1LCdWT[1], bellowLCdWT, aboveLd, aboveLCdWT, diferenciaBellowAboveLCdWT, diferenciaBellowAboveLd);


  //Interpolation Calculation AA37-AM41
  load = (this.CH2NominalLoad[0] != 0) ? (this.CH2ChillerLoad[0] / this.CH2NominalLoad[0]) * 100 : 0;
  //CH2LCWT[0] J10
  //CH2LCdWT[0] J11 Lcdwt
  console.log('load1', load)
  temp = this.calcularBellowAbove(load, this.CH2LCdWT[0]);
  bellowLd = temp[0];
  aboveLd = temp[1];
  diferenciaBellowAboveLd = temp[2];
  bellowLCdWT = temp[3];
  aboveLCdWT = temp[4];
  diferenciaBellowAboveLCdWT = temp[5];

  respuesta[3] = this.calcularCorner(1, load, bellowLd, this.CH2LCdWT[0], bellowLCdWT, aboveLd, aboveLCdWT, diferenciaBellowAboveLCdWT, diferenciaBellowAboveLd);

  //Interpolation Calculation AA61-AM65
  load = (this.CH2NominalLoad[0] != 0) ? (this.CH2ChillerLoad[0] / this.CH2NominalLoad[0]) * 100 : 0;
  load = (load < 10) ? 10 : load;
  respuesta[4] = this.calcularCorner(2, load, bellowLd, this.CH2LCdWT[0], bellowLCdWT, aboveLd, aboveLCdWT, diferenciaBellowAboveLCdWT, diferenciaBellowAboveLd);

  //Interpolation Calculation AA82-AM86
  temp = this.calcularBellowAbove(load, this.CH2LCdWT[1]);
  bellowLd = temp[0];
  aboveLd = temp[1];
  diferenciaBellowAboveLd = temp[2];
  bellowLCdWT = temp[3];
  aboveLCdWT = temp[4];
  diferenciaBellowAboveLCdWT = temp[5];

  load = (this.CH2NominalLoad[0] != 0) ? (this.CH2ChillerLoad[1] / this.CH2NominalLoad[0]) * 100 : 0;
  load = (load < 10) ? 10 : load;
  respuesta[5] = this.calcularCorner(2, load, bellowLd, this.CH2LCdWT[1], bellowLCdWT, aboveLd, aboveLCdWT, diferenciaBellowAboveLCdWT, diferenciaBellowAboveLd);
  
  this.CH1kWTon = [respuesta[1], respuesta[2]];
  this.CH2kWTon = [respuesta[4], respuesta[5]];
}

//función para calcular variables above y bellow
ChillersNew.prototype.calcularBellowAbove = function (load, LCdWT) {
  var menor = Ld.find(function (elemento, index, array) {
    var aux = 0;
    array.forEach(function (valActual, pos) {
      if (valActual <= load && valActual > aux) {
        aux = valActual;
      }
    });
    return elemento == aux;
  });

  var bellowLd = [Ld.indexOf(menor), menor];
  var aboveLd = [(bellowLd[0] > 8 ? 8 : bellowLd[0] + 1)];
  aboveLd[1] = Ld[aboveLd[0]];
  var diferenciaBellowAboveLd = (aboveLd[1] - bellowLd[1] == 0) ? 1 : aboveLd[1] - bellowLd[1];


  menor = LCdWTArray.find(function (elemento, index, array) {
    var aux = 0;
    array.forEach(function (valActual, pos) {
      if (valActual <= LCdWT && valActual > aux) {
        aux = valActual;
      }
    });
    return elemento == aux;
  });
  var bellowLCdWT = [LCdWT < LCdWTArray[0] ? 1 : LCdWTArray.indexOf(menor), menor];
  var aboveLCdWT = [bellowLCdWT[0] + 1];
  aboveLCdWT[1] = LCdWTArray[aboveLCdWT[0]];
  var diferenciaBellowAboveLCdWT = (aboveLCdWT[1] - bellowLCdWT[1] == 0) ? 1 : aboveLCdWT[1] - bellowLCdWT[1];
  
  return [bellowLd, aboveLd, diferenciaBellowAboveLd, bellowLCdWT, aboveLCdWT, diferenciaBellowAboveLCdWT];
}

//función para calcular respuesta
//Solo existe una diferencia en los arreglos de corners que se calculan, los dos primeros arreglos son tipo 1 y el resto tipo 2
ChillersNew.prototype.calcularCorner = function (tipo, load, bellowLd, LCdWT, bellowLCdWT, aboveLd, aboveLCdWT, diferenciaBellowAboveLCdWT, diferenciaBellowAboveLd) {
  //posición 0 corners
  var corner2 = [this.chillerMapData[aboveLd[0]][bellowLCdWT[0]]];
  if (tipo == 1) {
    var corner1 = [(this.chillerMapData[bellowLd[0]][bellowLCdWT[0]] == 0) ? corner2[0] * new Number("1.03") : this.chillerMapData[bellowLd[0]][bellowLCdWT[0]]];
  } else {
    var corner1 = [this.chillerMapData[bellowLd[0]][bellowLCdWT[0]]];
  }
  var corner3 = [(this.chillerMapData[bellowLd[0]][aboveLCdWT[0]] > 0) ? this.chillerMapData[bellowLd[0]][aboveLCdWT[0]] : corner1[0] * 1.03];
  var corner4 = [(this.chillerMapData[aboveLd[0]][aboveLCdWT[0]] > 0) ? this.chillerMapData[aboveLd[0]][aboveLCdWT[0]] : corner2[0] * 1.03];

  //posición 1 corners
  corner1[1] = (load - bellowLd[1]) / diferenciaBellowAboveLd;
  corner2[1] = (aboveLd[1] - load) / diferenciaBellowAboveLd;
  corner3[1] = corner1[1];
  corner4[1] = corner2[1];

  //posición 2 corners
  corner1[2] = (corner2[0] - corner1[0]) * corner1[1];
  corner2[2] = (corner2[0] - corner1[0]) * corner2[1];
  corner3[2] = (corner4[0] - corner3[0]) * corner3[1];
  corner4[2] = (corner4[0] - corner3[0]) * corner4[1];

  //posición 3 corners
  corner1[3] = corner1[0] + corner1[2];
  corner2[3] = corner2[0] - corner2[2];
  corner3[3] = corner3[0] + corner3[2];
  corner4[3] = corner4[0] - corner4[2];

  //posición 4 corners
  corner2[4] = (LCdWT - bellowLCdWT[1]) / diferenciaBellowAboveLCdWT;
  corner3[4] = (aboveLCdWT[1] - LCdWT) / diferenciaBellowAboveLCdWT;


  //posición 5 corners
  corner2[5] = (corner3[3] - corner2[3]) * corner2[4];
  corner3[5] = (corner3[3] - corner2[3]) * corner3[4];

  //posición 6 corners
  corner2[6] = corner2[5] + corner2[3];
  corner3[6] = corner3[3] - corner3[5];

  //respuesta
  var respuesta = load == 0 ? 0 : corner2[6];

  return respuesta;
}

ChillersNew.prototype.getCH1kWTon = function () {
  return this.CH1kWTon;
}

ChillersNew.prototype.getCH2kWTon = function () {
  return this.CH2kWTon;
}
module.exports = ChillersNew;