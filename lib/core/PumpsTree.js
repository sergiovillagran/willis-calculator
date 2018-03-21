//--------------------------------Variables-------------------------------

//On the table
var TowerFailed = 0; //D10 - Tree 38
var TowerApproach = 60; //D11 - Tree 143
var CondFlow = 0; //D12 - Tree 22
var CH1MinCondGPM = 600; //D13 - Tree 42
var CH1NomGPM = 1500; //D14 - Tree 100
var CH1COndFlowGPM = 3000; //D15 - Tree 174
var CH1NomTons = 500; //D16 - Tree 30
var MaxCondFlow = 3000; //D17 - Tree 104
var CH2MinCondGPM = 500; //D18 - Tree 43
var CH2NomGPM = 1500; //D19 - Tree 101
var CH2COndFlowGPM = 3000; //D20 - Tree 175
var CH2NomTons = 500; //D21 - Tree 31
var CH1EvapGPM = 1800; //D22 - Tree 167
var CH2EvapGPM = 1800; //D23 - Tree 167

//Not on the table
var PumpFlow; //F1 - Tree
var DesignRange; //F2 - (GUT T7 - GUT T6
var TreeSCF; //Tree D14 ------------Revisar
var TreeHeatRecoveryTonsPossible; //Tree
var DesignLCWT; //J26 - GUT
var GUTECWT; //GUT
var GUTLCWT; //GUT
var GUTTowerFan; //GUT
var Range; //F22 - GUT
var TreeCapacity; //Tree
var GUTCH1Capacity_pt; //GUT
var TreeVSCond; //Tree
var CondMinFlowReqCH1; //Tree
var CondMinFlowReqCH2; //Tree
var CP1NominalFLow; //Tree
var CP2NominalFLow; //Tree
var CH1CondFlowRate; //Tree
var CH2CondFlowRate; //Tree
var Load_pt; //
var Pump;
var CH1;
var CH2;

var TMTowelFlowFactor = 0.9750; //
var BranchMaxFlow = 2400; //
var WetBulb = 60; //

//Variables of
var Chiller1Map = new Array();
var Chiller1MapAbove = new Array();
var Chiller1MapBelow = new Array();
var FlowFactorCH1 =new Array(); //Q8 - Z8
var FlowFactorCH2 =new Array(); //AQ8 - AZ8
var SCF; //F3
var EvapRange; //F4
var DesignDeltaT; //F6
var ECWT_pt; //F5
var LCWT_pt; //F26
var LCdWT = 50; //F29
var Ld = 10; //E30
var Temperatures = [38, 40, 42, 44, 48, 50, 60, 98, 99]; //A30:A38
var D30; //D30
var D31; //D31
var H42; //H42
var H55; //H55
var CH1Load = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100, 100, 100, 100, 100, 100] //G6:G21
var CH2Load = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100, 100, 100, 100, 100, 100] //AG6:AG21
var CH1Capacity_pt = new Array(); //H6:H21
var CH2Capacity_pt = new Array(); //AH6:AH21
var EDeltaT = new Array(); //I6:I21
var CH1Ld = new Array(10); //Q5:Z5
var CH2Ld = new Array(10); //Q5:Z5
var FlowCH1 = new Array(10); //Q6:Z6
var FlowCH2 = new Array(10); //AQ6:AZ6
var FailECdWTCH1 = new Array(10); //Q13 - Z13
var FailECdWTCH2 = new Array(10); //AQ13 - AZ13
var FailLCdWTCH1 = new Array(10); //Q14 - Z14
var FailLCdWTCH2 = new Array(10); //AQ14 - AZ14
var TestResults; //R19
var RangeCH1 = new Array(10); //Q7:Z7
var RangeCH2 = new Array(10); //AQ7:AZ7
var ApproachCH1 = new Array(10); //Q9:Z9
var ApproachCH2 = new Array(10); //AQ9:AZ9
var ECdWTCH1 = new Array(10); //Q10:Z10
var ECdWTCH2 = new Array(10); //AQ10:AZ10
var LCdWTCH1 = new Array(10); //Q11:Z11
var LCdWTCH2 = new Array(10); //AQ11:AZ11
var LogicalLCdWTCH1 = new Array(); //M6 - M21
var LogicalLCdWTCH2 = new Array(); //AM6 - AM21
var IndicatorCH1 = new Array(); //O6 - O21
var IndicatorCH2 = new Array(); //AO6 - AO21

