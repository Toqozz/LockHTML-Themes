var xmldata = false;
var updateTimer = 0;

if (Lang == "en"){
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
}

function updateClock() { 
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();
	var currentDate = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
	var currentYear = currentTime.getFullYear();
	timeOfDay = ( currentHours < 12 ) ? "am" : "pm";

	if (Clock == "24h"){
		timeOfDay = "";
		currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
		currentTimeString = currentHours + ":" + currentMinutes;
	}
	if (Clock == "12h"){
		currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
		currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
		currentHours = ( currentHours == 0 ) ? 12 : currentHours;
		currentTimeString = currentHours + ":" + currentMinutes;
	}

	document.getElementById("hour").innerHTML = currentHours;
	document.getElementById("minute").innerHTML = currentMinutes;
	//document.getElementById("ampm").innerHTML = timeOfDay;

	//document.getElementById("day").innerHTML = days[currentTime.getDay()];
	//document.getElementById("date").innerHTML = currentDate;
	//document.getElementById("month").innerHTML = months[currentTime.getMonth()];
}

function clearCanvas() {
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function markerLine() {
	var ctx = canvas.getContext('2d');
	var x = canvas.width * 0.1,
		y = 0;

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x, canvas.height - y);

	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 2;
	ctx.stroke();
}

function sineWave() {
	clearCanvas();
	markerLine();

	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	//ctx.imageSmoothingEnabled = true;
	var currentTime = new Date();
	var currentHours = currentTime.getHours(),
		currentMinutes = currentTime.getMinutes() / 60;
	var currentDecimalTime = currentHours + currentMinutes;

	var amplitude = 60,
		frequency = 0.013,
		offset = lerp(4.35, 10.65, currentDecimalTime / 24);

	var canvasMidPoint = canvas.height * 0.5,
		sineWave = 0,
		counter = 0,
		x = 0,
		y = 0;
	
	sineWave = amplitude * Math.sin(frequency * counter + offset);
	y = canvasMidPoint - sineWave;

	// Loop through canvas width -- pixel perfect sine wave.
	for (var i = 0; i <= canvas.width; i++) {
		ctx.moveTo(x, y);
		x = i;
		sineWave = amplitude * Math.sin(frequency * counter + offset);
		y = canvasMidPoint - sineWave;
		counter++;

		ctx.lineTo(x,y);
	}

	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 2;
	ctx.stroke();
}

function lerp(v0, v1, t) {
	return (1 - t) * v0 + t * v1;
}

function init(){
	sineWave();
	updateClock();
	setInterval(sineWave, 10*60*1000)	// 10 minute refresh timer.
	setInterval(updateClock, 2000);
}