class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }
    getX() {
        return this.mX;
    }
    setX(pX) {
        this.mX = pX;
    }
    getY() {
        return this.mY;
    }
    setY(pY) {
        this.mY = pY;
    }
    getZ() {
        return this.mZ;
    }
    setZ(pZ) {
        this.mZ = pZ;
    }
    add(pVector){
        var sumVector;
        sumVector = new Vector(0,0,0);
        var tempX = this.getX() + pVector.getX();
        var tempY = this.getY() + pVector.getY();
        var tempZ = this.getZ() + pVector.getZ();
        sumVector.setX(tempX);
        sumVector.setY(tempY);    
        sumVector.setZ(tempZ);
        return sumVector;  
    }
    subtract(pVector){
        var sumVector;
        sumVector = new Vector(0,0,0);
        var tempX = this.getX() - pVector.getX();
        var tempY = this.getY() - pVector.getY();
        var tempZ = this.getZ() - pVector.getZ();
        sumVector.setX(tempX);
        sumVector.setY(tempY);    
        sumVector.setZ(tempZ);
        return sumVector; 
    }
    multiply(pScalar){
        var sumVector;
        sumVector = new Vector(0,0,0);
        var tempX = this.getX() * pScalar;
        var tempY = this.getY() * pScalar;
        var tempZ = this.getZ() * pScalar;
        sumVector.setX(tempX);
        sumVector.setY(tempY);    
        sumVector.setZ(tempZ);
        return sumVector; 
    }
    divide(pScalar){
        var sumVector;
        sumVector = new Vector(0,0,0);
        var tempX = this.getX() / pScalar;
        var tempY = this.getY() / pScalar;
        var tempZ = this.getZ() / pScalar;
        sumVector.setX(tempX);
        sumVector.setY(tempY);    
        sumVector.setZ(tempZ);
        return sumVector; 
    }
    magnitude(){
        var mMagnitude = Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()) + (this.getZ() * this.getZ()));
        return mMagnitude;
    }
    normalise(){
        var unitVector;
        unitVector = new Vector(0,0,0);
        var normalisedX = this.getX() / this.magnitude();
        var normalisedY = this.getY() / this.magnitude();
        var normalisedZ = this.getZ() / this.magnitude();
        unitVector.setX(normalisedX);
        unitVector.setY(normalisedY);    
        unitVector.setZ(normalisedZ);
        return unitVector;
    }
    limitTo(pScalar){
        var limitedVector;
        limitedVector = new Vector(0,0,0);
        limitedVector.setX(this.getX());
        limitedVector.setY(this.getY());
        limitedVector.setZ(this.getZ());
        if (this.magnitude() > pScalar){
            var normalisedX = (this.getX() / this.magnitude()) * pScalar;
            var normalisedY = (this.getY() / this.magnitude()) * pScalar;
            var normalisedZ = (this.getZ() / this.magnitude()) * pScalar;
            limitedVector.setX(normalisedX);
            limitedVector.setY(normalisedY);
            limitedVector.setZ(normalisedZ);
        }
        return limitedVector;       
    }
    dotProduct(pVector){
        var mDotProduct;
        var tempX = this.getX() * pVector.getX();
        var tempY = this.getY() * pVector.getY();
        var tempZ = this.getZ() * pVector.getZ();
        var mDotProduct = tempX + tempY + tempZ;
        return mDotProduct;
    }

    interpolate(pVector, pScalar){
        var pInterpolated;
        pInterpolated = new Vector(0,0,0);
        var tempX = pVector.getX() - this.getX(); 
        var tempY = pVector.getY() - this.getY(); 
        var tempZ = pVector.getZ() - this.getZ(); 
        tempX = tempX * pScalar;
        tempY = tempY * pScalar;
        tempZ = tempZ * pScalar;
        pInterpolated.setX(tempX + this.getX());
        pInterpolated.setY(tempY + this.getY());    
        pInterpolated.setZ(tempZ + this.getZ());
        return pInterpolated;
    }
    rotate(pScalar){
        var pRotated;
        pRotated = new Vector(0,0,0);
        var tempX = -Math.sin(pScalar) * this.getY() + Math.cos(pScalar) * this.getX();
        var tempY = Math.sin(pScalar) * this.getX() + Math.cos(pScalar) * this.getY();
        pRotated.setX(tempX);
        pRotated.setY(tempY);
        return pRotated;
    }
    angleBetween(pVector){
        var pAngle;
        pAngle = Math.acos(this.dotProduct(pVector) / (this.magnitude() * pVector.magnitude()));
        return pAngle;
    }

}