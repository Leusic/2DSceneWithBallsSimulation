class Shape{
    constructor(pTranslation, pRotation, pScale, pVelocity, pAcceleration, pRotationRate, pGravity, pMass) {
        this.setTranslation(pTranslation);
        this.setRotation(pRotation);
        this.setScale(pScale);
        this.setRotationRate(pRotationRate);
        this.setVelocity(pVelocity);
        this.setAcceleration(pAcceleration);
        this.setForces(new Vector(0,0,0));
        this.setMass(pMass);
        this.setSGN()
    }
    getSceneGraphNode(){
        return this.shapeSGN;
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


    getVelocity() {
        return this.mVelocity;
    }

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    getAcceleration(){
        return this.mAcceleration;
    }

    setAcceleration(pAcceleration){
        this.mAcceleration = pAcceleration
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

    getRotationRate() {
        return this.mRotationRate;
    }

    setRotationRate(pRotationRate) {
        this.mRotationRate = pRotationRate;
    }

    getOldTranslation(){
        return this.mOldTranslation;
    }

    setOldTranslation(pOldTranslation){
        this.mOldTranslation = pOldTranslation;
    }

    getForces(){
        return this.mForces;
    }

    setForces(pForces){
        this.mForces = pForces;
    }

    getMass(){
        return this.mMass;
    }
    
    setMass(pMass){
        this.mMass = pMass;
    }

    setSGN(){
        var translationNode1, rotationNode, scaleNode, shapeTranslation, shapeRotation, shapeScale;

        shapeTranslation = Matrix.createTranslation(this.getTranslation());
        shapeRotation = Matrix.createRotation(this.getRotation());
        shapeScale = Matrix.createScale(this.getScale());

        this.shapeSGN = new SceneGraphNode(Matrix.createIdentity());

        translationNode1 = new SceneGraphNode(shapeTranslation);
        this.shapeSGN.addChild(translationNode1);

        this.setTranslationNode(translationNode1);

        rotationNode = new SceneGraphNode(shapeRotation);
        translationNode1.addChild(rotationNode);

        this.setRotationNode(rotationNode);

        scaleNode = new SceneGraphNode(shapeScale)
        rotationNode.addChild(scaleNode);

        this.setScaleNode(scaleNode);
    }
}