//Variable that has to be find on other page
var CHDataLastValorColumn = 130;

//Outputs
var MaxLdCH1; //P9
var MaxLdCH2; //AP9

var PumpsTree = function(TowerFailed, TowerApproach, CondFlow, CH1MinCondGPM, CH1NomGPM, CH1COndFlowGPM, CH1NomTons, MaxCondFlow, CH2MinCondGPM, CH2NomGPM, CH2COndFlowGPM, CH2NomTons, CH1EvapGPM, CH2EvapGPM, PumpFlow, DesignRange, TreeSCF, TreeHeatRecoveryTonsPossible, DesignLCWT, GUTECWT, GUTLCWT, GUTTowerFan, Range, TreeCapacity, GUTCH1Capacity_pt, TreeVSCond, CondMinFlowReqCH1, CondMinFlowReqCH2, CP1NominalFLow, CP2NominalFLow, CH1CondFlowRate, CH2CondFlowRate, Load_pt, Pump, CH1, CH2, TMTowelFlowFactor, BranchMaxFlow, WetBulb){

this.TowerFailed = TowerFailed;
this.TowerApproach = TowerApproach;
this.CondFlow = CondFlow;
this.CH1MinCondGPM = CH1MinCondGPM;
this.CH1NomGPM = CH1NomGPM;
this.CH1COndFlowGPM = CH1COndFlowGPM;
this.CH1NomTons = CH1NomTons;
this.MaxCondFlow = MaxCondFlow;
this.CH2MinCondGPM = CH2MinCondGPM;
this.CH2NomGPM = CH2NomGPM;
this.CH2COndFlowGPM = CH2COndFlowGPM;
this.CH2NomTons = CH2NomTons;
this.CH1EvapGPM = CH1EvapGPM;
this.CH2EvapGPM = CH2EvapGPM;
this.PumpFlow = PumpFlow;
this.DesignRange = DesignRange;
this.TreeSCF = TreeSCF;
this.TreeHeatRecoveryTonsPossible = TreeHeatRecoveryTonsPossible;
this.DesignLCWT = DesignLCWT;
this.GUTECWT = GUTECWT;
this.GUTLCWT = GUTLCWT;
this.GUTTowerFan = GUTTowerFan;
this.Range = Range;
this.TreeCapacity = TreeCapacity;
this.GUTCH1Capacity_pt = GUTCH1Capacity_pt;
this.TreeVSCond = TreeVSCond;
this.CondMinFlowReqCH1 = CondMinFlowReqCH1;
this.CondMinFlowReqCH2 = CondMinFlowReqCH2;
this.CP1NominalFLow = CP1NominalFLow;
this.CP2NominalFLow = CP2NominalFLow;
this.CH1CondFlowRate = CH1CondFlowRate;
this.CH2CondFlowRate = CH2CondFlowRate;
this.Load_pt = Load_pt;
this.Pump = Pump;
this.CH1 = CH1;
this.CH2 = CH2;
this.TMTowelFlowFactor = TMTowelFlowFactor;
this.BranchMaxFlow = BranchMaxFlow;
this.WetBulb = WetBulb;

	this.initSCF();
  this.initEvapRange();
  this.initDesignDeltaT();
  this.initDesignDeltaT();
  this.initLCWT_pt();
  this.initD30H42();
  this.initD31H55();
  this.initCH1Capacity_pt();
  this.initCH2Capacity();
  this.initEDeltaT();
  this.initCH1Ld();
  this.initCH2Ld();
  this.initTestResults();
  this.initFlowCH1();
  this.initFlowCH2();
  this.initRangeCH1();
  this.initRangeCH2();
  this.initFlowFactorCH1();
  this.initFlowFactorCH2();
  this.initApproachCH1();
  this.initApproachCH2();
  this.initECdWTCH1();
  this.initECdWTCH2();
  this.initLCdWTCH1();
  this.initLCdWTCH2();
  this.initFailECdWTCH1();
  this.initFailECdWTCH2();
  this.initFailLCdWTCH1();
  this.initFailLCdWTCH2();
  this.initLogicalLCdWTCH1();
  this.initLogicalLCdWTCH2();
  this.initIndicatorCH1();
  this.initIndicatorCH2();
  this.initMaxLdCH1();
  this.initMaxLdCH2();

}

