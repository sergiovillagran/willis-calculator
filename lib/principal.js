'use strict'

const TreeMain = require('./libcore/TreeMain');

function exceptionNull(value) {
    if (value == null || isNaN(value)) {
        return 0;
    }
    return value;
}

function getTags(tree){
    return {
        "WetBulb": tree.getWet_Bulb(),
        "CondFlow": tree.getActual_Cond_Flow(),
        "CondSupplyTemp": tree.getECdWT(),
        "CondTempPostBPHX1": tree.getReturn_CWT_After_WSE(),
        "ECdWTCH1": tree.getCH1_ECdWT_2(),
        "LCdWTCH1": tree.getCH1_LCdWT_2(),
        "CH1Tons": tree.getCH1_Tons_2(),
        "CH1kWTon": tree.getCH1_KWTon(),
        "CH1kW": tree.getCH1_Tons_2() * tree.getCH1_KWTon(),
        "ECdWTCH2": tree.getCH2_ECdWT_2(),
        "LCdWTCH2": tree.getCH2_LCdWT_2(),
        "CH2Tons": tree.getCH2_Tons_2(),
        "CH2kWTon": tree.getCH2_KWTon(),
        "CH2kW": tree.getCH2_Tons_2() * tree.getCH2_KWTon(),
        "TotalEvaporatorFlow": tree.getPrimary_Pump_Flow(),
        "Evap2ndFlow": tree.getVS_Second_Flow(),
        "BypassFlow": tree.getBypass_Flow(),
        "ReturnWaterTemp": tree.getUpstream_Temp_2(),
        "ReturnMixTemp": tree.getMix_Temp(),
        "ReturnWaterTempAfterBPHX1": tree.getReturn_CH_WT_After_WSE(),
        "ECWTCH1": tree.getCH1_ECWT_2(),
        "LCWTCH1": tree.getCH1_LCWT_2(),
        "ECWTCH2": tree.getCH2_ECWT_2(),
        "LCWTCH2": tree.getCH2_LCWT_2(),
        "ChillerHeatTons": tree.getChiller_Heat_Tons(),
        "HotWaterIn": tree.getEntering_HotWater_CH1(),
        "HotWaterOut": tree.getLeaving_Hot_Water_CH2(),
        "ReturnHotWater": tree.getHWSED5(),
        "SupplyHotWater": tree.getHWSEF4,
        "condPumpkW": tree.getPrimary_Pump_KW_2(),
        "evapPumpkW": tree.getEvap_Pump_kW(),
        "TowerkW": tree.getECdWT_VS_Fans(),
        "TowerTons": tree.getEv_Fl_2(),
        "BPHX1Tons": tree.getWSE_Used(),
    }
}

function getOutputKw(tree){
    return {
        "load_Tons": exceptionNull(tree.getCooling_Load()),
        "chiller": exceptionNull((tree.getCH1_Tons_2() * tree.getCH1_KWTon()) + (tree.getCH2_Tons_2() * tree.getCH2_KWTon())),
        "ev_Pump": exceptionNull(tree.getEvap_Pump_kW()),
        "cdPump": exceptionNull(tree.getPrimary_Pump_KW_2()),
        "tower": exceptionNull(tree.getECdWT_VS_Fans()),
        "boiler": exceptionNull(tree.getCostScenario1() / Entradas["kWHr1"]),
        "water": 0,
    }
}

function getOutputMoney(tree){
    return {
        "load_Tons": exceptionNull(tree.getCooling_Load()),
        "chiller": exceptionNull((tree.getCH1_Tons_2() * tree.getCH1_KWTon()) + (tree.getCH2_Tons_2() * tree.getCH2_KWTon()) * Entradas["kWHr1"]),
        "ev_Pump": exceptionNull(tree.getEvap_Pump_kW() * Entradas["kWHr1"]),
        "cdPump": exceptionNull(tree.getPrimary_Pump_KW_2() * Entradas["kWHr1"]),
        "tower": exceptionNull(tree.getECdWT_VS_Fans() * Entradas["kWHr1"]),
        "boiler": exceptionNull(tree.getCostScenario1()),
        "water": exceptionNull(((tree.getEv_Fl_2() * 15) / 8.33 * (1 + (1 / (Entradas["blowdown_rate_cycles"] - 1)))) * Entradas["cost_of_water_gallon"]),
    }
}

module.exports = function Calculator(inputs){
    
    let tree = new TreeMain(Entradas);
        
    tree.init();
        
    return {
        tree,
        tags: getTags(),
        OutputKW: getOutputKw(),
        OutputMoney: getOutputMoney()
    }
}