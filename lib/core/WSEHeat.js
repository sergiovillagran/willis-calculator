//--------------------------------Variables---------------------------------------------
var WSEHeat = function(ColdestHotWater, Area, HeatTransferCoefficient, MaxHeatCapability, MinLoadHeat,
	 Chiller1, Chiller2, CH1Capacty, CH2Capacty, HeatMaxGPM, MaxHeatingPumpGPM, MinHeatingPumpGPM, 
	 TonsCoolingLoad, MaxHotWaterTemperature, CondLeavingWaterSetpoint, BPHX2MinHeatFlow, 
	 BPHX2RangeMinimumForT2, CH1, CH2, chiller_Mode, BoilerEff, CostForNaturalGas, HeatLoadTons){

	this.ColdestHotWater = ColdestHotWater; //D5
	this.Area = Area; //D11
	this.HeatTransferCoefficient = HeatTransferCoefficient; //D12
	this.MaxHeatCapability = MaxHeatCapability / 1.25; //D18 -> Esta variable se recibe de GUT, se ubica en frente de Heating Heating Return Temp y la dividen entre 1,5.
	this.MinLoadHeat = MinLoadHeat; //E18
	this.Chiller1 = Chiller1; //D20
	this.Chiller2 = Chiller2; //D21
	this.CH1Capacty = CH1Capacty; //G20 - GUT T28
	this.CH2Capacty = CH2Capacty; //G21 - GUT T29
	this.HeatMaxGPM = HeatMaxGPM; //J1
	this.MaxHeatingPumpGPM = MaxHeatingPumpGPM; //J2
	this.MinHeatingPumpGPM = MinHeatingPumpGPM; //J4
	this.TonsCoolingLoad = TonsCoolingLoad; //O1
	this.MaxHotWaterTemperature = MaxHotWaterTemperature; //R7
	this.CondLeavingWaterSetpoint = CondLeavingWaterSetpoint; //R8
	this.BPHX2RangeMinimumForT2 = BPHX2RangeMinimumForT2; //L10
	this.BPHX2MinHeatFlow = BPHX2MinHeatFlow;//E196 - GUT T43
	this.CH1 = CH1; //Z2
	this.CH2 = CH2; //Z3
	this.CH3 = CH3; //Z4
	this.CH4 = CH4; //Z5
	this.Chiller_Mode = chiller_Mode; //GUT C39

	this.BoilerEff = BoilerEff; //GUT T46 -- desde aquí --
	this.CostForNaturalGas = CostForNaturalGas; //GUT T47
	this.HeatLoadTons = HeatLoadTons; //GUT T41

	this.initMinCondGPM();
	this.initResultingMaxHeatGPM();
	this.initMaxCondGPM();

	this.initLogicalPossibleResultingTons();
	this.initPossibleResultingTons();
	this.initMeetChilledWaterSetPointTest();
	this.initTonsAllowableCondenserFlowLimits();
	this.initMaxChillerCondFlowTes();
	this.initMinChillerCondFlowTest();
	this.initMaxHeatingPumpFlowTest();
	this.initMinHeatingPumpFlowTest();
	this.initAvSolutionsHigherPeakHeatTons();
	this.initAvSolutionsHigherMinFlowRate();
	this.initHighAvSolutionsHigherPeakHeatTons();
	this.initHighRowAvSolutionsHigherMinFlowRate();
	this.initHighColumnAvSolutionsHigherMinFlowRate();

	this.initColdestCondWater();
	this.initLTTD();
	this.initWarmestHotWater();
	this.initGTTD();
	this.initLMTDSimple();
	this.initLMTDFull();
	this.initLMTD();
	this.initTotalHeatExchanged();
	this.initTonsAHT();
	this.initTons();
	this.initReturnTonsIf();
	this.initSetPointT1();
	this.initCH1AvailCapacity();
	this.initCH2AvailCapacity();
	this.initHeatLoadPossible();
	this.initWSEAvaliable();
	this.initTonsCoolingLoadAfterWSE();
	this.initIsMechCoolRequired();
	this.initCHHeatTester();
	this.initIsMechCoolRequired2();
	this.initHotWaterFlowRate();
	this.initCondenserFlowRate();
	this.initMinFlowTest1();
	this.initMinFlowTest2();
	this.initF4();
	this.initNetTons();
	
	console.log(this.WarmestHotWater, this.CondLeavingWaterSetpoint, this.ColdestCondWater, ColdestHotWater)
}

