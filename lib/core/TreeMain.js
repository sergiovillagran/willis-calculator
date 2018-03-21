var chData 		= require("./CHData"),
	Chiller 	= require("./Chiller"),
	ChillerNew 	= require("./ChillersNew"),
	WSEHeat 	= require("./WSEHeat"),
	WSECS 		= require("./WSECS"),
	WSEVS		= require("./WSEVS"),
	TowerModel 	= require("./TowerModel"),
	PumpsTree 	= require("./PumpsTree");

//TODO revisar si estas variables se pueden quitar.
var MaxHeatCapability 	= 937.5;
var Chiller1 			= "HEAT";
var Chiller2 			= "HEAT";

//--------------------------------------
var TreeMain = function (Entradas) {
	//T4
	this.Load = Entradas.load;
	this.Design_Load = Entradas.load;
	//T5
	this.Load_Percent = Entradas.load_Percent;
	//T6
	this.Design_LCWT = Entradas.lCWT;
	this.LCWT = Entradas.lCWT;
	//T7
	this.ECWT = Entradas.eCWT;
	this.Design_ECWT = Entradas.eCWT;
	//T8
	this.DesignCond = Entradas.design_Cond_deltaT;
	this.Design_Range = Entradas.design_Cond_deltaT;
	this.Design_Range_2 = Entradas.design_Cond_deltaT;
	//T9
	this.LCdWT = Entradas.lCdWT;
	//T10
	this.Design_Primary_Head = Entradas.ev_Primary_Head;
	//T11
	this.Ev_Secundary_Head = Entradas.ev_Secondary_Head;
	//T12
	this.Evaporator_Control_Head = Entradas.evaporator_Control_Head;
	//T13
	this.Ev_Min_Flow = Entradas.ev_Min_Flow;
	//T14
	this.Design_Primary_Head_2 = Entradas.cd_Head;
	//T15
	this.Cd_Min_Flow = Entradas.cd_Min_Flow;
	//T16
	this.Tower_Delta_HT = Entradas.tower_delta_HT_Fixed_Head;
	//T17
	this.Pump_n = Entradas.ev_Pump_n_Avg;
	//T18
	this.Motor_n = Entradas.ev_Motor_n_Avg;
	//T19
	this.Spec_Grav = Entradas.ev_Spec_Grav;
	//T20
	this.Pump_n_2 = Entradas.cd_Pump_n_Avg;
	//T21
	this.Motor_n_2 = Entradas.cd_Motor_n;
	//T22
	this.Spec_Grav_2 = Entradas.cd_Spec_Grav;
	//T23
	this.CT_Eff = Entradas.cT_Eff;
	//T24
	this.design_wB = Entradas.design_wB;
	//T25
	this.Wet_Bulb = Entradas.current_wB;
	//T26
	this.Approach = Entradas.approach;
	//T27
	this.Tower_Fan = Entradas.tower_Fan;
	//T28
	this.CH1_Capacity_Nominal = Entradas.cH_1_Capacity;
	//T29
	this.CH2_Capacity_Nominal = Entradas.cH_2_Capacity;
	//T30
	this.CH_3_Capacity = Entradas.cH_3_Capacity;
	//T31
	this.CH_4_Capacity = Entradas.cH_4_Capacity;
	//T32
	this.CT_FL_Eff = Entradas.cooling_Tower_Eff;
	this.CT_FL_Eff_2 = Entradas.cooling_Tower_Eff;
	//T33
	this.EvapPumpsInstalled = Entradas.qty_of_Evap_Pumps;
	//T34
	this.Cond_Pumps_Installed = Entradas.qty_of_Cond_Pumps;
	//T35
	this.Qry_of_Chillers = Entradas.qry_of_Chillers;
	//T36
	this.Waterside_Economizer = Entradas.waterside_Economizer;
	//T37
	this.WSE_PD = Entradas.wSE_Pressure_Drop;
	//T38
	this.Auto_Stage = Entradas.standard_Plant_Control;
	this.Auto_Stage2 = Entradas.standard_Plant_Control;
	this.Standar_Plant_Control = Entradas.standard_Plant_Control;
	//T39
	this.Heating_Return_Temp = Entradas.heating_Return_Temp;
	//T40
	this.CH_Heat_Setpoint = Entradas.chiller_Heat_Setpoint;
	//T41
	this.Heat_Load_Tons = Entradas.heat_Load_Tons;
	//T42
	this.BPHX2_Max_Heat_Flow = Entradas.bPHX2_Max_Heat_Flow;
	//T43
	this.BPHX2_Min_Heat_Flow = Entradas.bPHX2_Min_Heat_Flow;
	//T44
	this.BPHX2_Max_Cond_Flow = Entradas.bPHX2_Max_Cond_Flow;
	//T45
	this.Max_CH_LCdWT = Entradas.max_Chiller_LCdWT;
	//T46
	this.Boiler_Efficiency = Entradas.boiler_Efficiency;

	//GUT T47
	this.Cost_for_Natural_Gas_MMBTU_or_decatherm = Entradas.cost_for_Natural_Gas_MMBTU_or_decatherm;
	//GUT T48
	this.kWHr = Entradas.kWHr11;
	//GUT T49
	this.Blowdown_rate_cycles = Entradas.blowdown_rate_cycles;
	//GUT T50
	this.Cost_of_water_gallon = Entradas.cost_of_water_gallon;
	//GUT T51
	this.Chiller_Staging = Entradas.chiller_Staging_;
	//GUT T52
	this.WSE_Max_Evap_Flow = Entradas.wSE_max_Evap_gpm;
	//GUT T53
	this.WSE_Max_Cond_Flow = Entradas.wSE_max_Cond_gpm;
	//GUT T54
	this.Chiller_1_Status = Entradas.chiller_1_Status;
	//GUT T55
	this.CH__1_Mode = Entradas.cH_1_Mode;
	//GUT T56
	this.Chiller_1_Design_Capacity = Entradas.chiller_1_Design_Capacity;
	//GUT T57
	this.EvapMinFlowCH1 = Entradas.chiller_1_Evap_Min_Flow;
	//GUT T58
	this.CondMinFlowCH1 = Entradas.chiller_1_Cond_Min_Flow;
	//GUT T59
	this.Chiller_2_Status = Entradas.chiller_2_Status;
	//GUT T60
	this.CH_2_Mode = Entradas.mode;
	//GUT T61
	this.Chiller_2_Design_Capacity = Entradas.chiller_2_Design_Capacity;
	//GUT T62
	this.EvapMinFlowCH2 = Entradas.chiller_2_Evap_Min_Flow;
	//GUT T63
	this.CondMinFlowCH2 = Entradas.chiller_2_Cond_Min_Flow;
	//GUT T64
	this.CH_1_Chiller_Type = Entradas.cH_1_Chiller_Type; // Viene de una casilla con selección múltiple.
	//GUT T65
	this.CH_2_Chiller_Type = Entradas.cH_2_Chiller_Type; // Viene de una casilla con selección múltiple.
	//GUT T66
	this.Heating_BPHX_Pressure = Entradas.bPHX2_Pressure_Drop; // Viene de una casilla con selección múltiple.
	//GUT T67
	this.BPHX2_Range_Minimum_for_T2 = Entradas.bPHX2_Range_Minimum_for_T2; // Es una entrada neta.
	//GUT T68
	this.Area = (1288.22 * Entradas.bPHX2_Multiplier); //Este fue corregido.
	//GUT T69
	this.HeatTransferCoefficient = (723.81 * Entradas.bPHX2_Multiplier); //Este fue corregido.
	//GUT T70
	this.BPHX2_Multiplier = Entradas.bPHX2_Multiplier; // Es una entrada neta.

	//GUT B10
	this.TowerFan = Entradas.towerFan;
	//GUT B11
	this.Evap_Pumps_1 = Entradas.evapPumps;
	//GUT B12
	this.Evap_Pump = Entradas.evap_Pump;
	//GUT B13
	this.FailedPump = Entradas.failedPump;
	//GUT B14
	this.Cond_Pumps = Entradas.condPumps;
	//GUT B15
	this.Cond_Pump = Entradas.condPump;
	//GUT B16
	this.Failed_Pump_Cond = Entradas.failedPump2;
	//GUT B17
	this.CH_1 = Entradas.cH_1;
	//GUT B18
	this.CH_2 = Entradas.cH_2;

	//GUT C39
	this.Cool_Only_Scenary = Entradas.chiller_Mode;
	//GUT C41
	this.Stagin_Scenario = Entradas.staging;
	//GUT C43
	this.Economizer = Entradas.economizer;
	//GUT C45
	this.Piping = Entradas.piping;
	//GUT C47
	this.Evap_Pumps_Scenario_CS = Entradas.evap_Pumps_2;
	//GUT C49
	this.Evap_Pumps = Entradas.evap_Pumps_1;
	this.Evap_Pumps_Scenario_Dedic= Entradas.evap_Pumps_1;
	//GUT C51
	this.Cond_Pumps_Scenario_CS = Entradas.cond_Pumps_1;
	console.log(this.Cond_Pumps_Scenario_CS, this.Cond_Pumps_Scenario_CS)
	//GUT C53
	this.Cond_Pumps_Scenario_Dedic = Entradas.cond_pumps_2;

	this.Actual_Cond_Flow;
	this.ECdWT;
	this.Return_CWT_After_WSE;
	this.CH1_ECdWT_2;
	this.CH1_LCdWT_2;
	this.CH1_Tons_2;
	this.CH1_KWTon;
}

TreeMain.prototype.getCooling_Load = function () {
	return this.Cooling_Load;
}
TreeMain.prototype.getActual_Cond_Flow = function () {
	return this.Actual_Cond_Flow;
}
TreeMain.prototype.getECdWT = function () {
	return this.ECdWT;
}
TreeMain.prototype.getReturn_CWT_After_WSE = function () {
	return this.Return_CWT_After_WSE;
}
TreeMain.prototype.getCH1_ECdWT_2 = function () {
	return this.CH1_ECdWT_2;
}
TreeMain.prototype.getCH1_LCdWT_2 = function () {
	return this.CH1_LCdWT_2;
}
TreeMain.prototype.getCH1_Tons_2 = function () {
	return this.CH1_Tons_2;
}
TreeMain.prototype.getCH1_KWTon = function () {
	return this.CH1_KWTon;
}

TreeMain.prototype.getCH2_ECdWT_2 = function () {
	return this.CH2_ECdWT_2;
}
TreeMain.prototype.getCH2_LCdWT_2 = function () {
	return this.CH2_LCdWT_2;
}
TreeMain.prototype.getCH2_Tons_2 = function () {
	return this.CH2_Tons_2;
}
TreeMain.prototype.getCH2_KWTon = function () {
	return this.CH2_KWTon;
}
TreeMain.prototype.getPrimary_Pump_Flow = function () {
	return this.Primary_Pump_Flow;
}
TreeMain.prototype.getVS_Second_Flow = function () {
	return this.VS_Second_Flow;
}
TreeMain.prototype.getBypass_Flow = function () {
	return this.Bypass_Flow;
}
TreeMain.prototype.getUpstream_Temp_2 = function () {
	return this.Upstream_Temp_2;
}
TreeMain.prototype.getMix_Temp = function () {
	return this.Mix_Temp;
}
TreeMain.prototype.getReturn_CH_WT_After_WSE = function () {
	return this.Return_CH_WT_After_WSE;
}
TreeMain.prototype.getCH1_ECWT_2 = function () {
	return this.CH1_ECWT_2;
}
TreeMain.prototype.getCH1_LCWT_2 = function () {
	return this.CH1_LCWT_2;
}
TreeMain.prototype.getCH2_ECWT_2 = function () {
	return this.CH2_ECWT_2;
}
TreeMain.prototype.getCH2_LCWT_2 = function () {
	return this.CH2_LCWT_2;
}
TreeMain.prototype.getChiller_Heat_Tons = function () {
	return this.Chiller_Heat_Tons;
}
TreeMain.prototype.getEntering_HotWater_CH1 = function () {
	return this.Entering_HotWater_CH1;
}
TreeMain.prototype.getLeaving_Hot_Water_CH2 = function () {
	return this.Leaving_Hot_Water_CH2;
}
TreeMain.prototype.getPrimary_Pump_KW_2 = function () {
	return this.Primary_Pump_KW_2;
}
TreeMain.prototype.getEvap_Pump_kW = function () {
	return this.Primary_Pump_KW + this.Second_Pump_KW;
}
TreeMain.prototype.getECdWT_VS_Fans = function () {
	return this.ECdWT_VS_Fans;
}
TreeMain.prototype.getEv_Fl_2 = function () {
	return this.Ev_Fl_2;
}
TreeMain.prototype.getWSE_Used = function () {
	return this.WSE_Used;
}
TreeMain.prototype.getWet_Bulb = function () {
	return this.Wet_Bulb;
}
TreeMain.prototype.getHWSED5 = function(){
	return this.HWSED5;
}
TreeMain.prototype.getHWSEF4 = function(){
	return this.HWSEF4;
}

TreeMain.prototype.getCostScenario1 = function(){
	return this.WSEHeat1.getCostScenario1();
}
TreeMain.prototype.getCostScenario2 = function(){
	return this.WSEHeat1.getCostScenario2();
}

