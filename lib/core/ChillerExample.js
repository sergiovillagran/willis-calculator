chillerState = "normal"
chillerDesignCapacity = 500;
function getChillerCapacity (){
    if(isChillerFailing())
        return 0
    else
        return chillerDesignCapacity;
}

function isChillerFailing ()
{
    return (chillerState == "normal") ? false : true;
}