//--------------------------------Functiones-------------------------------
//PumpsTree.prototype.used to defined the SCF variable
PumpsTree.prototype.initSCF = function() {
  if (TreeSCF == "x") {
    if (TreeHeatRecoveryTonsPossible > 1) {
      SCF = DesignRange / 2;
    } else {
      SCF = DesignRange;
    }
  } else {
    SCF = DesignRange;
  }
}

//PumpsTree.prototype.used to defined the EvapRange variable
PumpsTree.prototype.initEvapRange = function() {
  EvapRange = SCF;
}

//PumpsTree.prototype.used to defined the DesignDeltaT variable
PumpsTree.prototype.initDesignDeltaT = function() {
  if (TreeSCF == "x") {
    DesignDeltaT = ((GUTLCWT - GUTECWT) / 2);
  } else {
    DesignDeltaT = (GUTLCWT - GUTECWT);
  }
}

PumpsTree.prototype.initDesignDeltaT = function() {
  ECWT_pt = DesignLCWT + DesignDeltaT;
}

//PumpsTree.prototype.used to find the LCWT_pt variable
PumpsTree.prototype.initLCWT_pt = function() {
  if (GUTTowerFan == "Fail") {
    LCWT_pt = GUTLCWT;
  } else {
    LCWT_pt = DesignLCWT;
  }
}

//PumpsTree.prototype.used to find the D30 and H42 variables
PumpsTree.prototype.initD30H42 = function() {
  for (var temp = 0; temp < Temperatures.length; temp++) {
    if (Temperatures[temp] == LCWT_pt) {
      D30 = Temperatures[temp];
      H42 = temp;
    }
  }
}

//PumpsTree.prototype.used to find the D31 and H55 variables
PumpsTree.prototype.initD31H55 = function() {
  if ((H42 + 1) > 7) {
    H55 = 7;
  } else {
    H55 = (H42 + 1);
  }
  D31 = Temperatures[H55];
}

//PumpsTree.prototype.used to find the CH1Capacity_pt vector
PumpsTree.prototype.initCH1Capacity_pt = function() {
  for (var temp = 0; temp < CH1Load.length; temp++) {
    CH1Capacity_pt[temp] = ((CH1Load[temp] * TreeCapacity) / 100);
  }
}

//PumpsTree.prototype.used to find the CH2Capacity_pt vector
PumpsTree.prototype.initCH2Capacity = function() {
  for (var temp = 0; temp < CH2Load.length; temp++) {
    CH2Capacity_pt[temp] = ((CH2Load[temp] * TreeCapacity) / 100);
  }
}

//PumpsTree.prototype.used to find the EDeltaT vector
PumpsTree.prototype.initEDeltaT = function() {
  for (var temp = 0; temp < CH1Load.length; temp++) {
    if (PumpFlow == 0) {
      EDeltaT[temp] = 0;
    } else {
      EDeltaT[temp] = (CH1Capacity_pt[temp] * 24 / PumpFlow);
    }
  }
}

//PumpsTree.prototype.used to find the Ch1Ld vector
PumpsTree.prototype.initCH1Ld = function() {
  for (var temp = 0; temp < 10; temp++) {
    CH1Ld[temp] = ((temp + 1) / 10);
  }
}

//PumpsTree.prototype.used to find the CH2Ld vector
PumpsTree.prototype.initCH2Ld = function() {
  for (var temp = 0; temp < 10; temp++) {
    CH2Ld[temp] = ((temp + 1) / 10);
  }
}

//PumpsTree.prototype.used to find the TestResults variable
PumpsTree.prototype.initTestResults = function() {
  if ((Load_pt > 0.5) && (Pump < 1)) {
    TestResults = 1;
  } else {
    TestResults = 0;
  }
}

//PumpsTree.prototype.used to find the Flow vector
PumpsTree.prototype.initFlowCH1 = function() {
  for (var temp = 0; temp < 10; temp++) {
    if (TestResults == 1) {
      FlowCH1[temp] = CH1CondFlowRate;

    } else if (TreeVSCond == "x") {
      if ((Math.max(CondMinFlowReqCH1, CH1Ld[temp] * CP1NominalFLow)) > CH1CondFlowRate) {

        FlowCH1[temp] = CH1CondFlowRate;

      } else {
        FlowCH1[temp] = Math.max(CondMinFlowReqCH1, CH1Ld[temp] * CP1NominalFLow);
      }
    } else {
      FlowCH1[temp] = CH1CondFlowRate;


    }
  }

}

