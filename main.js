//Setting up variables
var scene, ctx, audioCtx, analyzer, source;
var data = new Uint8Array(2048);
var gain = 1;
var analyzerStart = 0;
var analyzerEnd = 4096*2;
scene = document.getElementById("scene");
ctx = scene.getContext('2d');

//Creating audio context
audioCtx = new AudioContext();
analyzer = audioCtx.createAnalyser();
analyzer.fftSize = 4096*2;

//This function will be executed 60 times per second
function mainLoop() {
	var sum;
	var average;
	//Fetching data from the analyzer
	analyzer.getByteFrequencyData(data);
	ctx.strokeStyle = "#DDD";
	ctx.lineWidth = 1;
	
	//Requesting next frame to the navigator (enables GPU accelerated graphics)
	window.requestAnimationFrame(mainLoop);
	
	//Drawing the spectrum for the current frame
	ctx.beginPath();
	ctx.clearRect(0, 0, scene.width, scene.height);
	ctx.moveTo(0, scene.height - data[analyzerStart]*gain);
	
	for (var i = (analyzerStart + 1); i < scene.width; i+= (scene.width / analyzerEnd)) {
		ctx.lineTo(Math.floor(i), Math.floor(scene.height - data[Math.floor(i)]*gain));
	}
	
	ctx.stroke();
	ctx.closePath();
}

//Requesting access to the user's microphone
navigator.webkitGetUserMedia({audio: true}, function(mediaStream) {
	
	//Connecting the audio stream to the analizer
	source = audioCtx.createMediaStreamSource(mediaStream);
	source.connect(analyzer);
	mainLoop();
}, function(err) {
	console.log(err);
});


//Callback function for the range input
function changeGain(val) {
	gain = val;
}