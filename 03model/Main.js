// Kyle Lambert - lambert.448

var numGenerations = 1;
var rotationAngle = 45;
var productionString = "X";
var rules = ["X=F-X+X+F+FX-X", "F=FF"];

var currentRotation = 0;

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x00422b );     // Green surrounding sky
scene.fog = new THREE.FogExp2( 0x00422b, 0.005 );   // Fog in all directions

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set( 0, 0, 30 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
$('body').append(renderer.domElement);

// Set up the THREE.js Orbit controls so you can move the camera around
controls = new THREE.OrbitControls( camera, renderer.domElement );  // camera controls
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 40;
controls.maxPolarAngle = Math.PI / 2;

// Function to resize the scene to the browser size if the user changes the
// browser size while the scene is open
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// Initialize the unit cube
var cubeGeometry = new THREE.BoxGeometry(0.1, 2, 0.1, 3, 3, 3);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, depthTest: true});
var stick = new THREE.Mesh(cubeGeometry, cubeMaterial);
var stickArray = [stick];

// Create full production string over all generations
for (var i = 0; i < numGenerations; i++) {
    for (var j = 0; j < rules.length; j++) {
        var search = rules[j].substr(0,1);
        var replacement = rules[j].substr(2);
        productionString = productionString.replace(new RegExp(search, 'g'), replacement);
    }
}

console.log(productionString);

for (var i = 0; i < productionString.length; i++) {
    if (productionString.charAt(i) == "F") {
        var nextStick = stickArray[stickArray.length - 1].clone();
        nextStick.rotateZ(currentRotation * (3.1415926 / 180));
        nextStick.translateY(2);
        scene.add(nextStick.clone());
        nextStick.rotateZ(-1 * (currentRotation * (3.1415926 / 180)));
        stickArray[stickArray.length] = nextStick;
        console.log(currentRotation);
    } else if (productionString.charAt(i) == "+") {
        currentRotation -= rotationAngle;
        console.log(currentRotation);
    } else if (productionString.charAt(i) == "-") {
        currentRotation += rotationAngle;
        console.log(currentRotation);
    }
}


function animate() {
    // Set up the camera
    renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );   

    requestAnimationFrame(animate);
    controls.update();      // OrbitControls
}

animate();
