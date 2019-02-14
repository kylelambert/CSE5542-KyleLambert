// Kyle Lambert - lambert.448

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x00422b );
scene.fog = new THREE.FogExp2( 0x00422b, 0.005 );

var cameraLeft = new THREE.PerspectiveCamera(60, (window.innerWidth / 2) / window.innerHeight, 1, 1000);
cameraLeft.position.set( -0.25, 0, 20 );

var cameraRight = new THREE.PerspectiveCamera(60, (window.innerWidth / 2) / window.innerHeight, 1, 1000);
cameraRight.position.set( 0.25, 0, 20 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
$('body').append(renderer.domElement);

// Set up the THREE.js Orbit controls so you can move the cameras around
controlsLeft = new THREE.OrbitControls( cameraLeft, renderer.domElement );
controlsLeft.enableDamping = true;
controlsLeft.dampingFactor = 0.25;
controlsLeft.screenSpacePanning = false;
controlsLeft.minDistance = 10;
controlsLeft.maxDistance = 40;
controlsLeft.maxPolarAngle = Math.PI / 2;
controlsRight = new THREE.OrbitControls( cameraRight, renderer.domElement );
controlsRight.enableDamping = true;
controlsRight.dampingFactor = 0.25;
controlsRight.screenSpacePanning = false;
controlsRight.minDistance = 10;
controlsRight.maxDistance = 40;
controlsRight.maxPolarAngle = Math.PI / 2;

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    cameraLeft.aspect =  (window.innerWidth / 2) / window.innerHeight;
    cameraLeft.updateProjectionMatrix();
    cameraRight.aspect = (window.innerWidth / 2) / window.innerHeight;
    cameraRight.updateProjectionMatrix();
}

// Initialize the unit cube
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, depthTest: true});
var foot1 = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Initialize the unit cylinder
var cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 20, 4);
var cylinderMaterial = new THREE.MeshBasicMaterial({color: 0x3254ff, depthTest: true});
var leg1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// Initialize the unit cone
var coneGeometry = new THREE.ConeGeometry(0.5, 1, 20, 5);
var coneMaterial = new THREE.MeshBasicMaterial({color: 0x0bba00, depthTest: true});
var hatTop = new THREE.Mesh(coneGeometry, coneMaterial);

// Initialize the unit sphere
var sphereGeometry = new THREE.SphereGeometry(0.5, 20, 20);
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x8f2aaa, depthTest: true});
var body = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Initialize the unit torus
var torusGeometry = new THREE.TorusGeometry(0.5, 0.15, 10, 20);
var torusMaterial = new THREE.MeshBasicMaterial({color: 0xff882d, depthTest: true});
var bigEar1 = new THREE.Mesh(torusGeometry, torusMaterial);

// Initialize the floor
var floorMaterial = new THREE.MeshBasicMaterial({depthTest: true, color: 0x606060});
var floor = new THREE.Mesh(cubeGeometry, floorMaterial);

// Rotate, scale, and translate the floor plane
floor.scale.set(5000, 0.1, 5000);
floor.translateY(-2.85);

// Rotate, scale, and translate the eyes
var eye1 = new THREE.Mesh(coneGeometry, coneMaterial);
eye1.scale.set(1, 0.5, 1);
eye1.rotateX(1.571);
eye1.translateZ(-1.5);
eye1.translateY(1.4);
var eye2 = eye1.clone();
eye1.translateX(1);
eye2.translateX(-1);

// Rotate, scale, and translate the eyebrows
var browMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, depthTest: true});
var eyebrow1 = new THREE.Mesh(cubeGeometry, browMaterial);
eyebrow1.scale.set(1.5, 0.3, 0.2);
eyebrow1.translateY(2.1);
eyebrow1.translateZ(1.1);
var eyebrow2 = eyebrow1.clone();
eyebrow1.translateX(1);
eyebrow2.translateX(-1);

// Scale and translate the feet
foot1.scale.set(1, 0.5, 1.5);
foot1.translateY(-2.5);
var foot2 = foot1.clone();
foot1.translateX(-1.25);
foot2.translateX(1.25);

// Scale and translate the legs
leg1.scale.set(0.5, 2, 0.5);
leg1.translateY(-1.25);
leg1.translateZ(-0.4);
var leg2 = leg1.clone();
leg1.translateX(-1.25);
leg2.translateX(1.25);