//Simple variables
var CH3 = 9999; //Z4
var CH4 = 9999; //Z5
var Iterations = 8;
var RowsWSEHeat = 17;
var Columns = 19;

//Inputs
var WSEAvaliable; //O4
var ReturnTonsIf; //D17
var Tons; //D15
var TotalHeatExchanged; //D14
var LMTD; //D10H
var LMTDSimple; //D8
var LMTDFull; //D9
var GTTD; //D6
var LTTD; //D7
var WarmestHotWater; //D4
var ColdestCondWater; //D3
var TonsAHT; //C191
var SetPiontT1; //C195
var MatchRow; //M202
var MatchColumn; //M203
var CH1AvailCapacity; //G20
var CH2AvailCapacity; //G21
var IsMechCoolRequired; //G22
var IsMechCoolRequired2; //H22
var HotWaterFlowRate; //C196
var CHHeatTester; //E22
var HeatLoadPossible; //O2
var TonsCoolingLoadAfterWSE; //O5
var ResultingMaxHeatGPM; //J3
var MaxCondGPM; //J5
var MinCondGPM; //J6
var F4; //F4
var HeatLoadTonsMinusChillerHeatTons; //C202 - F202
var CostScenario1; //C204
var CostScenario2; //F204

//Matrices generated form the inputs
var LogicalPossibleResultingTons = new Array(Iterations); //L9 - AE26
var PossibleResultingTons = new Array(Iterations); //L29 - AE46
var MeetChilledWaterSetPointTest = new Array(Iterations); //L49 - AE65
var TonsAllowableCondenserFlowLimits = new Array(Iterations); //L69 - AE84
var MaxChillerCondFlowTest = new Array(Iterations); //L87 - AE103
var MinChillerCondFlowTest = new Array(Iterations); //L106 - AE122
var MaxHeatingPumpFlowTest = new Array(Iterations); //L125 - AE141
var MinHeatingPumpFlowTest = new Array(Iterations); //L144 - AE160
var AvSolutionsHigherPeakHeatTons = new Array(Iterations); //L163 - AMinLoadHeat0
var AvSolutionsHigherMinFlowRate = new Array (Iterations) //L184 - AE199

//Vectors whit maximum values
var HighAvSolutionsHigherPeakHeatTons = new Array(Iterations); //AF164 - AF180
var HighRowAvSolutionsHigherMinFlowRate = new Array(Iterations); //AF184 - AF199
var HighColumnAvSolutionsHigherMinFlowRate = new Array(Iterations); //M201 - AE201

//Outpus
var NetTons; //C19 - T(D133)
var CondenserFlowRate; //C197

//-------------------------------Functions----------------------------------------

WSEHeat.prototype.initWSEAvaliable = function(){
	this.WSEAvaliable = 0;
}

//-------------------------------------------------------------------------------
WSEHeat.prototype.initTonsAHT = function(){
	this.TonsAHT = 750;
}
//-------------------------------------------------------------------------------

//Function used get the NetTons variable
WSEHeat.prototype.getNetTons = function(){
	return this.NetTons;
}

//Function used get the NetTons variable
WSEHeat.prototype.getCondenserFlowRate = function(){
	return this.CondenserFlowRate;
}

//Function used get the ColdestCondWater variable
WSEHeat.prototype.getColdestCondWater = function(){
	return this.ColdestCondWater;
}

//Function used get the HotWaterFlowRate variable
WSEHeat.prototype.getHotWaterFlowRate = function(){
	return this.HotWaterFlowRate;
}

//Function used get the SetPiontT1 variable
WSEHeat.prototype.getSetPiontT1 = function(){
	return this.SetPiontT1;
}

//Function used to find the ColdestHotWater output.
WSEHeat.prototype.getColdestHotWater = function(){
	return this.ColdestHotWater;
}

//Function used to find the ColdestHotWater output.
WSEHeat.prototype.getF4 = function(){
	return F4;
}