//PumpsTree.prototype.used to find the Flow vector
PumpsTree.prototype.initFlowCH2 = function() {
  for (var temp = 0; temp < 10; temp++) {
    if (TestResults == 1) {
      FlowCH2[temp] = CH2CondFlowRate;

    } else if (TreeVSCond == "x") {
      if ((Math.max(CondMinFlowReqCH2, CH2Ld[temp] * CP2NominalFLow)) > CH2CondFlowRate) {

        FlowCH2[temp] = CH2CondFlowRate;
      } else {
        FlowCH2[temp] = Math.max(CondMinFlowReqCH2, CH2Ld[temp] * CP2NominalFLow);
      }

    } else {

      FlowCH2[temp] = CH1CondFlowRate;
    }
  }
}

//PumpsTree.prototype.used to find the Range vector
PumpsTree.prototype.initRangeCH1 = function() {
  for (var temp = 0; temp < 10; temp++) {
    RangeCH1[temp] = ((CH1Ld[temp] * CH1 * 1.2 * 24) / FlowCH1[temp]);
  }
}

//PumpsTree.prototype.used to find the Range vector
PumpsTree.prototype.initRangeCH2 = function() {
  for (var temp = 0; temp < 10; temp++) {
    RangeCH2[temp] = ((CH2Ld[temp] * CH2 * 1.2 * 24) / FlowCH2[temp]);
  }
}

//PumpsTree.prototype.used to find the FlowFactorCH1 vector
PumpsTree.prototype.initFlowFactorCH1 = function() {
  for (var temp = 0; temp < 10; temp++) {
    FlowFactorCH1[temp] = (TMTowelFlowFactor * (FlowCH1[temp] / BranchMaxFlow));
  }
}

//PumpsTree.prototype.used to find the FlowFactorCH2 vector
PumpsTree.prototype.initFlowFactorCH2 = function() {
  for (var temp = 0; temp < 10; temp++) {
    FlowFactorCH2[temp] = (TMTowelFlowFactor * (FlowCH2[temp] / BranchMaxFlow));
  }
}

//PumpsTree.prototype.used to find the ApproachCH1 vector
PumpsTree.prototype.initApproachCH1 = function() {
  for (var temp = 0; temp < 10; temp++) {
    ApproachCH1 = ((2.471006) - (0.1398551 * WetBulb) + (0.001325024 * WetBulb * WetBulb) + (0.7687214 * RangeCH1[temp]) - (0.02337056 * WetBulb * RangeCH1[temp]) + (0.000149476 * WetBulb * WetBulb * RangeCH1[temp]) - (0.01116139 * RangeCH1[temp] * RangeCH1[temp]) + (0.000325406 * WetBulb * RangeCH1[temp] * RangeCH1[temp]) - (0.00000230183 * WetBulb * WetBulb * RangeCH1[temp] * RangeCH1[temp]) + (9.852804 * FlowFactorCH1[temp]) - (0.1736736 * WetBulb * FlowFactorCH1[temp]) + (0.000811069 * WetBulb * WetBulb * FlowFactorCH1[temp]) + (1.74992 * RangeCH1[temp] * FlowFactorCH1[temp]) + (0.004930143 * WetBulb * RangeCH1[temp] * FlowFactorCH1[temp]) - (0.00022193 * WetBulb * WetBulb * RangeCH1[temp] * FlowFactorCH1[temp]) - (0.009865402 * RangeCH1[temp] * RangeCH1[temp] * FlowFactorCH1[temp]) - (0.000283361 * WetBulb * RangeCH1[temp] * RangeCH1[temp] * FlowFactorCH1[temp]) + (0.00000466261 * WetBulb * WetBulb * RangeCH1[temp] * RangeCH1[temp] * FlowFactorCH1[temp]) + (0.09746009 * FlowFactorCH1[temp] * FlowFactorCH1[temp]) - (0.01116796 * WetBulb * FlowFactorCH1[temp] * FlowFactorCH1[temp]) + (0.000138903 * WetBulb * WetBulb * FlowFactorCH1[temp] * FlowFactorCH1[temp]) - (0.1354148 * RangeCH1[temp] * FlowFactorCH1[temp] * FlowFactorCH1[temp]) + (0.001004747 * WetBulb * RangeCH1[temp] * FlowFactorCH1[temp] * FlowFactorCH1[temp]) + (0.0000119203 * WetBulb * WetBulb * RangeCH1[temp] * FlowFactorCH1[temp] * FlowFactorCH1[temp]) - (0.00255673 * RangeCH1[temp] * RangeCH1[temp] * FlowFactorCH1[temp] * FlowFactorCH1[temp]) + (0.0000119203 * WetBulb * RangeCH1[temp] * RangeCH1[temp] * FlowFactorCH1[temp] * FlowFactorCH1[temp]) + (0.000000260086 * WetBulb * WetBulb * RangeCH1[temp] * RangeCH1[temp] * FlowFactorCH1[temp] * FlowFactorCH1[temp]));
  }
}

