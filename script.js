'use strict';
var song;
var volsliderspan, volumeslider, volvaluespan, volfullspan;
var playpausebtn, stopbtn;
var fft;
var seekerspan, seeker, seekvalue, seekfull;
var playbackratespan, playbackrateslider, playbackratenow, playbackratefull;
var favpartspan, favpartbtn;

var input,button,greeting;
var file1;

//
//function alertfilename(){
//    console.log("Hello princs");
//    file1=document.getElementById("filename").value;
//    console.log(file1);
//    //song=loadSound(file1);
//}
//$(document).ready(function(){
//        $('input[type="file"]').change(function(e){
//            file1 = e.target.files[0].name;
//            console.log(file1);
////            alert('The file "' + fileName +  '" has been selected.');
//        });
//    });
function preload() {   
	song = loadSound("Shinsuke-Nakamura.mp3");
 //   song=loadSound(file1);
}

function setup() {
    input = createInput();
    input.position(20,65);
    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(greet);
    greeting = createElement('h2', 'Enter the size which should be in the power of 2');
    greeting.position(20, 5);
    textSize(25);
    
    volsliderspan = createElement('span');
	volsliderspan.html('volume slider');
	volvaluespan = createElement('span');
	volvaluespan.html('50');
	volumeslider = createSlider(0, 1, 0.5, 0.1);
	volfullspan = createElement('span');
	volfullspan.html('100');

//   song=loadSound(file1); 
//    print(file1);
	createCanvas(710,400);
//    input = createFileInput(handleFile);
//    input.position(20,20)
//    print(file1);
//    song = loadSound(file1,loaded);
    noFill();
    seekerspan = createElement('span');
	seekerspan.html('seeker');
	seekvalue = createElement('span');
	seekvalue.html('0');
	seeker = createSlider(0, song.duration(), 0, 1);
	seekfull = createElement('span');
	seekfull.html(parseInt(song.duration()));
	seeker.changed(seekthesong);

createElement('br');
	
	createElement('br');
    //print('I  m here');
	playpausebtn = createButton('play');
	playpausebtn.mousePressed(playpausefn);
	stopbtn = createButton('stop');
	stopbtn.mousePressed(stopfn);
	createElement('br');
	
//	volsliderspan = createElement('span');
//	volsliderspan.html('volume slider');
//	volvaluespan = createElement('span');
//	volvaluespan.html('50');
//	volumeslider = createSlider(0, 1, 0.5, 0.1);
//	volfullspan = createElement('span');
//	volfullspan.html('100');
	createElement('br');
	
//	seekerspan = createElement('span');
//	seekerspan.html('seeker');
//	seekvalue = createElement('span');
//	seekvalue.html('0');
//	seeker = createSlider(0, song.duration(), 0, 1);
//	seekfull = createElement('span');
//	seekfull.html(parseInt(song.duration()));
//	seeker.changed(seekthesong);
	createElement('br');

	playbackratespan = createElement('span');
	playbackratespan.html('play back rate');
	playbackratenow = createElement('span');
	playbackratenow.html('1');
	playbackrateslider = createSlider(0.5, 1.5, 1, 0.1);
	playbackratefull = createElement('span');
	playbackratefull.html('1.5');
	createElement('br');
    createElement('br');
	

	favpartspan = createElement('span');
	favpartspan.html('listen to my favorite part');
	favpartbtn = createButton('click here');
	favpartbtn.mousePressed(favpartseek);

//    osc = new p5.Oscillator();
//  osc.amp(0);
//  osc.start();
	fft = new p5.FFT();
	fft.setInput(song);
}
function greet(){
    file1=input.value();
    fft = new p5.FFT(0.8,file1);
	fft.setInput(song);

}
//function loaded(){
//   if(song.isLoaded){
//    	
//}

//function handleFile(file){
//    file1=file.name;
//        print(file1);
//}


function draw() {
	song.setVolume(volumeslider.value());
	song.rate(playbackrateslider.value());
	seeker.value(song.currentTime());
	volvaluespan.html(volumeslider.value() * 100);
	seekvalue.html(parseInt(song.currentTime()));
	playbackratenow.html(song.rate());

text(input,50,50);

	background(200);
//var freq = map(mouseX, 0, 800, 20, 15000);
//  freq = constrain(freq, 1, 20000);
//  osc.freq(freq);

	var spectrum = fft.analyze();
//	beginShape();
//	for (i = 0; i < spectrum.length; i++) {
//		vertex(i, map(spectrum[i], 0, 255, height, 0) );
//	}
//	endShape();
   // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
      //background(200);
      fill(255,0,0);
      stroke(255);
      text('Freq: ' + round(spectrum[i]) , 10, 10);
  fill(0,255,0);
    noStroke();
      var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  
  }
     //text('Freq: ' + round(spectrum)+'Hz', 10, 10);
    
    var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
      
      
      var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
      text('Time: ' + (waveform[i]), 100, 10);
  }
    
    
  endShape();

}

function seekthesong() { song.jump(seeker.value()); }
function changeplaybackrate() { song.rate(playbackrateslider.value()); }
function favpartseek() { var favpartsecond = 85; seeker.value(favpartsecond); song.jump(favpartsecond); }

function playpausefn() {
	if(!song.isPlaying()) {
		song.play();
		playpausebtn.html('pause');
	}
	else {
		song.pause();
		playpausebtn.html('play');
	}
}

function stopfn() { 
	playpausebtn.html('play');
	seeker.value(0);
	song.stop();
}