class Star {
    constructor(pPoints, pContext) {
        this.setPoints(pPoints);
        this.construct();
    }

    setPoints(pPoints){
        this.mPoints = [];
        for(var i = 0; i < pPoints.length; i++){
            this.mPoints.push(pPoints[i]);
        }
    }

    construct(){
        //loop for each fractal cycle
        for(var depth = 0; depth < 5; depth++){
            this.newPoints = [];
            //loop for each line
            for(var z = 0; z < this.mPoints.length - 1; z++){ 
                var firstPoint, secondPoint, thirdPoint, fourthPoint, fifthPoint, vector1;
                firstPoint = this.mPoints[z];
                fifthPoint = this.mPoints[z+1];
                vector1 = fifthPoint.subtract(firstPoint);               
                vector1 = vector1.multiply(1/3);
                secondPoint = firstPoint.add(vector1);
                thirdPoint = secondPoint.add(vector1.rotate(-Math.PI/3));
                fourthPoint = thirdPoint.add(vector1.rotate(Math.PI/3));
                this.newPoints.push(firstPoint);
                this.newPoints.push(secondPoint);
                this.newPoints.push(thirdPoint);
                this.newPoints.push(fourthPoint);
                this.newPoints.push(fifthPoint);
            }
            this.mPoints = this.newPoints;
        }
    }

    draw(pContext, pMatrix){
        pContext.strokeStyle = '#000000';
        pContext.lineWidth = 1;
        pContext.beginPath();
        for (var i = 0; i < this.mPoints.length; i += 1) {
            pContext.lineTo(this.mPoints[i].getX(), this.mPoints[i].getY());
        }
        pContext.stroke();
    }
}