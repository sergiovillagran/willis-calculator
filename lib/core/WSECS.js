//---------------------------------------------------------Variables------------------------------------------------------------------

//---Inputs---
/*
//On the table
var CondMaxGPM = 3000; //G31 - Tree 165
var EvapMaxGPM = 2400; //G32 - Tree 158
var WSEMaxEvapGPM = 2500; //G33 - Tree 166
var WSEMaxCondGPM = 2500; //G34 - Tree 164
var AvailableLoad = 1800; //G35 - Tree 168
var WarmestChilledWater = 54; //G36 - Tree 170
var ColdestCondWater = 67.7; //G37 - Tree 169
var QtyChillersOperable = 2; //G38 - Tree 32, 33
var WhithWSE = "x"; //G39 - Tree 11
var CSEvapFlow = "x"; //G40 - Tree 17
var AvaliableLoad = 750; //G41 - Tree 141
*/

//Not on the table
var T2 = 38;

//Variables of
var Columns = 19;
var Rows = 93;
var Area = 1288.28; //D11
var HeatTranferCoefficient = 723.81; //D12
var PossibleResultingTons1 = new Array(Columns); //K10 - AC102
var PossibleResultingTons2 = new Array(Columns); //K107 - AC199
var PossibleResultingTons3 = new Array(Columns); //K203 - AC295
var ChilledWaterSetPointTest = new Array(Columns); //K298 - AC390
var MaxEvapFlowTest = new Array(Columns); //K393 - AC485
var MaxCondFlowTest = new Array(Columns); //K488 - AC580
var ListAvailableSolutions = new Array(Columns); //K583 - AC675

//---Outputs---
var ColdestChilledWaterT2; //D3
var WarmestCondWaterT2; //D4
var WSEPotLoad = 0; //G42
var TonsPerChiller = 0; //G43
var CondenserFlowRateRequired = 0;
var EvaporatorFlowRateRequired = 0;