//Function used to find the CostScenario1 output
WSEHeat.prototype.getCostScenario1 = function(){
	return this.CostScenario1
}

//Function used to find the CostScenario2 output
WSEHeat.prototype.getCostScenario2 = function(){
	return this.CostScenario2
}

//Function used to find the HeatLoadTons variable
WSEHeat.prototype.initHeatLoadTonsMinusChillerHeatTons = function(ChillerHeatTons){
	this.HeatLoadTonsMinusChillerHeatTons = this.HeatLoadTons - ChillerHeatTons;
}

//Function used to find the CostScenario1 variable
WSEHeat.prototype.initCostScenario1 = function(){
	this.CostScenario1 = ((Math.round((this.HeatLoadTonsMinusChillerHeatTons * 0.12 / (this.BoilerEff) ) * 10) / 10) * this.CostForNaturalGas);
}

//Function used to find the CostScenario2 variable
WSEHeat.prototype.initCostScenario2 = function(){
	this.CostScenario2 = ((Math.round((this.HeatLoadTonsMinusChillerHeatTons * 0.12 / (this.BoilerEff) ) * 10) / 10) * this.CostForNaturalGas);
}

//Function used to find the F4 variable
WSEHeat.prototype.initF4 = function(){
	if(Chiller_Mode = "Cool Only")
		return this.ColdestHotWater
	else
		return WarmestHotWater
}

//Function used to find the ResultingMaxHeatGPM
WSEHeat.prototype.initResultingMaxHeatGPM = function(){
	this.ResultingMaxHeatGPM = Math.min(this.HeatMaxGPM, this.MaxHeatingPumpGPM);
}
//Function used to find the MinCondGPM
WSEHeat.prototype.initMinCondGPM = function(){
	this.MinCondGPM = (Math.min( Math.max(this.CH1, this.CH2) ,this.CH3, this.CH4) / 2);
}
//Function used to find the MaxCondGPM
WSEHeat.prototype.initMaxCondGPM = function(){
	this.MaxCondGPM = Math.min((this.ResultingMaxHeatGPM * 8), this.ResultingMaxHeatGPM);
}

//Function used to find the NetTons output
WSEHeat.prototype.initNetTons = function(){
	this.NetTons = ((Math.min(this.MaxHeatCapability, (this.ReturnTonsIf / 1.25), this.IsMechCoolRequired2)) * this.MinFlowTest1 * this.MinFlowTest2);
	console.log(`WSEHeat.prototype.initNetTons
	this.NetTons ${this.NetTons}
	this.MaxHeatCapability ${this.MaxHeatCapability} esta mal 
	this.ReturnTonsIf ${this.ReturnTonsIf} esta mal 
	this.IsMechCoolRequired2 ${this.IsMechCoolRequired2}
	this.MinFlowTest1 ${this.MinFlowTest1}
	this.MinFlowTest2 ${this.MinFlowTest2}
	`)
}

//Function used to find the BPHX2MinHeatFlow varible
WSEHeat.prototype.initMinFlowTest1 = function(){
	if (this.HotWaterFlowRate < this.BPHX2MinHeatFlow){
		this.MinFlowTest1 = 0;
	}else{
		this.MinFlowTest1 = 1;
	}
}

//Function used to find the MinFlowTest2 variable
WSEHeat.prototype.initMinFlowTest2 = function(){
	if (this.CondenserFlowRate < MinCondGPM){
		this.MinFlowTest2 = 0;
	}else{
		this.MinFlowTest2 = 1;
	}
}

//Function used to find the LMTDSimple variable
WSEHeat.prototype.initLMTDSimple = function(){
	this.LMTDSimple = (this.ColdestCondWater - this.ColdestHotWater);
}

//Function used to find the LMTDFull variable
WSEHeat.prototype.initLMTDFull = function(){
	this.LMTDFull = (Math.round(( (this.GTTD - this.LTTD) / Math.log(this.GTTD / this.LTTD) ) * 10) / 10);
}