TreeMain.prototype.init = function() {

	this.chData = new chData(this.Design_LCWT, this.CH_1_Chiller_Type);
	console.log("this.Design_LCWT", this.Design_LCWT)
	//D647 Tree = GUT T4 * GUT T5
	this.Second_Load = this.Load * this.Load_Percent



	//Variable global para tower Model
	this.Wet_Bulb_0 = this.design_wB;
	console.log("this.design_wB", this.design_wB)

	//Structure var, this.CH1 (T56 GUT, B17 GUT, D3 Tree, T55 GUT, D8 D7 TRee, T54 GUT)
	this.CH1 = new Chiller(this.Chiller_1_Design_Capacity, this.CH_1, this.Cool_Only_Scenary, this.CH__1_Mode, this.Stagin_Scenario, this.Chiller_1_Status);

	//Structure var, this.CH2 (T61 GUT, B18 GUT, D3 Tree, T60 GUT, D8 D7 TRee, T59 GUT)
	this.CH2 = new Chiller(this.Chiller_2_Design_Capacity, this.CH_2, this.Cool_Only_Scenary, this.CH_2_Mode, this.Stagin_Scenario, this.Chiller_2_Status);
	
	
	//D131 Tree = U39 GUT
	//is calculated in GUT using min of cooling load x 1.25 or heat load
	this.Max_heat_load_tons = Math.min(this.Heat_Load_Tons, this.Load * this.Load_Percent / 1.25)

	//D30 Tree
	this.CH1Capacity = this.CH1.getChillerDesingCapacity(this)
	
	//D31 Tree
	this.CH2Capacity = this.CH2.getChillerDesingCapacity(this)
	
	
	//D32 Tree
	this.CH1CoolCapable = this.CH1.isCapableToCool(this)

	//D33 Tree
	this.CH2CoolCapable = this.CH1.isCapableToCool(this)

	//D34 Tree
	this.CH1HeatCapable = this.CH1.isCapableToHeat(this)

	//D35 Tree
	this.CH2HeatCapable = this.CH1.isCapableToHeat(this)

	//D36 Tree
	this.LargestCH = largestChiller(this)
	
	//D38 Tree
	this.TowerFanFailing = isTowerFanFailing(this)
	
	//D46 Tree
	this.EnabledToEvapCH1 = this.CH1.isEnabledToEvap(this)

	//D47 Tree
	this.EnabledToEvapCH1 = this.CH2.isEnabledToEvap(this)

	//D48 Tree
	this.QtyCHEnabledToEvap = this.EnabledToEvapCH1 + this.EnabledToEvapCH1

	this.D49 = 0

	//D50 Tree
	this.EnabledToCondCH1 = this.CH1.isEnabledToCond(this)

	//D51 Tree
	this.EnabledToCondCH2 = this.CH2.isEnabledToCond(this)

	//D52 Tree
	this.QtyCHEnabledToCond = this.EnabledToEvapCH1 + this.EnabledToEvapCH1

	//D56 Tree
	this.EP1Installed = (this.EvapPumpsInstalled < 1) ? 0 : 1

	//D57 Tree
	this.EP2Installed = (this.EvapPumpsInstalled < 2) ? 0 : 1

	//D59 Tree
	this.EP1Enabled = (this.FailedPump == 1) ? 0 : 1

	//D60 Tree
	this.EP2Enabled = (this.FailedPump == 2) ? 0 : 1

	//D61 Tree
	this.EvapPumpsEnabled = this.EP1Enabled + this.EP2Enabled

	//D63 Tree
	this.CH_EPRatio = calcCH_EPRatio(this)


	//D66 Tree
	this.CH1_Dedicated_EP = ((this.CH1Capacity == 0) ? 0 : this.EnabledToEvapCH1 * this.EP1Enabled) * this.CondMinFlowCH1 * this.CH1HeatCapable

	//D67 Tree
	this.CH2_Dedicated_EP = ((this.CH2Capacity == 0) ? 0 : this.EnabledToEvapCH1 * this.EP2Enabled) * this.CondMinFlowCH2 * this.CH2HeatCapable

	//D68 Tree
	//variables "comparative" to help evaluation of maximum
	this.Comparative1 = ((this.CH1Capacity * this.CH1HeatCapable) == 0) ? 0 : this.EnabledToEvapCH1 * this.EP1Enabled * this.CondMinFlowCH1

	this.Comparative2 = ((this.CH1Capacity * this.CH1HeatCapable) == 0) ? 0 : this.EnabledToEvapCH1 * this.EP2Enabled * this.CondMinFlowCH2 * this.CH2HeatCapable

	//D68 Tree
	this.CH1_Headered_EP = Math.max(this.Comparative1, this.Comparative2)

	//D69 Tree
	//variables "comparative" to help evaluation of maximum
	this.Comparative3 = ((this.CH2Capacity * this.CH2HeatCapable) == 0) ? 0 : this.EnabledToEvapCH1 * this.EP1Enabled * this.CondMinFlowCH1

	this.Comparative4 = ((this.CH2Capacity * this.CH2HeatCapable) == 0) ? 0 : this.EnabledToEvapCH1 * this.EP2Enabled * this.CondMinFlowCH2

	//D69 Tree
	this.CH2_Headered_EP = Math.max(this.Comparative3, this.Comparative4)

	//D71  Tree
	this.Min_Recovery_CHFlow_Ded = ((this.CH1_Dedicated_EP * this.CH2_Dedicated_EP) == 0) ? Math.max(this.CH1_Dedicated_EP, this.CH2_Dedicated_EP) : Math.min(this.CH1_Dedicated_EP, this.CH2_Dedicated_EP)

	//D72 Tree
	this.Min_Recovery_CHFlow_Head = ((this.CH1_Headered_EP * this.CH2_Headered_EP) == 0) ? Math.max(this.CH1_Headered_EP, this.CH2_Headered_EP) : Math.min(this.CH1_Headered_EP, this.CH2_Headered_EP)

	//D73 Tree
	this.Min_Recovery_CHFlow = (this.Evap_Pumps == "Head Evap") ? this.Min_Recovery_CHFlow_Ded : this.Min_Recovery_CHFlow_Head

	///////////////////////////////////////////////////////////////////// EVAPORATOR SUPLY /////////////////////////////////////////////////////////////////////////////

	//D77 Tree
	this.CP1_Installed = (this.Cond_Pumps_Installed < 1) ? 0 : 1

	//D78 Tree
	this.CP2_Installed = (this.Cond_Pumps_Installed < 2) ? 0 : 1


	//D80 Tree
	this.CP1_Enabled = (this.Failed_Pump_Cond == 1) ? 0 : 1

	//D81 Tree
	this.CP2_Enabled = (this.Failed_Pump_Cond == 2) ? 0 : 1

	//D82 Tree
	this.CPs_Enabled = this.CP1_Enabled + this.CP2_Enabled

	//D84 Tree
	this.CH_CP_Ratio = calcCH_CPRatio(this)


	//D86 Tree
	this.CH1_EP1_Aviable = this.EnabledToEvapCH1 * this.EP1Enabled

	//D87 Tree
	this.CH2_EP2_Aviable = this.EnabledToEvapCH1 * this.EP2Enabled

	//D88 Tree
	this.CHs_EPs_Aviable = this.CH1_EP1_Aviable + this.CH2_EP2_Aviable

	//D90 Tree
	this.CH1_CP1_Aviable = this.CP1_Enabled * this.EnabledToCondCH1

	//D91 Tree
	this.CH2_CP2_Aviable = this.CP2_Enabled * this.EnabledToCondCH2

	//D92 Tree
	this.CHs_CPs_Aviable = this.CH2_CP2_Aviable + this.CH1_CP1_Aviable

	//D94 Tree
	this.EP1_Nominal_Flow = Math.round((this.CH1Capacity * 24) / (this.ECWT - this.LCWT))

	//D95 Tree
	this.EP2_Nominal_Flow = Math.round((this.CH2Capacity * 24) / (this.ECWT - this.LCWT))

	//D96 Tree
	this.EP1_Max_Flow = this.EP1_Nominal_Flow * this.EP1Installed

	//D97 Tree
	this.EP2_Max_Flow = this.EP2_Nominal_Flow * this.EP2Installed

	//D98 Tree
	this.EP_Branch_Max_Flow = this.EP2_Max_Flow + this.EP1_Max_Flow

	//D100 Tree
	this.CP1_Nominal_Flow = (this.CH1_Capacity_Nominal * 30) / this.DesignCond

	//D101 Tree
	this.CP2_Nominal_Flow = (this.CH2_Capacity_Nominal * 30) / this.DesignCond

	//D102 Tree
	this.CP1_Max_Flow = this.CP1_Nominal_Flow * this.CP1_Installed

	//D103 Tree
	this.CP2_Max_Flow = this.CP2_Nominal_Flow * this.CP2_Installed

	//D104 Tree
	this.CP_Branch_Max_Flow = this.CP2_Max_Flow + this.CP1_Max_Flow

	//variables "comparative" to help evaluation of operation
	this.Comparative5 = (this.Evap_Pumps_Scenario_Dedic == "Dedic Evap") ? this.CH1_EP1_Aviable : Math.max(this.CH1_EP1_Aviable, this.CH2_EP2_Aviable)

	this.Comparative6 = (this.Cond_Pumps_Scenario_Dedic == "Dedic Cond") ? this.CH1_CP1_Aviable : Math.max(this.CH1_CP1_Aviable, this.CH2_CP2_Aviable)

	//D107 Tree
	this.CH1_Aviable_Cool = this.Comparative5 * this.Comparative6

	//D108 Tree
	this.CH1_Aviable_Heat = CH1isAviableAsHeat(this) * this.CH1HeatCapable

	

	//variables "comparative" to help evaluation of operation
	this.Comparative7 = (this.Evap_Pumps_Scenario_Dedic == "Dedic Evap") ? this.CH2_EP2_Aviable : Math.max(this.CH1_EP1_Aviable, this.CH2_EP2_Aviable)

	this.Comparative8 = (this.Cond_Pumps_Scenario_Dedic == "Dedic Cond") ? this.CH2_CP2_Aviable : Math.max(this.CH1_CP1_Aviable, this.CH2_CP2_Aviable)

	//D109 Tree
	this.CH2_Aviable_Cool = this.Comparative7 * this.Comparative8 * this.CH2HeatCapable

	//D110 Tree
	this.CH2_Aviable_Heat = CH2isAviableAsHeat(this)



	//D112 Tree
	this.Cooling_Toons_Aviable = this.CH1_Aviable_Cool * this.CH1Capacity + this.CH2_Aviable_Cool * this.CH2Capacity

	//D113 Tree
	this.Heating_Toons_Aviable = (this.CH1_Aviable_Heat * this.CH1Capacity + this.CH2_Aviable_Heat * this.CH2Capacity) * 1.25

	//D114 Tree
	this.Largest_Cooling_CH = Math.max(this.CH1_Aviable_Cool * this.CH1Capacity, this.CH2_Aviable_Cool * this.CH2Capacity)

	//D116 Tree
	this.Max_Evap_Flow_A = this.EP1_Nominal_Flow * this.EP1Enabled + this.EP2_Nominal_Flow * this.EP2Enabled

	//D117 Tree
	this.Max_Cond_Flow_A = this.CP1_Nominal_Flow * this.CP1_Enabled + this.CP2_Nominal_Flow * this.CP2_Enabled

	//D119 Tree
	this.Min_Evap_Flow_A = (this.QtyCHEnabledToEvap == 2) ? Math.min(this.EvapMinFlowCH1, this.EvapMinFlowCH2) : Math.max(this.EvapMinFlowCH1, this.EvapMinFlowCH2)

	//D120 Tree
	this.Min_Cond_Flow_A = (this.QtyCHEnabledToEvap == 2) ? Math.min(this.CondMinFlowCH1, this.CondMinFlowCH2) : Math.max(this.CondMinFlowCH1, this.CondMinFlowCH2)


	///////////////////////////////////////////////////////////////////// HOT WATER INLET /////////////////////////////////////////////////////////////////////////////

	//D134 Tree
	this.Cooling_Load =this.Load * this.Load_Percent
	console.log(`//D134 Tree
	this.Cooling_Load ${this.Cooling_Load}
	this.Load ${this.Load}
	this.Load_Percent ${this.Load_Percent}`)
	
	
	this.WSEHeat1 = new WSEHeat(this.Heating_Return_Temp, this.Area, this.HeatTransferCoefficient, this.Max_heat_load_tons, this.Max_heat_load_tons, this.CH__1_Mode, this.CH_2_Mode, this.CH1_Capacity_Nominal, this.CH2_Capacity_Nominal, this.BPHX2_Max_Heat_Flow, this.BPHX2_Max_Cond_Flow, this.BPHX2_Min_Heat_Flow, this.Cooling_Load, this.CH_Heat_Setpoint, this.Max_CH_LCdWT, this.BPHX2_Min_Heat_Flow, this.BPHX2_Range_Minimum_for_T2, this.CondMinFlowCH1, this.CondMinFlowCH2, this.chiller_Mode, this.Boiler_Efficiency, this.Cost_for_Natural_Gas_MMBTU_or_decatherm, this.Heat_Load_Tons);
	
	//Initialization of D5 variable for a GUT use.
	this.HWSED5 = this.WSEHeat1.getColdestHotWater(this);

	//Initialization of F4 variable for a GUT use.
	this.HWSEF4 = this.WSEHeat1.getF4(this);

	//D19 HEAT WSE
	this.Net_Tons = this.WSEHeat1.getNetTons(this);

	//D133 Tree
	this.Heat_Recovery_Load = (this.Cool_Only_Scenary == "Cool Only") ? 0 : (this.Net_Tons * 1.25)
	
	//D135 Tree
	this.C_Load_Modificated = this.Cooling_Load * 1.25

	//D136 Tree
	this.HL_From_CH_WL = Math.round(this.Heat_Recovery_Load / 1.25)
	
	//D137 Tree
	this.CT_After_HRImpact = this.Cooling_Load - this.HL_From_CH_WL

	///////////////////////////////////////////////////////////////////// CONDENSER INLET /////////////////////////////////////////////////////////////////////////////

	//D141 Tree
	this.Load_Request = this.Cooling_Load

	//D142 Tree
	this.Heat_Rejection_L = this.Load_Request * 1.2

	//D144 Tree
	this.Cond_Flow_Cons = (this.Load_Request / this.Design_Load < 0.49 && this.CPs_Enabled == 2) ? this.Max_Cond_Flow_A / 2 : this.Max_Cond_Flow_A

	//D145 Tree
	this.Cond_Flow_Variable = Math.max(condVariableFlow(this), this.Min_Cond_Flow_A)

	//D146 Tree
	this.Cond_Flow = (this.Cond_Pumps_Scenario_CS == "VS Cond") ? this.Cond_Flow_Variable : this.Cond_Flow_Cons

	//D147 Tree T8 GUT(DesignCond)
	this.Tower_Range = (this.Load_Request / this.Design_Load) * this.DesignCond * 0.865
	
	
	//Variable para Tower Model
	
	
	this.Desired_Range = (this.Load_Percent * this.Design_Range / (this.Cond_Flow / this.Max_Cond_Flow_A))
	
	console.log("this.Wet_Bulb", this.Wet_Bulb_0)
	this.tow = new TowerModel(this.Wet_Bulb_0, this.Wet_Bulb, this.Design_Range, this.Tower_Range, this.chData, this.Desired_Range, this.Approach);
	
	//F6 Tower Model
	this.TFlow_Fac = this.tow.getTowerFlowFactor(this);

	//D148 Tree
	this.Tower_Flow_Fac = this.TFlow_Fac * (this.Cond_Flow / this.CP_Branch_Max_Flow)

	//D149 Tree TODO find mathematical fundamentals // Cooling Tower Matrix
	this.Apro_Normal = (2.471006) - (0.1398551 * this.Wet_Bulb) + (0.001325024 * this.Wet_Bulb * this.Wet_Bulb) + (0.7687214 * this.Tower_Range) - (0.02337056 * this.Wet_Bulb * this.Tower_Range) + (0.000149476 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Range) - (0.01116139 * this.Tower_Range * this.Tower_Range) + (0.000325406 * this.Wet_Bulb * this.Tower_Range * this.Tower_Range) - (0.00000230183 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Range * this.Tower_Range) + (9.852804 * this.Tower_Flow_Fac) - (0.1736736 * this.Wet_Bulb * this.Tower_Flow_Fac) + (0.000811069 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Flow_Fac) + (1.74992 * this.Tower_Range * this.Tower_Flow_Fac) + (0.004930143 * this.Wet_Bulb * this.Tower_Range * this.Tower_Flow_Fac) - (0.00022193 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Range * this.Tower_Flow_Fac) - (0.009865402 * this.Tower_Range * this.Tower_Range * this.Tower_Flow_Fac) - (0.000283361 * this.Wet_Bulb * this.Tower_Range * this.Tower_Range * this.Tower_Flow_Fac) + (0.00000466261 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Range * this.Tower_Range * this.Tower_Flow_Fac) + (0.09746009 * this.Tower_Flow_Fac * this.Tower_Flow_Fac) - (0.01116796 * this.Wet_Bulb * this.Tower_Flow_Fac * this.Tower_Flow_Fac) + (0.000138903 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Flow_Fac * this.Tower_Flow_Fac) - (0.1354148 * this.Tower_Range * this.Tower_Flow_Fac * this.Tower_Flow_Fac) + (0.001004747 * this.Wet_Bulb * this.Tower_Range * this.Tower_Flow_Fac * this.Tower_Flow_Fac) + (0.0000119203 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Range * this.Tower_Flow_Fac * this.Tower_Flow_Fac) - (0.002255673 * this.Tower_Range * this.Tower_Range * this.Tower_Flow_Fac * this.Tower_Flow_Fac) + (0.0000192893 * this.Wet_Bulb * this.Tower_Range * this.Tower_Range * this.Tower_Flow_Fac * this.Tower_Flow_Fac) + (0.000000260086 * this.Wet_Bulb * this.Wet_Bulb * this.Tower_Range * this.Tower_Range * this.Tower_Flow_Fac * this.Tower_Flow_Fac)
	
	//D150 Tree
	this.Cond_Water_Normal = this.Wet_Bulb + this.Apro_Normal

	//D151 Tree
	this.Cond_Water_Failed = (this.Cond_Water_Normal + this.Cond_Water_Normal + 35) / 2

	//D152 Tree
	this.Cond_Water = (this.TowerFanFailing == 1) ? this.Cond_Water_Failed : this.Cond_Water_Normal

	//D155 Tree (this.Load_Request / this.Design_Load is a recurrent valor)
	this.L_Percent_Design = this.Load_Request / this.Design_Load

	//D156 Tree
	this.Evap_Flow_Constant = ((this.Load_Request / this.Design_Load) < 0.49 && this.EvapPumpsEnabled == 2) ? this.Max_Evap_Flow_A / 2 : this.Max_Evap_Flow_A

	//D157 Tree
	this.Evap_Flow_Var = Math.max(evapVariableFlow(this), this.Min_Evap_Flow_A)


	//D158 Tree
	this.Evap_Flow_Estimated = (this.Evap_Pumps_Scenario_CS == "VS Evap") ? this.Evap_Flow_Var : this.Evap_Flow_Constant

	//D159 Tree T6 GUT
	//call this.LCWT variable

	//D160 Tree
	this.Es_Evap_DeltaT = this.Load_Request * 24 / this.Evap_Flow_Estimated

	//D161 Tree
	this.Es_Return_CHWT = this.Es_Evap_DeltaT + this.LCWT

	//D165 Tree = D146
	this.Max_Cond_Flow = this.Cond_Flow

	//D167 Tree
	//Redundant function, this may be encapsulated in Chiller.js
	this.Max_Evap_Flow_CH1 = maxEvapSecondCH1(this);

	//D168 Tree
	//Redundant function, this may be encapsulated in Chiller.js
	this.Max_Evap_Flow_CH2 = maxEvapSecondCH2(this)

	this.WSEVS1 = new WSEVS(this.Max_Cond_Flow, this.Evap_Flow_Estimated, this.WSE_Max_Evap_Flow, this.WSE_Max_Cond_Flow, 
		this.Max_Evap_Flow_CH2, this.Es_Return_CHWT, this.Cond_Water, (this.CH1CoolCapable + this.CH2CoolCapable), 
		this.Economizer == "With WSE", this.Evap_Pumps_Scenario_CS == "VS", this.Load_Request, null, 
		this.Cond_Pumps_Scenario_CS == "VS");
	
	//D169 Tree
	//Call this.Cond_Water variable (D152)

	//D170 Tree
	//Call this.Es_Return_CHWT variable (D161)

	//D171 Tree TO DO input
	this.Estimated_WSE_Tons = this.WSEVS1.getNetTons();
	console.log(`this.Estimated_WSE_Tons, ${this.Estimated_WSE_Tons}`)

	//D172 Tree
	//TODO
	this.Heat_Recovery_Tons_Possible = 0;

	//D173 Tree
	this.MechC_After_HRWSE = (this.CT_After_HRImpact - this.Estimated_WSE_Tons < 0) ? 0 : this.CT_After_HRImpact - this.Estimated_WSE_Tons

	//D174 Tree
	this.CH1_Cond_Flow_Rate = condFlowRateCH(this)


	//D175 Tree
	this.CH2_Cond_Flow_Rate = condFlowRateCH(this)

	this.PumpsTree1 = new PumpsTree(this.TowerFanFailing, this.Wet_Bulb, "0", this.CondMinFlowCH1, this.CP1_Nominal_Flow, this.CH1_Cond_Flow_Rate, this.CH1Capacity, this.CP_Branch_Max_Flow, this.CondMinFlowCH2, this.CP2_Nominal_Flow, this.CH2_Cond_Flow_Rate, this.CH2Capacity, 1800, 1800, this.Max_Evap_Flow_CH1, (this.Design_ECWT - this.Design_LCWT), "", this.HL_From_CH_WL, this.Design_LCWT, this.Design_ECWT, this.Design_LCWT, this.TowerFan, this.Design_Range, this.CH1Capacity, this.CH1_Capacity_Nominal, "x", this.CondMinFlowCH1, this.CondMinFlowCH2, this.CP1_Nominal_Flow, this.CP2_Nominal_Flow, this.CH1_Cond_Flow_Rate, this.CH2_Cond_Flow_Rate, this.L_Percent_Design, ((this.CP1_Enabled + this.CP2_Enabled) / 2), this.CH1Capacity, this.CH2Capacity, 0.9750, this.CP_Branch_Max_Flow, this.Wet_Bulb)

	//variables auxiliars to help evaluation of this.CH1dT_Cooling
	this.Aux_CHsdT_Cooling = this.Cooling_Load * 1.25 * 24 / this.CH1_Cond_Flow_Rate

	this.Aux1_CH1dT_Cooling = (this.Cond_Pumps_Scenario_Dedic == "Head Cond") ? this.CP1_Enabled : 1

	//D177 Tree
	this.CH1dT_Cooling = this.Aux_CHsdT_Cooling * this.Aux1_CH1dT_Cooling

	//variables auxiliars to help evaluation of this.CH2dT_Cooling
	this.Aux2_CH2dT_Cooling = (this.Cond_Pumps_Scenario_Dedic == "Head Cond") ? this.CP2_Enabled : 1

	//D178 Tree
	this.CH2dT_Cooling = this.Aux_CHsdT_Cooling * this.Aux2_CH2dT_Cooling	

	//D180 Tree
	this.CH1_LCond_Water = this.CH1dT_Cooling + this.Cond_Water

	//D181 Tree
	this.CH2_LCond_Water = this.CH2dT_Cooling + this.Cond_Water

	//D182 Tree
	this.Min_Qty_CH_Netload = (this.Cooling_Load > this.Largest_Cooling_CH) ? 2 : 1

	//D183 Tree = P9 Pumps Tree
	this.CH1_Enve_Limit = this.PumpsTree1.getMaxLdCH1(this);

	//D184 Tree = AP9 Pumps Tree
	this.CH2_Enve_Limit = this.PumpsTree1.getMaxLdCH2(this);

	//D186 Tree
	// maybe a boolean valor and may be encapsulated in chiller.js
	this.CH1_Cool = (this.CH1_Enve_Limit * this.CH1_Aviable_Cool * this.CH1Capacity > this.Cooling_Load) ? 1 : 0

	//D187 Tree
	// maybe a boolean valor and may be encapsulated in chiller.js
	this.CH2_Cool = (this.CH2_Enve_Limit * this.CH2_Aviable_Cool * this.CH1Capacity > this.Cooling_Load) ? 1 : 0

	//D188 Tree
	this.CH1_Heat = (this.CH1_Aviable_Heat * this.CH1Capacity * 1.25 > this.HL_From_CH_WL) ? 1 : 0

	//D189 Tree
	this.CH2_Heat = (this.CH2_Aviable_Heat * this.CH2Capacity * 1.25 > this.HL_From_CH_WL) ? 1 : 0

	//D190 Tree
	this.Does_CH1C_CH2H = this.CH1_Cool * this.CH2_Heat

	//D191 Tree
	this.Does_CH2C_CH1H = this.CH2_Cool * this.CH1_Heat

	//D192 Tree
	//this is a comprobation
	this.CH_Heating_Occ = (this.Does_CH1C_CH2H + this.Does_CH2C_CH1H < 1) ? 0 : 1

	//D194 Tree
	this.Largest_HR_CH_Avail = Math.max(this.CH1_Aviable_Heat * this.CH1Capacity, this.CH2_Aviable_Heat * this.CH2Capacity)

	//D195 Tree
	this.Other_HR_CH_Avail = (this.CH1_Aviable_Heat * this.CH1Capacity + this.CH2_Aviable_Heat * this.CH2Capacity) - this.Largest_HR_CH_Avail

	//D196 Tree
	this.Qty_HRCH_Required = qtyHRCHRequired(this)


	//D197 Tree
	this.Cool_Load_After_Heat = this.Cooling_Load - this.HL_From_CH_WL

	//D198 Tree
	this.WSE_Impact = this.Estimated_WSE_Tons

	//D199 Tree
	this.WSE_Used = (this.CH_Heating_Occ == 1) ? Math.round(calWSE_Used(this)) : this.Estimated_WSE_Tons

	//D200 Tree
	this.WSE_Not_Used = this.WSE_Impact - this.WSE_Used


	//D201 Tree
	this.MechCLoad_After_HRWSE = (this.CT_After_HRImpact - this.Estimated_WSE_Tons < 0) ? 0 : this.CT_After_HRImpact - this.Estimated_WSE_Tons

	//D202 Tree
	this.TonsC_OfHeatR = this.MechCLoad_After_HRWSE * 1.25 + this.WSE_Used

	//D203 Tree
	//this is a comprobation
	this.WSE_On = (this.WSE_Used == 0) ? 0 : 1

	///////////////////////////////////////////////////////////////////// ALLOCATE CHILLER FUNCTION /////////////////////////////////////////////////////////////////////////////

	//D205 Tree
	this.Scenario1_Test = (this.Cool_Only_Scenary == "Heat Only") ? scenario1Test(this) : 0

	//comprobation state CH to heat

	//D206 Tree
	this.Scenario2_Test = scenario2Test(this)


	//D207 Tree
	this.Scenario3 = (this.Scenario1_Test + this.Scenario2_Test == 0) ? 1 : 0

	this.WSECS1 = new WSECS(this.Max_Cond_Flow, this.Evap_Flow_Estimated, this.WSE_Max_Evap_Flow, this.WSE_Max_Cond_Flow, 
		this.Max_Evap_Flow_CH2, this.Es_Return_CHWT, this.Cond_Water, (this.CH1CoolCapable + this.CH2CoolCapable), 
		this.Economizer == "With WSE", this.Evap_Pumps_Scenario_CS == "CS", this.Load_Request, this.Cond_Flow, this.Evap_Flow_Estimated,
		this.Apro_Normal, this.Cond_Water_Normal, this.Cond_Water_Failed, this.Cond_Water, this.Scenario3);
	
	this.WSEVS1.setWSECS(this.WSECS1);

	//D176 Tree TO DO input
	this.Cond_Flow_Rate_Pot = this.WSEVS1.getCondFlowRate();
	console.log(`this.Cond_Flow_Rate_Pot, ${this.Cond_Flow_Rate_Pot}`)

	//D179 Tree TO DO input
	this.Evap_Flow_Rate_Pot = this.WSEVS1.getEvapFlowRate();
	console.log(`this.Evap_Flow_Rate_Pot, ${this.Evap_Flow_Rate_Pot}`)
	

	///////////////////////////////////////////////////////////////////// EVAPORATOR SUPLY /////////////////////////////////////////////////////////////////////////////

	//D210 Tree
	this.CH1_Status = this.CH1HeatCapable

	//D211 Tree
	this.CH2_Status = this.CH2HeatCapable

	//D212 Tree
	this.Building_Load = this.Cooling_Load

	//D213 Tree
	this.BL_After_WSE = this.Building_Load - this.WSE_Used

	//D214 Tree
	this.HL_Expressed_CT = this.HL_From_CH_WL

	//D215 Tree
	this.CH1_Enabled_CH_Capacity = this.CH1_Aviable_Heat * this.CH1Capacity

	//D216 Tree
	this.CH2_Enabled_CH_Capacity = this.CH2_Aviable_Heat * this.CH2Capacity

	//D217 Tree
	this.Cooling_Load_Req = this.HL_Expressed_CT

	//D218 Tree
	this.CH1_Meet_Ca = (this.CH1_Enabled_CH_Capacity > this.Building_Load) ? this.CH1_Enabled_CH_Capacity : 9999

	//D219 Tree
	this.CH2_Meet_Ca = (this.CH2_Enabled_CH_Capacity > this.Building_Load) ? this.CH2_Enabled_CH_Capacity : 9999

	//D220 Tree
	//function k-sim on two valors only with k=1
	this.Pick_Small = pickSmall(this);

	//D221 Tree
	// TO DO input
	this.Round_Counter = 1

	//D222 Tree
	//Comprobation D220
	this.CH1_Selected = ch1Selected(this)

	//D223 Tree
	//Comprobation
	this.CH2_Selected = ch2Selected(this)

	//D224 Tree
	this.Remaining_Load = remainingLoad(this)

	//D225 Tree
	//may be encapsulated in chiller.js
	this.Remaining_Capacity_CH1 = remainingCapacityCH1(this)


	//D226 Tree
	//may be encapsulated in chiller.js
	this.Remaining_Capacity_CH2 = remainingCapacityCH2(this)


	//D227 Tree
	//may be encapsulated in chiller.js
	this.CH1_Meet_Capacity = (this.Remaining_Capacity_CH1 > this.CH1_Enabled_CH_Capacity) ? this.Remaining_Capacity_CH1 : 9999

	//D228 Tree
	//may be encapsulated in chiller.js
	this.CH2_Meet_Capacity = (this.Remaining_Capacity_CH2 > this.CH2_Enabled_CH_Capacity) ? this.Remaining_Capacity_CH2 : 9999

	//D229 Tree
	//same function D220
	this.Pick_Small_Large = pickSmallLarge(this)

	//D230 Tree
	//TO DO input
	this.Round_Counter2 = 1

	//D231 Tree
	this.CH1_Selected_Round = ch1SelectedRound(this)

	//D232 Tree
	this.CH2_Selected_Round = ch2SelectedRound(this)

	//D233 Tree
	this.Remaining_Load_2 = (this.Remaining_Load > this.Pick_Small_Large) ? this.Remaining_Load - this.Pick_Small_Large : 0


	//D235 Tree
	//may be encapsulated in chiller.js
	this.Filtered_CH1 = ((this.CH1_Selected + this.CH1_Selected_Round) > 0) ? 1 : 0

	//D236 Tree
	//may be encapsulated in chiller.js
	this.Filtered_CH2 = ((this.CH2_Selected + this.CH2_Selected_Round) > 0) ? 1 : 0

	//D237 Tree
	//may be encapsulated in chiller.js
	this.CH1_On = ((this.Stagin_Scenario == "Auto") ? this.Filtered_CH1 : this.CH1HeatCapable) * this.CH1HeatCapable

	//D238 Tree
	//may be encapsulated in chiller.js
	this.CH2_On = ((this.Stagin_Scenario == "Auto") ? this.Filtered_CH2 : this.CH2HeatCapable) * this.CH2HeatCapable

	//D239 Tree
	//how many CH on
	this.Qty_CH_On = this.CH2_On + this.CH1_On

	//D240 Tree
	//may be encapsulated in chiller.js
	this.Nominal_On_CH1 = this.CH1_On * this.CH1Capacity

	//D241 Tree
	//may be encapsulated in chiller.js
	this.Nominal_On_CH2 = this.CH2_On * this.CH2Capacity

	//D242 Tree
	this.Total_Online_Ca = this.Nominal_On_CH2 + this.Nominal_On_CH1

	//D243 Tree
	this.Actual_Online_Capacity = (this.Total_Online_Ca == 0) ? 0 : (this.Cooling_Load_Req / this.Total_Online_Ca)

	//D244 Tree
	this.Actual_Ca_Heating_CH1 = Math.round(this.Nominal_On_CH1 * this.Actual_Online_Capacity) * 1.25

	//D245 Tree
	this.Actual_Ca_Heating_CH2 = Math.round(this.Nominal_On_CH2 * this.Actual_Online_Capacity) * 1.25

	//D246 Tree
	this.Hot_WF_Divider = hotWFDivider(this)

	// Heat WSE C197
	this.Condenser_Flow_Rate = this.WSEHeat1.getCondenserFlowRate(this);

	//D247 Tree
	this.Hot_WF_Rate = (this.Hot_WF_Divider == 0) ? 0 : this.Condenser_Flow_Rate / this.Hot_WF_Divider

	//D248 Tree = Heat WSE D3
	this.E_Condenser_WT = this.WSEHeat1.getColdestCondWater();

	
	//D249 Tree
	//may be encapsulated in chiller.js
	this.CH1_Operating_C = this.Nominal_On_CH1 * this.Actual_Online_Capacity

	
	//D250 Tree
	//may be encapsulated in chiller.js
	this.CH2_Operating_C = this.Nominal_On_CH2 * this.Actual_Online_Capacity


	//D251 Tree
	//may be encapsulated in chiller.js
	this.CH1_Cond_Delta = (this.Hot_WF_Rate == 0) ? 0 : this.CH1_Operating_C * 1.25 * 24 / this.Hot_WF_Rate

	//D252 Tree
	//may be encapsulated in chiller.js
	this.CH2_Cond_Delta = (this.Hot_WF_Rate == 0) ? 0 : this.CH2_Operating_C * 1.25 * 24 / this.Hot_WF_Rate

	//D253 Tree
	this.LCondenser_WTCH1 = this.E_Condenser_WT + this.CH1_Cond_Delta

	//D254 Tree
	this.LCondenser_WTCH2 = (this.Piping == "Parallel") ? this.E_Condenser_WT + this.CH2_Cond_Delta : this.LCondenser_WTCH1 + this.CH1_Cond_Delta

	//D255 Tree
	this.Net_Coolin_TL = this.TonsC_OfHeatR

	///////////////////////////////////////////////////////////////////// ORANGE(SCENARIO 2) /////////////////////////////////////////////////////////////////////////////

	//D259 Tree
	this.Cooling_Load2 = this.Cooling_Load

	//D260 Tree
	//Call this.HL_From_CH_WL D136

	//D261 Tree
	this.Difference = this.Cooling_Load - this.HL_From_CH_WL

	//D262 Tree
	//Call this.WSE_Used D199

	//D263 Tree
	this.Net_CL_Remain = (this.Difference - this.WSE_Used < 0) ? 0 : this.Difference - this.WSE_Used

	//D264 Tree
	//may be encapsulated in chiller.js
	this.CH1_Enabled_CC = this.CH1_Aviable_Cool * this.CH1Capacity

	//D265 Tree
	//may be encapsulated in chiller.js
	this.CH2_Enabled_CC = this.CH2_Aviable_Cool * this.CH2Capacity

	//D266 Tree
	//may be encapsulated in chiller.js
	this.CH1_Enabled_HC = this.CH1_Aviable_Heat * this.CH1Capacity

	//D267 Tree
	//may be encapsulated in chiller.js
	this.CH2_Enabled_HC = this.CH2_Aviable_Heat * this.CH2Capacity

	//D268 Tree
	//may be encapsulated in chiller.js
	this.CH1_Meets_HL = ((this.CH1_Enabled_HC > this.HL_From_CH_WL / 1.25) ? 1 : 0) * this.CH1_Aviable_Heat

	//D269 Tree
	//may be encapsulated in chiller.js
	this.CH2_Meets_HL = ((this.CH2_Enabled_HC > this.HL_From_CH_WL / 1.25) ? 1 : 0) * this.CH2_Aviable_Heat

	//D270 Tree
	//may be encapsulated in chiller.js
	this.CH1_Meets_Rema_CL = (this.CH1_Enabled_CC + 0.01 > this.Net_CL_Remain) ? 1 : 0

	//D271 Tree
	//may be encapsulated in chiller.js
	this.CH2_Meets_Rema_CL = (this.CH2_Enabled_CC + 0.01 > this.Net_CL_Remain) ? 1 : 0

	//D273 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH1_Cool_CH2_Heat = (this.CH2_Meets_HL + this.CH1_Meets_Rema_CL == 2) ? 1 : 0

	//D274 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH1_Heat_CH2_Cool = (this.CH1_Meets_HL + this.CH2_Meets_Rema_CL == 2) ? 1 : 0

	//D275 Tree
	this.Is_CH1_Heating = isCH1Heating(this)

	//D277 Tree = D3 Heat WSE
	this.Entering_Cond_WT = this.WSEHeat1.getColdestCondWater(this);

	//D278 Tree
	this.Heating_Tons_As_CL = this.HL_From_CH_WL

	//D279 Tree = C197 Heat WSE
	this.Hot_Water_FR = this.WSEHeat1.getCondenserFlowRate(this);

	//D280 Tree
	this.CH2_Condenser_DT = (this.Hot_Water_FR == 0) ? 0 : this.Heating_Tons_As_CL * 24 / this.Hot_Water_FR

	//D281 Tree
	this.Leaving_Cond_WT = this.Entering_Cond_WT + this.CH2_Condenser_DT

	//D282 Tree
	this.CH2_Cooling_Tons2 = Math.min(this.Heating_Tons_As_CL, (this.CH2_Aviable_Heat * this.CH2Capacity))
	console.log(`this.Heating_Tons_As_CL
	this.Heating_Tons_As_CL ${this.Heating_Tons_As_CL}
	this.CH2_Aviable_Heat ${this.CH2_Aviable_Heat}
	this.CH2Capacity ${this.CH2Capacity}
	`)
	//D283 Tree
	this.CH1_Cooling_Tons2 = CH1CoolingTons2(this);

	//D285 Tree
	this.CH2_Cond_DT = this.CH2_Condenser_DT

	//D286 Tree
	this.Net_Cool_TL = (this.Cooling_Load - this.Heating_Tons_As_CL - this.WSE_Used) * 1.25 + this.WSE_Used

	//D289 Tree = Heat WSE D3
	this.Entering_Cond_WT2 = this.WSEHeat1.getColdestCondWater(this);

	//D290 Tree
	this.Heating_Tons_Expressed = this.HL_From_CH_WL

	//D291 Tree = C196 Heat WSE
	this.Hot_Water_FR2 = this.WSEHeat1.getHotWaterFlowRate(this);

	//D292 Tree
	this.CH1_Condenser_DT2 = (this.Hot_Water_FR2 == 0) ? 0 : this.Heating_Tons_Expressed * 24 / this.Hot_Water_FR2

	//D293 Tree
	this.Leaving_Cond_WT2 = this.CH1_Condenser_DT2 + this.Entering_Cond_WT

	//D294 Tree
	this.CH1_Cooling_Tons = Math.min(this.Heating_Tons_Expressed, (this.CH2_Aviable_Heat * this.CH1Capacity))

	//D295 Tree
	this.CH2_Cooling_Tons = this.Net_CL_Remain

	//D296 Tree
	this.CH1_Condenser_DT4 = this.CH1_Condenser_DT2

	//D298 Tree
	this.Net_Coolin_TL2 = (this.Cooling_Load2 - this.Heating_Tons_Expressed - this.WSE_Used) * 1.25 + this.WSE_Used

	//D301 Tree
	this.Entering_Cond_WT3 = (this.CH1_Cool_CH2_Heat == 1) ? this.Entering_Cond_WT : this.Entering_Cond_WT2

	//D302 Tree
	this.Heating_Tons_Expressed_CL = (this.CH1_Cool_CH2_Heat == 1) ? this.CH2_Cooling_Tons2 : this.CH1_Cooling_Tons

	//D303 Tree
	this.Hot_Water_FR3 = (this.CH1_Cool_CH2_Heat == 1) ? this.Hot_Water_FR : this.Hot_Water_FR2

	//D304 Tree
	this.CH1_Condenser_DT3 = (this.CH1_Cool_CH2_Heat == 1) ? this.CH2_Condenser_DT : this.CH1_Condenser_DT2

	//D305 Tree
	this.Leaving_Cond_WT3 = (this.CH1_Cool_CH2_Heat == 1) ? this.Leaving_Cond_WT : this.Leaving_Cond_WT2

	//D306 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH1_Cooling_Tons3 = (this.CH1_Cool_CH2_Heat == 1) ? this.CH1_Cooling_Tons2 : this.CH2_Cooling_Tons
	console.log(`D306
	this.CH1_Cooling_Tons3 ${this.CH1_Cooling_Tons3}
	this.CH1_Cool_CH2_Heat ${this.CH1_Cool_CH2_Heat}
	this.CH1_Cooling_Tons2 ${this.CH1_Cooling_Tons2}
	this.CH2_Cooling_Tons ${this.CH2_Cooling_Tons}
	`)
	//D307 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH2_Cooling_Tons3 = (this.CH1_Cool_CH2_Heat == 1) ? this.CH2_Cooling_Tons2 : this.CH1_Cooling_Tons

	//D308 Tree
	this.Total_Cooling_Tons = this.CH2_Cooling_Tons3 + this.CH1_Cooling_Tons3

	//D311 Tree
	this.Net_Coolin_TL3 = (this.CH1_Cool_CH2_Heat == 1) ? this.Net_Cool_TL : this.Net_Coolin_TL2

	///////////////////////////////////////////////////////////////////// GRAY(SCENARIO 3) /////////////////////////////////////////////////////////////////////////////

	//D319 Tree
	//may be encapsulated in chiller.js
	this.CH1_Aviable_DE_DC = this.CH1Capacity * this.EP1Enabled * this.CP1_Enabled

	//D320 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH1_Aviable_DE_HC = this.CH1Capacity * this.EP1Enabled * Math.max(this.CP1_Enabled, this.CP2_Enabled)

	//D321 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH1_Aviable_HE_DC = this.CH1Capacity * Math.max(this.EP1Enabled, this.EP2Enabled) * this.CP1_Enabled

	//D322 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH1_Aviable_HE_HC = this.CH1Capacity * Math.max(this.EP1Enabled, this.EP2Enabled) * Math.max(this.CP1_Enabled, this.CP2_Enabled)

	//D324 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH2_Aviable_DE_DC = this.CH2Capacity * this.EP2Enabled * this.CP2_Enabled

	//D325 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH2_Aviable_DE_HC = this.CH2Capacity * this.EP2Enabled * Math.max(this.CP1_Enabled, this.CP2_Enabled)

	//D326 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH2_Aviable_HE_DC = this.CH2Capacity * Math.max(this.EP1Enabled, this.EP2Enabled) * this.CP2_Enabled

	//D327 Tree
	//may be encapsulated in chiller.js Comprobation
	this.CH2_Aviable_HE_HC = this.CH2Capacity * Math.max(this.EP1Enabled, this.EP2Enabled) * Math.max(this.CP1_Enabled, this.CP2_Enabled)

	//D329 Tree
	this.CH1_Enabled_Capacity = ch1EnableCapacity(this)

	//D330 Tree
	this.CH2_Enabled_Capacity = ch2EnableCapacity(this)


	//D331 Tree
	this.Total_Enabled_Capacity = this.CH2_Enabled_Capacity + this.CH1_Enabled_Capacity

	//D333 Tree
	this.Building_Load2 = this.Cooling_Load

	//D334 Tree
	this.Building_Load_After_WSE = this.Cooling_Load - this.Estimated_WSE_Tons

	//D335 Tree
	this.HL_Expressed_CT2 = this.CH1_Cond_Delta

	//D336 Tree
	this.CH1_Enabled_Capacity2 = this.CH1_Enabled_Capacity

	//D337 Tree
	this.CH2_Enabled_Capacity2 = this.CH2_Enabled_Capacity

	//D340 Tree
	this.Ded_Evap_EP1_On = (this.EP1Enabled * this.EP1_Nominal_Flow > 0) ? 1 : 0

	//D341 Tree
	this.HE_EP1_Or_EP2 = (Math.max(this.EP1Enabled * this.EP1_Nominal_Flow, this.EP1Enabled * this.EP1_Nominal_Flow) > 0) ? 1 : 0

	//D342 Tree
	this.Ded_Cond_CP1_On = this.CP1_Enabled * this.CP1_Nominal_Flow

	//D343 Tree
	this.HC_CP1_Or_CP2 = Math.max(this.CP1_Enabled * this.CP1_Nominal_Flow, this.CP2_Enabled * this.CP2_Nominal_Flow)

	//D344 Tree
	this.Nominal_Cond_Flow = nominalCondFlow1(this) * nominalCondFlow2(this)

	//D345 Tree
	this.Cond_Aviable_CH1 = condAviableCH1(this)

	//may be encapsulated in chiller.js

	//D284 Tree TODO D345 still not aviable
	this.CH1_Condenser_DT = this.Net_CL_Remain * 24 / getCond_Aviable_CH1 (this)
	
	//D309 Tree //D284 Tree TODO D345 still not aviable
	this.CH1_Condenser_DT5 = (this.CH1_Cool_CH2_Heat == 1) ? this.CH1_Condenser_DT : this.CH1_Condenser_DT4


	//D346 Tree
	this.Cond_DeltaT_CH1 = (this.Cond_Aviable_CH1 == 0) ? 0 : this.Building_Load2 * 1.2 * 24 / this.Cond_Aviable_CH1

	//D347 Tree
	this.Entering_Cond_WT4 = this.Cond_Water

	//D348 Tree
	this.Leaving_Cond_WT4 = this.Entering_Cond_WT4 + this.Cond_DeltaT_CH1

	//D349 Tree TO DO INPUT
	this.CH1_Envelope_Lim = this.PumpsTree1.getMaxLdCH1() / 100;

	//D350 Tree
	this.CH1_Enabled_CH_Capacity2 = this.CH1_Enabled_Capacity2 * this.CH1_Envelope_Lim

	//D352 Tree No rows

	//D353 Tree
	this.Ded_Evap_EP2_On = (this.EP2Enabled * this.EP1_Max_Flow > 0) ? 1 : 0

	//D354 Tree
	this.HE_EP1_Or_EP2_On = (Math.max(this.EP1Enabled * this.EP1_Nominal_Flow, this.EP2Enabled * this.EP2_Nominal_Flow) > 0) ? 1 : 0

	//D355 Tree
	this.Ded_Cond_CP2_On = this.CP2_Enabled * this.CP1_Nominal_Flow

	//D356 Tree
	this.HC_CP1_Or_CP2_On = Math.max(this.CP1_Enabled * this.CP1_Nominal_Flow, this.CP2_Enabled * this.CP2_Nominal_Flow)

	//D357 Tree
	this.Nominal_Cond_Flow2 = nominalCondFlow21(this) * nominalCondFlow22(this)


	//D358 Tree
	this.Cond_Flow_Aviable_CH2 = condFlowAviableCH2(this)

	//D297 Tree TODO D358 still not aviable
	this.CH2_Condenser_DT2 = this.CH2_Cooling_Tons * 24 / this.Cond_Flow_Aviable_CH2
	console.log(`D297
	this.CH2_Condenser_DT2 ${this.CH2_Condenser_DT2}
		this.CH2_Cooling_Tons ${this.CH2_Cooling_Tons}
		this.Cond_Flow_Aviable_CH2 ${this.Cond_Flow_Aviable_CH2}`)

	//D310 Tree //D297 Tree TODO D358 still not aviable
	this.CH2_Condenser_DT5 = (this.CH1_Cool_CH2_Heat == 1) ? this.CH2_Cond_DT : this.CH2_Condenser_DT2
	
	//D359 Tree
	this.Cond_DeltaT_CH2 = (this.Cond_Flow_Aviable_CH2 == 0) ? 0 : this.Building_Load2 * 1.2 * 24 / this.Cond_Flow_Aviable_CH2

	//D360 Tree
	this.Entering_Cond_WT5 = this.Cond_Water

	//D361 Tree
	this.Leaving_Cond_WT5 = this.Cond_DeltaT_CH2 + this.Entering_Cond_WT5

	//D362 Tree TODO INPUT
	this.CH2_Envelope_Lim = this.PumpsTree1.getMaxLdCH2() / 100;

	//D363 Tree
	this.CH2_Enabled_Capacity3 = this.CH2_Enabled_Capacity2 * this.CH2_Envelope_Lim

	//D365 Tree No rows

	//D366 Tree
	this.Nominal_Cond_Avail_CH1 = (this.Piping == "Parallel") ? this.Max_Cond_Flow_A / 2 : this.Max_Cond_Flow_A

	//D367 Tree
	this.Nominal_Cond_Avail_CH2 = (this.Piping == "Parallel") ? this.Max_Cond_Flow_A / 2 : this.Max_Cond_Flow_A

	//D368 Tree
	this.Cond_Flow_Aviable_CH1 = condFLowAviableCH1(this)

	//may be encapsulated in chiller.js

	//D369 Tree
	this.Cond_Flow_Aviable_CH2_2 = condFLowAviableCH2(this)


	//D370 Tree
	this.Cond_DeltaT_CH1_2 = this.Building_Load2 * 1.2 * 24 / condDeltaTCH12(this)


	//D371 Tree
	this.Cond_DeltaT_CH2_2 = this.Building_Load2 * 1.2 * 24 / condDeltaTCH22(this)

	//D372 Tree
	this.Entering_Cond_WT6 = this.Cond_Water

	//D373 Tree
	this.Leaving_Cond_WTCH1 = this.Entering_Cond_WT6 + this.Cond_DeltaT_CH1_2

	//D374 Tree
	this.Leaving_Cond_WTCH2 = this.Entering_Cond_WT6 + this.Cond_DeltaT_CH2_2

	//D375 Tree
	this.CH1_Envelope_Lim2 = (this.Cond_Flow_Aviable_CH1 == 0) ? 0 : 1

	//D376 Tree
	this.CH2_Envelope_Lim2 = (this.Cond_Flow_Aviable_CH2_2 == 0) ? 0 : 1

	//D377 Tree
	this.CH1_Enabled_CH_Capacity3 = this.CH1_Envelope_Lim2 * this.CH1_Enabled_Capacity2

	//D378 Tree
	this.CH2_Enabled_CH_Capacity3 = this.CH2_Envelope_Lim2 * this.CH2_Enabled_Capacity2

	//D380 Tree
	this.Cooling_Load_Req_WSE = this.Building_Load_After_WSE

	//D381 Tree
	this.Number_CH_Required = numberCHRequired(this)


	//D382 Tree
	this.CH1_Meet_Capacity2 = (this.CH1_Enabled_CH_Capacity3 > this.Cooling_Load_Req_WSE) ? this.CH1_Enabled_CH_Capacity3 : 9999

	//D383 Tree
	this.CH2_Meet_Capacity2 = (this.CH2_Enabled_CH_Capacity3 > this.Cooling_Load_Req_WSE) ? this.CH2_Enabled_CH_Capacity3 : 9999

	
	//D384 Tree
	//function k-sim on two valors only with k=1
	this.Pick_Small2 = pickSmall2(this)


	//D385 Tree TO DO Input
	this.Round_Counter3 = 1

	//D386 Tree
	this.CH1_Selected_Round2 = ch1SelectedRound2(this)


	//D387 Tree
	this.CH2_Selected_Round2 = ch2SelectedRound2(this)


	//D388 Tree
	this.Remaining_Load_3 = (this.Cooling_Load_Req_WSE > this.Pick_Small2) ? (this.Cooling_Load_Req_WSE - this.Pick_Small2) : 0

	//D389 Tree
	this.Remaining_Capacity_CH1_2 = remainingCapacityCH12(this)

	//D390 Tree
	this.Remaining_Capacity_CH2_2 = remainingCapacityCH22(this)


	//D391 Tree
	this.CH1_Meet_Capacity3 = (this.Remaining_Capacity_CH1_2 > this.Remaining_Load_3) ? this.Remaining_Capacity_CH1_2 : 9999

	//D392Tree
	this.CH2_Meet_Capacity3 = (this.Remaining_Capacity_CH2_2 > this.Remaining_Load_3) ? this.Remaining_Capacity_CH2_2 : 9999

	//D393 Tree
	//same function for others pick small
	//function k-sim on two valors only with k=1
	this.Pick_Small3 = pickSmall3(this)


	//D394 Tree TO DO Input
	this.Round_Counter4 = 1

	//D395 Tree
	this.CH1_Selected_Round3 = ch1SelectedRound3(this)

	//same function for others selected round this.CH1

	//D396 Tree
	this.CH2_Selected_Round3 = ch2SelectedRound3(this)


	//D397 Tree
	this.Remaining_Load_4 = (this.Remaining_Load_3 > this.Pick_Small3) ? (this.Remaining_Load_3 - this.Pick_Small3) : 0

	//D399 Tree
	this.Filtered_CH1_2 = (this.CH1_Selected_Round2 + this.CH1_Selected_Round3 > 0) ? 1 : 0

	//D400 Tree
	this.Filtered_CH2_2 = (this.CH2_Selected_Round2 + this.CH2_Selected_Round3 > 0) ? 1 : 0

	//D401 Tree
	this.CH1_On_2 = ((this.Stagin_Scenario == "Auto") ? this.Filtered_CH1_2 : this.CH1CoolCapable) * this.CH1CoolCapable

	//D402 Tree
	this.CH2_On_2 = ((this.Stagin_Scenario == "Auto") ? this.Filtered_CH2_2 : this.CH2CoolCapable) * this.CH2CoolCapable

	//D403 Tree
	this.Qty_CH_On_2 = this.CH2_On_2 + this.CH1_On_2

	//D404 Tree
	this.Nominal_On_CH1_2 = this.CH1_On_2 * this.CH1Capacity

	//D405 Tree
	this.Nominal_On_CH2_2 = this.CH2_On_2 * this.CH2Capacity
	
	

	//D406 Tree
	this.Total_Online_Ca_2 = this.Nominal_On_CH2_2 + this.Nominal_On_CH1_2
	
	//D407 Tree
	this.Actual_Online_Capacity_2 = (this.Cooling_Load_Req_WSE / this.Total_Online_Ca_2 > 1) ? 1 : this.Cooling_Load_Req_WSE / this.Total_Online_Ca_2
	
	
	//D408 Tree
	this.Condenser_Water_Divider = condenserWaterDivider(this)


	//Heat WSE C196
	this.HWSE_WFRate = this.WSEHeat1.getHotWaterFlowRate(this);

	//D409 Tree
	this.Cond_Water_Flow = this.HWSE_WFRate / this.Condenser_Water_Divider

	//D410 Tree = Heat WSE D3
	this.Entering_Cond_WT7 = this.WSEHeat1.getColdestCondWater(this);

	//D411 Tree
	this.CH1_Operating_C2 = this.Actual_Online_Capacity_2 * this.CH1_On_2 * this.CH1_Enabled_CH_Capacity3

	//D412 Tree
	this.CH2_Operating_C2 = this.Actual_Online_Capacity_2 * this.CH2_On_2 * this.CH2_Enabled_CH_Capacity3
	

	//D413 Tree
	this.CH1_Cond_Delta_2 = ch1CondDelta2(this)

	//D414 Tree
	this.CH2_Cond_Delta_2 = ch2CondDelta2(this)
	//D415 Tree
	this.Head_Rejection_CT = (this.CH1_Operating_C2 + this.CH2_Operating_C2) * 1.25 + this.Building_Load2 - this.Building_Load_After_WSE

	///////////////////////////////////////////////////////////////////// GREEN(WSE OUTLET) /////////////////////////////////////////////////////////////////////////////

	//D419 Tree
	this.CH1_Enabled_Capacity4 = ch1EnabledCapacity4(this)

	//D420 Tree
	this.CH2_Enabled_Capacity4 = ch2EnabledCapacity4(this)

	//D416 Tree
	this.CH1_Enabled = (this.CH1_Enabled_Capacity4 > 0) ? 1 : 0

	//D417 Tree
	this.CH2_Enabled = (this.CH2_Enabled_Capacity4 > 0) ? 1 : 0

	//D423 Tree
	this.Pumpable_Capacity_Ded_CH1 = this.CH1_EP1_Aviable * this.EP1_Nominal_Flow

	//D424 Tree
	this.Pumpable_Capacity_Ded_CH2 = this.CH2_EP2_Aviable * this.EP2_Nominal_Flow

	//D425 Tree
	this.Total_Pumpable = this.Pumpable_Capacity_Ded_CH2 + this.Pumpable_Capacity_Ded_CH1

	//D428 Tree
	this.CH1_Cond_Pumpable = this.CH1_CP1_Aviable * this.CP1_Nominal_Flow

	//D429 Tree
	this.CH2_Cond_Pumpable = this.CH2_CP2_Aviable * this.CP2_Nominal_Flow

	//D430 Tree
	this.Total_Cond_Pumpable = this.CH2_Cond_Pumpable + this.CH1_Cond_Pumpable

	//D433 Tree
	this.EP1_CP1_CH1 = (this.Pumpable_Capacity_Ded_CH1 * this.CH1_Cond_Pumpable > 0) ? 1 : 0

	//D434 Tree
	this.EP2_CP2_CH2 = (this.Pumpable_Capacity_Ded_CH2 * this.CH2_Cond_Pumpable > 0) ? 1 : 0

	//D436 Tree
	this.Branch_Dedicated = (this.EP1_CP1_CH1 + this.EP2_CP2_CH2 > 0) ? 1 : 0

	//D439 Tree
	this.CH1_Evap_Pumpable = ch1EvapPumpable(this)

	//D440 Tree
	this.CH2_Evap_Pumpable = this.CH1_Evap_Pumpable

	//D441 Tree
	this.Total_Evap_Pumpable = this.CH2_Evap_Pumpable + this.CH1_Evap_Pumpable

	//D444 Tree
	this.CH1_Cond_Pumpable2 = (this.Branch_Dedicated == 1) ? this.CH1_CP1_Aviable * this.CP1_Nominal_Flow : 0

	//D445 Tree
	this.CH2_Cond_Pumpable2 = (this.Branch_Dedicated == 1) ? this.CH2_CP2_Aviable * this.CP2_Nominal_Flow : 0

	//D446 Tree
	this.Total_Cond_Pumpable2 = this.CH2_Cond_Pumpable2 + this.CH1_Cond_Pumpable2

	//D449 Tree
	this.EP1_CP1_CH1_Head = ep1CP1CH1Head(this)

	//D450 Tree
	//same function than this.EP1_CP1_CH1_Head
	this.EP2_CP2_CH2_Head = ep1CP1CH1Head(this)

	//D453 Tree
	this.EP1_CH1 = (this.Evap_Pumps == "Head Evap") ? (this.EP1_CP1_CH1_Head * this.CH1_Evap_Pumpable) : (this.EP1_CP1_CH1 * this.Pumpable_Capacity_Ded_CH1)

	//D454 Tree
	this.EP2_CH2 = (this.Evap_Pumps == "Head Evap") ? (this.EP2_CP2_CH2_Head * this.CH2_Evap_Pumpable) : (this.EP2_CP2_CH2 * this.Pumpable_Capacity_Ded_CH2)

	//D455 Tree
	this.Evap_Pump_Capacity = this.EP2_CH2 + this.EP1_CH1

	//D458 Tree
	this.CP1_CH1 = (this.Cond_Pumps_Scenario_Dedic = "Head Cond") ? (this.EP1_CP1_CH1_Head * this.CH1_Cond_Pumpable2) : (this.EP1_CP1_CH1 * this.CH1_Cond_Pumpable)

	//D459 Tree
	this.CP2_CH2 = (this.Cond_Pumps_Scenario_Dedic = "Head Cond") ? (this.EP2_CP2_CH2_Head * this.CH1_Cond_Pumpable2) : (this.EP2_CP2_CH2 * this.CH2_Cond_Pumpable)

	//D460 Tree
	this.Cond_Pump_Capacity = this.CP2_CH2 + this.CP1_CH1

	//D462 Tree
	this.Branch_Cross_CP = (this.CP1_CH1 + this.CP2_CH2 == 0) ? 0 : 1

	//D463 Tree
	this.Branch_Cross_EP = (this.EP1_CH1 + this.EP2_CH2 == 0) ? 0 : 1

	//D465 Tree
	this.Pump_Capacity_Check_EP1 = (this.EP1_CH1 * this.Branch_Cross_CP == 0) ? 0 : 1

	//D466 Tree
	this.Pump_Capacity_Check_EP2 = (this.EP2_CH2 * this.Branch_Cross_CP == 0) ? 0 : 1

	//D468 Tree
	this.Pump_Capacity_Check_CP1 = (this.CP1_CH1 * this.Branch_Cross_EP == 0) ? 0 : 1

	//D469 Tree
	this.Pump_Capacity_Check_CP2 = (this.CP2_CH2 * this.Branch_Cross_EP == 0) ? 0 : 1

	//D471 Tree
	this.Pump_Capacity_Auto_EP1 = this.Pump_Capacity_Check_EP1 * this.EP1_CH1 * this.CH1_Enabled

	//D472 Tree
	this.Pump_Capacity_Auto_EP2 = this.Pump_Capacity_Check_EP2 * this.EP2_CH2 * this.CH2_Enabled

	//Ds variables que aún tenían asignados los valores automáticamente, probaré a asignar los valores correctos.
	//D10 D11 Scenario
	//this.Economizer = "No WSE"
	//WSE CS J5
	//this.Max_Evap_GPM = 2400
	this.Max_Evap_GPM = this.WSECS1.getMaxEvapGPM();

	//D474 Tree
	this.Pump_Capacity_Auto_CP1 = this.Pump_Capacity_Check_CP1 * this.CP1_CH1 * this.CH1_Enabled

	//D475 Tree
	this.Pump_Capacity_Auto_CP2 = this.Pump_Capacity_Check_CP2 * this.CP2_CH2 * this.CH1_Enabled

	//D477 Tree
	this.Branch_Enabled_CH = this.QtyCHEnabledToEvap

	//D479 Tree
	this.Branch_Enabled_EF = this.EP1_CH1 + this.EP2_CH2

	//D480 Tree
	this.Branch_Enabled_CF = this.CP1_CH1 + this.CP2_CH2

	//D483 Tree
	this.Evap_Min_Flow_Chk_CH1_Pa = (this.Total_Evap_Pumpable < this.EvapMinFlowCH1) ? 0 : 1

	//D484 Tree
	this.Evap_Min_Flow_Chk_CH2_Pa = (this.Total_Evap_Pumpable < this.EvapMinFlowCH2) ? 0 : 1

	//D486 Tree
	this.Evap_Min_Flow_CH1_CH2_Se = Math.max(this.EvapMinFlowCH1, this.EvapMinFlowCH2)

	//D487 Tree
	this.Evap_Min_Flow_Chk_Se = (this.Total_Evap_Pumpable < this.Evap_Min_Flow_CH1_CH2_Se) ? 0 : 1

	//D489 Tree
	this.Evap_Min_Flow_Chk_CH1 = (this.Piping == "Parallel") ? this.Evap_Min_Flow_Chk_CH1_Pa : this.Evap_Min_Flow_Chk_Se

	//D490 Tree
	this.Evap_Min_Flow_Chk_CH2 = (this.Piping == "Parallel") ? this.Evap_Min_Flow_Chk_CH2_Pa : this.Evap_Min_Flow_Chk_Se

	//D493 Tree
	this.Cond_Min_Flow_Chk_CH1_Pa = (this.Total_Cond_Pumpable2 < this.CondMinFlowCH1) ? 0 : 1

	//D494 Tree
	this.Cond_Min_Flow_Chk_CH2_Pa = (this.Total_Cond_Pumpable2 < this.CondMinFlowCH2) ? 0 : 1

	//D496 Tree
	this.Cond_Min_Flow_CH1_CH2_Se = Math.max(this.CondMinFlowCH1, this.CondMinFlowCH2)

	//D497 Tree
	this.Cond_Min_Flow_Chk_Se = (this.Total_Cond_Pumpable2 < this.Cond_Min_Flow_CH1_CH2_Se) ? 0 : 1

	//D499 Tree
	this.Cond_Min_Flow_Chk_CH1 = (this.Piping == "Parallel") ? this.Cond_Min_Flow_Chk_CH1_Pa : this.Cond_Min_Flow_Chk_Se

	//D500 Tree
	this.Cond_Min_Flow_Chk_CH2 = (this.Piping == "Parallel") ? this.Cond_Min_Flow_Chk_CH2_Pa : this.Cond_Min_Flow_Chk_Se

	//D502 Tree
	this.Cross_Flow_Chk_CH1 = Math.min(this.Evap_Min_Flow_Chk_CH1, this.Cond_Min_Flow_Chk_CH1)

	//D503 Tree
	this.Cross_Flow_Chk_CH2 = Math.min(this.Evap_Min_Flow_Chk_CH2, this.Cond_Min_Flow_Chk_CH2)

	//D506 Tree
	this.Evap_Min_Flow_CH1_Pa = this.EvapMinFlowCH1

	//D507 Tree
	this.Evap_Min_Flow_CH2_Pa = this.EvapMinFlowCH2

	//D509 Tree
	this.Evap_Min_Flow_Both_CH1 = (this.Evap_Pump_Capacity + 0.01 > (this.Evap_Min_Flow_CH1_Pa + this.Evap_Min_Flow_CH2_Pa)) ? 1 : 0

	//D510 Tree
	this.Evap_Min_Flow_Both_CH2 = this.Evap_Min_Flow_Both_CH1

	//D511 Tree
	this.Evap_Min_Flow_One_CH1 = evapMinFlowOneCH1(this) * this.EP1Enabled

	//D512 Tree
	this.Evap_Min_Flow_One_CH2 = evapMinFlowOneCH2(this) * this.EP2Enabled

	//D513 Tree
	this.Evap_Min_Flow_Parallel_CH1 = Math.max(this.Evap_Min_Flow_Both_CH1, this.Evap_Min_Flow_One_CH1)

	//D514 Tree
	this.Evap_Min_Flow_Parallel_CH2 = Math.max(this.Evap_Min_Flow_Both_CH2, this.Evap_Min_Flow_One_CH2)

	//D515 Tree
	this.Evap_Min_Flow_Series = Math.max(this.EvapMinFlowCH1, this.EvapMinFlowCH2)

	//D516 Tree
	this.Evap_Min_Flow_Series_CH1 = (this.Evap_Pump_Capacity < this.Evap_Min_Flow_Series) ? 0 : 1

	//D517 Tree
	this.Evap_Min_Flow_Series_CH2 = (this.Evap_Pump_Capacity < this.Evap_Min_Flow_Series) ? 0 : 1

	//D519 Tree
	this.Min_Flow_Chk_Header_CH1 = (this.Piping == "SCF") ? this.Evap_Min_Flow_Series_CH1 : this.Evap_Min_Flow_Parallel_CH1

	//D520 Tree
	this.Min_Flow_Chk_Header_CH2 = (this.Piping == "SCF") ? this.Evap_Min_Flow_Series_CH2 : this.Evap_Min_Flow_Parallel_CH2

	//D523 Tree
	this.Cond_Min_FLow_CH1_Pa = this.CondMinFlowCH1

	//D524 Tree
	this.Cond_Min_FLow_CH2_Pa = this.CondMinFlowCH2

	//D526 Tree
	this.Cond_Min_FLow_Both_CH1_Pa = (this.Total_Cond_Pumpable > this.Cond_Min_FLow_CH1_Pa + this.Cond_Min_FLow_CH2_Pa) ? 1 : 0

	//D527 Tree
	this.Cond_Min_FLow_Both_CH2_Pa = this.Cond_Min_FLow_Both_CH1_Pa

	//D528 Tree
	this.Cond_Min_Flow_One_CH1_Pa = condMinFlowOneCH1Pa(this) * this.CP1_Enabled

	//D529 Tree
	this.Cond_Min_Flow_One_CH2_Pa = condMinFlowOneCH2(this) * this.CP2_Enabled

	//D530 Tree
	this.Cond_Min_Flow_Parallel_CH1 = Math.max(this.Cond_Min_FLow_Both_CH1_Pa, this.Cond_Min_Flow_One_CH1_Pa)

	//D531 Tree
	this.Cond_Min_Flow_Parallel_CH2 = Math.max(this.Cond_Min_FLow_Both_CH2_Pa, this.Cond_Min_Flow_One_CH2_Pa)

	//D532 Tree
	this.Cond_Min_Flow_Series = Math.max(this.CondMinFlowCH1, this.CondMinFlowCH2)

	//D533 Tree
	this.Cond_Min_Flow_Series_CH1 = (this.Total_Cond_Pumpable < this.Cond_Min_Flow_Series) ? 0 : 1

	//D534 Tree
	this.Cond_Min_Flow_Series_CH2 = (this.Total_Cond_Pumpable < this.Cond_Min_Flow_Series) ? 0 : 1

	//D536 Tree
	this.Min_Flow_Chk_Header_CH1_2 = (this.Piping == "SCF") ? this.Cond_Min_Flow_Series_CH1 : this.Cond_Min_Flow_Parallel_CH1

	//D537 Tree
	this.Min_Flow_Chk_Header_CH2_2 = (this.Piping == "SCF") ? this.Cond_Min_Flow_Series_CH2 : this.Cond_Min_Flow_Parallel_CH2

	//D539 Tree
	this.Evap_Min_Flow_SCF_CH1 = evapMinFlowSCFCH1(this)

	//D540 Tree
	this.Evap_Min_Flow_SCF_CH2 = evapMinFlowSCFCH2(this)

	//D542 Tree
	this.Enabled_Evap_Flow_Ded_CH1 = this.EP1_CH1

	//D543 Tree
	this.Enabled_Evap_Flow_Ded_CH2 = this.EP2_CH2

	//D545 Tree
	this.Flow_Evap_SCF_Par_CH1 = (this.Piping == "SCF") ? this.Max_Evap_Flow_A / this.EvapPumpsEnabled : 0

	//D546 Tree
	this.Flow_Evap_SCF_Par_CH2 = this.Flow_Evap_SCF_Par_CH1

	//D548 Tree
	this.Evap_Min_Flow_Chk_CH1_2 = (this.Enabled_Evap_Flow_Ded_CH1 < this.EvapMinFlowCH1) ? 0 : 1

	//D549 Tree
	this.Evap_Min_Flow_Chk_CH2_2 = (this.Enabled_Evap_Flow_Ded_CH2 < this.EvapMinFlowCH2) ? 0 : 1

	//D551 Tree
	this.Evaporators_Operable_CH1 = this.Evap_Min_Flow_Chk_CH1_2 * this.EnabledToEvapCH1

	//D552 Tree
	this.Evaporators_Operable_CH2 = this.Evap_Min_Flow_Chk_CH2_2 * this.EnabledToEvapCH1

	//D554 Tree
	this.Operable_Evap_CH1 = (this.Evap_Pumps == "Head Evap") ? this.Evap_Min_Flow_SCF_CH1 : this.Evaporators_Operable_CH1

	//D555 Tree
	this.Operable_Evap_CH2 = (this.Evap_Pumps == "Head Evap") ? this.Evap_Min_Flow_SCF_CH2 : this.Evaporators_Operable_CH2

	//D557 Tree
	this.Cond_Min_Flow_SCF_Par_CH1 = condMinFlowSCFParCH1(this)

	//D558 Tree //maybe name wrong
	this.Cond_Min_Flow_SCF_Par_CH2 = condMinFlowSCFParCH2(this)

	//D560 Tree
	this.Enabled_Cond_Flow_Ded_CH1 = this.CP1_CH1

	//D561 Tree
	this.Enabled_Cond_Flow_Ded_CH2 = this.CP2_CH2

	//D562 Tree
	this.CH_Load_WSE_Percent = (this.Load_Request - this.WSE_Used) / this.Design_Load

	//D563 Tree
	this.Flow_Cond_SCF_Par_CH1 = flowCondSCFParCH1(this)

	//D564 Tree
	this.Flow_Cond_SCF_Par_CH2 = flowCondSCFParCH2(this)

	//D566 Tree
	this.Cond_Min_Flow_Chk_CH1_2 = (this.Enabled_Cond_Flow_Ded_CH2 < this.CondMinFlowCH1) ? 0 : 1

	//D567 Tree
	this.Cond_Min_Flow_Chk_CH2_2 = (this.Enabled_Cond_Flow_Ded_CH1 < this.CondMinFlowCH2) ? 0 : 1

	//D569 Tree
	this.Cond_Operable_CH1_Ded = this.Cond_Min_Flow_Chk_CH1_2 * this.EnabledToCondCH1

	//D570 Tree
	this.Cond_Operable_CH2_Ded = this.Cond_Min_Flow_Chk_CH2_2 * this.EnabledToCondCH2

	//D572 Tree
	this.CHs_Operable_Cond_CH1 = (this.Evap_Pumps == "Head Evap") ? this.Cond_Min_Flow_SCF_Par_CH1 : this.Cond_Operable_CH1_Ded

	//D573 Tree
	this.CHs_Operable_Cond_CH2 = (this.Evap_Pumps == "Head Evap") ? this.Cond_Min_Flow_SCF_Par_CH2 : this.Cond_Operable_CH2_Ded

	//D575 Tree
	this.Cross_CH_Evap_Chk = (this.Operable_Evap_CH1 * this.CHs_Operable_Cond_CH1 > 0) ? 1 : 0

	//D576 Tree
	this.Cross_CH_Cond_Chk = (this.Operable_Evap_CH2 * this.CHs_Operable_Cond_CH2 > 0) ? 1 : 0

	//D578 Tree 
	this.Resulting_Max_PF_CH1 = ResultingMaxPFCH1(this);

	//D579 Tree //maybe wrong logic
	this.Resulting_Max_PF_CH2 = resultingMaxPFCH2(this)

	//D580 Tree
	this.Resulting_Min_PF_Eva = (this.Piping == "SCF") ? this.Evap_Min_Flow_CH1_CH2_Se : this.EvapMinFlowCH1

	//D581 Tree
	this.Evaporators_Operable_CH1_2 = evaporatorsOperableCH12(this)

	//D582 Tree
	this.Evaporators_Operable_CH2_2 = evaporatorsOperableCH22(this)

	//D584 Tree //maybe Wrong Logic
	this.Resulting_Max_PF_Condenser = resultingMaxPFCondenser(this)

	//D585 Tree
	this.Resulting_Min_PF_Condenser = (this.Piping == "SCF") ? this.Cond_Min_Flow_CH1_CH2_Se : this.CondMinFlowCH1

	//D586 Tree
	this.Condenser_Operable_CH1 = condenserOperableCH1(this)

	//D587 Tree
	this.Condenser_Operable_CH2 = condenserOperableCH2(this)

	///////////////////////////////////////////////////////////////////// ROYAL BLUE(EVAPORATOR SUPLY) /////////////////////////////////////////////////////////////////////////////

	//D589 Tree
	this.Chiller_Operating_CH1 = (this.Evaporators_Operable_CH1_2 * this.Condenser_Operable_CH1) * this.CH1_Enabled

	//D590 Tree
	this.Chiller_Operating_CH2 = (this.Evaporators_Operable_CH2_2 * this.Condenser_Operable_CH2) * this.CH2_Enabled

	//D591 Tree
	this.Total_CH_Operating = this.Chiller_Operating_CH2 + this.Chiller_Operating_CH1

	//D592 Tree
	this.Enable_Online_Capacity_CH1 = this.Chiller_Operating_CH1 * this.CH1Capacity

	//D593 Tree
	this.Enable_Online_Capacity_CH2 = this.Chiller_Operating_CH2 * this.CH2Capacity

	//D594 Tree
	this.Enable_Online_Total = this.Enable_Online_Capacity_CH2 + this.Enable_Online_Capacity_CH1

	//D596 Tree
	this.Actual_Online_Capacity_CH1 = this.Chiller_Operating_CH1 * this.CH1_Enabled_Capacity4

	//D597 Tree
	this.Actual_Online_Capacity_CH2 = this.Chiller_Operating_CH2 * this.CH2_Enabled_Capacity4

	//D598 Tree
	this.Total_Online_Capacity = this.Actual_Online_Capacity_CH2 + this.Actual_Online_Capacity_CH1

	//D599 Tree
	this.Load_Percent_Capacity = (this.Total_Online_Capacity + this.WSE_Used) / this.Design_Load

	//D600 Tree
	this.Load_Percent_Capacity_2 = this.Load_Percent_Capacity

	//var auxiliar to help with condicional to calc total online ch
	this.auxiliar1 = (this.Actual_Online_Capacity_CH1 == 0) ? 0 : 1

	this.auxiliar2 = (this.Actual_Online_Capacity_CH2 == 0) ? 0 : 1

	//D601 Tree
	this.Evaporators_WSE = (this.auxiliar1 + this.auxiliar2 == 0) ? 1 : this.auxiliar1 + this.auxiliar2

	//D602 Tree
	this.VPF_Chk_CH1 = vpfChkCH1(this)

	//D603 Tree
	this.VPF_Chk_CH2 = vpfChkCH2(this)

	//D604 Tree
	this.Evaporators = this.auxiliar1 + this.auxiliar2

	//D605 Tree
	this.Evap_Flow_CS_Ded_CH1 = evapFlowCSDedCH1(this)

	//D606 Tree //this.D49 Not found
	this.Evap_Flow_VS_Ded_CH1 = calcuar_Evap_Flow_VS_Ded_CH1(this);
	//D607 Tree
	this.Evap_Flow_CS_Head_CH1 = evapFlowCSHeadCH1(this)

	//D608 Tree
	this.Evap_Flow_VS_Head_CH1 = evapFlowVSHeadCH1(this)

	//D609 Tree
	this.Evap_Flow_CS_SCF_CH1 = evapFlowCSSCFCH1(this);

	//D610 Tree
	this.Evap_Flow_VS_SCF_CH1 = evapFlowVSSCFCH1(this)

	//D611 Tree
	this.VS_Or_CS = (this.Evap_Pumps_Scenario_CS == "CS Evap") ? 1 : 2

	//D612 Tree
	this.Headered = (this.Evap_Pumps == "Head Evap") ? 2 : 0

	//D613 Tree
	this.SCF_2 = (this.Piping == "SCF") ? ((this.Evap_Pumps == "Head Evap") ? 2 : 4) : 0

	//D614 Tree
	this.Total_2 = this.VS_Or_CS + this.SCF_2 + this.Headered

	//Array to do index operation //in order
	this.IndexCH1 = [this.Evap_Flow_CS_Ded_CH1, this.Evap_Flow_VS_Ded_CH1, this.Evap_Flow_CS_Head_CH1, this.Evap_Flow_VS_Head_CH1, this.Evap_Flow_CS_SCF_CH1, this.Evap_Flow_VS_SCF_CH1]

	//D615 Tree
	this.Actual_Evap_Flow = indexOperation(this.IndexCH1, this.Total_2)

	//D617 Tree
	this.Evap_Flow_CS_Ded_CH2 = evapFlowCSDedCH2(this)

	//D618 Tree
	this.Evap_Flow_VS_Ded_CH2 = evapFlowVSDedCH2(this)

	//D619 Tree
	this.Evap_Flow_CS_Head_CH2 = evapFlowCSHeadCH2(this)

	//D620 Tree
	this.Evap_Flow_VS_Head_CH2 = evapFlowVSHeadCH2(this)

	//D621 Tree
	this.Evap_Flow_CS_SCF_CH2 = this.Evap_Flow_CS_SCF_CH1

	//D622 Tree
	this.Evap_Flow_VS_SCF_CH2 = this.Evap_Flow_VS_SCF_CH1

	//D623 Tree
	this.VS_Or_CS_2 = (this.Evap_Pumps_Scenario_CS == "CS Evap") ? 1 : 2

	//D624 Tree
	this.Headered_2 = (this.Evap_Pumps == "Head Evap") ? 2 : 0

	//D625 Tree
	this.SCF_3 = (this.Piping == "SCF") ? ((this.Evap_Pumps == "Head Evap") ? 2 : 4) : 0

	//D626 Tree
	this.Total_3 = this.VS_Or_CS + this.SCF_2 + this.Headered_2

	//Array to do index operation // in order
	this.IndexCH2 = [this.Evap_Flow_CS_Ded_CH2, this.Evap_Flow_VS_Ded_CH2, this.Evap_Flow_CS_Head_CH2, this.Evap_Flow_VS_Head_CH2, this.Evap_Flow_CS_SCF_CH2, this.Evap_Flow_VS_SCF_CH2]

	//D627 Tree
	this.Actual_Evap_Flow_2 = indexOperation(this.IndexCH2, this.Total_3)

	//D629 Tree
	this.Evap_Flow_CS_Ded_CH1_CH2 = this.Evap_Flow_CS_Ded_CH1 + this.Evap_Flow_CS_Ded_CH2

	//D630 Tree
	this.Evap_Flow_VS_Ded_CH1_CH2 = this.Evap_Flow_VS_Ded_CH1 + this.Evap_Flow_VS_Ded_CH2

	//D631 Tree
	this.Evap_Flow_CS_Head_CH1_CH2 = this.Evap_Flow_CS_Head_CH1 + this.Evap_Flow_CS_Head_CH2

	//D632 Tree
	this.Evap_Flow_VS_Head_CH1_CH2 = this.Evap_Flow_VS_Head_CH1 + this.Evap_Flow_VS_Head_CH2
	console.log("this.Evap_Flow_VS_Head_CH1 = " + this.Evap_Flow_VS_Head_CH1);
	console.log("this.Evap_Flow_VS_Head_CH2 = " + this.Evap_Flow_VS_Head_CH2);

	//D633 Tree
	this.Evap_Flow_CS_SCF_CH1_CH2 = Math.max(this.Evap_Flow_CS_SCF_CH2, this.Evap_Flow_CS_SCF_CH1)

	//D634 Tree
	this.Evap_Flow_VS_SCF_CH1_CH2 = Math.max(this.Evap_Flow_VS_SCF_CH2, this.Evap_Flow_VS_SCF_CH1)

	//D635 Tree
	this.VS_Or_CS_3 = (this.Evap_Pumps_Scenario_CS == "CS Evap") ? 1 : 2

	//D636 Tree
	this.Headered_3 = (this.Evap_Pumps == "Head Evap") ? 2 : 0

	//D637 Tree
	this.SCF_4 = (this.Piping == "SCF") ? ((this.Evap_Pumps == "Head Evap") ? 2 : 4) : 0

	//D638 Tree
	this.Total_4 = this.VS_Or_CS + this.SCF_2 + this.Headered_3

	console.log("this.Evap_Flow_CS_Head_CH1_CH2", this.Evap_Flow_CS_Head_CH1_CH2);

	//Array to do index operation in order
	this.IndexCH1CH2 = [this.Evap_Flow_CS_Ded_CH1_CH2, this.Evap_Flow_VS_Ded_CH1_CH2, this.Evap_Flow_CS_Head_CH1_CH2, this.Evap_Flow_VS_Head_CH1_CH2, this.Evap_Flow_CS_SCF_CH1_CH2, this.Evap_Flow_VS_SCF_CH1_CH2]

	this.Index_Valor_CH1_CH2 = indexOperation(this.IndexCH1CH2, this.Total_4)

	//WSE CS J5
	this.Max_Evap_GPM_2 = this.WSECS1.getMaxEvapGPM(this);


	//D640 Tree
	this.Actual_Evap_Flow_3 = (this.Index_Valor_CH1_CH2 == 0) ? this.Max_Evap_GPM_2 : this.Index_Valor_CH1_CH2

	//D646 Tree
	this.Design_DeltaT = this.Design_ECWT - this.Design_LCWT

	//D648 Tree
	this.VS_Second_Flow_AHUs = Math.round((this.Second_Load * 24) / (this.Design_ECWT - this.Design_LCWT))

	//D649 Tree
	this.VS_Second_Flow = (this.Evap_Pumps_Scenario_CS == "CS Evap") ? this.VS_Second_Flow_AHUs : Math.round(Math.min(this.VS_Second_Flow_AHUs, this.Actual_Evap_Flow_3))

	//D650 Tree
	this.Second_DeltaT = (this.VS_Second_Flow == 0) ? 0 : this.Second_Load * 24 / this.VS_Second_Flow

	//D652 Tree
	this.Bypass_Flow = Math.round(this.Actual_Evap_Flow_3 - this.VS_Second_Flow)

	//D653 Tree
	this.Upstream_Temp = Math.max(this.Design_ECWT, this.Design_LCWT + this.Second_DeltaT)

	//D654 Tree
	this.Actual_DeltaT = (this.Actual_Evap_Flow_3 == 0) ? 0 : this.Total_Online_Capacity * 24 / this.Actual_Evap_Flow_3

	//D656 Tree
	this.Fail_Mix_Temp_Adj = (this.Actual_DeltaT > this.Design_DeltaT) ? (this.Actual_DeltaT - this.Design_DeltaT) / 2 : 0
	console.log(`D656
	this.Fail_Mix_Temp_Adj ${this.Fail_Mix_Temp_Adj}
	this.Actual_DeltaT ${this.Actual_DeltaT}
	this.Design_DeltaT ${this.Design_DeltaT}`)

	//D657 Tree
	this.Upstream_Temp_2 = this.Upstream_Temp - this.Fail_Mix_Temp_Adj
	console.log(`//D657 
	this.Upstream_Temp_2 ${this.Upstream_Temp_2}
	this.Fail_Mix_Temp_Adj ${this.Fail_Mix_Temp_Adj} // Esta mal
	`)
	
	//D658 Tree
	this.Mix_Temp = mixTemp(this)

	//D662 Tree
	this.Entering_Temp_CH2 = Math.round(this.Mix_Temp)

	

	//D663 Tree
	this.Leaving_Temp_CH2 = leavingTempCH2(this)

	//D659 Tree
	this.Entering_Temp_CH1 = (this.Piping == "SCF") ? this.Leaving_Temp_CH2 : this.Mix_Temp

	//D660 Tree
	this.Leaving_Temp_CH1 = leavingTempCH1(this)

	//D665 Tree
	this.Return_CH_WT_Before_WSE = this.Entering_Temp_CH2
	
	//D666 Tree
	this.Return_CH_WT_After_WSE = returnCHWTBeforeWSE(this)
	
	///////////////////////////////////////////////////////////////////// GOLD SECTION (Pump_kW_Calculation) /////////////////////////////////////////////////////////////////////////////

	//D669 Tree
	this.Primary_Pump_Flow = this.Actual_Evap_Flow_3

	//D674 Tree = GUT T12 if VS Evap

	this.Control_Fixed_Head = (this.Evap_Pumps_Scenario_CS == "VS Evap") ? this.Evaporator_Control_Head : 0

	//D675 Tree
	this.Calc_Head = calcHead(this)

	//D676 Tree
	this.Primary_Pump_KW = 0.746 * (this.Calc_Head * this.Actual_Evap_Flow_3 * this.Spec_Grav) / (3960 * this.Pump_n * this.Motor_n)
	console.log("this.Actual_Evap_Flow_3 = " + this.Actual_Evap_Flow_3 + " y debería ser: 1814");
 
	//D678 Tree
	this.Design_Secundary_Head = (this.Evap_Pumps_Scenario_CS == "VS Evap") ? 0 : this.Ev_Secundary_Head

	//D679 Tree
	this.Control_Fixed_Head_2 = (this.Evap_Pumps_Scenario_CS == "VS Evap") ? this.Evaporator_Control_Head : 0

	//D680 Tree
	this.Calc_Head_2 = ((this.Design_Secundary_Head - this.Control_Fixed_Head_2) * Math.pow(this.Primary_Pump_Flow / this.EP_Branch_Max_Flow, 2)) + this.Control_Fixed_Head_2

	//D681 Tree
	this.Second_Pump_KW = 0.746 * (this.Calc_Head_2 * this.VS_Second_Flow * this.Spec_Grav) / (3960 * this.Pump_n * this.Motor_n)

	//Para pruebas
	console.log(this.Second_Pump_KW);

	///////////////////////////////////////////////////////////////////// PINK SECTION /////////////////////////////////////////////////////////////////////////////

	//D683 Tree
	this.Chiller_Operating_CH1_2 = this.Chiller_Operating_CH1

	//D684 Tree
	this.Chiller_Operating_CH2_2 = this.Chiller_Operating_CH2

	//D686 Tree
	this.Enabled_Online_Capacity_CH1 = this.Chiller_Operating_CH1 * this.CH1Capacity

	//D687 Tree
	this.Enabled_Online_Capacity_CH2 = this.Chiller_Operating_CH2 * this.CH2Capacity

	//D688 Tree
	this.Enabled_Online_Total_Capacity = this.Enabled_Online_Capacity_CH2 + this.Enabled_Online_Capacity_CH1

	//D690 Tree
	this.Actual_Online_Capacity_CH1_2 = this.Chiller_Operating_CH1 * this.CH1_Enabled_Capacity4

	//D691 Tree
	this.Actual_Online_Capacity_CH2_2 = this.Chiller_Operating_CH2 * this.CH2_Enabled_Capacity4

	//D692 Tree
	this.Total_Online_Capacity_2 = this.Actual_Online_Capacity_CH2_2 + this.Actual_Online_Capacity_CH1_2

	//variable auxiliar to help calculating of D693
	this.Condenser_Auxuliar = (this.Actual_Online_Capacity_CH1_2 == 0) ? 0 : 1

	this.Condenser_Auxuliar_2 = (this.Actual_Online_Capacity_CH2_2 == 0) ? 0 : 1

	//D693 Tree
	this.Condensers_WSE_Flow_Adj = (this.Condenser_Auxuliar + this.Condenser_Auxuliar_2 == 0) ? 1 : this.Condenser_Auxuliar + this.Condenser_Auxuliar_2

	//D694 Tree
	this.Load_Percent_Cond = this.Total_Online_Capacity_2 / this.Design_Load

	//D695 Tree
	this.Condensers = this.Condenser_Auxuliar + this.Condenser_Auxuliar_2

	//D696 Tree
	this.VPF_Chk_CH1_2 = vpfChkCh12(this)

	//D697 Tree
	this.VPF_Chk_CH2_2 = vpfChkCh22(this)

	//D698 Tree
	this.Flow_Multiplier_Parallel = flowMultiplierParallel(this)

	//D699 Tree
	this.Cond_Flow_CS_Dedicated_CH1 = condFlowCSDedicatedCH1(this)

	//D700 Tree
	this.Cond_Flow_VS_Dedicated_CH1 = condFlowVSDedicatedCH1(this)

	//D701 Tree
	this.Cond_Flow_CS_Headered_CH1 = condFlowCSHeaderedCH1(this)
	console.log("this.Cond_Flow_CS_Headered_CH1", this.Cond_Flow_CS_Headered_CH1);

	//D702 Tree
	this.Cond_Flow_VS_Headered_CH1 = condFlowVSHeaderedCH1(this)

	//D703 Tree
	this.Cond_Flow_CS_SCF_CH1 = condFlowCSSCFCH1(this)

	//variables aux to help calc of this.Cond_Flow_VS_SCF_CH1
	this.Cond_Flow_CS_SCF_CH1_Aux = (this.Flow_Multiplier_Parallel < 0.51) ? this.Total_Cond_Pumpable : this.CH1_Cond_Pumpable

	this.Cond_Flow_CS_SCF_CH1_Aux_2 = Math.max(this.Flow_Multiplier_Parallel * this.Cond_Flow_CS_SCF_CH1_Aux * this.Chiller_Operating_CH1_2 + this.Flow_Multiplier_Parallel * this.Cond_Flow_CS_SCF_CH1_Aux * this.Chiller_Operating_CH2_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH1_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH2_2)

	this.Cond_Flow_CS_SCF_CH1_Aux_3 = Math.max(this.Flow_Multiplier_Parallel * this.CH1_Cond_Pumpable * this.Chiller_Operating_CH1_2 + this.Flow_Multiplier_Parallel * this.CH2_Cond_Pumpable * this.Chiller_Operating_CH2_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH1_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH2_2)

	//D704 Tree
	this.Cond_Flow_VS_SCF_CH1 = condFlowVSSCFCH1(this)

	//D705 Tree
	this.VS_Or_CS_5 = (this.Cond_Pumps_Scenario_CS == "CS Cond") ? 1 : 2

	//D706 Tree
	this.Headered_5 = (this.Evap_Pumps == "Head Evap") ? 2 : 0

	//D707 Tree
	this.SCF_5 = (this.Piping == "SCF") ? ((this.Evap_Pumps == "Head Evap") ? 2 : 4) : 0

	//D708 Tree
	this.Total_5 = this.VS_Or_CS_5 + this.Headered_5 + this.SCF_5

	//Array to do index operation in order
	this.Cond_Flow_IndexCH1 = [this.Cond_Flow_CS_Dedicated_CH1, this.Cond_Flow_VS_Dedicated_CH1, this.Cond_Flow_CS_Headered_CH1, this.Cond_Flow_VS_Headered_CH1, this.Cond_Flow_CS_SCF_CH1, this.Cond_Flow_VS_SCF_CH1]

	//D709 Tree
	//add return 0 into else condition to prevent error
	this.Index_Valor_CF_CH1 = indexOperation(this.Cond_Flow_IndexCH1, this.Total_5) + ((this.Chiller_Operating_CH1_2 + this.Chiller_Operating_CH2_2 == 0 && this.WSE_Used > 0) ? 0 : 0)

	//D711 Tree
	this.Cond_Flow_CS_Dedicated_CH2 = condFlowCSDedicatedCH2(this)
	console.log("this.Cond_Flow_CS_Dedicated_CH2", this.Cond_Flow_CS_Dedicated_CH2);

	//D712 Tree
	this.Cond_Flow_VS_Dedicated_CH2 = condFlowVSDedicatedCH2(this)

	//D713 Tree
	this.Cond_Flow_CS_Headered_CH2 = condFlowCSHeaderedCH2(this)
	console.log("this.Cond_Flow_CS_Dedicated_CH2", this.Cond_Flow_CS_Dedicated_CH2);

	//D714 Tree
	this.Cond_Flow_VS_Headered_CH2 = condFlowVSHeaderedCH2(this)

	//D715 Tree
	this.Cond_Flow_CS_SCF_CH2 = condFlowCSSCFCH2(this)

	//variables aux to help calc of this.Cond_Flow_VS_SCF_CH2
	this.Cond_Flow_CS_SCF_CH2_Aux = (this.Load_Percent_Cond < 0.51) ? this.Total_Cond_Pumpable : this.CH2_Cond_Pumpable

	this.Cond_Flow_CS_SCF_CH2_Aux4 = (this.Flow_Multiplier_Parallel < 0.51) ? this.Total_Cond_Pumpable : this.CH2_Cond_Pumpable

	this.Cond_Flow_CS_SCF_CH2_Aux_2 = Math.max(this.Flow_Multiplier_Parallel * this.Cond_Flow_CS_SCF_CH2_Aux * this.Chiller_Operating_CH1_2 + this.Flow_Multiplier_Parallel * this.Cond_Flow_CS_SCF_CH2_Aux4 * this.Chiller_Operating_CH2_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH1_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH2_2)

	this.Cond_Flow_CS_SCF_CH2_Aux_3 = Math.max(this.Flow_Multiplier_Parallel * this.CH1_Cond_Pumpable * this.Chiller_Operating_CH1_2 + this.Load_Percent_Cond * this.CH2_Cond_Pumpable * this.Chiller_Operating_CH2_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH1_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH2_2)

	this.Cond_Flow_CS_SCF_CH2_Aux_5 = Math.max(this.Flow_Multiplier_Parallel * this.Cond_Flow_CS_SCF_CH2_Aux * this.Chiller_Operating_CH1_2 + this.Flow_Multiplier_Parallel * this.Cond_Flow_CS_SCF_CH2_Aux * this.Chiller_Operating_CH2_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH1_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH2_2)

	this.Cond_Flow_CS_SCF_CH2_Aux_6 = Math.max(this.Flow_Multiplier_Parallel * this.CH1_Cond_Pumpable * this.Chiller_Operating_CH1_2 + this.Flow_Multiplier_Parallel * this.CH2_Cond_Pumpable * this.Chiller_Operating_CH2_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH1_2, this.Cond_Min_Flow_Series * this.Chiller_Operating_CH2_2)

	//D716 Tree
	this.Cond_Flow_VS_SCF_CH2 = condFlowVSSCFCH2(this)

	//D717 Tree
	this.VS_Or_CS_6 = (this.Cond_Pumps_Scenario_CS == "CS Cond") ? 1 : 2

	//D718 Tree
	this.Headered_6 = (this.Evap_Pumps == "Head Evap") ? 2 : 0

	//D719 Tree
	this.SCF_6 = (this.Piping == "SCF") ? ((this.Evap_Pumps == "Head Evap") ? 2 : 4) : 0

	//D720 Tree
	this.Total_6 = this.VS_Or_CS_6 + this.Headered_6 + this.SCF_6

	//Array to do index operation in order
	this.Cond_Flow_IndexCH2 = [this.Cond_Flow_CS_Dedicated_CH2, this.Cond_Flow_VS_Dedicated_CH2, this.Cond_Flow_CS_Headered_CH2, this.Cond_Flow_VS_Headered_CH2, this.Cond_Flow_CS_SCF_CH2, this.Cond_Flow_VS_SCF_CH2]

	//D721 Tree
	this.Index_Valor_CF_CH2 = indexOperation(this.Cond_Flow_IndexCH2, this.Total_6)

	//D723 Tree
	this.Cond_Flow_CS_Dedicated_CH1_CH2 = this.Cond_Flow_CS_Dedicated_CH1 + this.Cond_Flow_CS_Dedicated_CH2

	//D724 Tree
	this.Cond_Flow_VS_Dedicated_CH1_CH2 = this.Cond_Flow_VS_Dedicated_CH1 + this.Cond_Flow_VS_Dedicated_CH2

	//D725 Tree
	this.Cond_Flow_CS_Headered_CH1_CH2 = this.Cond_Flow_CS_Headered_CH1 + this.Cond_Flow_CS_Headered_CH2

	//D726 Tree
	this.Cond_Flow_VS_Headered_CH1_CH2 = this.Cond_Flow_VS_Headered_CH1 + this.Cond_Flow_VS_Headered_CH2

	//D727 Tree
	this.Cond_Flow_CS_SCF_CH1_CH2 = Math.max(this.Cond_Flow_CS_SCF_CH2, this.Cond_Flow_CS_SCF_CH1)

	//D728 Tree
	this.Cond_Flow_VS_SCF_CH1_CH2 = condFlowVSSCFCH1CH2(this)

	//D729 Tree
	this.VS_Or_CS_CH1_CH2 = (this.Cond_Pumps_Scenario_CS == "CS Cond") ? 1 : 2

	//D730 Tree
	this.Headered_CH1_CH2 = (this.Evap_Pumps == "Head Evap") ? 2 : 0

	//D731 Tree
	this.SCF_CH1_CH2 = (this.Piping == "SCF") ? ((this.Evap_Pumps == "Head Evap") ? 2 : 4) : 0

	//D732 Tree
	this.Total_CH1_CH2 = this.VS_Or_CS_CH1_CH2 + this.Headered_CH1_CH2 + this.SCF_CH1_CH2
	console.log(`
	this.VS_Or_CS_CH1_CH2 ${this.VS_Or_CS_CH1_CH2}
	this.Headered_CH1_CH2 ${this.Headered_CH1_CH2}
	this.SCF_CH1_CH2 ${this.SCF_CH1_CH2}
	`)
	//Array to do index operation in order
	this.Cond_Flow_Index_CH1_CH2 = [this.Cond_Flow_CS_Dedicated_CH1_CH2, this.Cond_Flow_VS_Dedicated_CH1_CH2, this.Cond_Flow_CS_Headered_CH1_CH2, this.Cond_Flow_VS_Headered_CH1_CH2, this.Cond_Flow_CS_SCF_CH1_CH2, this.Cond_Flow_VS_SCF_CH1_CH2]

	//WSE CS J6
	this.Max_Cond_GPM = this.WSECS1.getMaxCondGPM(this);

	this.Index_Valor_CF_CH1_CH2 = indexOperation(this.Cond_Flow_Index_CH1_CH2, this.Total_CH1_CH2)
	
	//D734 Tree
	this.Actual_Cond_Flow = actualCondFlow(this)

	//D735 Tree
	this.WSE_DeltaT = WSEUsed(this)

	///////////////////////////////////////////////////////////////////// CANELA (Calc Second Flow) SECTION /////////////////////////////////////////////////////////////////////////////

	//D738 Tree
	this.Primary_Pump_Flow_2 = this.Actual_Cond_Flow

	//D742 Tree
	this.WSE_Pressure_Drop = wsePressureDrop(this)

	//D744 Tree
	this.Control_FH = (this.Cond_Pumps_Scenario_CS == "VS Cond") ? this.Tower_Delta_HT : 0;

	//D745 Tree
	this.Calc_Head_3 = calcHead3(this)


	//D746 Tree
	this.Primary_Pump_KW_2 = 0.746 * (this.Calc_Head_3 * this.Actual_Cond_Flow * this.Spec_Grav_2) / (3960 * this.Motor_n_2 * this.Spec_Grav_2)

	//D747 Tree
	this.Cond_Pump_HR = (this.Load_Percent < 0.9) ? this.Primary_Pump_KW_2 / 3.517 : 0	
	

	///////////////////////////////////////////////////////////////////// YELLOW (Cooling Tower Preliminary) SECTION /////////////////////////////////////////////////////////////////////////////

	//D751 Tree
	this.Ev_Fl = this.Design_Load

	//D752 Tree
	this.Ev_Load = this.Load_Request

	//D753 Tree
	this.CT_Load = ctLoad(this)

	//D755 Tree
	this.WB = this.Wet_Bulb

	//D756 Tree
	this.CT_FL_KW = this.CT_FL_Eff * this.CT_Load

	//D757 Tree TODO Input
	this.Fan_Law = 1

	//D758 Tree
	this.CT_PL_KW = this.Fan_Law * this.CT_FL_KW


	//D760 Tree
	this.Current_Range = (this.CT_Load / 1.2) / this.Ev_Fl * this.Design_Range

	//Tower Model F6
	this.Tower_Flow_Factor_Dimen = this.tow.getTowerFlowFactor(this);

	//D761 Tree
	this.Tower_Flow_Factor = Math.max((this.Tower_Flow_Factor_Dimen * (this.Actual_Cond_Flow / this.CP_Branch_Max_Flow)), 0.3)

	//D762 Tree
	this.Tower_Approach_Normal = (2.471006) - (0.1398551 * this.WB) + (0.001325024 * this.WB * this.WB) + (0.7687214 * this.Current_Range) - (0.02337056 * this.WB * this.Current_Range) + (0.000149476 * this.WB * this.WB * this.Current_Range) - (0.01116139 * this.Current_Range * this.Current_Range) + (0.000325406 * this.WB * this.Current_Range * this.Current_Range) - (0.00000230183 * this.WB * this.WB * this.Current_Range * this.Current_Range) + (9.852804 * this.Tower_Flow_Factor) - (0.1736736 * this.WB * this.Tower_Flow_Factor) + (0.000811069 * this.WB * this.WB * this.Tower_Flow_Factor) + (1.74992 * this.Current_Range * this.Tower_Flow_Factor) + (0.004930143 * this.WB * this.Current_Range * this.Tower_Flow_Factor) - (0.00022193 * this.WB * this.WB * this.Current_Range * this.Tower_Flow_Factor) - (0.009865402 * this.Current_Range * this.Current_Range * this.Tower_Flow_Factor) - (0.000283361 * this.WB * this.Current_Range * this.Current_Range * this.Tower_Flow_Factor) + (0.00000466261 * this.WB * this.WB * this.Current_Range * this.Current_Range * this.Tower_Flow_Factor) + (0.09746009 * this.Tower_Flow_Factor * this.Tower_Flow_Factor) - (0.01116796 * this.WB * this.Tower_Flow_Factor * this.Tower_Flow_Factor) + (0.000138903 * this.WB * this.WB * this.Tower_Flow_Factor * this.Tower_Flow_Factor) - (0.1354148 * this.Current_Range * this.Tower_Flow_Factor * this.Tower_Flow_Factor) + (0.001004747 * this.WB * this.Current_Range * this.Tower_Flow_Factor * this.Tower_Flow_Factor) + (0.0000119203 * this.WB * this.WB * this.Current_Range * this.Tower_Flow_Factor * this.Tower_Flow_Factor) - (0.002255673 * this.Current_Range * this.Current_Range * this.Tower_Flow_Factor * this.Tower_Flow_Factor) + (0.0000192893 * this.WB * this.Current_Range * this.Current_Range * this.Tower_Flow_Factor * this.Tower_Flow_Factor) + (0.000000260086 * this.WB * this.WB * this.Current_Range * this.Current_Range * this.Tower_Flow_Factor * this.Tower_Flow_Factor)

	//D763 Tree
	this.Tower_Approach_Fail = (this.Tower_Approach_Normal + this.Tower_Approach_Normal + 35) / 2

	//D764 Tree
	this.Preliminary_ECdWT_CS_Fans = ((this.TowerFanFailing == 1) ? this.Tower_Approach_Fail : this.Tower_Approach_Normal) + this.WB

	//D767 Tree
	this.WB_2 = this.Wet_Bulb

	//D768 Tree
	this.Fan_Law_2 = Math.pow(this.Ev_Load / this.Ev_Fl, 3)

	//D769 Tree
	this.CT_PL_KW_2 = this.Fan_Law_2 * this.CT_FL_KW

	//D770 Tree
	this.Current_Range_2 = this.Design_Range

	//Tower Model F6
	this.Tower_Flow_Factor_Dimen_2 = this.tow.getTowerFlowFactor(this);

	//D771 Tree
	this.Tower_Flow_Factor_2 = Math.max((this.Tower_Flow_Factor_Dimen_2 * (this.Actual_Cond_Flow / this.CP_Branch_Max_Flow)), 0.3)

	//D772 Tree
	this.Tower_Approach_Normal_2 = (2.471006) - (0.1398551 * this.WB_2) + (0.001325024 * this.WB_2 * this.WB_2) + (0.7687214 * this.Current_Range_2) - (0.02337056 * this.WB_2 * this.Current_Range_2) + (0.000149476 * this.WB_2 * this.WB_2 * this.Current_Range_2) - (0.01116139 * this.Current_Range_2 * this.Current_Range_2) + (0.000325406 * this.WB_2 * this.Current_Range_2 * this.Current_Range_2) - (0.00000230183 * this.WB_2 * this.WB_2 * this.Current_Range_2 * this.Current_Range_2) + (9.852804 * this.Tower_Flow_Factor_2) - (0.1736736 * this.WB_2 * this.Tower_Flow_Factor_2) + (0.000811069 * this.WB_2 * this.WB_2 * this.Tower_Flow_Factor_2) + (1.74992 * this.Current_Range_2 * this.Tower_Flow_Factor_2) + (0.004930143 * this.WB_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2) - (0.00022193 * this.WB_2 * this.WB_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2) - (0.009865402 * this.Current_Range_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2) - (0.000283361 * this.WB_2 * this.Current_Range_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2) + (0.00000466261 * this.WB_2 * this.WB_2 * this.Current_Range_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2) + (0.09746009 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) - (0.01116796 * this.WB_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) + (0.000138903 * this.WB_2 * this.WB_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) - (0.1354148 * this.Current_Range_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) + (0.001004747 * this.WB_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) + (0.0000119203 * this.WB_2 * this.WB_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) - (0.002255673 * this.Current_Range_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) + (0.0000192893 * this.WB_2 * this.Current_Range_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2) + (0.000000260086 * this.WB_2 * this.WB_2 * this.Current_Range_2 * this.Current_Range_2 * this.Tower_Flow_Factor_2 * this.Tower_Flow_Factor_2)

	//D773 Tree
	this.Tower_Approach_Fail_2 = (this.Tower_Approach_Normal_2 + this.Tower_Approach_Normal_2 + 35) / 2

	//D774 Tree
	this.Preliminary_ECdWT_VS_Fans = ((this.TowerFanFailing == 1) ? this.Tower_Approach_Fail_2 : this.Tower_Approach_Normal_2) + this.WB_2

	//D776 Tree
	this.Preliminary_ECdWT = (this.Tower_Fan == "CS") ? this.Preliminary_ECdWT_CS_Fans : this.Preliminary_ECdWT_VS_Fans
	///////////////////////////////////////////////////////////////////// BLUE SECTION (Evapotator return) /////////////////////////////////////////////////////////////////////////////

	//D779 Tree
	this.CH1_Tons = this.CH1_Enabled_Capacity4

	//D780 Tree
	this.CH1_Function = ch1Function(this)

	//D782 Tree
	this.CH1_ECdWT = (this.CH1_Function == 1) ? this.Preliminary_ECdWT + this.WSE_DeltaT : this.Entering_Cond_WT3

	//D783 Tree
	this.CH1_Evap_Flow_Rate = this.Actual_Evap_Flow

	//D784 Tree
	this.CH1_Cond_Flow_Rate_2 = (this.CH1_Function == 1) ? this.Index_Valor_CF_CH1 : 0

	//D785 Tree
	this.CH1_Hot_Water_FR = (this.CH1_Function == 0) ? this.Hot_Water_FR3 : 0

	//D791 Tree
	this.CH2_Tons = this.CH2_Enabled_Capacity4

	//D792 Tree
	this.CH2_Function = ch2Function(this) * this.CH1_Function

	//D793 Tree
	this.CH2_ECWT = this.Return_CH_WT_After_WSE

	//D794 Tree
	this.CH2_ECdWT_Parallel = (this.CH2_Function == 1) ? this.Preliminary_ECdWT + this.WSE_DeltaT : this.Entering_Cond_WT3

	
	//D797 Tree
	this.CH2_Evap_Flow_Rate = this.Actual_Evap_Flow_2
	
	//D798 Tree
	this.CH2_Cond_Flow_Rate_2 = (this.CH2_Function == 1) ? this.Index_Valor_CF_CH2 : 0
	
	//D799 Tree
	this.CH2_Hot_Water_FR = (this.CH2_Function == 0) ? this.Hot_Water_FR3 : 0
	
	//D800 Tree
	this.CH2_LCWT = (this.CH2_Evap_Flow_Rate == 0) ? this.CH2_ECWT : (this.CH2_ECWT - this.CH2_Tons * 24 / this.CH2_Evap_Flow_Rate)
	console.log(`this.CH2_LCWT ${this.CH2_Evap_Flow_Rate} 
	this.CH2_ECWT ${this.CH2_ECWT}
	this.CH2_Tons ${this.CH2_Tons}
	this.CH2_Evap_Flow_Rate ${this.CH2_Evap_Flow_Rate}`)
	
	//D781 Tree D800 not aviable
	//this.CH1_ECWT = (this.Piping == "SCF") ? D800 : this.Return_CH_WT_After_WSE
	this.CH1_ECWT = (this.Piping == "SCF") ? this.CH2_LCWT : this.Return_CH_WT_After_WSE
	console.log(`D781
	this.CH1_ECWT ${this.CH1_ECWT}
		this.Piping ${this.Piping}
		this.CH2_LCWT ${this.CH2_LCWT} //esta mal hay que revisarlo
		this.Return_CH_WT_After_WSE ${this.Return_CH_WT_After_WSE}
	`)

	//D786
	this.CH1_LCWT = ch1LCWT(this)
	console.log("//111 this.CH1_LCWT", this.CH1_LCWT);
	
	//D787 Tree TO DO Test
	this.CH1_LCdWT = this.CH1_ECdWT + ch1LCdWT(this)

	//D795 Tree
	this.CH2_ECdWT_Series = ch2ECdWTSeries(this)

	//D796 Tree
	this.CH2_ECdWT = ch2ECdWT(this)
	//D781 Tree D800 not aviable
	//this.CH1_ECWT = (this.Piping == "SCF") ? D800 : this.Return_CH_WT_After_WSE
	this.CH1_ECWT = (this.Piping == "SCF") ? this.CH2_LCWT : this.Return_CH_WT_After_WSE

	this.chData.setCH1_LCWT_cd(this.CH1_LCWT);
	this.chData.setCH2_LCWT_cd(this.CH2_LCWT);
	this.chData.init(this);

	//Heat WSE C195
	this.Set_Point_T1 = this.WSEHeat1.getSetPiontT1();
	/*
	console.log(`this.chData.getChiller1Map19V ${this.chData.getChiller1Map19V}
	this.chData.getChiller2Map19V ${this.chData.getChiller2Map19V}
	this.chData.getChiller1AMapXRV ${this.chData.getChiller1AMapXRV} 
	this.chData.getChiller2AMapXRV ${this.chData.getChiller2AMapXRV} `);
	*/
	//D801 Tree 
	this.CH2_LCdWT = CH2LCdWT(this)
	//isntane of chnews
	
	console.log(`hola
	${this.chData.getChoosenChillerMap().length}`)

	this.chNew = new ChillerNew
	(
		[this.CH1_Tons, this.CH1_Tons_2], 
		[ch1LCWT(this), this.CH1_LCWT_2], 
		[this.CH1_LCdWT, ch1LCdWT2(this)], 
		[this.CH2_Tons, this.CH2_Tons_2], 
		[this.CH2_LCWT, this.CH2_LCWT_2], 
		[this.CH2_LCdWT, this.CH2_LCdWT_2],
		[this.CH1Capacity, 0], [this.CH2Capacity, 0],
		this.chData.getChoosenChillerMap()
	);

	//D788 Tree TO DO Input
	this.Preliminary_CH1_KWTons = this.chNew.getCH1kWTon()[0];

	//D789 Tree
	this.Preliminary_CH1_HR_CT = (this.CH1_Tons + (this.Preliminary_CH1_KWTons * this.CH1_Tons) / 3.517) * this.CH1_Function
	console.log(`D789 
	this.Preliminary_CH1_HR_CT ${this.Preliminary_CH1_HR_CT}
		this.CH1_Tons ${this.CH1_Tons}
		this.Preliminary_CH1_KWTons ${this.Preliminary_CH1_KWTons}
		this.CH1_Function ${this.CH1_Function}
	`)

	//D790 Tree
	this.Heat_Rejection_HWL = heatRejectionHWL(this)

	//D802 Tree TODO Input
	this.Preliminay_CH2_KWTon = this.chNew.getCH2kWTon()[0];
	console.log("this.Preliminary_CH2_KWTons", this.Preliminay_CH2_KWTon);
	
	//D803 Tree
	this.Preliminay_CH2_HR_CT = (this.CH2_Tons + (this.Preliminay_CH2_KWTon * this.CH2_Tons) / 3.517) * this.CH2_Function
	
	//D804 Tree
	this.Heat_Rejection_Hot_Water = (this.CH2_Function == 0) ? (this.CH2_Tons + (this.Preliminay_CH2_KWTon * this.CH2_Tons) / 3.517) : 0
	
	/*
	Dependiendo el tipo de chiller escogido se debe hacer un get de this.chData
	19DV -> getChiller1Map19V
	19DV Future -> getChiller2Map19V
	19XRV -> getChiller1AMapXRV
	23XRV -> getChiller2AMapXRV
	*/

	///////////////////////////////////////////////////////////////////// ORANGE SECTION (Cooling Tower - Round 2) /////////////////////////////////////////////////////////////////////////////

	//D807 Tree
	this.Ev_Fl_2 = this.Ev_Fl

	//D808 Tree
	this.Ev_Load_2 = this.Ev_Load

	//D809 Tree
	this.CT_Load_2 = this.Preliminay_CH2_HR_CT + this.Preliminary_CH1_HR_CT + this.Cond_Pump_HR + this.WSE_Used	
	console.log(`this.Preliminay_CH2_HR_CT ${this.Preliminay_CH2_HR_CT}
	this.Preliminary_CH1_HR_CT ${this.Preliminary_CH1_HR_CT}
	this.Cond_Pump_HR ${this.Cond_Pump_HR}
	this.WSE_Used ${this.WSE_Used}`)
	//D811 Tree
	this.WB_3 = this.Wet_Bulb

	//D812 Tree
	this.CT_FL_KW_2 = this.CT_FL_Eff_2 * this.CT_Load_2

	//D813 Tree TODO Input
	this.Fan_Law_3 = 1

	//D814 Tree
	this.CT_PL_KW_3 = this.Fan_Law_3 * this.CT_FL_KW_2

	//D816 Tree
	this.Current_Range_3 = (this.CT_Load_2 / 1.19) / this.Ev_Fl_2 * this.Design_Range_2

	//Tower Model F6
	this.Tower_Flow_Factor_Dimen_3 = this.tow.getTowerFlowFactor(this);
	//D817 Tree
	this.Tower_Flow_Factor_3 = Math.max((this.Tower_Flow_Factor_Dimen_3 * (this.Actual_Cond_Flow / this.CP_Branch_Max_Flow)), 0.3)

	//D818 Tree
	this.Tower_Approach_Normal_3 = Math.max(((2.471006) - (0.1398551 * this.WB_3) + (0.001325024 * this.WB_3 * this.WB_3) 
		+ (0.7687214 * this.Current_Range_3) - (0.02337056 * this.WB_3 * this.Current_Range_3) 
		+ (0.000149476 * this.WB_3 * this.WB_3 * this.Current_Range_3) - (0.01116139 * this.Current_Range_3 * this.Current_Range_3) 
		+ (0.000325406 * this.WB_3 * this.Current_Range_3 * this.Current_Range_3) 
		- (0.00000230183 * this.WB_3 * this.WB_3 * this.Current_Range_3 * this.Current_Range_3) 
		+ (9.852804 * this.Tower_Flow_Factor_3) - (0.1736736 * this.WB_3 * this.Tower_Flow_Factor_3) 
		+ (0.000811069 * this.WB_3 * this.WB_3 * this.Tower_Flow_Factor_3) + (1.74992 * this.Current_Range_3 * this.Tower_Flow_Factor_3) 
		+ (0.004930143 * this.WB_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3) 
		- (0.00022193 * this.WB_3 * this.WB_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3) 
		- (0.009865402 * this.Current_Range_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3) 
		- (0.000283361 * this.WB_3 * this.Current_Range_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3) 
		+ (0.00000466261 * this.WB_3 * this.WB_3 * this.Current_Range_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3) 
		+ (0.09746009 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		- (0.01116796 * this.WB_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		+ (0.000138903 * this.WB_3 * this.WB_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		- (0.1354148 * this.Current_Range_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		+ (0.001004747 * this.WB_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		+ (0.0000119203 * this.WB_3 * this.WB_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		- (0.002255673 * this.Current_Range_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		+ (0.0000192893 * this.WB_3 * this.Current_Range_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3) 
		+ (0.000000260086 * this.WB_3 * this.WB_3 * this.Current_Range_3 * this.Current_Range_3 * this.Tower_Flow_Factor_3 * this.Tower_Flow_Factor_3)), 1.3)
	
	//D819 Tree
	this.Tower_Approach_Fail_3 = (this.Tower_Approach_Normal_3 + this.Tower_Approach_Normal_3 + 35) / 2

	//D820 Tree
	this.ECdWT_CS_Fans = ((this.TowerFanFailing == 1) ? this.Tower_Approach_Fail_3 : this.Tower_Approach_Normal_3) + this.WB_3
	
	//D823 Tree
	this.WB_4 = this.Wet_Bulb

	//D824 Tree
	this.Fan_Law_4 = Math.pow((this.Ev_Load_2 / this.Ev_Fl_2), 3)

	//D825 Tree
	this.CT_PL_KW_4 = this.Fan_Law_4 * this.CT_FL_KW_2

	//D826 Tree
	this.Current_Range_4 = this.Design_Range_2

	//Tower Model F6
	this.Tower_Flow_Factor_Dimen_4 = this.tow.getTowerFlowFactor(this);

	//D827 Tree
	this.Tower_Flow_Factor_4 = Math.max((this.Tower_Flow_Factor_Dimen_4 * (this.Actual_Cond_Flow / this.CP_Branch_Max_Flow)), 0.3)

	//D828 Tree
	this.Tower_Approach_Normal_4 = Math.max(
		(
			(2.471006) 
			- (0.1398551 * this.WB_4) 
			+ (0.001325024 * this.WB_4 * this.WB_4) 
			+ (0.7687214 * this.Current_Range_4) 
			- (0.02337056 * this.WB_4 * this.Current_Range_4) 
			+ (0.000149476 * this.WB_4 * this.WB_4 * this.Current_Range_4) 
			- (0.01116139 * this.Current_Range_4 * this.Current_Range_4) 
			+ (0.000325406 * this.WB_4 * this.Current_Range_4 * this.Current_Range_4) 
			- (0.00000230183 * this.WB_4 * this.WB_4 * this.Current_Range_4 * this.Current_Range_4) 
			+ (9.852804 * this.Tower_Flow_Factor_4) 
			- (0.1736736 * this.WB_4 * this.Tower_Flow_Factor_4) 
			+ (0.000811069 * this.WB_4 * this.WB_4 * this.Tower_Flow_Factor_4) 
			+ (1.74992 * this.Current_Range_4 * this.Tower_Flow_Factor_4) 
			+ (0.004930143 * this.WB_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4) 
			- (0.00022193 * this.WB_4 * this.WB_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4) 
			- (0.009865402 * this.Current_Range_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4) 
			- (0.000283361 * this.WB_4 * this.Current_Range_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4) 
			+ (0.00000466261 * this.WB_4 * this.WB_4 * this.Current_Range_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4) 
			+ (0.09746009 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4) 
			- (0.01116796 * this.WB_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4) 
			+ (0.000138903 * this.WB_4 * this.WB_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4) 
			- (0.1354148 * this.Current_Range_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4) 
			+ (0.001004747 * this.WB_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4) 
			+ (0.0000119203 * this.WB_4 * this.WB_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4) 
			- (0.002255673 * this.Current_Range_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4)
			+ (0.0000192893 * this.WB_4 * this.Current_Range_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4) 
			+ (0.000000260086 * this.WB_4 * this.WB_4 * this.Current_Range_4 * this.Current_Range_4 * this.Tower_Flow_Factor_4 * this.Tower_Flow_Factor_4)
		), 1.5);
	
	//D829 Tree
	this.Tower_Approach_Fail_4 = (this.Tower_Approach_Normal_4 + this.Tower_Approach_Normal_4 + 35) / 2

	//D830 Tree
	this.ECdWT_VS_Fans = ((this.TowerFanFailing == 1) ? this.Tower_Approach_Fail_4 : this.Tower_Approach_Normal_4) + this.WB_4

	//D832 Tree
	this.Tower_KW = (this.Tower_Fan == "CS") ? this.CT_PL_KW_3 : this.CT_PL_KW_4

	//D833 Tree
	this.ECdWT = (this.Tower_Fan == "CS") ? this.ECdWT_CS_Fans : this.ECdWT_VS_Fans
	console.log("this.Tower_Fan", this.Tower_Fan)

	//D837 Tree
	this.CH1_Function_2 = this.CH1_Function

	//D841 Tree
	this.CH1_Cond_Flow_Rate_3 = (this.CH1_Function_2 == 1) ? this.Index_Valor_CF_CH1 : 0

	//D839 Tree
	this.CH1_ECdWT_2 = (this.CH1_Function_2 == 1) ? this.ECdWT + this.WSE_DeltaT : this.Entering_Cond_WT3

	//Heat WSE C195
	this.Set_Point_T1 = this.WSEHeat1.getSetPiontT1();

	///////////////////////////////////////////////////////////////////// BLUE SECTION (Evapotator return Round 2)  /////////////////////////////////////////////////////////////////////////////

	//D836 Tree
	this.CH1_Tons_2 = this.CH1_Tons

	//D840 Tree
	this.CH1_Evap_Flow_Rate_2 = this.Actual_Evap_Flow

	
	//D842 Tree
	this.CH1_Hot_Water_FR_2 = (this.CH1_Function_2 == 0) ? this.Hot_Water_FR3 : 0

	//D849 Tree
	this.CH2_Function_2 = this.CH2_Function

	//D844 Tree
	this.CH1_LCdWT_2 = ch1LCdWT2(this)

	//D848 Tree
	this.CH2_Tons_2 = this.CH2_Enabled_Capacity4


	//D850 Tree
	this.CH2_ECWT_2 = this.Return_CH_WT_After_WSE

	//D851 Tree
	this.CH2_ECdWT_2_Parallel = (this.CH2_Function_2 == 1) ? this.ECdWT + this.WSE_DeltaT : this.Entering_Cond_WT3

	//D852 Tree
	this.CH2_ECdWT_2_Series = ch2ECdWT2Series(this)

	//D853
	this.CH2_ECdWT_2 = (this.Piping == "SCF") ? this.CH2_ECdWT_2_Series : this.CH2_ECdWT_2_Parallel

	//D854 Tree
	this.CH2_Evap_Flow_Rate_2 = this.Actual_Evap_Flow_2

	//D855 Tree
	this.CH2_Cond_Flow_Rate_3 = (this.CH2_Function_2 == 1) ? this.Index_Valor_CF_CH2 : 0

	//D856 Tree
	this.CH2_Hot_Water_FR_2 = (this.CH2_Function_2 == 0) ? this.Hot_Water_FR3 : 0

	//D857 Tree
	this.CH2_LCWT_2 = (this.CH2_Evap_Flow_Rate_2 == 0) ? this.CH2_ECWT_2 : this.CH2_ECWT_2 - this.CH2_Tons_2 * 24 / this.CH2_Evap_Flow_Rate_2

	//D838 Tree
	this.CH1_ECWT_2 = (this.Piping == "SCF") ? this.CH2_LCWT_2 : this.Return_CH_WT_After_WSE

	//D843 Tree not aviable d838 =IF(D840=0;IF(D13="x";D857;D838);+D838-D836*24/D840)
	this.CH1_LCWT_2 = (this.CH1_Evap_Flow_Rate_2 == 0) ? 
		(this.Piping == "Parallel" ? CH2_LCWT_2 : this.CH1_ECWT_2) : 
		(this.CH1_ECWT_2 - this.CH1_Tons_2 * 24 / this.CH1_Evap_Flow_Rate_2)
 
	//D858 Tree
	this.CH2_LCdWT_2 = ch2LCdWT2(this)
	//isntane of chnews
	this.chNew = new ChillerNew
	(
		[this.CH1_Tons, this.CH1_Tons_2], 
		[ch1LCWT(this), this.CH1_LCWT_2], 
		[this.CH1_LCdWT, ch1LCdWT2(this)], 
		[this.CH2_Tons, this.CH2_Tons_2], 
		[this.CH2_LCWT, this.CH2_LCWT_2], 
		[this.CH2_LCdWT, this.CH2_LCdWT_2],
		[this.CH1Capacity, 0], [this.CH2Capacity, 0],
		this.chData.getChoosenChillerMap()
	);

	//D845 Tree TODO Input
	this.CH1_KWTon = this.chNew.getCH1kWTon()[1]
	console.log("CH1_KWTon", this.chNew.getCH1kWTon()[1]);
	
	//D846 Tree
	this.CH1_Heat_Rejection_CT = (this.CH1_Tons_2 + (this.CH1_KWTon * this.CH1_Tons_2) / 3.517) * this.CH1_Function_2

	//D847 Tree
	this.Heat_Rejection_HWL_2 = (this.CH1_Function_2 == 0) ? (this.CH1_Tons_2 + (this.CH1_KWTon * this.CH1_Tons_2) / 3.517) : 0

	//D859 Tree TODO Input
	this.CH2_KWTon = this.chNew.getCH2kWTon()[1]
	console.log("CH2_KWTon", this.CH2_KWTon)

	//D860 Tree
	this.CH2_Heat_Rejection_CT = (this.CH2_Tons_2 + (this.CH2_KWTon * this.CH2_Tons_2) / 3.517) * this.CH2_Function_2

	//D861 Tree
	this.Heat_Rejection_HWL_3 = (this.CH2_Function_2 == 0) ? (this.CH2_Tons_2 + (this.CH2_KWTon * this.CH2_Tons_2) / 3.517) : 0

	///////////////////////////////////////////////////////////////////// PINK SECTION (Round 2)  /////////////////////////////////////////////////////////////////////////////

	//D863 Tree
	this.Entering_HotWater_CH1 = (this.Scenario1_Test == 1) ? this.E_Condenser_WT : this.Entering_Cond_WT3

	//D866 Tree
	this.Leaving_Hot_Water_CH1 = leavingHotWaterCH1(this)
	

	//D864 Tree D866 Not aviable
	this.Entering_HotWater_CH2 = (this.Scenario1_Test == 1 && this.Piping == "SCF") ? this.Leaving_Hot_Water_CH1 : ((this.Scenario1_Test == 1) ? this.E_Condenser_WT : this.Entering_Cond_WT3)

	//D865
	this.Qty_of_Chillers_with_hot_flow = QtyofChillersWithHotFlow(this.CH1_Hot_Water_FR_2, this.CH2_Hot_Water_FR_2, this.Piping)

	//D867 Tree not aviable 864
	this.Leaving_Hot_Water_CH2 = leavingHotWaterCH2(this)
	
	//D868 Tree
	this.Chiller_Heat_Tons = chillerHeatTons(this)
	this.WSEHeat1.initHeatLoadTonsMinusChillerHeatTons(this.Chiller_Heat_Tons);
	this.WSEHeat1.initCostScenario1();
	this.WSEHeat1.initCostScenario2();

	//D869 Tree
	this.Boiler_Load = this.Heat_Load_Tons - this.Chiller_Heat_Tons

	//D871 Tree
	this.Return_CWT_Before_WSE = this.ECdWT

	//D872 Tree
	this.Return_CWT_After_WSE = ReturnCWTAfterWSE(this)

	console.log(JSON.stringify(this));
}


//D36 Tree
function largestChiller(objeto) {
	return (objeto.CH1Capacity > objeto.CH2Capacity) ? objeto.CH1Capacity : objeto.CH2Capacity
}

//D38 Tree
function isTowerFanFailing(objeto) {		
	return (objeto.TowerFan == "Fail") ? 1 : 0;
}

function calcCH_EPRatio(objeto) {
	if (objeto.QtyCHEnabledToEvap == 0)
		return 1
	else if (objeto.EvapPumpsEnabled == 0)
		return 1
	else
		return objeto.QtyCHEnabledToEvap / objeto.EvapPumpsEnabled
}

function calcCH_CPRatio(objeto) {
	if (objeto.QtyCHEnabledToEvap == 0)
		return 1
	else if (objeto.CPs_Enabled == 0)
		return 1
	else
		return objeto.QtyCHEnabledToEvap / objeto.CPs_Enabled
}

function CH1isAviableAsHeat(objeto) {
	if (objeto.Cool_Only_Scenary == "Cool Only")
		return 0
	else if (objeto.Evap_Pumps_Scenario_Dedic == "Dedic Evap")
		return objeto.CH1_EP1_Aviable
	else
		return Math.max(objeto.CH1_EP1_Aviable, objeto.CH2_EP2_Aviable)
}

function CH2isAviableAsHeat(objeto) {
	if (objeto.Cool_Only_Scenary == "Cool Only")
		return 0
	else if (objeto.Evap_Pumps_Scenario_Dedic == "Dedic Evap")
		return objeto.CH2_EP2_Aviable
	else
		return Math.max(objeto.CH1_EP1_Aviable, objeto.CH2_EP2_Aviable)
}

function condVariableFlow(objeto) {
	if (objeto.Load_Request / objeto.Design_Load > 0.49 && objeto.CPs_Enabled == 2)
		return objeto.Load_Request / objeto.Design_Load * objeto.Max_Cond_Flow_A
	else if (objeto.Load_Request / objeto.Design_Load < 0.49 && objeto.CPs_Enabled == 1)
		return objeto.Load_Request / objeto.Design_Load * objeto.Max_Cond_Flow_A
	else if (objeto.Load_Request / objeto.Design_Load < 0.49 && objeto.CPs_Enabled == 2)
		return objeto.Load_Request / objeto.Design_Load * objeto.Max_Cond_Flow_A
	else
		return objeto.Max_Cond_Flow_A
}

//perhaps this function could be optimizated
function evapVariableFlow(objeto) {
	if (objeto.Load_Request / objeto.Design_Load > 0.49 && objeto.EvapPumpsEnabled == 2)
		return objeto.Load_Request / objeto.Design_Load * objeto.Max_Evap_Flow_A
	else if (objeto.Load_Request / objeto.Design_Load < 0.49 && objeto.EvapPumpsEnabled == 1)
		return objeto.Load_Request / objeto.Design_Load * objeto.Max_Evap_Flow_A
	else if (objeto.Load_Request / objeto.Design_Load < 0.49 && objeto.EvapPumpsEnabled == 2)
		return objeto.Load_Request / objeto.Design_Load * objeto.Max_Evap_Flow_A
	else
		return objeto.Max_Evap_Flow_A
}

function maxEvapFirstCH1(objeto) {
	if (objeto.Piping == "SCF")
		return objeto.Evap_Flow_Estimated
	else if (objeto.Evap_Pumps_Scenario_Dedic == "Head Evap")
		return objeto.Evap_Flow_Estimated / 2
	else
		return objeto.Evap_Flow_Estimated * objeto.EP1Installed
}

function maxEvapSecondCH1(objeto) {
	if (maxEvapFirstCH1(objeto) < objeto.EvapMinFlowCH1)
		return objeto.EvapMinFlowCH1
	else if (objeto.Piping == "SCF")
		return objeto.Evap_Flow_Estimated
	else if (objeto.Evap_Pumps_Scenario_Dedic == "Head Evap")
		return objeto.Evap_Flow_Estimated / 2
	else
		return objeto.Evap_Flow_Estimated * objeto.EP1Installed
}

function maxEvapFirstCH2(objeto) {
	if (objeto.Piping == "SCF")
		return objeto.Evap_Flow_Estimated
	else if (objeto.Evap_Pumps_Scenario_Dedic == "Head Evap")
		return objeto.Evap_Flow_Estimated / 2
	else
		return objeto.Evap_Flow_Estimated * objeto.EP2Installed
}

function maxEvapSecondCH2(objeto) {
	if (maxEvapFirstCH2(objeto) < objeto.EvapMinFlowCH1)
		return objeto.EvapMinFlowCH1
	else if (objeto.Piping == "SCF")
		return objeto.Evap_Flow_Estimated
	else if (objeto.Evap_Pumps_Scenario_Dedic == "Head Evap")
		return objeto.Evap_Flow_Estimated / 2
	else
		return objeto.Evap_Flow_Estimated * objeto.EP2Installed
}

function condFlowRateCH(objeto) {
	if (objeto.Cond_Pumps_Scenario_CS == "CS Cond") {
		if (objeto.Piping == "SCF")
			return objeto.CP_Branch_Max_Flow
		else
			return objeto.CP_Branch_Max_Flow / 2
	}
	else
		return objeto.Cond_Flow
}

function qtyHRCHRequired(objeto) {
	if (objeto.HL_From_CH_WL < objeto.Largest_HR_CH_Avail)
		return 1
	else if (objeto.HL_From_CH_WL < (objeto.Largest_HR_CH_Avail + objeto.Other_HR_CH_Avail))
		return 2
	else
		return "Error"
}

function calWSE_Used(objeto) {
	if (objeto.Cooling_Load - objeto.HL_From_CH_WL > 0)
		if (objeto.Estimated_WSE_Tons > objeto.Cool_Load_After_Heat)
			return objeto.Cooling_Load - objeto.HL_From_CH_WL
		else
			return objeto.Estimated_WSE_Tons
	else
		return 0
}

function scenario1Test(objeto) {
	if (objeto.CH1_Aviable_Heat + objeto.CH2_Aviable_Heat == 2)
		if (objeto.MechCLoad_After_HRWSE > 0)
			return 0
		else
			return 1

	else
		return 0

}

function scenario2Test(objeto) {
	if (objeto.CH1_Aviable_Heat + objeto.CH2_Aviable_Heat > 0.9)
		if (objeto.Scenario1_Test == 1)
			return 0
		else if (objeto.CT_After_HRImpact > (-0.01))
			if (objeto.MechCLoad_After_HRWSE < (objeto.Largest_Cooling_CH + 0.01))
				return 1
			else
				return 0
		else
			return 0
	else
		return 0
}

function pickSmall(objeto) {
	if (Math.min(objeto.CH1_Meet_Ca, objeto.CH2_Meet_Ca) == 9999)
		return Math.max(objeto.CH1_Meet_Ca, objeto.CH2_Meet_Ca)
	else if (Math.min(objeto.CH1_Meet_Ca, objeto.CH2_Meet_Ca) > objeto.Cooling_Load_Req)
		return Math.min(objeto.CH1_Meet_Ca, objeto.CH2_Meet_Ca)
	else
		return 0
}

function ch1Selected(objeto) {
	if (objeto.Pick_Small == 0)
		return 0
	else if (objeto.Pick_Small == objeto.CH1_Meet_Ca)
		return 1
	else
		return 0
}

function ch2Selected(objeto) {
	if (objeto.CH1_Selected == objeto.Round_Counter)
		return 0
	else if (objeto.Pick_Small == 0)
		return 0
	else if (objeto.Pick_Small == objeto.CH2_Meet_Ca)
		return 1
	else
		return 0
}

function remainingLoad(objeto) {
	return objeto.BL_After_WSE - (objeto.CH1_Selected * objeto.CH1_Enabled_CH_Capacity + objeto.CH2_Selected * objeto.CH2_Enabled_CH_Capacity)
}

function remainingCapacityCH1(objeto) {
	if (objeto.Remaining_Load == 0)
		return 0
	else if (objeto.CH1_Selected == 1)
		return 0
	else
		return objeto.CH1_Enabled_CH_Capacity
}

function remainingCapacityCH2(objeto) {
	if (objeto.Remaining_Load == 0)
		return 0
	else if (objeto.CH2_Selected == 1)
		return 0
	else
		return objeto.CH2_Enabled_CH_Capacity
}

function pickSmallLarge(objeto) {
	if (Math.min(objeto.CH1_Meet_Capacity, objeto.CH2_Meet_Capacity) == 9999)
		return Math.max(objeto.Remaining_Capacity_CH1, objeto.Remaining_Capacity_CH2)
	else if (Math.min(objeto.CH1_Meet_Capacity, objeto.CH2_Meet_Capacity) > objeto.Remaining_Load)
		return Math.min(objeto.CH1_Meet_Capacity, objeto.CH2_Meet_Capacity)
	else
		return 0
}

function ch1SelectedRound(objeto) {
	if (objeto.Pick_Small_Large == 0)
		return 0
	else if (objeto.Pick_Small_Large == objeto.Remaining_Capacity_CH1)
		return 1
	else
		return 0
}

function ch2SelectedRound(objeto) {
	if (objeto.CH1_Selected_Round == objeto.Round_Counter2)
		return 0
	else if (objeto.Pick_Small_Large == 0)
		return 0
	else if (objeto.Pick_Small_Large == objeto.Remaining_Capacity_CH2)
		return 1
	else
		return 0
}

function hotWFDivider(objeto) {
	if (objeto.Qty_CH_On == 2)
		if (objeto.Piping == "SCF")
			return 1
		else
			return 2
	else
		return objeto.Qty_CH_On
}

function isCH1Heating(objeto) {
	if (objeto.CH1_Cool_CH2_Heat == 0)
		if (objeto.CH1_Heat_CH2_Cool == 1)
			return 1
		else
			return 0
	return 0
}

function CH1CoolingTons2(objeto) {
	if ((objeto.Cooling_Load2 - objeto.WSE_Used - objeto.CH2_Cooling_Tons2) < 0)
		return 0
	else
		return objeto.Cooling_Load2 - objeto.WSE_Used - objeto.CH2_Cooling_Tons2
}

function CH2CoolingTons(objeto) {
	if ((objeto.Cooling_Load2 - objeto.CH1_Cooling_Tons) < 0)
		return 0
	else if ((objeto.Cooling_Load2 - objeto.WSE_Used - objeto.CH1_Cooling_Tons) < 0)
		return 0
	else
		return (objeto.Cooling_Load2 - objeto.WSE_Used - objeto.CH1_Cooling_Tons)
}

//may be encapsulated in chiller.js Comprobation
function ch1EnableCapacity(objeto) {
	if (objeto.Evap_Pumps_Scenario_Dedic == "Dedic Evap")
		if (objeto.Cond_Pumps_Scenario_Dedic == "Dedic Cond")
			return objeto.CH1_Aviable_DE_DC
		else
			return objeto.CH1_Aviable_DE_HC
	else if (objeto.Cond_Pumps_Scenario_Dedic == "Dedic Cond")
		return objeto.CH1_Aviable_HE_DC
	else
		return objeto.CH1_Aviable_HE_HC
}

//may be encapsulated in chiller.js Comprobation
function ch2EnableCapacity(objeto) {
	if (objeto.Evap_Pumps_Scenario_Dedic == "Dedic Evap")
		if (objeto.Cond_Pumps_Scenario_Dedic == "Dedic Cond")
			return objeto.CH2_Aviable_DE_DC
		else
			return objeto.CH2_Aviable_DE_HC
	else if (objeto.Cond_Pumps_Scenario_Dedic == "Dedic Cond")
		return objeto.CH2_Aviable_HE_DC
	else
		return objeto.CH2_Aviable_HE_HC
}

function nominalCondFlow1(objeto) {
	if (objeto.Evap_Pumps == "Head Evap")
		return objeto.HE_EP1_Or_EP2
	else
		return objeto.Ded_Evap_EP1_On
}

function nominalCondFlow2(objeto) {
	if (objeto.Cond_Pumps_Scenario_Dedic == "Head Cond")
		return objeto.HC_CP1_Or_CP2
	else
		return objeto.Ded_Cond_CP1_On
}

function condAviableCH1(objeto) {
	if (objeto.Nominal_Cond_Flow == 0)
		return 0
	else if (objeto.Cond_Pumps_Scenario_CS == "VS Cond")
		return Math.max((objeto.Building_Load2 / objeto.Design_Load) * objeto.Nominal_Cond_Flow, objeto.CondMinFlowCH1)
	else
		return objeto.Nominal_Cond_Flow
}

function getCond_Aviable_CH1(objeto) {
	return objeto.Cond_Aviable_CH1
}

function nominalCondFlow21(objeto) {
	if (objeto.Evap_Pumps == "Head Evap")
		return objeto.HE_EP1_Or_EP2_On
	else
		return objeto.Ded_Evap_EP2_On
}

function nominalCondFlow22(objeto) {
	if (objeto.Cond_Pumps_Scenario_Dedic == "Head Cond")
		return objeto.HC_CP1_Or_CP2_On
	else
		return objeto.Ded_Cond_CP2_On
}

function condFlowAviableCH2(objeto) {
	if (objeto.Nominal_Cond_Flow2 == 0)
		return 0
	else if (objeto.Cond_Pumps_Scenario_CS == "VS Cond")
		return Math.max((objeto.Building_Load2 / objeto.Design_Load) * objeto.Nominal_Cond_Flow2, objeto.CondMinFlowCH2)
	else
		return objeto.Nominal_Cond_Flow2
}

function condFLowAviableCH1(objeto) {
	if (objeto.Nominal_Cond_Avail_CH1 == 0)
		return 0
	else if (objeto.Cond_Pumps_Scenario_CS == "VS Cond")
		return Math.max((objeto.Building_Load2 / objeto.Design_Load) * objeto.Nominal_Cond_Avail_CH1, objeto.CondMinFlowCH1)
	else
		return objeto.Nominal_Cond_Avail_CH1
}

//may be encapsulated in chiller.js
function condFLowAviableCH2(objeto) {
	if (objeto.Nominal_Cond_Avail_CH2 == 0)
		return 0
	else if (objeto.Cond_Pumps_Scenario_CS == "VS Cond")
		return Math.max((objeto.Building_Load2 / objeto.Design_Load) * objeto.Nominal_Cond_Avail_CH2, objeto.CondMinFlowCH2)
	else
		return objeto.Nominal_Cond_Avail_CH2
}

function condDeltaTCH12(objeto) {
	if (objeto.Piping == "SCF")
		return objeto.Cond_Flow_Aviable_CH1 * 2
	else
		return objeto.Cond_Flow_Aviable_CH1 + objeto.Cond_Flow_Aviable_CH2_2
}

function condDeltaTCH22(objeto) {
	if (objeto.Piping == "SCF")
		return objeto.Cond_Flow_Aviable_CH2_2 * 2
	else
		return objeto.Cond_Flow_Aviable_CH1 + objeto.Cond_Flow_Aviable_CH2_2
}

function numberCHRequired(objeto) {
	if (objeto.Cooling_Load_Req_WSE > Math.max(objeto.CH1_Enabled_CH_Capacity3, objeto.CH2_Enabled_CH_Capacity3))
		return 2
	else
		return 1
}

function pickSmall2(objeto) {
	if (Math.min(objeto.CH1_Meet_Capacity2, objeto.CH2_Meet_Capacity2) == 9999)
		return Math.max(objeto.CH1_Enabled_CH_Capacity3, objeto.CH2_Enabled_CH_Capacity3)
	else if (Math.min(objeto.CH1_Meet_Capacity2, objeto.CH2_Meet_Capacity2) > objeto.Cooling_Load_Req_WSE)
		return Math.min(objeto.CH1_Enabled_CH_Capacity3, objeto.CH2_Enabled_CH_Capacity3)
	else
		return 0
}

function ch1SelectedRound2(objeto) {
	if (objeto.Pick_Small2 == 0)
		return 0
	else if (objeto.Pick_Small2 == objeto.CH1_Enabled_CH_Capacity3)
		return 1
	else
		return 0
}

function ch2SelectedRound2(objeto) {
	if (objeto.CH1_Selected_Round2 == objeto.Round_Counter3)
		return 0
	else if (objeto.Pick_Small2 == 0)
		return 0
	else if (objeto.Pick_Small2 == objeto.CH2_Enabled_CH_Capacity3)
		return 1
	else
		return 0
}

//may be encapsulated in chiller.js
function remainingCapacityCH12(objeto) {
	if (objeto.Remaining_Load_3 == 0)
		return 0
	else if (objeto.CH1_Selected_Round2 == 1)
		return 0
	else
		return objeto.CH1_Enabled_CH_Capacity3
}

//may be encapsulated in chiller.js
function remainingCapacityCH22(objeto) {
	if (objeto.Remaining_Load_3 == 0)
		return 0
	else if (objeto.CH2_Selected_Round2 == 1)
		return 0
	else
		return objeto.CH2_Enabled_CH_Capacity3
}

function pickSmall3(objeto) {
	if (Math.min(objeto.CH1_Meet_Capacity3, objeto.CH2_Meet_Capacity3) == 9999)
		return Math.max(objeto.Remaining_Capacity_CH1_2, objeto.Remaining_Capacity_CH2_2)
	else if (Math.min(objeto.CH1_Meet_Capacity3, objeto.CH2_Meet_Capacity3) > objeto.Remaining_Load_3)
		return Math.min(objeto.CH1_Meet_Capacity3, objeto.CH2_Meet_Capacity3)
	else
		return 0
}

function ch1SelectedRound3(objeto) {
	if (objeto.Pick_Small3 == 0)
		return 0
	else if (objeto.Pick_Small3 == objeto.Remaining_Capacity_CH1_2)
		return 1
	else
		return 0
}

//same function for others selected round objeto.CH2
function ch2SelectedRound3(objeto) {
	if (objeto.CH1_Selected_Round3 == objeto.Round_Counter4)
		return 0
	else if (objeto.Pick_Small3 == 0)
		return 0
	else if (objeto.Pick_Small3 == objeto.Remaining_Capacity_CH2_2)
		return 1
	else
		return 0
}

function condenserWaterDivider(objeto) {
	if (objeto.Qty_CH_On_2 == 2)
		if (objeto.Piping == "SCF")
			return 1
		else
			return 2
	else
		return objeto.Qty_CH_On_2
}

function ch1CondDelta2(objeto) {
	if (objeto.Qty_CH_On_2 == 1)
		return objeto.Filtered_CH1_2 * objeto.Cond_DeltaT_CH1
	else
		return objeto.Filtered_CH1_2 * objeto.Cond_DeltaT_CH1_2
}

function ch2CondDelta2(objeto) {
	if (objeto.Qty_CH_On_2 == 1)
		return objeto.Filtered_CH2_2 * objeto.Cond_DeltaT_CH2
	else
		return objeto.Filtered_CH2_2 * objeto.Cond_DeltaT_CH2_2
}

function ch1EnabledCapacity4(objeto) {
	console.log(`ch1EnabledCapacity4
	objeto.Scenario1_Test ${objeto.Scenario1_Test}
	objeto.CH1_Operating_C ${objeto.CH1_Operating_C} esta mal 
	objeto.Scenario2_Test ${objeto.Scenario2_Test}
	objeto.CH1_Cooling_Tons3 ${objeto.CH1_Cooling_Tons3} esta mal 
	objeto.Scenario3 ${objeto.Scenario3}
	objeto.CH1_Operating_C2 ${objeto.CH1_Operating_C2}`)
	if (objeto.Scenario1_Test == 1)
		return objeto.CH1_Operating_C
	else if (objeto.Scenario2_Test == 1)
		return objeto.CH1_Cooling_Tons3
	else if (objeto.Scenario3 == 1)
		return objeto.CH1_Operating_C2
	else
		return "Error"
}

//may be encapsulated in chiller.js
function ch2EnabledCapacity4(objeto) {	
	if (objeto.Scenario1_Test == 1)
		return objeto.CH2_Operating_C
	else if (objeto.Scenario2_Test == 1)
		return objeto.CH2_Cooling_Tons3
	else if (objeto.Scenario3 == 1)
		return objeto.CH2_Operating_C2
	else
		return "Error"
}

function ch1EvapPumpable(objeto) {
	if ((objeto.EP1Enabled * objeto.EP1_Nominal_Flow + objeto.EP2Enabled * objeto.EP2_Nominal_Flow) / 2 > 0)
		return Math.max((objeto.EP1Enabled * objeto.EP1_Nominal_Flow + objeto.EP2Enabled * objeto.EP2_Nominal_Flow) / 2)
	else
		return objeto.EvapMinFlowCH1
}

function ep1CP1CH1Head(objeto) {
	if (objeto.CH1_Evap_Pumpable + objeto.CH2_Evap_Pumpable > 1)
		if (objeto.CH1_Cond_Pumpable2 + objeto.CH2_Cond_Pumpable2 > 1)
			return 1
		else
			return 0
	else
		return 0
}

//Resulting_Pumpable_Capacity_EP Tree Without Name
//
function Resulting_Pumpable_Capacity_EP(objeto) {
	if (objeto.Pump_Capacity_Auto_EP2 + objeto.Pump_Capacity_Auto_EP1 == 0)
		if (objeto.Economizer == "With WSE" && objeto.WSE_Used > 0)
			return objeto.Max_Evap_GPM
		else
			return objeto.Pump_Capacity_Auto_EP2 + objeto.Pump_Capacity_Auto_EP1
	else
		return objeto.Pump_Capacity_Auto_EP2 + objeto.Pump_Capacity_Auto_EP1
}

function evapMinFlowOneCH1(objeto) {
	if (objeto.Evap_Pump_Capacity > objeto.Evap_Min_Flow_CH1_Pa)
		if (objeto.Evap_Min_Flow_CH2_Pa > objeto.Evap_Min_Flow_CH1_Pa)
			return 0
		else
			return 1
	else
		return 0
}

function evapMinFlowOneCH2(objeto) {
	if (objeto.Evap_Min_Flow_One_CH1 == 1)
		return 0
	else if (objeto.Evap_Pump_Capacity > objeto.Evap_Min_Flow_CH2_Pa)
		if (objeto.Evap_Min_Flow_CH1_Pa < objeto.Evap_Min_Flow_CH2_Pa)
			return 0
		else
			return 1
	else
		return 0
}

function condMinFlowOneCH1Pa(objeto) {
	if (objeto.Total_Cond_Pumpable > objeto.Cond_Min_FLow_CH1_Pa)
		if (objeto.Cond_Min_FLow_CH2_Pa > objeto.Cond_Min_FLow_CH1_Pa)
			return 0
		else
			return 1
	else
		return 0
}

function condMinFlowOneCH2(objeto) {
	if (objeto.Cond_Min_Flow_One_CH1_Pa == 1)
		return 0
	else if (objeto.Total_Cond_Pumpable > objeto.Cond_Min_FLow_CH2_Pa)
		if (objeto.Cond_Min_FLow_CH1_Pa < objeto.Cond_Min_FLow_CH2_Pa)
			return 0
		else
			return 1
	else
		return 0
}

function evapMinFlowSCFCH1(objeto) {
	if (objeto.QtyCHEnabledToEvap == 0)
		return 0
	else if (objeto.QtyCHEnabledToEvap == 1)
		return objeto.Cross_Flow_Chk_CH1
	else if (objeto.QtyCHEnabledToEvap == 2)
		return objeto.Min_Flow_Chk_Header_CH1
	else
		return "Error"
}

function evapMinFlowSCFCH2(objeto) {
	if (objeto.QtyCHEnabledToEvap == 0)
		return 0
	else if (objeto.QtyCHEnabledToEvap == 1)
		return objeto.Cross_Flow_Chk_CH2
	else if (objeto.QtyCHEnabledToEvap == 2)
		return objeto.Min_Flow_Chk_Header_CH2
	else
		return "Error"
}

function condMinFlowSCFParCH1(objeto) {
	if (objeto.QtyCHEnabledToCond == 0)
		return 0
	else if (objeto.QtyCHEnabledToCond == 1)
		return objeto.Cross_Flow_Chk_CH1
	else if (objeto.QtyCHEnabledToCond == 2)
		return objeto.Min_Flow_Chk_Header_CH1_2
	else
		return "Error"
}

function condMinFlowSCFParCH2(objeto) {
	if (objeto.QtyCHEnabledToCond == 0)
		return 0
	else if (objeto.QtyCHEnabledToCond == 1)
		return objeto.Cross_Flow_Chk_CH2
	else if (objeto.QtyCHEnabledToCond == 2)
		return objeto.Min_Flow_Chk_Header_CH2_2
	else
		return "Error"
}

function flowCondSCFParCH1(objeto) {
	if (objeto.Piping == "SCF")
		if (objeto.Scenario1_Test == 0 && objeto.Scenario2_Test == 1)
			if (objeto.Is_CH1_Heating == 1)
				return 0
			else if (objeto.CH1_Cool_CH2_Heat == 1)
				return objeto.Enabled_Cond_Flow_Ded_CH1
			else
				return objeto.Enabled_Cond_Flow_Ded_CH1 + objeto.Enabled_Cond_Flow_Ded_CH1
		else if (objeto.CH_Load_WSE_Percent > 0.5)
			return objeto.Enabled_Cond_Flow_Ded_CH1 + objeto.Enabled_Cond_Flow_Ded_CH1
		else
			return objeto.Enabled_Cond_Flow_Ded_CH1
	else
		return objeto.Enabled_Cond_Flow_Ded_CH1
}

//different condition
function flowCondSCFParCH2(objeto) {
	if (objeto.Piping == "SCF")
		if (objeto.Scenario1_Test == 0 && objeto.Scenario2_Test == 1)
			if (objeto.Is_CH1_Heating == 0)
				return 0
			else if (objeto.CH1_Cool_CH2_Heat == 1)
				return objeto.Enabled_Cond_Flow_Ded_CH2
			else
				return objeto.Enabled_Cond_Flow_Ded_CH1 + objeto.Enabled_Cond_Flow_Ded_CH1
		else if (objeto.CH_Load_WSE_Percent > 0.5)
			return objeto.Enabled_Cond_Flow_Ded_CH1 + objeto.Enabled_Cond_Flow_Ded_CH1
		else
			return objeto.Enabled_Cond_Flow_Ded_CH2
	else
		return objeto.Enabled_Cond_Flow_Ded_CH2
}

function ResultingMaxPFCH1(objeto) {
	if (objeto.Piping == "Parallel")
		return objeto.Flow_Evap_SCF_Par_CH1
	else if (objeto.Piping == "Parallel")
		return objeto.Evap_Pump_Capacity / objeto.CH_EPRatio
	else
		return objeto.Enabled_Evap_Flow_Ded_CH1
}

function resultingMaxPFCH2(objeto) {
	if (objeto.Piping == "SCF")
		return objeto.Flow_Evap_SCF_Par_CH2
	else if (objeto.Piping == "SCF")
		return objeto.Evap_Pump_Capacity / objeto.CH_EPRatio
	else
		return objeto.Enabled_Evap_Flow_Ded_CH2
}

function evaporatorsOperableCH12(objeto) {
	if (objeto.Evap_Pumps == "Head Evap")
		return objeto.Evap_Min_Flow_SCF_CH1
	else if (objeto.Piping == "SCF")
		return objeto.Evap_Min_Flow_SCF_CH1
	else
		return objeto.Cross_CH_Evap_Chk
}

function evaporatorsOperableCH22(objeto) {
	if (objeto.Evap_Pumps == "Head Evap")
		return objeto.Evap_Min_Flow_SCF_CH2
	else if (objeto.Piping == "SCF")
		return objeto.Evap_Min_Flow_SCF_CH2
	else
		return objeto.Cross_CH_Evap_Chk
}

function resultingMaxPFCondenser(objeto) {
	if (objeto.Evap_Pumps == "Head Evap")
		return objeto.Flow_Cond_SCF_Par_CH1
	else if (objeto.Evap_Pumps == "Head Evap")
		return objeto.Cond_Pump_Capacity / objeto.CH_CP_Ratio
	else
		return objeto.Enabled_Cond_Flow_Ded_CH1
}

function condenserOperableCH1(objeto) {
	if (objeto.Evap_Pumps == "Head Evap")
		return objeto.Cond_Min_Flow_SCF_Par_CH1
	else if (objeto.Piping == "SCF")
		return objeto.Cond_Min_Flow_SCF_Par_CH1
	else
		return objeto.Cross_CH_Cond_Chk
}

function condenserOperableCH2(objeto) {
	if (objeto.Evap_Pumps == "Head Evap")
		return objeto.Cond_Min_Flow_SCF_Par_CH2
	else if (objeto.Piping == "SCF")
		return objeto.Cond_Min_Flow_SCF_Par_CH2
	else
		return objeto.Cross_CH_Cond_Chk
}

function vpfChkCH1(objeto) {
	if (objeto.Enable_Online_Capacity_CH1 == 0)
		return 0
	else if (objeto.Evap_Pumps_Scenario_CS == "VS Evap")
		return 1
	else
		return objeto.CH1_Enabled_Capacity4 / objeto.Enable_Online_Capacity_CH1
}

function vpfChkCH2(objeto) {
	if (objeto.Enable_Online_Capacity_CH2 == 0)
		return 0
	else if (objeto.Evap_Pumps_Scenario_CS == "VS Evap")
		return 1
	else
		return objeto.CH2_Enabled_Capacity4 / objeto.Enable_Online_Capacity_CH2
}

function evapFlowCSDedCH1(objeto) {
	if (objeto.EP1_Nominal_Flow * objeto.Pump_Capacity_Check_EP1 * objeto.Chiller_Operating_CH1 == 0)
		return 0
	else
		return Math.max(objeto.EP1_Nominal_Flow * objeto.Pump_Capacity_Check_EP1 * objeto.Chiller_Operating_CH1, objeto.WSE_On * objeto.Evap_Flow_Rate_Pot / objeto.Evaporators_WSE)
}

function calcuar_Evap_Flow_VS_Ded_CH1(objeto) {
	var temp = Math.max((objeto.Load_Percent_Capacity_2 * objeto.Pumpable_Capacity_Ded_CH1 * 2) / objeto.Total_CH_Operating, objeto.EvapMinFlowCH1) * objeto.Chiller_Operating_CH1;
	var temp2 = (objeto.Total_CH_Operating == 0) ? objeto.D49 * objeto.Chiller_Operating_CH1 : temp;
	var temp3 = (objeto.WSE_On * objeto.Evap_Flow_Rate_Pot) / objeto.Evaporators_WSE;
	var temp4 = Math.max(temp2, temp3);
	return (temp2 == 0) ? 0 : temp4;
}

function evapFlowCSHeadCH1(objeto) {
	if (Math.max(objeto.Branch_Enabled_EF / objeto.Branch_Enabled_CH, objeto.Evap_Min_Flow_CH1_Pa) * objeto.Chiller_Operating_CH1 == 0)
		return 0
	else
		return Math.max(Math.max(objeto.Branch_Enabled_EF / objeto.Branch_Enabled_CH, objeto.Evap_Min_Flow_CH1_Pa) * objeto.Chiller_Operating_CH1, (objeto.WSE_On * objeto.Evap_Flow_Rate_Pot / objeto.Evaporators_WSE))
}

function evapFlowVSHeadCH1(objeto) {
	if (objeto.Total_CH_Operating == 0)
		return 0
	else
		return Math.min(objeto.Total_Evap_Pumpable, Math.max(objeto.Load_Percent_Capacity_2 * objeto.EP_Branch_Max_Flow, objeto.EvapMinFlowCH1, objeto.Evap_Flow_Rate_Pot * objeto.WSE_On)) * objeto.Chiller_Operating_CH1 / objeto.Total_CH_Operating
}

function evapFlowCSSCFCH1(objeto) {
	if (objeto.L_Percent_Design > 0.51 && objeto.EvapPumpsEnabled < 2)
		return Resulting_Pumpable_Capacity_EP(objeto); //Var no name
	else
		return Math.max(Resulting_Pumpable_Capacity_EP(objeto), objeto.Evap_Min_Flow_Series, objeto.Evap_Flow_Rate_Pot)
}

function evapFlowVSSCFCH1(objeto) {
	if (objeto.L_Percent_Design > 0.5 && objeto.EvapPumpsEnabled < 2)
		return objeto.Total_Pumpable
	else
		return Math.max(objeto.L_Percent_Design * objeto.Total_Pumpable, objeto.Evap_Min_Flow_Series)
}

function evapFlowCSDedCH2(objeto) {
	if (objeto.EP2_Nominal_Flow * objeto.Pump_Capacity_Check_EP2 * objeto.Chiller_Operating_CH2 == 0)
		return 0
	else
		return Math.max(objeto.EP2_Nominal_Flow * objeto.Pump_Capacity_Check_EP2 * objeto.Chiller_Operating_CH2, objeto.WSE_On * objeto.Evap_Flow_Rate_Pot / objeto.Evaporators_WSE)
}

function evapFlowVSDedCH2Aux(objeto) {
	if (objeto.Total_CH_Operating == 0)
		return objeto.EvapMinFlowCH2 * objeto.Chiller_Operating_CH2
	else
		return Math.max(objeto.Load_Percent_Capacity_2 * objeto.Pumpable_Capacity_Ded_CH2 * 2 / objeto.Total_CH_Operating, objeto.EvapMinFlowCH2) * objeto.Chiller_Operating_CH2
}

function evapFlowVSDedCH2(objeto) {
	if (evapFlowVSDedCH2Aux(objeto) == 0)
		return 0
	else
		return Math.max(evapFlowVSDedCH2Aux(objeto), objeto.WSE_On * objeto.Evap_Flow_Rate_Pot / objeto.Evaporators_WSE)
}

function evapFlowCSHeadCH2(objeto) {
	if (Math.max(objeto.Branch_Enabled_EF / objeto.Branch_Enabled_CH, objeto.Evap_Min_Flow_CH2_Pa) * objeto.Chiller_Operating_CH2 == 0)
		return 0
	else
		return Math.max(Math.max(objeto.Branch_Enabled_EF / objeto.Branch_Enabled_CH, objeto.Evap_Min_Flow_CH2_Pa) * objeto.Chiller_Operating_CH2, (objeto.WSE_On * objeto.Evap_Flow_Rate_Pot / objeto.Evaporators_WSE))
}

function evapFlowVSHeadCH2(objeto) {
	if (objeto.Total_CH_Operating == 0)
		return 0
	else
		return Math.min(objeto.Total_Evap_Pumpable, Math.max(objeto.Load_Percent_Capacity_2 * objeto.EP_Branch_Max_Flow, objeto.EvapMinFlowCH2, objeto.Evap_Flow_Rate_Pot * objeto.WSE_On)) * objeto.Chiller_Operating_CH2 / objeto.Total_CH_Operating
}

//Extract a valor from an array using a index number
function indexOperation(ArraysOp, IndexOp) {
	return ArraysOp[IndexOp - 1]
}

function mixTemp(objeto) {	
	console.log(`
	mixTemp 
		objeto.Upstream_Temp_2 ${objeto.Upstream_Temp_2} //Esta mal
		objeto.Fail_Mix_Temp_Adj ${objeto.Fail_Mix_Temp_Adj} //Esta mal	

	`)
	if (objeto.Bypass_Flow == 0)
		return objeto.Upstream_Temp_2
	else if (objeto.Bypass_Flow < 0)
		return objeto.Design_ECWT + objeto.Fail_Mix_Temp_Adj
	else
		return Math.round(((objeto.Design_ECWT * objeto.VS_Second_Flow) + (objeto.Design_LCWT * objeto.Bypass_Flow)) / (objeto.VS_Second_Flow + objeto.Bypass_Flow))
		
}

function leavingTempCH2(objeto) {
	if (objeto.Actual_Evap_Flow_2 == 0)
		return objeto.Entering_Temp_CH2
	else
		return Math.round(objeto.Entering_Temp_CH2 - (objeto.Actual_Online_Capacity_CH2 * 24) / objeto.Actual_Evap_Flow_2)
}

function leavingTempCH1(objeto) {
	if (objeto.Actual_Evap_Flow == 0)
		return objeto.Entering_Temp_CH1
	else
		return Math.round(objeto.Entering_Temp_CH1 - (objeto.Actual_Online_Capacity_CH1 * 24) / objeto.Actual_Evap_Flow)
}

function returnCHWTBeforeWSE(objeto) {
	console.log(`
returnCHWTBeforeWSE
	objeto.Return_CH_WT_Before_WSE ${objeto.Return_CH_WT_Before_WSE} //Esta mal
	objeto.Entering_Temp_CH2 ${objeto.Entering_Temp_CH2} //Esta mal

	`)
	if (objeto.Actual_Evap_Flow_3 == 0)
		return objeto.Return_CH_WT_Before_WSE
	else
		return Math.round(objeto.Entering_Temp_CH2 - (objeto.WSE_Used * 24) / objeto.Actual_Evap_Flow_3)
}

function calcHead(objeto) {
	if (objeto.Evap_Pumps_Scenario_CS == "VS Evap")
		return ((objeto.Design_Primary_Head - objeto.Control_Fixed_Head) * Math.pow(objeto.Actual_Evap_Flow_3 / objeto.EP_Branch_Max_Flow, 2)) + objeto.Control_Fixed_Head
	else
		return objeto.Design_Primary_Head
}

function vpfChkCh12(objeto) {
	if (objeto.Enabled_Online_Capacity_CH1 == 0)
		return 0
	else if (objeto.Evap_Pumps_Scenario_CS == "VS Evap")
		return 1
	else
		return objeto.CH1_Enabled_Capacity4 / objeto.Enabled_Online_Capacity_CH1
}

function vpfChkCh22(objeto) {
	if (objeto.Enabled_Online_Capacity_CH2 == 0)
		return 0
	else if (objeto.Evap_Pumps_Scenario_CS == "VS Evap")
		return 1
	else
		return objeto.CH2_Enabled_Capacity4 / objeto.Enabled_Online_Capacity_CH2
}

function flowMultiplierParallel(objeto) {
	if (objeto.Load_Percent_Cond < 0.51 && objeto.Condensers < 2)
		return objeto.Load_Percent_Cond * 2
	else
		return objeto.Load_Percent_Cond
}

function condFlowCSDedicatedCH1(objeto) {
	if (condFlowCSDedicatedCH1Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowCSDedicatedCH1Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowCSDedicatedCH1Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return objeto.CP1_Nominal_Flow * objeto.Pump_Capacity_Check_CP1 * objeto.Chiller_Operating_CH1_2
	else if (objeto.Is_CH1_Heating == 0)
		return objeto.CP1_Nominal_Flow * objeto.Pump_Capacity_Check_CP1 * objeto.Chiller_Operating_CH1_2
	else
		return 0
}

function condFlowVSDedicatedCH1(objeto) {
	if (condFlowVSDedicatedCH1Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowVSDedicatedCH1Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowVSDedicatedCH1Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH1_Cond_Pumpable, objeto.CondMinFlowCH1) * objeto.Chiller_Operating_CH1_2
	else if (objeto.Is_CH1_Heating == 0)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH1_Cond_Pumpable, objeto.CondMinFlowCH1) * objeto.Chiller_Operating_CH1_2
	else
		return 0
}

function condFlowCSHeaderedCH1(objeto) {
	console.log(`condFlowCSHeaderedCH1 ${condFlowCSHeaderedCH1Aux(objeto)} 
	complemento ${objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj}`)
	if (condFlowCSHeaderedCH1Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowCSHeaderedCH1Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowCSHeaderedCH1Aux(objeto) {
	console.log(`objeto.Scenario1_Test ${objeto.Scenario1_Test}
	objeto.Scenario3 ${objeto.Scenario3}
	objeto.Is_CH1_Heating ${objeto.Is_CH1_Heating}
	objeto.Branch_Enabled_CF ${objeto.Branch_Enabled_CF} / objeto.Branch_Enabled_CH ${objeto.Branch_Enabled_CH}
	objeto.Cond_Min_FLow_CH1_Pa) * objeto.Chiller_Operating_CH1_2 ${ objeto.Cond_Min_FLow_CH1_Pa}
	objeto.Chiller_Operating_CH1_2 ${objeto.Chiller_Operating_CH1_2}`)


	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Branch_Enabled_CF / objeto.Branch_Enabled_CH, objeto.Cond_Min_FLow_CH1_Pa) * objeto.Chiller_Operating_CH1_2
	else if (objeto.Is_CH1_Heating == 0)
		return Math.max(objeto.Branch_Enabled_CF / objeto.Branch_Enabled_CH, objeto.Cond_Min_FLow_CH1_Pa) * objeto.Chiller_Operating_CH1_2
	else
		return 0
}

function condFlowVSHeaderedCH1(objeto) {
	if (condFlowVSHeaderedCH1Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowVSHeaderedCH1Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowVSHeaderedCH1Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH2_Cond_Pumpable, objeto.CondMinFlowCH1) * objeto.Chiller_Operating_CH1_2
	else if (objeto.Is_CH1_Heating == 0)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH1_Cond_Pumpable, objeto.CondMinFlowCH1) * objeto.Chiller_Operating_CH1_2
	else
		return 0
}

function condFlowCSSCFCH1(objeto) {
	if (condFlowCSSCFCH1Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowCSSCFCH1Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot)
}

function condFlowCSSCFCH1Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Flow_Cond_SCF_Par_CH1, objeto.Cond_Min_Flow_Series) * objeto.Chiller_Operating_CH1_2
	else if (objeto.Is_CH1_Heating == 0)
		return Math.max(objeto.Flow_Cond_SCF_Par_CH1, objeto.Cond_Min_Flow_Series) * objeto.Chiller_Operating_CH1_2
	else
		return 0
}

function condFlowVSSCFCH1(objeto) {
	if (condFlowVSSCFCH1Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowVSSCFCH1Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot)
}

function condFlowVSSCFCH1Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return objeto.Cond_Flow_CS_SCF_CH1_Aux_2
	else if (objeto.Is_CH1_Heating == 0)
		return objeto.Cond_Flow_CS_SCF_CH1_Aux_3
	else
		return 0
}


function condFlowCSDedicatedCH2(objeto) {
	if (condFlowCSDedicatedCH2Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowCSDedicatedCH2Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowCSDedicatedCH2Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return objeto.CP2_Nominal_Flow * objeto.Pump_Capacity_Check_CP2 * objeto.Chiller_Operating_CH2_2
	else if (objeto.Is_CH1_Heating == 1)
		return objeto.CP2_Nominal_Flow * objeto.Pump_Capacity_Check_CP2 * objeto.Chiller_Operating_CH2_2
	else
		return 0
}

function condFlowVSDedicatedCH2(objeto) {
	if (condFlowVSDedicatedCH2Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowVSDedicatedCH2Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowVSDedicatedCH2Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH2_Cond_Pumpable, objeto.CondMinFlowCH2) * objeto.Chiller_Operating_CH2_2
	else if (objeto.Is_CH1_Heating == 1)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH2_Cond_Pumpable, objeto.CondMinFlowCH2) * objeto.Chiller_Operating_CH2_2
	else
		return 0
}

function condFlowCSHeaderedCH2(objeto) {
	if (condFlowCSHeaderedCH2Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowCSHeaderedCH2Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowCSHeaderedCH2Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Branch_Enabled_CF / objeto.Branch_Enabled_CH, objeto.Cond_Min_FLow_CH2_Pa) * objeto.Chiller_Operating_CH2_2
	else if (objeto.Is_CH1_Heating == 1)
		return Math.max(objeto.Branch_Enabled_CF / objeto.Branch_Enabled_CH, objeto.Cond_Min_FLow_CH2_Pa) * objeto.Chiller_Operating_CH2_2
	else
		return 0
}

function condFlowVSHeaderedCH2(objeto) {
	if (condFlowVSHeaderedCH2Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowVSHeaderedCH2Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot / objeto.Condensers_WSE_Flow_Adj)
}

function condFlowVSHeaderedCH2Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH2_Cond_Pumpable, objeto.CondMinFlowCH2) * objeto.Chiller_Operating_CH2_2
	else if (objeto.Is_CH1_Heating == 1)
		return Math.max(objeto.Flow_Multiplier_Parallel * objeto.CH2_Cond_Pumpable, objeto.CondMinFlowCH2) * objeto.Chiller_Operating_CH2_2
	else
		return 0
}

function condFlowCSSCFCH2(objeto) {
	if (condFlowCSSCFCH2Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowCSSCFCH2Aux(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot)
}

function condFlowCSSCFCH2Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return Math.max(objeto.Flow_Cond_SCF_Par_CH2, objeto.Cond_Min_Flow_Series) * objeto.Chiller_Operating_CH2_2
	else if (objeto.Is_CH1_Heating == 1)
		return Math.max(objeto.Flow_Cond_SCF_Par_CH2, objeto.Cond_Min_Flow_Series) * objeto.Chiller_Operating_CH2_2
	else
		return 0
}

function condFlowVSSCFCH2(objeto) {
	if (condFlowVSSCFCH2Aux(objeto) == 0)
		return 0
	else
		return Math.max(condFlowVSSCFCH2Aux2(objeto), objeto.WSE_On * objeto.Cond_Flow_Rate_Pot)
}

function condFlowVSSCFCH2Aux(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return objeto.Cond_Flow_CS_SCF_CH2_Aux_2
	else if (objeto.Is_CH1_Heating == 1)
		return objeto.Cond_Flow_CS_SCF_CH2_Aux_3
	else
		return 0
}

function condFlowVSSCFCH2Aux2(objeto) {
	if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Scenario3 == 1)
		return objeto.Cond_Flow_CS_SCF_CH2_Aux_5
	else if (objeto.Is_CH1_Heating == 1)
		return objeto.Cond_Flow_CS_SCF_CH2_Aux_6
	else
		return 0
}


function condFlowVSSCFCH1CH2(objeto) {
	if (objeto.Scenario3 == 1)
		return Math.max((objeto.Cond_Flow_VS_SCF_CH2 + objeto.Cond_Flow_VS_SCF_CH1) / 2, objeto.Cond_Min_Flow_Series)
	else
		return Math.max(objeto.Cond_Flow_VS_SCF_CH2, objeto.Cond_Flow_VS_SCF_CH1)
}

function actualCondFlow(objeto) {
// console.log
// (`  ____--- actualCondFlow ---____
// 	Condensers ${objeto.Condensers} 
// 	WSE_Max_Cond_Flow ${objeto.WSE_Max_Cond_Flow} 
// 	Max_Cond_Flow ${objeto.Max_Cond_Flow}
// 	Index_Valor_CF_CH1_CH2 ${objeto.Index_Valor_CF_CH1_CH2}
// 	WSE_Used ${objeto.WSE_Used}
// 	Max_Cond_GPM ${objeto.Max_Cond_GPM}		
// `)
	if (objeto.Condensers == 0)
		return Math.min(objeto.WSE_Max_Cond_Flow, objeto.Max_Cond_Flow)
	else if (objeto.Index_Valor_CF_CH1_CH2 == 0)
		if (objeto.WSE_Used == 0)
			return 0
		else
			return objeto.Cond_Flow
	else
		return objeto.Index_Valor_CF_CH1_CH2
}

function WSEUsed(objeto) {
	if (objeto.Actual_Cond_Flow == 0)
		return 0
	else
		return objeto.WSE_Used * 24 / objeto.Actual_Cond_Flow
}

function wsePressureDrop(objeto) {
	if (objeto.WSE_Used > 0)
		return objeto.WSE_PD
	else
		return 0
}

function calcHead3(objeto) {	
	if (objeto.Cond_Pumps_Scenario_CS == "VS Cond")		
		return (objeto.Design_Primary_Head_2 - objeto.Control_FH) * Math.pow((objeto.Actual_Cond_Flow / objeto.CP_Branch_Max_Flow), 2) + objeto.Control_FH
	else
		return objeto.Design_Primary_Head_2
}

function ctLoad(objeto) {
	if (objeto.Scenario1_Test == 1)
		return objeto.Net_Coolin_TL
	else if (objeto.Scenario2_Test == 1)
		return objeto.Net_Coolin_TL3
	else if (objeto.Scenario3 == 1)
		return objeto.Head_Rejection_CT
	else
		return "Error"
}

function ch1Function(objeto) {
	if (objeto.Scenario3 == 1)
		return 1
	else if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Is_CH1_Heating == 1)
		return 0
	else
		return 1
}

