class House {
    constructor(pTranslation, pRotation, pScale) {
        this.setTranslation(pTranslation);
        this.setRotation(pRotation);
        this.setScale(pScale);
        this.setSGN();
    }
    getSceneGraphNode(){
        return this.houseSGN;
    }
    getTranslation() {
        return this.mTranslation;
    }
    setTranslation(pTranslation) {
        this.mTranslation = pTranslation;
    }
    getRotation() {
        return this.mRotation;
    }
    setRotation(pRotation) {
        this.mRotation = pRotation;
    }
    getScale() {
        return this.mScale;
    }
    setScale(pScale) {
        this.mScale = pScale;
    }
    setSGN(){
        var translationNode1, rotationNode, scaleNode, houseTranslation, houseRotation, houseScale;

        houseTranslation = Matrix.createTranslation(this.getTranslation());
        houseRotation = Matrix.createRotation(this.getRotation());
        houseScale = Matrix.createScale(this.getScale());

        this.houseSGN = new SceneGraphNode(Matrix.createIdentity());

        translationNode1 = new SceneGraphNode(houseTranslation);
        this.houseSGN.addChild(translationNode1);

        rotationNode = new SceneGraphNode(houseRotation);
        translationNode1.addChild(rotationNode);

        scaleNode = new SceneGraphNode(houseScale)
        rotationNode.addChild(scaleNode);

        var translationWall, translationRoof, translationDoor, translationWindow1, translationWindow2, wallSGN, roofSGN, doorSGN, window1SGN, window2SGN;

        translationWall = Matrix.createTranslation(new Vector(0,50,1));
        wallSGN = new SceneGraphNode(translationWall);
        scaleNode.addChild(wallSGN);
        wallSGN.addChild(new Wall());

        translationRoof = Matrix.createTranslation(new Vector(0,-50,1));
        roofSGN = new SceneGraphNode(translationRoof);
        scaleNode.addChild(roofSGN);
        roofSGN.addChild(new Roof());

        translationDoor = Matrix.createTranslation(new Vector(0,62.5,1));
        doorSGN = new SceneGraphNode(translationDoor);
        scaleNode.addChild(doorSGN);
        doorSGN.addChild(new Door());

        translationWindow1 = Matrix.createTranslation(new Vector(-62.5,50,1));
        window1SGN = new SceneGraphNode(translationWindow1);
        scaleNode.addChild(window1SGN);
        window1SGN.addChild(new Window());

        translationWindow2 = Matrix.createTranslation(new Vector(62.5,50,1));
        window2SGN = new SceneGraphNode(translationWindow2);
        scaleNode.addChild(window2SGN);
        window2SGN.addChild(new Window());
    }
}

class Wall{
    draw(pContext){
        pContext.fillStyle = '#ffffff';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.moveTo(-100,50);
        pContext.lineTo(-100,-50);
        pContext.lineTo(100,-50);
        pContext.lineTo(100,50);
        pContext.closePath();
        pContext.fill();
        pContext.stroke()
    }
}
class Roof{
    draw(pContext){
        pContext.fillStyle = '#ff0000';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.moveTo(-100, 50);
        pContext.lineTo(0, -50);
        pContext.lineTo(100, 50);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}
class Door{
    draw(pContext){
        pContext.fillStyle = 'ff0000';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.moveTo(-25,-37.5);
        pContext.lineTo(25, -37.5);
        pContext.lineTo(25, 37.5);
        pContext.lineTo(-25, 37.5);
        pContext.closePath();
        pContext.fill();
        pContext.stroke(); 
    }
}
class Window{
    draw(pContext){
        pContext.fillStyle = '#0000ff';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.moveTo(-12.5,25);
        pContext.lineTo(12.5,25);
        pContext.lineTo(12.5,-25);
        pContext.lineTo(-12.5,-25);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
        pContext.beginPath();
        pContext.moveTo(0,25);
        pContext.lineTo(0,-25);
        pContext.moveTo(-12.5,0);
        pContext.lineTo(12.5,0);
        pContext.stroke();
    }
}