//Function used to find the GTTD variable
WSEHeat.prototype.initGTTD = function(){
	if((this.CondLeavingWaterSetpoint - this.WarmestHotWater) == 0){
		this.GTTD = 1;
	}else{
		this.GTTD = (this.CondLeavingWaterSetpoint - this.WarmestHotWater);
	}
}

//Function used to find the LTTD variable
WSEHeat.prototype.initLTTD = function(){
	this.LTTD = this.ColdestCondWater - this.ColdestHotWater;
}

//Function used to find the TotalHeatExchanged variable
WSEHeat.prototype.initTotalHeatExchanged = function(){
	if(this.LTTD > 0){
		this.TotalHeatExchanged = (this.HeatTransferCoefficient * this.Area * this.LMTD);
	}else{
		this.TotalHeatExchanged = 0;
	}
}

//Function used to find the ReturnTonsIf variable
WSEHeat.prototype.initReturnTonsIf = function(){
	if(this.Tons > 25){
		this.ReturnTonsIf = this.Tons;
	}else{
		this.ReturnTonsIf = 0;
	}
}

//Function used to find the Tons variable
WSEHeat.prototype.initTons = function(){
	this.Tons = Math.min((Math.round((this.TotalHeatExchanged / 12000) * 10) / 10), this.TonsAHT);
	console.log(`WSEHeat.prototype.initTons
	this.Tons ${this.Tons}
	this.TotalHeatExchanged ${this.TotalHeatExchanged}
	this.TonsAHT ${this.TonsAHT}`)
}

//Function used to find the LMTD variable
WSEHeat.prototype.initLMTD = function(){
		if((this.CondLeavingWaterSetpoint - this.WarmestHotWater) == (this.ColdestCondWater - this.ColdestHotWater)){
			this.LMTD = this.LMTDSimple;
		}else{
			this.LMTD = this.LMTDFull;
		}
}

//Function used to find the WarmestHotWater variable
WSEHeat.prototype.initWarmestHotWater = function(){
	if(this.TonsAHT == 0){
		this.WarmestHotWater = (this.BPHX2RangeMinimumForT2 + (2 * (this.MatchRow - 1)));
	}else{
		this.WarmestHotWater = (this.ColdestHotWater + (2 * (this.MatchColumn - 1)));
	}
}

//Function used to find the ColdestCondWater variable
WSEHeat.prototype.initColdestCondWater = function(){
	this.ColdestCondWater = (this.BPHX2RangeMinimumForT2 + (2 * (this.MatchRow - 1)));
	console.log(`this.ColdestCondWater ${this.ColdestCondWater}
	this.BPHX2RangeMinimumForT2 ${this.BPHX2RangeMinimumForT2}
	this.MatchRow ${this.MatchRow}`)
}

//Function used to find the Chiller1AvailCapacity variable
WSEHeat.prototype.initCH1AvailCapacity = function(){
	if(this.Chiller1 == "HEAT"){
		this.CH1AvailCapacity = this.CH1Capacty;
	}else{
		this.CH1AvailCapacity = 0;
	}
}

//Function used to find the Chiller1AvailCapacity variable
WSEHeat.prototype.initCH2AvailCapacity = function(){
	if(this.Chiller2 == "HEAT"){
		this.CH2AvailCapacity = this.CH2Capacty;
	}else{
		this.CH2AvailCapacity = 0;
	}
}

//Function used to find the CHHeatTester variable
WSEHeat.prototype.initCHHeatTester = function(){
	if((this.Chiller1 == "HEAT") || (this.Chiller2 == "HEAT")){
		if(this.IsMechCoolRequired > 0){
			this.CHHeatTester = 1;
		}else{
			this.CHHeatTester = 2;
		}
	}else{
		this.CHHeatTester = 2;
	}
}

//Function used to find the HotWaterFlowRate variable
WSEHeat.prototype.initHotWaterFlowRate = function(){
	if((this.WarmestHotWater - this.ColdestHotWater) == 0){
		this.HotWaterFlowRate = 0;
	}else{
		this.HotWaterFlowRate = Math.round(( this.TonsAHT * 24 / (this.WarmestHotWater - this.ColdestHotWater) ) * 10) / 10;
	}
}

