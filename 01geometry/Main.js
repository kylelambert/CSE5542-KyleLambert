// Kyle Lambert - lambert.448

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set( 0, 0, 12 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(1200, 675);
$('body').append(renderer.domElement);

// Set up the THREE.js Orbit controls so you can move the camera around
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 30;
controls.maxPolarAngle = Math.PI / 2;

// Initialize the unit plane
var planeGeometry = new THREE.PlaneGeometry(1, 1, 10, 10);
var planeMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0xffff00});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Initialize the unit cube
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
var cubeMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0xff0000});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Initialize the unit cylinder
var cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 20, 4);
var cylinderMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x3254ff});
var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// Initialize the unit cone
var coneGeometry = new THREE.ConeGeometry(0.5, 1, 20, 5);
var coneMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x0bba00});
var cone = new THREE.Mesh(coneGeometry, coneMaterial);

// Initialize the unit sphere
var sphereGeometry = new THREE.SphereGeometry(0.5, 20, 20);
var sphereMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x8f2aaa});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Initialize the unit torus
var torusGeometry = new THREE.TorusGeometry(0.5, 0.15, 10, 20);
var torusMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0xff882d});
var torus = new THREE.Mesh(torusGeometry, torusMaterial);

// Rotate, scale, and translate the floor plane
plane.rotateX(1.571);
plane.scale.set(12, 12, 1);
plane.translateZ(3);

// Rotate, scale, and translate the eyes
var eye1 = cone.clone();
eye1.scale.set(1, 0.5, 1);
eye1.rotateX(1.571);
eye1.translateZ(-1.5);
eye1.translateY(1.4);
var eye2 = eye1.clone();
eye1.translateX(1);
eye2.translateX(-1);

// Rotate, scale, and translate the eyebrows
var eyebrow1 = new THREE.Mesh(cubeGeometry, planeMaterial);
eyebrow1.scale.set(1.5, 0.3, 0.2);
eyebrow1.translateY(1.75);
eyebrow1.translateZ(1.1);
var eyebrow2 = eyebrow1.clone();
eyebrow1.rotateZ(0.35);
eyebrow2.rotateZ(-0.35);
eyebrow1.translateX(1);
eyebrow2.translateX(-1);

// Scale and translate the feet
cube.scale.set(1, 0.5, 1.5);
cube.translateY(-2.75);
var foot = cube.clone();
cube.translateX(-1.25);
foot.translateX(1.25);

// Scale and translate the legs
cylinder.scale.set(0.5, 2, 0.5);
cylinder.translateY(-1.5);
cylinder.translateZ(-0.4);
var leg = cylinder.clone();
cylinder.translateX(-1.25);
leg.translateX(1.25);

// Scale and translate the body/head
sphere.scale.set(6, 4, 3);
sphere.translateY(1.25);
sphere.translateZ(-0.3);

// Scale and translate hat pieces
var hat = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
hat.scale.set(2, 1, 1);
hat.translateY(3.75);
hat.translateZ(-0.3);
cone.scale.set(6, 1, 3);
cone.translateY(4.75);
cone.translateZ(-0.3);

// Create and position the mouth
var mouth = new THREE.Mesh(torusGeometry, cubeMaterial);
mouth.scale.set(2, 0.5, 0.75);
mouth.translateY(0.5);
mouth.translateZ(1.1);

// Create and position the "ear" toruses
torus.rotateY(1.571);
torus.scale.set(1.5, 1.5, 1.5);
torus.translateX(0.3);
torus.translateY(1);
var bigEar = torus.clone();
var midEar1 = torus.clone();
var tinyEar1 = torus.clone();
midEar1.scale.set(1, 1, 1);
tinyEar1.scale.set(0.75, 0.75, 0.75);
var midEar2 = midEar1.clone();
var tinyEar2 = tinyEar1.clone();
torus.translateZ(-3);
bigEar.translateZ(3);
midEar1.translateZ(3.5);
midEar2.translateZ(-3.5);
tinyEar1.translateZ(3.9);
tinyEar2.translateZ(-3.9);

// Add all the objects to the scene
scene.add(plane);
scene.add(cube);
scene.add(cylinder);
scene.add(cone);
scene.add(sphere);
scene.add(torus);

scene.add(foot);
scene.add(leg);
scene.add(hat);
scene.add(bigEar);
scene.add(midEar1);
scene.add(midEar2);
scene.add(tinyEar1);
scene.add(tinyEar2);
scene.add(eye1);
scene.add(eye2);
scene.add(mouth);
scene.add(eyebrow1);
scene.add(eyebrow2);

var animate = function() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();
}

animate();
