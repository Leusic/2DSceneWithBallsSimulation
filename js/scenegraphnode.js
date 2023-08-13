class SceneGraphNode {
    constructor(pTransform) {
        this.setTransformMatrix(pTransform);
        this.mChildren = [];
    }
    getTransformMatrix() {
        return this.mTransform;
    }
    setTransformMatrix(pTransform) {
        this.mTransform = pTransform;
    }
    getNumberOfChildren() {
        return(this.mChildren.length);
    }
    getChildAt(pIndex){
        return(this.mChildren[pIndex]);
    }
    addChild(pSceneGraphNode){
        this.mChildren.push(pSceneGraphNode);
    }
    draw(pContext, pWorldTransformMatrix){ 
        for(var i = 0; i < this.getNumberOfChildren(); i+= 1)
        {
            var pCombinedTransformMatrix;
            pCombinedTransformMatrix = pWorldTransformMatrix.multiply(this.getTransformMatrix());
            pCombinedTransformMatrix.setTransform(pContext); 
            this.mChildren[i].draw(pContext, pCombinedTransformMatrix);
        }
    }
}