//D786 Tree //TO DO test
function ch1LCWT(objeto) {
	console.log(`ch1LCWT
	objeto.CH1_ECWT ${objeto.CH1_ECWT}
	`)
	if (objeto.CH1_Evap_Flow_Rate == 0)
		return objeto.CH1_ECWT
	else
		return objeto.CH1_ECWT - objeto.CH1_Tons * 24 / objeto.CH1_Evap_Flow_Rate
}

function ch1LCdWT(objeto) {
	if (objeto.Scenario1_Test == 1)
		return objeto.CH1_Cond_Delta
	else if (objeto.Scenario2_Test == 1)
		if (objeto.CH1_Heat_CH2_Cool == 1)
			return objeto.CH1_Condenser_DT5
		else
			return objeto.CH1_Cond_Delta_2
	else
		return objeto.CH1_Cond_Delta_2
}

function heatRejectionHWL(objeto) {
	if (objeto.CH1_Function == 0)
		return objeto.CH1_Tons + (objeto.Preliminary_CH1_KWTons * objeto.CH1_Tons) / 3.517
	else
		return 0
}

function ch2Function(objeto) {
	if (objeto.Scenario3 == 1)
		return 1
	else if (objeto.Scenario1_Test == 1)
		return 0
	else if (objeto.Is_CH1_Heating == 1)
		return 1
	else
		return 0
}

