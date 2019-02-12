// Kyle Lambert - lambert.448

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x002560 );
scene.fog = new THREE.FogExp2( 0x002560, 0.012 );

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set( 0, 0, 18 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(1200, 675);
$('body').append(renderer.domElement);

// Set up the THREE.js Orbit controls so you can move the camera around
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 4;
controls.maxDistance = 32;
controls.maxPolarAngle = Math.PI / 2;

effect = new THREE.StereoEffect(renderer);
effect.setSize(1200, 675);

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

// Initialize the unit plane
var floorMaterial = new THREE.MeshBasicMaterial({depthTest: true, color: 0x303030});
var floor = new THREE.Mesh(cubeGeometry, floorMaterial);

// Rotate, scale, and translate the floor plane
floor.scale.set(1000, 0.2, 1000);
floor.translateY(-3);

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
eyebrow1.translateY(1.75);
eyebrow1.translateZ(1.1);
var eyebrow2 = eyebrow1.clone();
eyebrow1.rotateZ(0.35);
eyebrow2.rotateZ(-0.35);
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
var forward = true;

var animate = function() {

    leftLeg.rotateX(-1 * legRotation);
    rightLeg.rotateX(legRotation);
    
    if (forward) {
        legRotation += 0.015;
        if (legRotation > 1.15) {
            forward = false;
        }
    } else {
        legRotation -= 0.015;
        if (legRotation < -1.15) {
            forward = true;
        }
    }

    leftLeg.rotateX(legRotation);
    rightLeg.rotateX(-1 * legRotation);
    
    //console.log(legRotation);
    
    //renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();
    effect.render(scene, camera);
}

animate();