//PumpsTree.prototype.used to find the ApproachCH1 vector
PumpsTree.prototype.initApproachCH2 = function() {
  for (var temp = 0; temp < 10; temp++) {
    ApproachCH2 = ((2.471006) - (0.1398551 * WetBulb) + (0.001325024 * WetBulb * WetBulb) + (0.7687214 * RangeCH2[temp]) - (0.02337056 * WetBulb * RangeCH2[temp]) + (0.000149476 * WetBulb * WetBulb * RangeCH2[temp]) - (0.01116139 * RangeCH2[temp] * RangeCH2[temp]) + (0.000325406 * WetBulb * RangeCH2[temp] * RangeCH2[temp]) - (0.00000230183 * WetBulb * WetBulb * RangeCH2[temp] * RangeCH2[temp]) + (9.852804 * FlowFactorCH2[temp]) - (0.1736736 * WetBulb * FlowFactorCH2[temp]) + (0.000811069 * WetBulb * WetBulb * FlowFactorCH2[temp]) + (1.74992 * RangeCH2[temp] * FlowFactorCH2[temp]) + (0.004930143 * WetBulb * RangeCH2[temp] * FlowFactorCH2[temp]) - (0.00022193 * WetBulb * WetBulb * RangeCH2[temp] * FlowFactorCH2[temp]) - (0.009865402 * RangeCH2[temp] * RangeCH2[temp] * FlowFactorCH2[temp]) - (0.000283361 * WetBulb * RangeCH2[temp] * RangeCH2[temp] * FlowFactorCH2[temp]) + (0.00000466261 * WetBulb * WetBulb * RangeCH2[temp] * RangeCH2[temp] * FlowFactorCH2[temp]) + (0.09746009 * FlowFactorCH2[temp] * FlowFactorCH2[temp]) - (0.01116796 * WetBulb * FlowFactorCH2[temp] * FlowFactorCH2[temp]) + (0.000138903 * WetBulb * WetBulb * FlowFactorCH2[temp] * FlowFactorCH2[temp]) - (0.1354148 * RangeCH2[temp] * FlowFactorCH2[temp] * FlowFactorCH2[temp]) + (0.001004747 * WetBulb * RangeCH2[temp] * FlowFactorCH2[temp] * FlowFactorCH2[temp]) + (0.0000119203 * WetBulb * WetBulb * RangeCH2[temp] * FlowFactorCH2[temp] * FlowFactorCH2[temp]) - (0.00255673 * RangeCH2[temp] * RangeCH2[temp] * FlowFactorCH2[temp] * FlowFactorCH2[temp]) + (0.0000119203 * WetBulb * RangeCH2[temp] * RangeCH2[temp] * FlowFactorCH2[temp] * FlowFactorCH2[temp]) + (0.000000260086 * WetBulb * WetBulb * RangeCH2[temp] * RangeCH2[temp] * FlowFactorCH2[temp] * FlowFactorCH2[temp]));
  }
}

//PumpsTree.prototype.used to find the ECdWTCH1 vector
PumpsTree.prototype.initECdWTCH1 = function() {
  for (var temp = 0; temp < ECdWTCH1.length; temp++) {
    ECdWTCH1[temp] = ApproachCH1[temp] + WetBulb;
  }
}

//PumpsTree.prototype.used to find the ECdWTCH2 vector
PumpsTree.prototype.initECdWTCH2 = function() {
  for (var temp = 0; temp < ECdWTCH2.length; temp++) {
    ECdWTCH2[temp] = ApproachCH2[temp] + WetBulb;
  }
}

//PumpsTree.prototype.used to find the ECdWTCH1 vector
PumpsTree.prototype.initLCdWTCH1 = function() {
  for (var temp = 0; temp < LCdWTCH1.length; temp++) {
    LCdWTCH1[temp] = Math.round((ECdWTCH1[temp] + RangeCH1) * 100) / 100;
  }
}