function ch2ECdWTSeries(objeto) {
	if (objeto.CH2_Function == 1)
		if (objeto.CH1_Function == 1)
			return objeto.CH1_LCdWT
		else
			return objeto.Preliminary_ECdWT + objeto.WSE_DeltaT
	else if (objeto.CH1_Function == 0)
		return objeto.CH1_LCdWT
	else
		return objeto.Entering_Cond_WT3
}

function ch2ECdWT(objeto) {
	if (objeto.Piping == "SCF")
		if (objeto.Scenario1_Test == 1)
			return objeto.CH1_LCdWT
		else if (objeto.Scenario2_Test == 0)
			return objeto.CH1_LCdWT
		else if (objeto.Scenario2_Test == 1 && objeto.CH1_Heat_CH2_Cool == 1)
			return objeto.Entering_Cond_WT3
		else
			return objeto.CH1_LCdWT
	else if (objeto.CH1_Heat_CH2_Cool == 1)
		return objeto.Entering_Cond_WT3
	else
		return objeto.Preliminary_ECdWT + objeto.WSE_DeltaT
}

function CH2LCdWT(objeto) {
	console.log(`CH2LCdWT 
		objeto.CH2_Function ${objeto.CH2_Function}
		objeto.Set_Point_T1 ${objeto.Set_Point_T1}
		objeto.CH2_Cond_Delta ${objeto.CH2_Cond_Delta}
		objeto.CH2_ECdWT ${objeto.CH2_ECdWT}
		objeto.Scenario2_Test ${objeto.Scenario2_Test}
		objeto.CH1_Heat_CH2_Cool ${objeto.CH1_Heat_CH2_Cool}
		objeto.CH2_Condenser_DT5 ${objeto.CH2_Condenser_DT5}
		objeto.CH2_Cond_Delta_2 ${objeto.CH2_Cond_Delta_2}

	`)
	if (objeto.CH2_Function == 0)
		return objeto.Set_Point_T1
	else if (objeto.Scenario1_Test == 1)
		return objeto.CH2_Cond_Delta + objeto.CH2_ECdWT;
	else if (objeto.Scenario2_Test == 1)
		if (objeto.CH1_Heat_CH2_Cool == 1)
			return objeto.CH2_Condenser_DT5 + objeto.CH2_ECdWT; //------------------------------------ Falta arreglar este -------------------------------------------------
		else
			return objeto.CH2_Cond_Delta_2 + objeto.CH2_ECdWT;
	else
		return objeto.CH2_Cond_Delta_2 + objeto.CH2_ECdWT;
}

