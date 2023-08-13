class Tree {
    constructor(pTranslation, pRotation, pScale) {
        this.setTranslation(pTranslation);
        this.setRotation(pRotation);
        this.setScale(pScale);
        this.setSGN();
    }
    getSceneGraphNode(){
        return this.treeSGN;
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
        var translationNode1, rotationNode, scaleNode, treeTranslation, treeRotation, treeScale;

        treeTranslation = Matrix.createTranslation(this.getTranslation());
        treeRotation = Matrix.createRotation(this.getRotation());
        treeScale = Matrix.createScale(this.getScale());

        this.treeSGN = new SceneGraphNode(Matrix.createIdentity());

        translationNode1 = new SceneGraphNode(treeTranslation);
        this.treeSGN.addChild(translationNode1);

        rotationNode = new SceneGraphNode(treeRotation);
        translationNode1.addChild(rotationNode);

        scaleNode = new SceneGraphNode(treeScale)
        rotationNode.addChild(scaleNode);

        var translationTrunk, translationLowerLeaves, trunkSGN, lowerLeavesSGN;

        translationTrunk = Matrix.createTranslation(new Vector(0,50,1));
        trunkSGN = new SceneGraphNode(translationTrunk);
        scaleNode.addChild(trunkSGN);
        trunkSGN.addChild(new Trunk());

        translationLowerLeaves = Matrix.createTranslation(new Vector(0,0,1));
        lowerLeavesSGN = new SceneGraphNode(translationLowerLeaves);
        scaleNode.addChild(lowerLeavesSGN);
        lowerLeavesSGN.addChild(new LowerLeaves());
    }
}
class LowerLeaves {
    draw(pContext) {  
        pContext.fillStyle = '#006400';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.moveTo(-100,0);
        pContext.lineTo(0,-200);
        pContext.lineTo(100,0);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}
class Trunk {
    draw(pContext) {   
        pContext.fillStyle = '#964b00';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.moveTo(-12.5,50);
        pContext.lineTo(12.5, 50);
        pContext.lineTo(12.5, -50);
        pContext.lineTo(-12.5, -50);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}