//Function used to find the CondenserFlowRate variable
WSEHeat.prototype.initCondenserFlowRate = function(){
	if ((this.SetPiontT1 - this.ColdestCondWater) == 0){
		this.CondenserFlowRate = 0;
	}else{
		this.CondenserFlowRate = Math.round((this.TonsAHT * 24 / (this.SetPiontT1 - this.ColdestCondWater)) * 10) / 10;
	}
}

//Function used to find the IsMechCoolRequired variable
WSEHeat.prototype.initIsMechCoolRequired = function(){
	this.IsMechCoolRequired = this.TonsCoolingLoadAfterWSE - this.HeatLoadPossible;
}

//Function used to find the SetPiontT1 variable
WSEHeat.prototype.initSetPointT1 = function(){
	console.log(`WSEHeat.prototype.initSetPointT1
	this.TonsAHT ${this.TonsAHT}
	this.ColdestCondWater ${this.ColdestCondWater}
	this.CondLeavingWaterSetpoint ${this.CondLeavingWaterSetpoint}
	`)
	if(this.TonsAHT == 0){
		this.SetPiontT1 = this.ColdestCondWater;
	}else{
		this.SetPiontT1 = this.CondLeavingWaterSetpoint;
	}
}

//Function used to find the HeatLoadPossible variable
WSEHeat.prototype.initHeatLoadPossible = function(){
	this.HeatLoadPossible = Math.min(this.MaxHeatCapability, (this.Tons / 1.25));
}

//Function used to find the TonsCoolingLadAfterWSE variable
WSEHeat.prototype.initTonsCoolingLoadAfterWSE = function(){
	this.TonsCoolingLoadAfterWSE = this.TonsCoolingLoad - this.WSEAvaliable;
}

//Function used to find the IsMechCoolRequired variable
WSEHeat.prototype.initIsMechCoolRequired2 = function(){
	if(this.CHHeatTester == 0){
		this.IsMechCoolRequired2 = 0;
	}else if(this.CHHeatTester == 1){
		this.IsMechCoolRequired2 = Math.max(this.CH1AvailCapacity, this.CH2AvailCapacity);
	}else if(this.CHHeatTester == 2){
		this.IsMechCoolRequired2 = this.CH1AvailCapacity + this.CH2AvailCapacity;
	}
}

//Primera función que define la matriz binaria
WSEHeat.prototype.initLogicalPossibleResultingTons = function(){
	for (var iteration = 0;iteration < Iterations;iteration++){
		if (!LogicalPossibleResultingTons[iteration]) LogicalPossibleResultingTons[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!LogicalPossibleResultingTons[iteration][row]) LogicalPossibleResultingTons[iteration][row]	 = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if((this.ColdestHotWater + (2 * ((Columns - 1) - column)) == (this.BPHX2RangeMinimumForT2 + (2 * row)))) {
					LogicalPossibleResultingTons[iteration][row][column] = 0;
				} else if(((this.BPHX2RangeMinimumForT2 + (2 * row)) - this.ColdestHotWater) > 0){
					if((this.CondLeavingWaterSetpoint - (iteration * 5)) > (this.ColdestHotWater + (2 * ((Columns - 1) - column)))) {
						LogicalPossibleResultingTons[iteration][row][column] = 1;
						
					} else {
						LogicalPossibleResultingTons[iteration][row][column] = 0;
					}
				} else {
					LogicalPossibleResultingTons[iteration][row][column] = 0;
				}
			}
		}
	}
}

//Segunda función que define la matriz PossibleResultingTons
WSEHeat.prototype.initPossibleResultingTons = function(){
	for  (var iteration = 0;iteration < Iterations;iteration++){
		if (!PossibleResultingTons[iteration]) PossibleResultingTons[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!PossibleResultingTons[iteration][row]) PossibleResultingTons[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if (LogicalPossibleResultingTons[iteration][row][column] < 1){
					PossibleResultingTons[iteration][row][column] = 0;
				}else{
					if (((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.ColdestHotWater + (2 * ((Columns - 1) - column)))) == ((this.BPHX2RangeMinimumForT2 + (2 * row))) - this.ColdestHotWater) {
						PossibleResultingTons[iteration][row][column] = Math.round(((this.HeatTransferCoefficient * this.Area) / 12000 * ((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.ColdestHotWater + (2 * ((Columns - 1) - column))))) * 10) / 10;
					}else{
						PossibleResultingTons[iteration][row][column] = Math.round( ( (this.HeatTransferCoefficient * this.Area) / 12000 * (Math.round( ( ( ((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.ColdestHotWater + (2 * ((Columns - 1) - column)))) - (((this.BPHX2RangeMinimumForT2 + (2 * row)) - this.ColdestHotWater)) ) / (Math.log(  ((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.ColdestHotWater + (2 * ((Columns - 1) - column)))) / ( ((this.BPHX2RangeMinimumForT2 + (2 * row)) - this.ColdestHotWater) )  ) ) ) * 10) / 10)  ) * 10) / 10;
					}
				}
			}
		}
	}
}

