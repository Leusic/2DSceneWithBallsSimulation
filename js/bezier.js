class Bezier {
    constructor(pArray) {
        var currentArray, finalArray, finalVector;
        finalArray = [];
        //works at this point
        for (var k = 0; k < 1; k += 0.05) {
            currentArray = pArray.slice();
            for (var m = 0; m < pArray.length - 1; m += 1) {
                currentArray = (this.interpolationPass(currentArray, k)).slice();
            }
            finalVector = currentArray[0];
            finalArray.push(finalVector);
        }
        this.setDrawArray(finalArray);
    }

    setDrawArray(pArray){
        this.drawArray = pArray.slice();
    }

    interpolationPass(pArray, pInterpolation){
        var newArray;
        newArray = [];
        for (var m = 0; m < pArray.length - 1; m += 1) {
            newArray[m] = pArray[m].interpolate(pArray[m + 1], pInterpolation);
        }
        return newArray;

    }

    draw(pContext, pMatrix){
        pContext.strokeStyle = '#000000';
        pContext.fillStyle = '#afe1af';
        pContext.beginPath();
        pContext.lineTo(-400,300);
        for (var i = 0; i < this.drawArray.length; i += 1) {
            pContext.lineTo(this.drawArray[i].getX(), this.drawArray[i].getY());
        }
        pContext.lineTo(400,300);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}