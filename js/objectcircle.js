class ObjectCircle extends Shape {
    constructor(pRadius, pTranslation, pRotation, pScale, pVelocity, pAcceleration, pRotationRate, pGravity, pMass) {
        super(pTranslation, pRotation, pScale, pVelocity, pAcceleration, pRotationRate, pGravity, pMass);
        this.setRadius(pRadius);
        this.setForces(new Vector(0,pGravity*pMass,0));
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
        translationCircle = Matrix.createTranslation(new Vector(0,0,0));
        circleSGN = new SceneGraphNode(translationCircle);
        this.getScaleNode().addChild(circleSGN);
        circleSGN.addChild(new objectCircle(this.getRadius()));
    }

    addForce(pForce){
        this.setForces(this.getForces().add(pForce));
    }

    update(pDeltatime){
        //forces


        //acceleration
        this.setAcceleration(this.getAcceleration().add(this.getForces().divide(this.getMass())));

        //velocity
        this.setVelocity(this.getVelocity().add(this.getAcceleration().multiply(pDeltatime)));

        //position
        this.setOldTranslation(this.getTranslation());
        let newTranslation = this.getTranslation().add(this.getVelocity().multiply(pDeltatime));
        this.setTranslation(newTranslation);
        this.getTranslationNode().setTransformMatrix(Matrix.createTranslation(newTranslation));

        //rotation
        let currentRotationDelta = this.getRotationRate() * pDeltatime;
        let newRotation = this.getRotation() + currentRotationDelta;
        this.setRotation(newRotation);
        let rotationMatrix = Matrix.createRotation(newRotation);
        this.getRotationNode().setTransformMatrix(rotationMatrix);

        //velocity
        //let currentVelocity = this.getVelocity().multiply(pDeltatime);
        //this.setOldTranslation(this.getTranslation());
        //let newTranslation = new Vector(this.getTranslation().getX() + currentVelocity.getX(), this.getTranslation().getY() + currentVelocity.getY(), 0)
        //this.setTranslation(newTranslation);
        //let translationNode = this.getTranslationNode();
        //translationNode.setTransformMatrix(Matrix.createTranslation(newTranslation));

        //boundaries collision
        //right wall
        if((this.getTranslation().getX() + this.getRadius()*this.getScale().getX()) > 400){
            this.setTranslation(this.getTranslation().add(new Vector(-5,0,0)));
            this.setVelocity(new Vector(-this.getVelocity().getX(),this.getVelocity().getY(),0));       
        }
        //left wall
        if((this.getTranslation().getX() - this.getRadius()*this.getScale().getX()) < -400){
            this.setTranslation(this.getTranslation().add(new Vector(5,0,0)));
            this.setVelocity(new Vector(-this.getVelocity().getX(),this.getVelocity().getY(),0));
        }
        //bottom wall
        if((this.getTranslation().getY() + this.getRadius()*this.getScale().getY()) > 300){
            this.setTranslation(this.getTranslation().add(new Vector(0,-5,0)));
            this.setVelocity(new Vector(this.getVelocity().getX(),-this.getVelocity().getY(),0));
        }
        //top wall
        if((this.getTranslation().getY() - this.getRadius()*this.getScale().getY()) < -300){
            this.setTranslation(this.getTranslation().add(new Vector(0,5,0)));
            this.setVelocity(new Vector(this.getVelocity().getX(),-this.getVelocity().getY(),0));

        }
    }

    collide(pCircle2, pCircleDiff){
        //setting collision normals in both directions: n1 towards circle 1, n2 towards circle 2.
        let n2 = pCircleDiff.normalise();
        let n1 = pCircleDiff.normalise().multiply(-1);

        //recording velocities before collision, vel1 for circle 1, vel2 for circle 2.
        let vel1 = this.getVelocity();
        let vel2 = pCircle2.getVelocity();

        //placing masses into easily referrable variables, m1 is the mass of circle 1, m2 of circle 2.
        let m1 = this.getMass();
        let m2 = pCircle2.getMass();

        //moving circles away from each other to prevent further collision.
        this.setTranslation(this.getTranslation().add(n2.multiply(2)));
        pCircle2.setTranslation(pCircle2.getTranslation().add(n1.multiply(2)));

        //converting the initial velocities into scalars by getting the dot product of them with the collision normal away from
        //the direction of the collision: u1 for circle 1, u2 for circle 2.
        let u1 = n1.dotProduct(vel1);
        let u2 = n1.dotProduct(vel2);

        //calculating the velocities facing directly away from the collision, para1 for circle 1, para2 for circle 2.
        let para1 = n1.multiply(u1);
        let para2 = n1.multiply(u2);

        let massPara1 = n1.multiply((m1*u1 + m2*u2 + 0.8*m2*(u2-u1))/(m1 + m2));
        let massPara2 = n1.multiply((m1*u1 + m2*u2 + 0.8*m1*(u1-u2))/(m1 + m2));

        let perp1 = vel1.subtract(para1);
        let perp2 = vel2.subtract(para2);

        //setting new velocities for after the collision.
        this.setVelocity(perp1.add(massPara1));
        pCircle2.setVelocity(perp2.add(massPara2));

        let finalVel = this.getVelocity();
        let finalVel2 = pCircle2.getVelocity();

        //logging before collision velocities.
        console.log("circle 1 before collision velocity: " + vel1.getX() + " " + vel1.getY());
        console.log("cirlce 2 before collision velocity: " + vel2.getX() + " " + vel2.getY());

        //logging after collision velocities.
        console.log("circle 1 after collision velocity: " + this.getVelocity().getX() + " " + this.getVelocity().getY());
        console.log("circle 2 after collision velocity: " + pCircle2.getVelocity().getX() + " " + pCircle2.getVelocity().getY());

        //logging parallel velocities
        console.log("circle 1 resultant velocity: " + para1.getX() + " " + para1.getY());
        console.log("circle 2 resultant velocity: " + para2.getX() + " " + para2.getY());

        //logging momentums
        //console.log("circle 1 momentum before collision: " + vel1.multiply(m1).getX() + " " + vel1.multiply(m1).getY());
        //console.log("circle 1 momentum after collision: " + this.getVelocity().multiply(m1).getX() + 
        //" " + this.getVelocity().multiply(m1).getY());
        //console.log("circle 2 momentum before collision: " + vel2.multiply(m2).getX() + " " + vel2.multiply(m2).getY());
        //console.log("circle 2 momentum after collision: " + pCircle2.getVelocity().multiply(m2).getX() + 
        //" " + pCircle2.getVelocity().multiply(m2).getY());
        console.log("total momentum before collision: " + vel1.multiply(m1).add(vel2.multiply(m2)).getX() +
        " " + vel1.multiply(m1).add(vel2.multiply(m2)).getY());
        console.log("total momentum after collision: " + this.getVelocity().multiply(m1).add(pCircle2.getVelocity().multiply(m2)).getX()
        + " " + this.getVelocity().multiply(m1).add(pCircle2.getVelocity().multiply(m2)).getY());

        //let u1 = n1.dotProduct(vel1);
        //let u2 = n2.dotProduct(vel2);
        //let para1 = n1.multiply((m1*u1 + m2*u2 + m2*(u2-u1))/(m1 + m2));
        //let para2 = n2.multiply((m1*u1 + m2*u2 + m1*(u1-u2))/(m1 + m2));
        //let perp1 = vel1.subtract(para1);
        //let perp2 = vel2.subtract(para2);

        //this.setVelocity(perp1.add(para2));
        //pCircle2.setVelocity(perp2.add(para1));

        //calculating momentums for both circles, mom1 for circle 1, mom2 for circle 2, tMom for total momentum, and
        //splitMom for the total momentum split between both circles.
        //let mom1 = vel1.multiply(m1);
        //let mom2 = vel2.multiply(m2);
        //let tMom = mom1.add(mom2);
        //let splitMom = tMom.divide(2);
        
        //calculating the resultant velocity of the collision on both circles, half the total momentum of both circles
        //directed away from the collision and divided by each circles mass: rV1 for circle 1, rV2 for circle 2.
        //let rM1 = n1.multiply(splitMom.magnitude());
        //let rM2 = n2.multiply(splitMom.magnitude());

        //let finalVel1 = rM1.add(mom1).divide(m1);
        //let finalVel2 = rM2.add(mom2).divide(m2);

        //console.log("ball1 before " + Math.round(vel1.getX()) + " " + Math.round(vel1.getY()));
        //console.log("ball 1 collision normal " + n1.getX() + " " + n1.getY());
        //console.log("ball 1 after speed " + (m1*u1 + m2*u2 + m2*(u2-u1))/(m1 + m2));
        //console.log("ball 1 parallel velocity " + para1.getX() + " " + para1.getY());
        //console.log("ball 1 after perp velocity " + perp1.getX() + " " + perp1.getY());
        //console.log("ball 1 after " + Math.round(this.getVelocity().getX()) + " " + Math.round(this.getVelocity().getY()));
        //console.log("ball 2 before " + Math.round(vel2.getX()) + " " + Math.round(vel2.getY()));
        //console.log("ball 2 collision normal " + n2.getX() + " " + n2.getY());
        //console.log("ball 2 after speed " + (m1*u1 + m2*u2 + m1*(u1-u2))/(m1 + m2));
        //console.log("ball 2 parallel velocity " + para2.getX() + " " + para2.getY());
        //console.log("ball 2 after perp velocity " + perp2.getX() + " " + perp2.getY());
        //console.log("ball 2 after " + Math.round(pCircle2.getVelocity().getX()) + " " + Math.round(pCircle2.getVelocity().getY()));
    }
}

class objectCircle{
    constructor(pRadius){
        this.mRadius = pRadius;
    }
    draw(pContext) {   
        pContext.fillStyle = '#000000';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();
        pContext.arc(0, 0, this.mRadius, 0, 2*Math.PI, false);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}  