// Scale and translate the body/head
body.scale.set(6, 4, 3);
body.translateY(1.25);
body.translateZ(-0.3);

// Scale and translate hat pieces
var hatBottom = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
hatBottom.scale.set(2, 1, 1);
hatBottom.translateY(3.75);
hatBottom.translateZ(-0.3);
hatTop.scale.set(6, 1, 3);
hatTop.translateY(4.75);
hatTop.translateZ(-0.3);

// Create and position the mouth
var mouth = new THREE.Mesh(torusGeometry, cubeMaterial);
mouth.scale.set(2, 0.5, 0.75);
mouth.translateY(0.5);
mouth.translateZ(1.1);

// Create and position the "ear" toruses
bigEar1.rotateY(1.571);
bigEar1.scale.set(1.5, 1.5, 1.5);
bigEar1.translateX(0.3);
bigEar1.translateY(1);
var bigEar2 = bigEar1.clone();
var midEar1 = bigEar1.clone();
var tinyEar1 = bigEar1.clone();
midEar1.scale.set(1, 1, 1);
tinyEar1.scale.set(0.75, 0.75, 0.75);
var midEar2 = midEar1.clone();
var tinyEar2 = tinyEar1.clone();
bigEar1.translateZ(-3);
bigEar2.translateZ(3);
midEar1.translateZ(3.5);
midEar2.translateZ(-3.5);
tinyEar1.translateZ(3.9);
tinyEar2.translateZ(-3.9);

// Create groups
var leftLeg = new THREE.Group();
leftLeg.add(leg2);
leftLeg.add(foot2);

var rightLeg = new THREE.Group();
rightLeg.add(leg1);
rightLeg.add(foot1);

var hat = new THREE.Group();
hat.add(hatBottom);
hat.add(hatTop);

var leftEar = new THREE.Group();
leftEar.add(bigEar1);
leftEar.add(midEar1);
leftEar.add(tinyEar1);

var rightEar = new THREE.Group();
rightEar.add(bigEar2);
rightEar.add(midEar2);
rightEar.add(tinyEar2);

// Add all the objects to the scene
scene.add(leftLeg);
scene.add(rightLeg);
scene.add(hat);
scene.add(body);
scene.add(leftEar);
scene.add(rightEar);
scene.add(eye1);
scene.add(eye2);
scene.add(eyebrow1);
scene.add(eyebrow2);
scene.add(mouth);
scene.add(floor);

var legRotation = 0;
var legDirection = true;
var legSpeed = 0.03;

var eyebrowRotation = 0;
var eyebrowDirection = true;
var eyebrowSpeed = 0.005;

var floorPos = floor.position;

function animate() {

    var cameraPos = cameraLeft.position;
    floor.position = new THREE.Vector3(cameraPos.x, cameraPos.y, floorPos.z);

    leftLeg.rotateX(-1 * legRotation);
    rightLeg.rotateX(legRotation);
    
    eyebrow1.rotateZ(eyebrowRotation);
    eyebrow2.rotateZ(-1 * eyebrowRotation);

    if (legDirection) {
        legRotation += legSpeed;
        if (legRotation > 1.15) { legDirection = false; }
    } else {
        legRotation -= legSpeed;
        if (legRotation < -1.15) { legDirection = true; }
    }

    if (eyebrowDirection) {
        eyebrowRotation += eyebrowSpeed;
        if (eyebrowRotation > 0.35) { eyebrowDirection = false; }
    } else {
        eyebrowRotation -= eyebrowSpeed;
        if (eyebrowRotation < -0.35) { eyebrowDirection = true; }
    }


    leftLeg.rotateX(legRotation);
    rightLeg.rotateX(-1 * legRotation);
    
    eyebrow1.rotateZ(-1 * eyebrowRotation);
    eyebrow2.rotateZ(eyebrowRotation);

    renderer.setScissorTest( true );
    renderer.setScissor( 0, 0, window.innerWidth / 2, window.innerHeight );
    renderer.setViewport( 0, 0, window.innerWidth / 2, window.innerHeight );
    renderer.render( scene, cameraLeft );

    renderer.setScissor( window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight );
    renderer.setViewport( window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight );
    renderer.render( scene, cameraRight );
    renderer.setScissorTest( false );

    requestAnimationFrame(animate);
    controlsLeft.update();
    controlsRight.update();
}

animate();
