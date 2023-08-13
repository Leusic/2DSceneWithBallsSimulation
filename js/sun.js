class Sun {
    constructor(pTranslation, pRotation, pScale, pRotationRate, pVelocity) {
        this.setTranslation(pTranslation);
        this.setRotation(pRotation);
        this.setScale(pScale);
        this.setRotationRate(pRotationRate);
        this.setVelocity(pVelocity);
        this.setSGN();
    }
    getSceneGraphNode(){
        return this.sunSGN;
    }

    getTranslation() {
        return this.mTranslation;
    }

    setTranslation(pTranslation) {
        this.mTranslation = pTranslation;
    }

    getVelocity() {
        return this.mVelocity;
    }

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    getRotationRate() {
        return this.mRotationRate;
    }

    setRotationRate(pRotationRate) {
        this.mRotationRate = pRotationRate;
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

    getTranslationNode(){
        return this.mTranslationNode
    }

    setTranslationNode(pTranslationNode){
        this.mTranslationNode = pTranslationNode;
    }

    getRotationNode(){
        return this.mRotationNode;
    }

    setRotationNode(pRotationNode){
        this.mRotationNode = pRotationNode;
    }

    getScaleNode(){
        return this.mScaleNode;
    }

    setScaleNode(pScaleNode){
        this.mScaleNode = pScaleNode;
    }
    
    setSGN(){
        var translationNode1, rotationNode, scaleNode, sunTranslation, sunRotation, sunScale;

        sunTranslation = Matrix.createTranslation(this.getTranslation());
        sunRotation = Matrix.createRotation(this.getRotation());
        sunScale = Matrix.createScale(this.getScale());

        this.sunSGN = new SceneGraphNode(Matrix.createIdentity());

        translationNode1 = new SceneGraphNode(sunTranslation);
        this.sunSGN.addChild(translationNode1);

        this.setTranslationNode(translationNode1);

        rotationNode = new SceneGraphNode(sunRotation);
        translationNode1.addChild(rotationNode);

        this.setRotationNode(rotationNode);

        scaleNode = new SceneGraphNode(sunScale)
        rotationNode.addChild(scaleNode);

        this.setScaleNode(scaleNode);

        var translationCircle, translation1Rays, translation2Rays, rotationRays, circleSGN, raysTranslate1SGN, raysTranslate2SGN, raysRotationSGN;

        translationCircle = Matrix.createTranslation(new Vector(0,0,1));
        circleSGN = new SceneGraphNode(translationCircle);
        scaleNode.addChild(circleSGN);
        circleSGN.addChild(new Circle());

        for (var m = 0; m < 8; m += 1) {
            translation1Rays = Matrix.createTranslation(new Vector(0,0,1));
            translation2Rays = Matrix.createTranslation(new Vector(0,50,1));
            var rotationCalculation, rotationTranslation;
            rotationCalculation = (((Math.PI*2)/8)*m);
            rotationRays = Matrix.createRotation(rotationCalculation);
            raysTranslate1SGN = new SceneGraphNode(translation1Rays);
            raysRotationSGN = new SceneGraphNode(rotationRays);
            raysTranslate2SGN = new SceneGraphNode(translation2Rays)
            scaleNode.addChild(raysTranslate1SGN);
            raysTranslate1SGN.addChild(raysRotationSGN);
            raysRotationSGN.addChild(raysTranslate2SGN);
            raysTranslate2SGN.addChild(new Rays());
        }
    }

    update(pDeltatime){
        //rotation
        let currentRotationDelta = this.getRotationRate() * pDeltatime;
        let newRotation = this.getRotation() + currentRotationDelta;
        this.setRotation(newRotation);
        let rotationNode = this.getRotationNode();
        let rotationMatrix = Matrix.createRotation(newRotation);
        rotationNode.setTransformMatrix(rotationMatrix);

        //velocity
        let currentVelocity = this.getVelocity().multiply(pDeltatime);
        let newTranslation = new Vector(this.getTranslation().getX() + currentVelocity.getX(), this.getTranslation().getY() + currentVelocity.getY())
        this.setTranslation(newTranslation);
        let translationNode = this.getTranslationNode();
        translationNode.setTransformMatrix(Matrix.createTranslation(newTranslation));

        //boundaries collision
        //right wall
        if((this.getTranslation().getX() + 50*this.getScale().getX()) > 400){
            this.setTranslation(this.getTranslation().add(new Vector(-5,0,0)));
            this.setVelocity(new Vector(-this.getVelocity().getX(),this.getVelocity().getY(),0));       
        }
        //left wall
        if((this.getTranslation().getX() - 50*this.getScale().getX()) < -400){
            this.setTranslation(this.getTranslation().add(new Vector(5,0,0)));
            this.setVelocity(new Vector(-this.getVelocity().getX(),this.getVelocity().getY(),0));
        }
        //bottom wall
        if((this.getTranslation().getY() + 50*this.getScale().getY()) > 300){
            this.setTranslation(this.getTranslation().add(new Vector(0,-5,0)));
            this.setVelocity(new Vector(this.getVelocity().getX(),-this.getVelocity().getY(),0));
        }
        //top wall
        if((this.getTranslation().getY() - 50*this.getScale().getY()) < -300){
            this.setTranslation(this.getTranslation().add(new Vector(0,5,0)));
            this.setVelocity(new Vector(this.getVelocity().getX(),-this.getVelocity().getY(),0));

        }


    }
}
class Circle{
    draw(pContext) {   
        pContext.fillStyle = '#ffff00';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.arc(0, 0, 50, 0, 2*Math.PI, false);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}  
class Rays{
    draw(pContext){
            pContext.fillStyle = '#ffff00';
            pContext.strokeStyle = '#000000';
            pContext.beginPath();
            pContext.lineTo(5, 0);
            pContext.lineTo(0, 15);
            pContext.lineTo(-5, 0);
            pContext.closePath();
            pContext.fill();
            pContext.stroke();
        }
    }