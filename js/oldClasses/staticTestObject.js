class StaticObjectCircle extends StaticShape {
    constructor(pRadius, pTranslation, pRotation, pScale){
        super(pTranslation, pRotation, pScale);
        this.setRadius(pRadius);
        this.setSGN();
    }
    
    getRadius(){
        return this.mRadius;
    }

    setRadius(pRadius){
        this.mRadius = pRadius;
    }
    
    setSGN(){
        super.setSGN();
        var translationCircle, circleSGN;
        translationCircle = Matrix.createTranslation(new Vector(0,0,1));
        circleSGN = new SceneGraphNode(translationCircle);
        this.getScaleNode().addChild(circleSGN);
        circleSGN.addChild(new objectCircle(this.getRadius()));
    }

    collide(pCircle2, pCircleDiff){
        
    }
}

class staticObjectCircle{
    constructor(pRadius){
        this.mRadius = pRadius;
    }
    draw(pContext) {   
        pContext.fillStyle = '#ffff00';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.arc(0, 0, this.mRadius, 0, 2*Math.PI, false);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}