function ch1LCdWT2(objeto) {
	console.log(`ch1LCdWT2 
	objeto.CH1_Function_2 ${objeto.CH1_Function_2}
	objeto.CH1_Cond_Flow_Rate_3 ${objeto.CH1_Cond_Flow_Rate_3}
	objeto.CH1_ECdWT_2 ${objeto.CH1_ECdWT_2}
	objeto.Preliminary_CH1_HR_CT ${objeto.Preliminary_CH1_HR_CT} esta mal 492
	objeto.ECdWT_VS_Fans ${objeto.ECdWT_VS_Fans}
	objeto.Heat_Rejection_Hot_Water ${objeto.Heat_Rejection_Hot_Water} esta mal 293
	objeto.CH2_Function_2 ${objeto.CH2_Function_2}
	objeto.CH1_Hot_Water_FR_2 ${objeto.CH1_Hot_Water_FR_2}
	objeto.Heat_Rejection_HWL ${objeto.Heat_Rejection_HWL}
	`)
	if (objeto.CH1_Function_2 == 1)
		if (objeto.CH1_Cond_Flow_Rate_3 == 0)
			return objeto.CH1_ECdWT_2
		else
			return objeto.CH1_ECdWT_2 + objeto.Preliminary_CH1_HR_CT * 24 / objeto.CH1_Cond_Flow_Rate_3
	else if (objeto.CH1_Hot_Water_FR_2 == 0)
		return objeto.CH1_ECdWT_2
	else if (objeto.piping == "Parallel")
		return objeto.CH1_ECdWT_2 + 
			(objeto.Preliminary_CH1_HR_CT * (1 - objeto.ECdWT_VS_Fans) + objeto.Heat_Rejection_Hot_Water * (1 - objeto.CH2_Function_2))
			* 24 / objeto.CH1_Hot_Water_FR_2;
	else
		return objeto.CH1_ECdWT_2 + objeto.Heat_Rejection_HWL * 24 / objeto.CH1_Hot_Water_FR_2
}

