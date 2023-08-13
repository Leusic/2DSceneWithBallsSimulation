class Matrix {
    constructor(pX1, pX2, pX3, pY1, pY2, pY3, pZ1, pZ2, pZ3) {
        this.mX1 = pX1;
        this.mX2 = pX2;
        this.mX3 = pX3;
        this.mY1 = pY1;
        this.mY2 = pY2;
        this.mY3 = pY3;
        this.mZ1 = pZ1;
        this.mZ2 = pZ2;
        this.mZ3 = pZ3;        
    }    
    getElement(row,column){
        if(row == 0){
            if(column == 0){
                return this.mX1;
            }
            if(column == 1){
                return this.mX2;
            }
            if(column == 2){
                return this.mX3;
            }
        }
        if(row == 1){
            if(column == 0){
                return this.mY1;
            }
            if(column == 1){
                return this.mY2;
            }  
            if(column == 2){
                return this.mY3;
            }
        }
        if(row == 2){
            if(column == 0){
                return this.mZ1;
            }
            if(column == 1){
                return this.mZ2;
            }  
            if(column == 2){
                return this.mZ3;
            }
        }
    }
    static createIdentity(){
        var identityMatrix;
        identityMatrix = new Matrix(1,0,0,0,1,0,0,0,1);
        return identityMatrix;
    }
    static createTranslation(pVector){
        var translationMatrix;
        translationMatrix = new Matrix(1,0,pVector.getX(),0,1,pVector.getY(),0,0,1);
        return translationMatrix;
    }
    static createScale(pVector){
        var scaleMatrix;
        scaleMatrix = new Matrix(pVector.getX(),0,0,0,pVector.getY(),0,0,0,1);
        return scaleMatrix;
    }
    static createRotation(pScalar){
        var rotationMatrix;
        rotationMatrix = new Matrix(Math.cos(pScalar),-Math.sin(pScalar),0,Math.sin(pScalar),Math.cos(pScalar),0,0,0,1);
        return rotationMatrix;
    }
    multiply(pMatrix){
        var multipliedMatrix;
        multipliedMatrix = new Matrix(0,0,0,0,0,0,0,0,0);
        multipliedMatrix.mX1 = (this.getElement(0,0) * pMatrix.getElement(0,0)) + (this.getElement(0,1) * pMatrix.getElement(1,0)) + (this.getElement(0,2) * pMatrix.getElement(2,0));
        multipliedMatrix.mX2 = (this.getElement(0,0) * pMatrix.getElement(0,1)) + (this.getElement(0,1) * pMatrix.getElement(1,1)) + (this.getElement(0,2) * pMatrix.getElement(2,1));
        multipliedMatrix.mX3 = (this.getElement(0,0) * pMatrix.getElement(0,2)) + (this.getElement(0,1) * pMatrix.getElement(1,2)) + (this.getElement(0,2) * pMatrix.getElement(2,2));
        multipliedMatrix.mY1 = (this.getElement(1,0) * pMatrix.getElement(0,0)) + (this.getElement(1,1) * pMatrix.getElement(1,0)) + (this.getElement(1,2) * pMatrix.getElement(2,0));
        multipliedMatrix.mY2 = (this.getElement(1,0) * pMatrix.getElement(0,1)) + (this.getElement(1,1) * pMatrix.getElement(1,1)) + (this.getElement(1,2) * pMatrix.getElement(2,1));
        multipliedMatrix.mY3 = (this.getElement(1,0) * pMatrix.getElement(0,2)) + (this.getElement(1,1) * pMatrix.getElement(1,2)) + (this.getElement(1,2) * pMatrix.getElement(2,2));
        multipliedMatrix.mZ1 = (this.getElement(2,0) * pMatrix.getElement(0,0)) + (this.getElement(2,1) * pMatrix.getElement(1,0)) + (this.getElement(2,2) * pMatrix.getElement(2,0));
        multipliedMatrix.mZ2 = (this.getElement(2,0) * pMatrix.getElement(0,1)) + (this.getElement(2,1) * pMatrix.getElement(1,1)) + (this.getElement(2,2) * pMatrix.getElement(2,1));
        multipliedMatrix.mZ3 = (this.getElement(2,0) * pMatrix.getElement(0,2)) + (this.getElement(2,1) * pMatrix.getElement(1,2)) + (this.getElement(2,2) * pMatrix.getElement(2,2));
        return multipliedMatrix;
    }
    multiplyVector(pVector){
        var multipliedVector;
        multipliedVector = new Vector(0,0,0);
        multipliedVector.setX((this.getElement(0,0) * pVector.getX()) + (this.getElement(0,1) * pVector.getY()) + (this.getElement(0,2) * pVector.getZ()));
        multipliedVector.setY((this.getElement(1,0) * pVector.getX()) + (this.getElement(1,1) * pVector.getY()) + (this.getElement(1,2) * pVector.getZ()));
        multipliedVector.setZ((this.getElement(2,0) * pVector.getX()) + (this.getElement(2,1) * pVector.getY()) + (this.getElement(2,2) * pVector.getZ()));
        return multipliedVector;
    }
    setTransform(pContext){
        pContext.setTransform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1), this.getElement(0,2),this.getElement(1,2));
    }
    transform(pContext){
        pContext.transform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1), this.getElement(0,2),this.getElement(1,2));
    }
}