// the window load event handler
function onLoad() {
    var mainContext, mainCanvas, rootNode, lastTime, updatableObjects, collisionableCircles;
    // this function will initialise our variables
    function initialiseCanvasContext() {
        // Find the canvas element using its id attribute.
        mainCanvas = document.getElementById('mainCanvas');
        // if it couldn't be found 
        if (!mainCanvas) {
            // make a message box pop up with the error.
            alert('Error: I cannot find the canvas element!');
            return;
        }
        // Get the 2D canvas context.
        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed to get context!');
            return;
        } 

        // set the draw fill style colour to black
        mainContext.fillStyle = "#FFFFFF";
        // fill the canvas with black
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
        // choose a line width
        mainContext.lineWidth = 5;
        // set the line join
        mainContext.lineJoin = 'round';

        updatableObjects = [];
        collisionableCircles = []; 

        lastTime = Date.now();

        origin = new Vector(mainCanvas.width * 0.5, mainCanvas.height * 0.5);
        mainMatrix = Matrix.createTranslation(origin);
        mainMatrix.setTransform(mainContext);
6
        let screenfill = new ScreenFill();

        rootNode = new SceneGraphNode(mainMatrix);                            
        rootNode.addChild(screenfill.getSceneGraphNode());

        //background objects
        let objectSun = new Sun(new Vector(250,-200,0), -0.2, new Vector(1.5,1.5,0), Math.PI/6, new Vector(50,0,0));
        pushObject(objectSun, true, false);
        let objectHills = new Bezier([new Vector(-400,0,0), new Vector(-200, -100, 0), new Vector(0, 300, 0), new Vector(200, 0,0),
        new Vector(450, 50, 0)]);
        pushObject(objectHills, false, false);
        let objectHouse = new House(new Vector(-150,-62,0), 0.380066, new Vector(1,1,0));
        pushObject(objectHouse,false,false);
        let objectTree = new Tree(new Vector(250,-35,0), -0.2, new Vector(1,1,0));
        pushObject(objectTree, false, false)

        //ObjectCircle - pRadius, pTranslation, pRotation, pScale, pVelocity, pAcceleration, pRotationRate, pGravity, pMass

        //balls 
        let object1 = new ObjectCircle(50, new Vector(100,-200,0), 0, new Vector(1,1,0), new Vector(0,0,0), new Vector(0,98,0), Math.PI/6, 0, 2);
        pushObject(object1, true, true);
        let object2 = new ObjectCircle(80, new Vector(0,-150,0), 0, new Vector(1,1,0), new Vector(50, 50,0), new Vector(0,98,0),Math.PI/6, 0, 10);
        pushObject(object2, true, true);
        let object3 = new ObjectCircle(30, new Vector(-100,-200,0), 0, new Vector(1,1,0), new Vector(0,0,0), new Vector(0,98,0), Math.PI/6, 0, 1);
        pushObject(object3, true, true);
        let object4 = new ObjectCircle(50, new Vector(-50,-108,0), 0, new Vector(1,1,0), new Vector(0,0,0), new Vector(0,98,0),Math.PI/6, 0, 2);
        pushObject(object4, true, true);
        let object7 = new ObjectCircle(50, new Vector(0,200,0), 0, new Vector(1,1,0), new Vector(0,-50,0), new Vector(0,98,0),Math.PI/6, 0, 10);
        pushObject(object7, true, true);

        //x/y axis ball test
        //let object1 = new ObjectCircle(50, new Vector(0,-100,0), 0, new Vector(1,1,0), new Vector(0,0,0), new Vector(0,0,0), Math.PI/6, 0, 1);
        //pushObject(object1, true, true);
        //let object2 = new ObjectCircle(50, new Vector(0,0,0), 0, new Vector(1,1,0), new Vector(0,150,0), new Vector(0,0,0),Math.PI/6, 0, 5);
        //pushObject(object2, true, true);
    }

    //generic object instance creator to minimise repetition
    function pushObject(pObject,pUpdatable,pCollideCircle){
        if(pUpdatable == true){
            updatableObjects.push(pObject);
        }
        if(pCollideCircle == true){
            collisionableCircles.push(pObject);
        }
        try {
            rootNode.addChild(pObject.getSceneGraphNode());
        }
        catch(err) {
            rootNode.addChild(pObject);
        }
    }

    function update(pDeltaTime) {
        for(let i = 0; i < updatableObjects.length; i++){
            let updatableObject = updatableObjects[i];
            updatableObject.update(pDeltaTime);
        }
        //moving circles on moving circles collisions
        for(let i = 0; i < collisionableCircles.length; i++){
            //z undefined as of this point
            for(let z = 0; z < collisionableCircles.length; z++){
                if(z != i){
                    circleDiff = collisionableCircles[i].getTranslation().subtract(collisionableCircles[z].getTranslation());
                    let circleDiffMag = circleDiff.magnitude();
                    if((collisionableCircles[i].getRadius() + collisionableCircles[z].getRadius()) >= circleDiffMag){
                        console.log("collision");
                        collisionableCircles[i].collide(collisionableCircles[z], circleDiff, pDeltaTime);
                    }
                }
            }
        }
    }

    // this function will actually draw on the canvas
    function draw() {
        rootNode.draw(mainContext, Matrix.createIdentity()); 
    }

    function drawAnimatedSprite() {
        var frameX = frameIndex * frameWidth;
        var frameY = 0;
        context.drawImage(image, frameX, frameY,
        frameSizeX,frameSizeY,
        -frameWidth/2, -frameHeight/2,
        frameWidth, frameHeight);
    }

    function animationLoop() {
        thisTime = Date.now();
        deltaTime = (thisTime - lastTime) / 1000;
        update(deltaTime);
        draw();
        requestAnimationFrame(animationLoop);
        lastTime = Date.now();
    }

    //var image = new Image();
    //image.src = 'images/image.png'
    //image.onload = function() {
        //mainContext.drawImage(image,0,0);
     //};

    
    initialiseCanvasContext();
    animationLoop();
}
window.addEventListener('load', onLoad, false);
