var scene, ctx, audioCtx, analyzer, source;
scene = document.getElementById("scene");
ctx = scene.getContext('2d');

audioCtx = new AudioContext();
analyzer = audioCtx.createAnalyser();
analyzer.fftSize = 2048;


function mainLoop() {
	console.log("frame");
	var distance = 1;
	var data = new Uint8Array(2048);
	analyzer.getByteFrequencyData(data);
	ctx.strokeStyle = "#DDD";
	
	window.requestAnimationFrame(mainLoop);
	
	ctx.clearRect(0, 0, scene.width, scene.height);
	
}


navigator.webkitGetUserMedia({audio: true}, function(mediaStream) {
	source = audioCtx.createMediaStreamSource(mediaStream);
	source.connect(analyzer);
	
	mainLoop();
}, function(err) {
	console.log(err);
});