//Tercera función que define la matriz MeetChilledWaterSetPointTest
WSEHeat.prototype.initMeetChilledWaterSetPointTest = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!MeetChilledWaterSetPointTest[iteration]) MeetChilledWaterSetPointTest[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!MeetChilledWaterSetPointTest[iteration][row]) MeetChilledWaterSetPointTest[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if(this.MaxHotWaterTemperature < (this.ColdestHotWater + (2 * ((Columns - 1) - column)))){
					MeetChilledWaterSetPointTest[iteration][row][column] = 0;
				}else if((this.BPHX2RangeMinimumForT2 + (2 * row)) > (this.CondLeavingWaterSetpoint - (iteration * 5))){
					MeetChilledWaterSetPointTest[iteration][row][column] = 0;
				}else{
					MeetChilledWaterSetPointTest[iteration][row][column] = 1;
				}
			}
		}
	}
}

//Cuarta función que define la matriz TonsAllowableCondenserFlowLimits --------------------------- Revisión ----------------------------------------------------------
WSEHeat.prototype.initTonsAllowableCondenserFlowLimits = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!TonsAllowableCondenserFlowLimits[iteration]) TonsAllowableCondenserFlowLimits[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!TonsAllowableCondenserFlowLimits[iteration][row]) TonsAllowableCondenserFlowLimits[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if ((((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.ColdestHotWater + (2 * ((Columns - 1) - column)))) * this.MinCondGPM / 24) > PossibleResultingTons[iteration][row][column]) {
					TonsAllowableCondenserFlowLimits[iteration][row][column] = 0;
				} else if (column == (Columns - 1) && iteration == 0) {
					TonsAllowableCondenserFlowLimits[iteration][row][column] = Math.max(Math.min( (((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.BPHX2RangeMinimumForT2 + (2 * row))) * this.MaxCondGPM / 24), PossibleResultingTons[iteration][row][column] ), 0);
				} else {
					TonsAllowableCondenserFlowLimits[iteration][row][column] = Math.max(Math.min( (((this.ColdestHotWater + (2 * ((Columns - 1) - column))) - (this.BPHX2RangeMinimumForT2 + (2 * row))) * this.MaxCondGPM / 24), PossibleResultingTons[iteration][row][column] ), 0);
				}
			}
		}
	}
}

//Fifth function that defines the MaxChillerCondFlowTest matrix
WSEHeat.prototype.initMaxChillerCondFlowTes = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!MaxChillerCondFlowTest[iteration]) MaxChillerCondFlowTest[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!MaxChillerCondFlowTest[iteration][row]) MaxChillerCondFlowTest[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if((this.CondLeavingWaterSetpoint - (iteration * 5)) > (this.BPHX2RangeMinimumForT2 + (2 * row))){
					if((TonsAllowableCondenserFlowLimits[iteration][row][column] * 24 / ((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.BPHX2RangeMinimumForT2 + (2 * row)))) > this.MaxCondGPM){
						MaxChillerCondFlowTest[iteration][row][column] = 0;
					}else{
						MaxChillerCondFlowTest[iteration][row][column] = 1;
					}
				}else{
					MaxChillerCondFlowTest[iteration][row][column] = 0;
				}
			}
		}
	}
}

