// Kyle Lambert - lambert.448

var camera, scene, renderer;
var numGenerations = 0, rotationAngle = 0, productionString = "", rules = [];
var twigLength = 6;

window.addEventListener('resize', onWindowResize, false);
document.getElementById('file-input').addEventListener('change', readSingleFile, false);

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x00422b );     // Green surrounding sky

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set( 0, 0, (numGenerations * 100) / 2.5 );
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    $('body').append(renderer.domElement);

    // Set up the THREE.js Orbit controls so you can move the camera around
    controls = new THREE.OrbitControls( camera, renderer.domElement );  // camera controls
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 600;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Create full production string over all generations
    for (var i = 0; i < numGenerations; i++) {
        for (var j = 0; j < rules.length; j++) {    // Progress through every rule
            var search = rules[j].substr(0,1);
            var replacement = rules[j].substr(2);
            productionString = productionString.replace(new RegExp(search, 'g'), replacement);
        }
        twigLength *= 0.7;  // Twigs decrease in length by 70% over each generation
    }

    // Initialize the unit cube
    var cubeGeometry = new THREE.BoxGeometry(0.25, twigLength, 0.1, 3, 3, 3);
    var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, depthTest: true});
    var stick = new THREE.Mesh(cubeGeometry, cubeMaterial);
    stick.translateY(-numGenerations * 18);

    var currentRotation = 0;
    var currentPosition = stick.position;
    var previousY = twigLength/2;
    var previousX = 0;

    var positionStack = [];     // stack for current position
    var rotationStack = [];     // stack for current rotation  
    var widthStack = [];        // stack for current X length for translation
    var heightStack = [];       // stack for current Y length for translation

    for (var i = 0; i < productionString.length; i++) {
        if (productionString.charAt(i) == "F") {
            var newStick = stick.clone();
            newStick.position.set(currentPosition.x, currentPosition.y, currentPosition.z);

            // Correctly position the new twig
            newStick.translateX(previousX + (twigLength/2) * -1 * Math.sin(currentRotation * (Math.PI / 180)));
            newStick.translateY(previousY + (twigLength/2) * Math.cos(currentRotation * (Math.PI / 180)));
            newStick.rotateZ(currentRotation * (Math.PI / 180));

            currentPosition = newStick.position;
            previousY = (twigLength/2) * Math.cos(currentRotation * (Math.PI / 180));
            previousX = (twigLength/2) * -1 * Math.sin(currentRotation * (Math.PI / 180));
            scene.add(newStick);
        } else if (productionString.charAt(i) == "+") { // increase rotation angle
            currentRotation += rotationAngle;
        } else if (productionString.charAt(i) == "-") { // decrease rotation angle
            currentRotation -= rotationAngle;
        } else if (productionString.charAt(i) == "[") { // push current state onto the stack
            positionStack.push(currentPosition);
            rotationStack.push(currentRotation);
            widthStack.push(previousX);
            heightStack.push(previousY);
        } else if (productionString.charAt(i) == "]") { // pop current state off top of the stack
            currentPosition = positionStack.pop();
            currentRotation = rotationStack.pop();
            previousX = widthStack.pop();
            previousY = heightStack.pop();
        }
    }
}

// Function to resize the scene to the browser size if the user changes the
// browser size while the scene is open
function onWindowResize() {
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    // Set up the camera
    renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );   

    requestAnimationFrame(animate);
    controls.update();      // OrbitControls
}

// Loads the file specified by the user
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        // Display file content
        setRules(contents);     // sets production rules
        init();     // produces the L-system generation
        animate();
    };
    reader.readAsText(file);
}

var ruleEntry = 0;
// Function to set the production rules before production begins
function setRules(contents) {
    var lines = contents.split(/[\r\n]+/g);

    numGenerations = parseInt(lines[0]);
    rotationAngle = parseFloat(lines[1]);
    productionString = lines[2];

    for (var i = 3; i < lines.length; i++) { 
        rules[ruleEntry] = lines[i];
        ruleEntry++;
    }
}