var WSECS = function(CondMaxGPM, EvapMaxGPM, WSEMaxEvapGPM, WSEMaxCondGPM, AvailableLoad, WarmestChilledWater, 
	ColdestCondWater, QtyChillersOperable, WhithWSE, CSEvapFlow, AvaliableLoad, condFlow, Evap_Flow_Estimated,
	Apro_Normal, Cond_Water_Normal, Cond_Water_Failed, Cond_Water, Scenario3){

	this.CondMaxGPM = CondMaxGPM;
	this.EvapMaxGPM = EvapMaxGPM;
	this.WSEMaxEvapGPM = WSEMaxEvapGPM;
	this.WSEMaxCondGPM = WSEMaxCondGPM;
	this.AvailableLoad = AvailableLoad;
	this.WarmestChilledWaterT1 = WarmestChilledWater;
	
	this.QtyChillersOperable = QtyChillersOperable;
	this.WhithWSE = WhithWSE;
	this.CSEvapFlow = CSEvapFlow;
	this.AvaliableLoad = AvaliableLoad;
	this.condFlow = condFlow;
	this.Evap_Flow_Estimated = Evap_Flow_Estimated
	// //FIrst iteration variables G139:G157
	// this.load = load
	// this.Load_Request = Load_Request
	// this.Heat_Rejection_L = Heat_Rejection_L 
	// this.Wet_Bulb = Wet_Bulb 
	// this.Cond_Flow_Cons = Cond_Flow_Cons
	// this.Cond_Flow_Variable = Cond_Flow_Variable 
	// this.Cond_Flow = Cond_Flow 
	// this.Tower_Range = Tower_Range 
	// this.Tower_Flow_Fac = Tower_Flow_Fac 
	// this.Cond_Water_Normal = Cond_Water_Normal 
	this.Apro_Normal = Math.round(Apro_Normal) 
	this.Cond_Water_Failed = Cond_Water_Normal + 35;
	this.Scenario3 = Scenario3

	//=IF(D154=0;D150;D156)
	this.ColdestCondWaterT1 = (Scenario3 == 0) ? Cond_Water_Normal : Cond_Water;

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

//------------------------------------------------------------Functiones-----------------------------------------------------------

WSECS.prototype.calculateGTTD = function (){
	return this.WarmestChilledWaterT1 - WarmestCondWaterT2;
} 

WSECS.prototype.calculateLTTD = function () {
	return ((this.ColdestCondWaterT1 - WarmestCondWaterT2) == 0 ? 0 : this.calculateLMTDSimple());
} 

WSECS.prototype.calculateLMTDSimple = function () {
	return ColdestChilledWaterT2 - this.ColdestCondWaterT1;
} 

WSECS.prototype.calculateLMTDFull = function () {
	return Math.round((this.calculateGTTD() - this.calculateLTTD()) / Math.log(this.calculateGTTD() / this.calculateLTTD()));
}

WSECS.prototype.calculateLMTD = function () {
	return this.calculateLTTD() == (ColdestChilledWaterT2 - this.ColdestCondWaterT1) ? this.calculateLMTDSimple() : this.calculateLMTDFull();
} 

WSECS.prototype.totalHeatExchanged = function () {
	return (this.calculateLTTD() > 0) ? HeatTranferCoefficient * Area * this.calculateLMTD() : 0; 
} 

WSECS.prototype.calculateTons = function () {
	return this.totalHeatExchanged() / 12000;
}

WSECS.prototype.returnTons = function (){
	return (this.calculateTons() > 25) ? this.calculateTons() : 0;
} 

WSECS.prototype.calculateNetTons = function () {
	this.netTons = Math.min(this.returnTons(), this.AvailableLoad);
	return this.netTons;
}

//Function used to get the MaxEvapGPM variable.
WSECS.prototype.getMaxEvapGPM = function(){
	return this.MaxEvapGPM;
}

//Function used to get the ColdestChilledWater variable.
WSECS.prototype.getMaxCondGPM = function(){
	return this.MaxCondGPM;
}

//Function used to get the MaxEvapGPM variable.
WSECS.prototype.getColdestChilledWaterT2 = function(){
	return ColdestChilledWaterT2;
}

//Function used to get the MaxCondGPM variable.
WSECS.prototype.getWarmestCondWaterT2 = function(){
	return WarmestCondWaterT2;
}

//Function used to define the MaxEvapGPM Matrix
WSECS.prototype.initMaxEvapGPM = function(){
	this.MaxEvapGPM = Math.min(this.EvapMaxGPM, this.WSEMaxEvapGPM);
}

//Function used to define the MaxCondGPM Matrix
WSECS.prototype.initMaxCondGPM = function(){
	this.MaxCondGPM = Math.min(this.CondMaxGPM, this.WSEMaxCondGPM);
}

//Function used to get the MaxCondGPM variable.
WSECS.prototype.getCondFlowRate = function(){
	return this.condFlow;
}

//Function used to get the MaxCondGPM variable.
WSECS.prototype.getEvapFlowRate = function(){
	return this.Evap_Flow_Estimated;
}

//Function used to define the CondenserFlowRateRequired variable
WSECS.prototype.initCondenserFlowRateRequired = function(){
	if((WarmestCondWaterT2 - ColdestCondWaterT1) == 0){
		CondenserFlowRateRequired = 0;
	}else{
		CondenserFlowRateRequired = (Math.round((WSEPotLoad * 24 / (WarmestCondWaterT2 - ColdestCondWaterT1)) * 10) / 10)
	}
}

//Function used to define the EvaporatorFlowRateRequired variable
WSECS.prototype.initEvaporatorFlowRateRequired = function(){
	if((WarmestChilledWaterT1 - ColdestChilledWaterT2) == 0){
		EvaporatorFlowRateRequired = 0;
	}else{
		EvaporatorFlowRateRequired = (Math.round((WSEPotLoad * 24 / (WarmestChilledWaterT1 - ColdestChilledWaterT2)) * 10) / 10)
	}
}

//Function used to define the PossibleResultingTons1 Matrix
WSECS.prototype.initPossibleResultingTons1 = function(){
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
WSECS.prototype.initPossibleResultingTons2 = function(){
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
WSECS.prototype.initPossibleResultingTons3 = function(){
	for(var column = 0;column < Columns;column++){
		if (!PossibleResultingTons3[column]) PossibleResultingTons3[column] = [];
		for(var row = 0;row < Rows;row++){
			PossibleResultingTons3[column][row] = Math.min(PossibleResultingTons2[column][row], this.AvailableLoad);
		}
	}
}

//Function used to define the ChilledWaterSetPointTest Matrix
WSECS.prototype.initChilledWaterSetPointTest = function(){
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
WSECS.prototype.initMaxEvapFlowTest = function(){
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
WSECS.prototype.initMaxCondFlowTest = function(){
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
WSECS.prototype.initListAvailableSolutions = function(){
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

WSECS.prototype.setIterationOneVariables = function(load, Load_Request, Heat_Rejection_L, Wet_Bulb, Cond_Flow_Cons,
	Cond_Flow_Variable, Cond_Flow, Tower_Range, Tower_Flow_Fac, Apro_Normal, Cond_Water_Normal, Cond_Water_Failed,
	Cond_Water, Scenario3)
{
	this.load = load
	this.Load_Request = Load_Request
	this.Heat_Rejection_L = Heat_Rejection_L 
	this.Wet_Bulb = Wet_Bulb 
	this.Cond_Flow_Cons = Cond_Flow_Cons
	this.Cond_Flow_Variable = Cond_Flow_Variable 
	this.Cond_Flow = Cond_Flow 
	this.Tower_Range = Tower_Range 
	this.Tower_Flow_Fac = Tower_Flow_Fac 
	this.Apro_Normal = Apro_Normal 
	this.Cond_Water_Normal = Cond_Water_Normal 
	this.Cond_Water_Failed = Cond_Water_Failed
	this.Cond_Water = Cond_Water
	this.Scenario3 = Scenario3
}

WSECS.prototype.calculateAllCooling = function(load, Load_Request, Heat_Rejection_L, Wet_Bulb, Cond_Flow_Cons,
	Cond_Flow_Variable, Cond_Flow, Tower_Range, Tower_Flow_Fac, Apro_Normal, Cond_Water_Normal, Cond_Water_Failed,
	Cond_Water)
{
	
}
module.exports= WSECS;
