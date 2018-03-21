var Chiller = function(chillerDesingCapacity, chillerState, chillerModeScenary, chillerMode, stagingScenario, chillerStatus)
{
	this.chillerDesingCapacity = chillerDesingCapacity
	this.chillerState = chillerState
	this.chillerModeScenary = chillerModeScenary
	this.chillerMode = chillerMode
	this.stagingScenario = stagingScenario
	this.chillerStatus = chillerStatus
}

//D30 - D31 Tree
Chiller.prototype.getChillerDesingCapacity = function()
{
    if(this.isChillerFailing())
        return 0;
    else
        return this.chillerDesingCapacity;
}

//D30 - D31 Tree
Chiller.prototype.isChillerFailing = function()
{
    return (this.chillerState == "Normal") ? false : true;
}

//D32 - D33 Tree
Chiller.prototype.isCapableToCool = function()
{
	return (this.chillerDesingCapacity>0) ? 1 : 0;
}

//D34 - D35 Tree
Chiller.prototype.isCapableToHeat = function()
{
	if(this.chillerModeScenary == "Cool Only")
		return 0;
	else if(this.chillerMode == "Heat")
		return 1;
	else
		return 0
}

//D46 - D47 Tree
Chiller.prototype.isEnabledToEvap = function()
{
	if(this.stagingScenario == "Auto")
		return 1;
	else if(this.chillerStatus == "ON")
		return 1;
	else
		return 0;
}

//D50 - D51 Tree
Chiller.prototype.isEnabledToCond = function()
{
	if(this.stagingScenario == "Auto")
		return 1;
	else if(this.chillerStatus == "ON")
		return 1;
	else
		return 0;
}


module.exports = Chiller;
