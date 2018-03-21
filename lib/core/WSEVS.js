
var WSEVS = function(CondMaxGPM, EvapMaxGPM, WSEMaxEvapGPM, WSEMaxCondGPM, AvailableLoad,
	 WarmestChilledWater, ColdestCondWater, QtyChillersOperable, WhithWSE, isEvapFlowOnVS, AvaliableLoad, 
	 WSECS, isVSCondFlow){
	//Inputs
	this.CondMaxGPM = CondMaxGPM; //G31 - Tree 165
	this.EvapMaxGPM = EvapMaxGPM; //G32 - Tree 158
	this.WSEMaxEvapGPM = WSEMaxEvapGPM; //G33 - Tree 166
	this.WSEMaxCondGPM = WSEMaxCondGPM; //G34 - Tree 164
	this.AvailableLoad = AvailableLoad; //G35 - Tree 168
	this.WarmestChilledWaterT1 = WarmestChilledWater; //G36 - Tree 170
	this.ColdestCondWaterT1 = ColdestCondWater; //G37 - Tree 169
	this.QtyChillersOperable = QtyChillersOperable; //G38 - Tree 32, 33
	this.WhithWSE = WhithWSE; //G39 - Tree 11
	this.isEvapFlowOnVS = isEvapFlowOnVS; //G40 - Tree 16
	this.AvaliableLoad = AvaliableLoad; //G41 - Tree 141
	this.WSECS = WSECS;
	this.isVSCondFlow = isVSCondFlow; 

	this.initPossibleResultingTons1();
	this.initPossibleResultingTons2();
	this.initPossibleResultingTons3();
	this.initMaxCondGPM();
	this.initChilledWaterSetPointTest();
	this.initMaxEvapFlowTest();
	this.initMaxCondFlowTest();
	this.initMaxEvapGPM();
	this.initListAvailableSolutions();
}

//Not on the table
var T2 = 38;

//---Variables---
var Columns = 19;
var Rows = 93;
var Area = 1288.22; //D11
var HeatTranferCoefficient = 723.81; //D12
var PossibleResultingTons1 = new Array(Columns); //K10 - AC102
var PossibleResultingTons2 = new Array(Columns); //K107 - AC199
var PossibleResultingTons3 = new Array(Columns); //K203 - AC295
var ChilledWaterSetPointTest = new Array(Columns); //K298 - AC390
var MaxEvapFlowTest = new Array(Columns); //K393 - AC485
var MaxCondFlowTest = new Array(Columns); //K488 - AC580
var ListAvailableSolutions = new Array(Columns); //K583 - AC675

//Outputs
var ColdestChilledWaterT2;
var WarmestCondWaterT2;
var WSEPotLoad = 0; //G42
var TonsPerChiller = 0; //G43

//------------------------------------------------------------Functiones-----------------------------------------------------------
//Function used to get the MaxEvapGPM variable.
WSEVS.prototype.getMaxEvapGPM = function(){
	return this.MaxEvapGPM;
}

//Function used to get the MaxCondGPM variable.
WSEVS.prototype.getMaxCondGPM = function(){
	return this.MaxCondGPM;
}

//Function used to get the MaxEvapGPM variable.
WSEVS.prototype.getColdestChilledWaterT2 = function(){
	return ColdestChilledWaterT2;
}

//Function used to get the MaxCondGPM variable.
WSEVS.prototype.getWarmestCondWaterT2 = function(){
	return WarmestCondWaterT2;
}

//Function used to get the MaxCondGPM variable.
WSEVS.prototype.getTons = function(){
	if (this.isEvapFlowOnVS)
		return this.WSECS.calculateNetTons();
	else
		return WSEPotLoad
}

//Function used to get the MaxCondGPM variable.
WSEVS.prototype.getNetTons = function(){
	return WSEPotLoad
}