function ch2ECdWT2Series(objeto) {
	if (objeto.CH2_Function_2 == 1)
		if (objeto.CH1_Function_2 == 1)
			return objeto.CH1_LCdWT_2
		else
			return objeto.ECdWT + objeto.WSE_DeltaT
	else if (objeto.CH1_Function_2 == 0)
		return objeto.CH1_LCdWT_2
	else
		return objeto.Entering_Cond_WT3
}

function ch2LCdWT2(objeto) {
	if (objeto.CH2_Function_2 == 1)
		if (objeto.CH2_Cond_Flow_Rate_3 == 0)
			return objeto.CH2_ECdWT_2
		else
			return objeto.CH2_ECdWT_2 + objeto.Preliminay_CH2_HR_CT * 24 / objeto.CH2_Cond_Flow_Rate_3
	else if (objeto.CH2_Hot_Water_FR_2 == 0)
		return objeto.CH2_ECdWT_2
	else if (objeto.piping == "Parallel")
		return objeto.CH2_ECdWT_2 
		+ (objeto.Heat_Rejection_HWL * (1 - objeto.CH1_Function_2) + objeto.Heat_Rejection_Hot_Water * (1 - objeto.CH2_Function_2)) 
		* 24 / objeto.CH2_Hot_Water_FR_2
	else
		return objeto.CH2_ECdWT_2 + objeto.Heat_Rejection_Hot_Water * 24 / objeto.CH2_Hot_Water_FR_2
}