//PumpsTree.prototype.used to find the ECdWTCH2 vector
PumpsTree.prototype.initLCdWTCH2 = function() {
  for (var temp = 0; temp < LCdWTCH2.length; temp++) {
    LCdWTCH2[temp] = Math.round((ECdWTCH2[temp] + RangeCH2) * 100) / 100;
  }
}

//PumpsTree.prototype.used to find the FailECdWTCh1 vector
PumpsTree.prototype.initFailECdWTCH1 = function() {
  for (var temp = 0; temp < FailECdWTCH1.length; temp++) {
    FailECdWTCH1[temp] = ((ApproachCH1 + ApproachCH1 + 35) / 2);
  }
}

//PumpsTree.prototype.used to find the FailECdWTCH2 vector
PumpsTree.prototype.initFailECdWTCH2 = function() {
  for (var temp = 0; temp < FailECdWTCH2.length; temp++) {
    FailECdWTCH2[temp] = ((ApproachCH2 + ApproachCH2 + 35) / 2);
  }
}

//PumpsTree.prototype.used to find the FailLCdWTCh1 vector
PumpsTree.prototype.initFailLCdWTCH1 = function() {
  for (var temp = 0; temp < FailLCdWTCH1.length; temp++) {
    FailLCdWTCH1[temp] = Math.round((FailECdWTCH1[temp] + TowerApproach) * 10) / 10;
  }
}

//PumpsTree.prototype.used to find the FailLCdWTCH2 vector
PumpsTree.prototype.initFailLCdWTCH2 = function() {
  for (var temp = 0; temp < FailLCdWTCH2.length; temp++) {
    FailLCdWTCH2[temp] = Math.round((FailECdWTCH2[temp] + TowerApproach) * 10) / 10;
  }
}

//PumpsTree.prototype.used to find the LogicalLCdWTCH1 vector
PumpsTree.prototype.initLogicalLCdWTCH1 = function() {
  for (var temp = 0; temp < CH1Load.length; temp++) {
    if (GUTTowerFan == "Fail") {
      LogicalLCdWTCH1[temp] = ECdWTCH1[temp];
    } else {
      LogicalLCdWTCH1[temp] = FailLCdWTCH1[temp];
    }
  }
}

//PumpsTree.prototype.used to find the LogicalLCdWTCH2 vector
PumpsTree.prototype.initLogicalLCdWTCH2 = function() {
  for (var temp = 0; temp < CH2Load.length; temp++) {
    if (GUTTowerFan == "Fail") {
      LogicalLCdWTCH2[temp] = ECdWTCH2[temp];
    } else {
      LogicalLCdWTCH2[temp] = FailLCdWTCH2[temp];
    }
  }
}

//PumpsTree.prototype.used to find the Indicator vector
PumpsTree.prototype.initIndicatorCH1 = function() {
  for (var temp = 0; temp < CH1Load.length; temp++) {
    if (LogicalLCdWTCH1[temp] < CHDataLastValorColumn) {
      IndicatorCH1[temp] = 0;
    } else {
      IndicatorCH1[temp] = 1;
    }
  }
}

//PumpsTree.prototype.used to find the Indicator vector
PumpsTree.prototype.initIndicatorCH2 = function() {
  for (var temp = 0; temp < CH2Load.length; temp++) {
    if (LogicalLCdWTCH2[temp] < CHDataLastValorColumn) {
      IndicatorCH2[temp] = 0;
    } else {
      IndicatorCH2[temp] = 1;
    }
  }
}

//Function used to find the MaxLdCH1 variable.
PumpsTree.prototype.initMaxLdCH1 = function() {
  MaxLdCH1 = CH1Load[(CH1Load.length) - 1];
}

//Function used to find the MaxLdCH2 variable.
PumpsTree.prototype.initMaxLdCH2 = function() {
  MaxLdCH2 = CH2Load[(CH2Load.length) - 1];
}

//Function used to find the MaxLdCH1 variable.
PumpsTree.prototype.getMaxLdCH1 = function() {
  return MaxLdCH1;
}

//Function used to find the MaxLdCH2 variable.
PumpsTree.prototype.getMaxLdCH2 = function() {
  return MaxLdCH2;
}
module.exports= PumpsTree;