//Function used to get the MaxCondGPM variable.
WSEVS.prototype.getCondFlowRate = function(){
	if (this.isVSCondFlow)
		return this.CondenserFlowRateRequired;
	else
		return this.WSECS.getCondFlowRate();
}

//Function used to get the MaxCondGPM variable.
WSEVS.prototype.getEvapFlowRate = function(){
	if (this.isEvapFlowOnVS)
		return this.EvaporatorFlowRateRequired;
	else
		return this.WSECS.getEvapFlowRate();
}

//Function used to define the MaxEvapGPM Matrix
WSEVS.prototype.initMaxEvapGPM = function(){
	this.MaxEvapGPM = Math.min(this.EvapMaxGPM, this.WSEMaxEvapGPM);
}

//Function used to define the MaxCondGPM Matrix
WSEVS.prototype.initMaxCondGPM = function(){
	this.MaxCondGPM = Math.min(this.CondMaxGPM, this.WSEMaxCondGPM);
}

//Function used to define the CondenserFlowRateRequired variable
WSEVS.prototype.initCondenserFlowRateRequired = function(){
	if((WarmestCondWaterT2 - ColdestCondWaterT1) == 0){
		this.CondenserFlowRateRequired = 0;
	}else{
		this.CondenserFlowRateRequired = (Math.round((WSEPotLoad * 24 / (WarmestCondWaterT2 - ColdestCondWaterT1)) * 10) / 10)
	}
}

//Function used to define the EvaporatorFlowRateRequired variable
WSEVS.prototype.initEvaporatorFlowRateRequired = function(){
	if((WarmestChilledWaterT1 - ColdestChilledWaterT2) == 0){
		this.EvaporatorFlowRateRequired = 0;
	}else{
		this.EvaporatorFlowRateRequired = (Math.round((WSEPotLoad * 24 / (WarmestChilledWaterT1 - ColdestChilledWaterT2)) * 10) / 10)
	}
}

//Function used to define the PossibleResultingTons1 Matrix
WSEVS.prototype.initPossibleResultingTons1 = function(){
	for(var column = 0;column < Columns;column++){
		if (!PossibleResultingTons1[column]) PossibleResultingTons1[column] = [];
		for(var row = 0;row < Rows;row++){
			if((this.ColdestCondWaterT1 + column) == (T2 + (0.25 * row))){
				PossibleResultingTons1[column][row] = 0;
			}else if(((T2 + (0.25 * row)) - this.ColdestCondWaterT1) > 0){
				if(this.WarmestChilledWaterT1 > (this.ColdestCondWaterT1 + column)){
					PossibleResultingTons1[column][row] = 1;
				}else{
					PossibleResultingTons1[column][row] = 0;
				}
			}else{
				PossibleResultingTons1[column][row] = 0;
			}
		}
	}
}

//Function used to defined the PossibleResultingTons2 Matrix
WSEVS.prototype.initPossibleResultingTons2 = function(){
	for(var column = 0;column < Columns;column++){
		if (!PossibleResultingTons2[column]) PossibleResultingTons2[column] = [];
		for(var row = 0;row < Rows;row++){
			if(PossibleResultingTons1[column][row] < 1){
				PossibleResultingTons2[column][row] = 0;
			}else if((this.WarmestChilledWaterT1 - (this.ColdestCondWaterT1 + column)) == ((T2 + (0.25 * row)) - this.ColdestCondWaterT1)){
				PossibleResultingTons2[column][row] = Math.round((this.Area * this.HeatTranferCoefficient / 120000 * (this.WarmestChilledWaterT1 - (this.ColdestCondWaterT1 + column))) * 10) / 10;
			}else{
				PossibleResultingTons2[column][row] = Math.round(( this.Area *this. HeatTranferCoefficient / 12000 * (Math.round(( ((this.WarmestChilledWaterT1 - (this.ColdestCondWaterT1 + column)) - ((T2 + (0.25 * row)) - this.ColdestCondWaterT1)) / Math.log((this.WarmestChilledWaterT1 - (this.ColdestCondWaterT1 + column)) / ((T2 + (0.25 * row)) - this.ColdestCondWaterT1)) ) * 10) / 10) ) * 10) / 10;
			}
		}
	}
}