function leavingHotWaterCH1(objeto) {

	if (objeto.Scenario1_Test == 1)
		return objeto.LCondenser_WTCH1
	else if (objeto.Scenario2_Test == 1)
		if (objeto.CH1_Heat_CH2_Cool == 1)
			return objeto.CH1_LCdWT_2
		else
			return objeto.Entering_HotWater_CH1
	else	
		return objeto.Entering_HotWater_CH1
}

function leavingHotWaterCH2(objeto) {

	if (objeto.Scenario1_Test == 1)
		return objeto.LCondenser_WTCH2
	else if (objeto.Scenario2_Test == 1)
		if (objeto.CH1_Cool_CH2_Heat == 1)
			return objeto.CH2_LCdWT_2
		else
			return objeto.Entering_HotWater_CH2
	else		
		return objeto.Entering_HotWater_CH2
}

function chillerHeatTons(objeto) {
	if (objeto.Scenario1_Test == 1)
		return (((objeto.Leaving_Hot_Water_CH1 - objeto.Entering_HotWater_CH1) * objeto.CH1_Hot_Water_FR_2) / 24 
		+ ((objeto.Leaving_Hot_Water_CH2 - objeto.Entering_HotWater_CH2) * objeto.CH2_Hot_Water_FR_2) / 24)
		/ (objeto.Qty_of_Chillers_with_hot_flow == 0) ? 1 : objeto.Qty_of_Chillers_with_hot_flow;
	else if (objeto.Is_CH1_Heating == 1)
		return ((objeto.Leaving_Hot_Water_CH1 - objeto.Entering_HotWater_CH1) * objeto.CH1_Hot_Water_FR_2) / 24
	else		
		return ((objeto.Leaving_Hot_Water_CH2 - objeto.Entering_HotWater_CH2) * objeto.CH2_Hot_Water_FR_2) / 24
		
}

function ReturnCWTAfterWSE(objeto) {
	if (objeto.Actual_Cond_Flow == 0)
		return 0
	else
		return objeto.Return_CWT_Before_WSE + objeto.WSE_Used * 24 / objeto.Actual_Cond_Flow
}

// NI842, NI856, NI14
function QtyofChillersWithHotFlow(CH1_Hot_Water_FR_2, CH2_Hot_Water_FR_2, Piping)
{
	if(CH1_Hot_Water_FR_2 > 0 && CH2_Hot_Water_FR_2 > 0)
		if(Piping == "SCF")
			return 1;
		else
			return 2
	else 
		return (CH1_Hot_Water_FR_2 > 0) + (CH2_Hot_Water_FR_2 > 0)
}

module.exports = TreeMain;