//Sixth function that defines the MinChillerCondFlowTest matrix
WSEHeat.prototype.initMinChillerCondFlowTest = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!MinChillerCondFlowTest[iteration]) MinChillerCondFlowTest[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!MinChillerCondFlowTest[iteration][row]) MinChillerCondFlowTest[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if((this.CondLeavingWaterSetpoint - (iteration * 5)) > (this.BPHX2RangeMinimumForT2 + (2 * row))){
					if((TonsAllowableCondenserFlowLimits[iteration][row][column] * 24 / ((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.BPHX2RangeMinimumForT2 + (2 * row)))) < this.MinCondGPM){
						MinChillerCondFlowTest[iteration][row][column] = 0;
					}else{
						MinChillerCondFlowTest[iteration][row][column] = 1;
					}
				}else{
					MinChillerCondFlowTest[iteration][row][column] = 0;
				}
			}
		}
	}
}

//Seventh function that defines the MaxHeatingPumpFlowTest matrix

WSEHeat.prototype.initMaxHeatingPumpFlowTest = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!MaxHeatingPumpFlowTest[iteration]) MaxHeatingPumpFlowTest[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!MaxHeatingPumpFlowTest[iteration][row]) MaxHeatingPumpFlowTest[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if((this.ColdestHotWater + (2 * ((Columns - 1) - column))) > this.ColdestHotWater){
					if((TonsAllowableCondenserFlowLimits[iteration][row][column] * 24 / ((this.ColdestHotWater + (2 * ((Columns - 1) - column))) - this.ColdestHotWater)) > ResultingMaxHeatGPM){
						MaxHeatingPumpFlowTest[iteration][row][column] = 0;
					}else{
						MaxHeatingPumpFlowTest[iteration][row][column] = 1;
					}
				}else{
					MaxHeatingPumpFlowTest[iteration][row][column] = 0;
				}
			}
		}
	}
}

//Eighth function that defines the MinHeatingPumpFlowTest matrix
WSEHeat.prototype.initMinHeatingPumpFlowTest = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!MinHeatingPumpFlowTest[iteration]) MinHeatingPumpFlowTest[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!MinHeatingPumpFlowTest[iteration][row]) MinHeatingPumpFlowTest[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if((this.ColdestHotWater + (2 * ((Columns - 1) - column))) > this.ColdestHotWater){
					if((TonsAllowableCondenserFlowLimits[iteration][row][column] * 24 / ((this.ColdestHotWater + (2 * ((Columns - 1) - column))) - this.ColdestHotWater)) > this.MinCondGPM){
						MinHeatingPumpFlowTest[iteration][row][column] = 1;
					}else{
						MinHeatingPumpFlowTest[iteration][row][column] = 0;
					}
				}else{
					MinHeatingPumpFlowTest[iteration][row][column] = 0;
				}
			}
		}
	}
}

//Nineth function that defines the AvSolutionsHigherPeakHeatTons Matrix
WSEHeat.prototype.initAvSolutionsHigherPeakHeatTons = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!AvSolutionsHigherPeakHeatTons[iteration]) AvSolutionsHigherPeakHeatTons[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!AvSolutionsHigherPeakHeatTons[iteration][row]) AvSolutionsHigherPeakHeatTons[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if( (MaxHeatingPumpFlowTest[iteration][row][column] * MinChillerCondFlowTest[iteration][row][column] * MaxChillerCondFlowTest[iteration][row][column] * MeetChilledWaterSetPointTest[iteration][row][column] * TonsAllowableCondenserFlowLimits[iteration][row][column]) > this.MinLoadHeat){
					AvSolutionsHigherPeakHeatTons[iteration][row][column] = this.MinLoadHeat;
				}else{
					AvSolutionsHigherPeakHeatTons[iteration][row][column] = (MaxHeatingPumpFlowTest[iteration][row][column] * MinChillerCondFlowTest[iteration][row][column] * MaxChillerCondFlowTest[iteration][row][column] * MeetChilledWaterSetPointTest[iteration][row][column] * TonsAllowableCondenserFlowLimits[iteration][row][column]);
				}
			}
		}
	}
}