//Function used to define the PossibleResultingTons1 Matrix
WSEVS.prototype.initPossibleResultingTons3 = function(){
	for(var column = 0;column < Columns;column++){
		if (!PossibleResultingTons3[column]) PossibleResultingTons3[column] = [];
		for(var row = 0;row < Rows;row++){
			PossibleResultingTons3[column][row] = Math.min(PossibleResultingTons2[column][row], this.AvailableLoad);
		}
	}
}

//Function used to define the ChilledWaterSetPointTest Matrix
WSEVS.prototype.initChilledWaterSetPointTest = function(){
	for(var column = 0;column < Columns;column++){
		if (!ChilledWaterSetPointTest[column]) ChilledWaterSetPointTest[column] = [];
		for(var row = 0;row < Rows;row++){
			if((T2 + (0.25 * row)) > this.WarmestChilledWaterT1){
				ChilledWaterSetPointTest[column][row] = 0;
			}else{
				ChilledWaterSetPointTest[column][row] = 1;
			}
		}
	}
}

//Function used to define the MaxEvapFlowTest matrix
WSEVS.prototype.initMaxEvapFlowTest = function(){
	for(var column = 0;column < Columns;column++){
		if (!MaxEvapFlowTest[column]) MaxEvapFlowTest[column] = [];
		for(var row = 0;row < Rows;row++){
			if(this.WarmestChilledWaterT1 > (T2 + (0.25 * row))){
				if((PossibleResultingTons3[column][row] * 24 / (this.WarmestChilledWaterT1 - (T2 + (0.25 * row)))) > this.EvapMaxGPM) {
					MaxEvapFlowTest[column][row] = 0;
				}else{
					MaxEvapFlowTest[column][row] = 1;
				}
			}else{
				MaxEvapFlowTest[column][row] = 0;
			}
		}
	}
}

//Function used to define the MaxCondFlowTest Matrix
WSEVS.prototype.initMaxCondFlowTest = function(){
	for(var column = 0;column < Columns;column++){
		if (!MaxCondFlowTest[column]) MaxCondFlowTest[column] = [];
		for(var row = 0;row < Rows;row++){
			if((this.ColdestCondWaterT1 + column) > this.ColdestCondWaterT1){
				if((PossibleResultingTons3[column][row] * 24 / ((this.ColdestCondWaterT1 + column) - this.ColdestCondWaterT1)) > this.CondMaxGPM){
					MaxCondFlowTest[column][row] = 0;
				}else{
					MaxCondFlowTest[column][row] = 1;
				}
			}else{
				MaxCondFlowTest[column][row] = 0;
			}
		}
	}
}

//Function used to define the ListAvailableSolutions Matrix
WSEVS.prototype.initListAvailableSolutions = function(){
	ColdestChilledWaterT2 = T2;
	WarmestCondWaterT2 = this.ColdestCondWaterT1;
	var temp = 0;
	for(var column = 0;column < Columns;column++){
		if (!ListAvailableSolutions[column]) ListAvailableSolutions[column] = [];
		for(var row = 0;row < Rows;row++){
			ListAvailableSolutions[column][row] = MaxCondFlowTest[column][row] * MaxEvapFlowTest[column][row] * ChilledWaterSetPointTest[column][row] * PossibleResultingTons3[column][row];
			if(ListAvailableSolutions[column][row] > temp){
				ColdestChilledWaterT2 = (ColdestChilledWaterT2 + (0.25 * row));
				WarmestCondWaterT2 = (this.ColdestCondWaterT1 + column);
			}
		}
	}
}

WSEVS.prototype.setWSECS = function (WSECS) {
	this.WSECS = WSECS;
}

module.exports = WSEVS;