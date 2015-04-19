var scene, ctx, audioCtx, analyzer, source;
var data = new Uint8Array(2048);
var gain = 1;
scene = document.getElementById("scene");
ctx = scene.getContext('2d');

audioCtx = new AudioContext();
analyzer = audioCtx.createAnalyser();
analyzer.fftSize = 2048;


function mainLoop() {
	var sum;
	var average;
	analyzer.getByteFrequencyData(data);
	ctx.strokeStyle = "#DDD";
	ctx.lineWidth = 1;
	
	window.requestAnimationFrame(mainLoop);
	
	ctx.beginPath();
	ctx.clearRect(0, 0, scene.width, scene.height);
	ctx.moveTo(0, scene.height - data[0]*gain);
	
	for (var i = 2; i < scene.width; i+= (data.length / scene.width)) {
		ctx.lineTo(Math.floor(i), Math.floor(scene.height - data[Math.floor(i)]*gain));
	}
	
//	for (var i = 1; i < data.length; i++) {
//		ctx.lineTo(i, scene.height - data[i]);
//	}
	ctx.stroke();
	ctx.closePath();
}


navigator.webkitGetUserMedia({audio: true}, function(mediaStream) {
	source = audioCtx.createMediaStreamSource(mediaStream);
	source.connect(analyzer);
	
	mainLoop();
}, function(err) {
	console.log(err);
});

function changeGain(val) {
	gain = val;
}