//Tenth function that describes the AvSolutionsHigherMinFlowRate matrix
WSEHeat.prototype.initAvSolutionsHigherMinFlowRate = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!AvSolutionsHigherMinFlowRate[iteration]) AvSolutionsHigherMinFlowRate[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			if (!AvSolutionsHigherMinFlowRate[iteration][row]) AvSolutionsHigherMinFlowRate[iteration][row] = [];
			for(var column = (Columns - 1);column >= 0;column--){
				if(((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.BPHX2RangeMinimumForT2 + (2 * row))) == 0){
					AvSolutionsHigherMinFlowRate[iteration][row][column] = 0;
				}else{
					if ((AvSolutionsHigherPeakHeatTons[iteration][row][column] * 24 / ((this.CondLeavingWaterSetpoint - (iteration * 5)) - (this.BPHX2RangeMinimumForT2 + (2 * row)))) > this.MinCondGPM){
						AvSolutionsHigherMinFlowRate[iteration][row][column] = AvSolutionsHigherPeakHeatTons[iteration][row][column];
					}else{
						AvSolutionsHigherMinFlowRate[iteration][row][column] = 0;
					}
				}			
			}
		}
	}
	
	
}

//Function to fin the highest values of every row in AvSolutionsHigherPeakTons
WSEHeat.prototype.initHighAvSolutionsHigherPeakHeatTons = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!HighAvSolutionsHigherPeakHeatTons[iteration]) HighAvSolutionsHigherPeakHeatTons[iteration] = [];
		for(var row = 0;row < RowsWSEHeat;row++){
			HighAvSolutionsHigherPeakHeatTons[iteration][row] = 0;
			for(var column = (Columns - 1);column >= 0;column--){
				if(HighAvSolutionsHigherPeakHeatTons[iteration][row] < AvSolutionsHigherPeakHeatTons[iteration][row][column]){
					HighAvSolutionsHigherPeakHeatTons[iteration][row] = AvSolutionsHigherPeakHeatTons[iteration][row][column];
				}
			}
		}
	}
}

//Function to fin the highest values of every row in AvSolutionsHigherMinFlowRate
WSEHeat.prototype.initHighRowAvSolutionsHigherMinFlowRate = function(){
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!HighRowAvSolutionsHigherMinFlowRate[iteration]) HighRowAvSolutionsHigherMinFlowRate[iteration] = [];
			for(var row = 0;row < RowsWSEHeat;row++){
				HighRowAvSolutionsHigherMinFlowRate[iteration][row] = 0;
				for(var column = (Columns - 1);column >= 0;column--){
					if(HighRowAvSolutionsHigherMinFlowRate[iteration][row] < AvSolutionsHigherMinFlowRate[iteration][row][column]){
						HighRowAvSolutionsHigherMinFlowRate[iteration][row] = AvSolutionsHigherMinFlowRate[iteration][row][column];
					}
				}
			}
		}
}

//Function to fin the highest values of every column in AvSolutionsHigherMinFlowRate
WSEHeat.prototype.initHighColumnAvSolutionsHigherMinFlowRate = function(){
	this.TonsAHT = 0;
	this.MatchRow = 1;
	this.MatchColum = 1;
	for(var iteration = 0;iteration < Iterations;iteration++){
		if (!HighColumnAvSolutionsHigherMinFlowRate[iteration]) HighColumnAvSolutionsHigherMinFlowRate[iteration] = [];
		for(var column = 0;column < Columns;column++){
			HighColumnAvSolutionsHigherMinFlowRate[iteration][column] = 0;
			for(var row = 0;row < RowsWSEHeat;row++){
				//console.log("row: "+ row + "col "+ column + "irteration " + iteration);				
				if(HighColumnAvSolutionsHigherMinFlowRate[iteration][column] < AvSolutionsHigherMinFlowRate[iteration][row][column]){
					HighColumnAvSolutionsHigherMinFlowRate[iteration][column] = AvSolutionsHigherMinFlowRate[iteration][row][column];
					if(this.TonsAHT < HighColumnAvSolutionsHigherMinFlowRate[iteration][column]){
						this.TonsAHT = HighColumnAvSolutionsHigherMinFlowRate[iteration][column];
						this.MatchRow = row + 1;
						this.MatchColumn = column + 1;
					}
				}
			}
		}
	}
}

module.exports = WSEHeat;