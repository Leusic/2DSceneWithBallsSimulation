class ScreenFill {
    constructor() {
        this.setSGN();
    }
    getSceneGraphNode(){
        return this.screenfillSGN;
    }

    setSGN(){
        this.screenfillSGN = new SceneGraphNode(Matrix.createIdentity());
        this.screenfillSGN.addChild(new ScreenFillDraw());
    }
}
class ScreenFillDraw{
    draw(pContext) {   
        pContext.fillStyle = '#ffffff';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.moveTo(-400,-300);
        pContext.lineTo(400,-300);
        pContext.lineTo(400,300);
        pContext.lineTo(-400,300);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}  