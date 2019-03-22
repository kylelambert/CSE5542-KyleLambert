// Kyle Lambert (lambert.448)

// function to get shaders from other files and begin execution of program
var init = function() {
    loadTextResource('./vertexShader.glsl', function (vertexError, vertexText) {
		if (vertexError) {
			alert('Fatal error getting vertex shader (see console)');
			console.error(vertexError);
		} else {
			loadTextResource('./fragmentShader.glsl', function (fragmentError, fragmentText) {
				if (fragmentError) {
					alert('Fatal error getting fragment shader (see console)');
					console.error(fragmentError);
				} else {
                    start(vertexText, fragmentText);
				}
			});
		}
	});
};

var start = function (vertexShaderText, fragmentShaderText) {

	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		alert('WebGL not supported');
	}

	gl.clearColor(0.27, 0.73, 0.41, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// Set up vertex and fragment shaders
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	// Set up vertices and indices for both boxes
	var boxVertices = 
	[ // X, Y, Z           U, V
		// Top
		-4.0, 1.0, -1.0,   0, 0,
		-4.0, 1.0, 1.0,    0, 1,
		-2.0, 1.0, 1.0,     1, 1,
		-2.0, 1.0, -1.0,    1, 0,

		// Left
		-4.0, 1.0, 1.0,    0, 0,
		-4.0, -1.0, 1.0,   1, 0,
		-4.0, -1.0, -1.0,  1, 1,
		-4.0, 1.0, -1.0,   0, 1,

		// Right
		-2.0, 1.0, 1.0,    1, 1,
		-2.0, -1.0, 1.0,   0, 1,
		-2.0, -1.0, -1.0,  0, 0,
		-2.0, 1.0, -1.0,   1, 0,

		// Front
		-2.0, 1.0, 1.0,    1, 1,
		-2.0, -1.0, 1.0,    1, 0,
		-4.0, -1.0, 1.0,    0, 0,
		-4.0, 1.0, 1.0,    0, 1,

		// Back
		-2.0, 1.0, -1.0,    0, 0,
		-2.0, -1.0, -1.0,    0, 1,
		-4.0, -1.0, -1.0,    1, 1,
		-4.0, 1.0, -1.0,    1, 0,

		// Bottom
		-4.0, -1.0, -1.0,   1, 1,
		-4.0, -1.0, 1.0,    1, 0,
		-2.0, -1.0, 1.0,     0, 0,
		-2.0, -1.0, -1.0,    0, 1,
	];

	var boxVertices2 = 
	[ // X, Y, Z           U, V
		// Top
		2.0, 1.0, -1.0,   0, 0,
		2.0, 1.0, 1.0,    0, 1,
		4.0, 1.0, 1.0,     1, 1,
		4.0, 1.0, -1.0,    1, 0,

		// Left
		2.0, 1.0, 1.0,    0, 0,
		2.0, -1.0, 1.0,   1, 0,
		2.0, -1.0, -1.0,  1, 1,
		2.0, 1.0, -1.0,   0, 1,

		// Right
		4.0, 1.0, 1.0,    1, 1,
		4.0, -1.0, 1.0,   0, 1,
		4.0, -1.0, -1.0,  0, 0,
		4.0, 1.0, -1.0,   1, 0,

		// Front
		4.0, 1.0, 1.0,    1, 1,
		4.0, -1.0, 1.0,    1, 0,
		2.0, -1.0, 1.0,    0, 0,
		2.0, 1.0, 1.0,    0, 1,

		// Back
		4.0, 1.0, -1.0,    0, 0,
		4.0, -1.0, -1.0,    0, 1,
		2.0, -1.0, -1.0,    1, 1,
		2.0, 1.0, -1.0,    1, 0,

		// Bottom
		2.0, -1.0, -1.0,   1, 1,
		2.0, -1.0, 1.0,    1, 0,
		4.0, -1.0, 1.0,     0, 0,
		4.0, -1.0, -1.0,    0, 1,
	];

	var boxIndices =
	[
		// Top
		0, 1, 2,	0, 2, 3,

		// Left
		5, 4, 6,	6, 4, 7,

		// Right
		8, 9, 10,	8, 10, 11,

		// Front
		13, 12, 14,	15, 14, 12,

		// Back
		16, 17, 18,	16, 18, 19,

		// Bottom
		21, 20, 22,	22, 20, 23
	];

	var boxIndices2 =
	[
		// Top
		0, 1, 2,	0, 2, 3,

		// Left
		5, 4, 6,	6, 4, 7,

		// Right
		8, 9, 10,	8, 10, 11,

		// Front
		13, 12, 14,	15, 14, 12,

		// Back
		16, 17, 18,	16, 18, 19,

		// Bottom
		21, 20, 22,	22, 20, 23
	];

	var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

	var boxVertexBufferObject2 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject2);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices2), gl.STATIC_DRAW);

	var boxIndexBufferObject2 = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject2);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices2), gl.STATIC_DRAW);

	//
	// Create all six textures
	//
	var boxTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, boxTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('box-image')
	);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    var akuTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, akuTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('aku-image')
	);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    var lifeTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, lifeTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('life-image')
	);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    var tntTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, tntTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('tnt-image')
	);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    var nitroTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, nitroTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('nitro-image')
	);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    var questionTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, questionTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('question-image')
	);
	gl.bindTexture(gl.TEXTURE_2D, null);

	// Put textures in an array
    var textures = [nitroTexture, boxTexture, tntTexture, akuTexture, questionTexture, lifeTexture];

	gl.useProgram(program);

	// Set up world and view matrices
	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, -9], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);

	var xRotationMatrix2 = new Float32Array(16);
	var yRotationMatrix2 = new Float32Array(16);

	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	var angle = 0;		// for  rotating the boxes
	var angle2 = 0;
	var identityMatrix2 = new Float32Array(16);
	mat4.identity(identityMatrix2);

	// animation loop
	var loop = function () {
		
		var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
		var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			texCoordAttribLocation, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
	
		// bind buffers for first box
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(texCoordAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
		
		// rotate the first box
		angle = performance.now() / 1000 / 6 * 2 * Math.PI;
		mat4.translate(identityMatrix, identityMatrix, [-3, 0, 0]);
		mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
		mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
		mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
		mat4.translate(identityMatrix, identityMatrix, [3, 0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.clearColor(0.85, 0.6, 0.7, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		// draw the box with 6 textures
		for (var i = 0; i < 6; i++) {
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textures[i]);
			gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 6*i*2);
		}

		var positionAttribLocation2 = gl.getAttribLocation(program, 'vertPosition');
		var texCoordAttribLocation2 = gl.getAttribLocation(program, 'vertTexCoord');
		gl.vertexAttribPointer(
			positionAttribLocation2, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			texCoordAttribLocation2, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
	
		// bind buffers for second box
		gl.enableVertexAttribArray(positionAttribLocation2);
		gl.enableVertexAttribArray(texCoordAttribLocation2);
		gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject2);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject2);
	
		// rotate the single texture box
		angle2 = performance.now() / 1000 / 6 * 2 * Math.PI;
		mat4.translate(identityMatrix2, identityMatrix2, [3, 0, 0]);
		mat4.rotate(yRotationMatrix2, identityMatrix2, angle2, [0, 1, 0]);
		mat4.rotate(xRotationMatrix2, identityMatrix2, angle2 / 4, [1, 0, 0]);
		mat4.mul(worldMatrix, yRotationMatrix2, xRotationMatrix2);
		mat4.translate(identityMatrix2, identityMatrix2, [-3, 0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		// draw the box with one texture
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, textures[1]);
		gl.drawElements(gl.TRIANGLES, boxIndices2.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};
