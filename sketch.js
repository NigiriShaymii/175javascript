// Mic: Microphone.
// Record: Recording.
// Sound File: Replaying sound mix
// Sound Playing: Records sound mix. When done, transfer mix to soundFile.
// Reverb: Echo
var mic, record, soundFile, soundPlaying, reverb;

// Array for covid, blm, fire,and election sounds
var covid = [];
var blm = [];
var fire = [];
var election = [];
var covid1, blm1, fire1, election1; //Round and random of 0 and 1
var viralnum = [4]; // 4 index in array

// Sounds will add with speaker overtime. Use random() to pick one of the sounds per array.
// Different experiences relating to various issues from different POV.
// Remember, every unique experience is part of statistics...
// Your individuality, decision, relationship... is part of a big number...
// Counter for phases.
// Phase 1: Start screen
// Phase 2: Visualizing Virus and Mixing sounds
// Phase 3: Results, artist statement, and playback/reset
var phase = 1;

// Fast Fourier Transform
var fft, fft1, fft2, fft3, fft4;

var time = 30; // Length of recording in 30 seconds
var playingSound = false; // soundfile is playing back

// Buttons but not really.
var redoButt;
var playButt;
var startTime; // Start time
var seconds; // Seconds counter
var cough, chant, burn, vote; //for reverb

function preload() {
song = loadSound('bell.wav');

covid[0] = loadSound('Covid.mp3');
covid[1] = loadSound('covid2.mp3');
blm[0] = loadSound('blm.mp3');
blm[1] = loadSound('blm2.mp3');
fire[0] = loadSound('fire.mp3');
fire[1] = loadSound('fire2.mp3');
election[0] = loadSound('election1.mp3');
election[1] = loadSound('election2.mp3');

}

function setup() {
createCanvas(windowWidth, windowHeight);
colorMode(HSB);
angleMode(DEGREES);

//song.setVolume(0.1);
//song.play();

//mic set up
mic = new p5.AudioIn();
mic.start();

//record set up. Then, input speaker into the recording.
record = new p5.SoundRecorder();
record.setInput(mic);


//creates sound file. Will be played back after recording is done.
soundFile = new p5.SoundFile();

//assign FFT to this variable FFT(smoothing, lines);
fft = new p5.FFT(0, 64);
fft1 = new p5.FFT(0, 64);
fft2 = new p5.FFT(0, 64);
fft3 = new p5.FFT(0, 64);
fft4 = new p5.FFT(0, 64);

rectMode(CENTER);

startTime = new Date;

reverb = new p5.Reverb();

covid1 = round(random(0, 2));
blm1 = round(random(0, 2));
fire1 = round(random(0, 2));
election1 = round(random(0, 2));
}

function draw() {

background(0); // Black bg

//Switch instead of if/if else/else conditions. Easier to manage.
switch(phase) {
case 1:
opener();
console.log("phase 1");
break;
case 2:
speak();
console.log("phase 2");
break;
case 3:
reveal();
console.log("phase 3");
break;
default:
error();
console.log("error");
break;
}
}

// Phase 1
function opener() {
fill(255);
textAlign(CENTER);
text("When you speak, your message will be a contribution to the voice of 2020. \n\nClick anywhere in this window and verbally summarize your 2020 in " + time + " seconds.", width/2, height/2);

if(phase === 1 && mouseIsPressed)
{
timer(); //Start 30 second timer. !!
phase = 2;
}
}

// Phase 2
function speak() {

var spectrum1 = fft1.analyze();
var spectrum2 = fft2.analyze();
var spectrum3 = fft3.analyze();
var spectrum4 = fft4.analyze();
viralnum[0] = new Virus(spectrum1, 20, 10, song, 1, 0);
viralnum[1] = new Virus(spectrum2, 70, 50, song, 2, 0);
viralnum[2] = new Virus(spectrum3, 50, 150, song, 3, 0);
viralnum[3] = new Virus(spectrum4, 30, 200, song, 4, 0);

// Spawns a "virus"
// ONLY IF conditions. NOT IF/ELSE
if(seconds >= 5 && seconds < 25) // Add Covid Sound
{
viralnum[0].spawn();
if( !covid[covid1].isPlaying()) {
covid[covid1].setVolume(0.1);
cough = covid[covid1];
cough.play();
}
//console.log("5 SEC");
}
if(seconds >= 10 && seconds < 25) // Add BLM Sound
{
viralnum[1].spawn();
if( !blm[blm1].isPlaying()) {
blm[blm1].setVolume(0.1);
chant = blm[blm1];
chant.play();
}
}
if(seconds >= 15 && seconds < 25) // Add Fire Sound
{
viralnum[2].spawn();
if( !fire[fire1].isPlaying()) {
fire[fire1].setVolume(0.1);
burn = fire[fire1];
burn.play();
}
//console.log("15 SEC");
}
if(seconds >= 20 && seconds < 25) // Add Election Sound
{
viralnum[3].spawn();
if( !election[election1].isPlaying()) {
election[election1].setVolume(0.1);
vote = election[election1];
vote.play();
}
//console.log("20 SEC");
}
if(seconds == 25)
{
reverb.process(cough, 1);
reverb.process(chant, 1);
reverb.process(burn, 1);
reverb.process(vote, 1);

cough.disconnect();
chant.disconnect();
burn.disconnect();
vote.disconnect();

}
if(seconds == 30)
phase = 3;
var vol = mic.getLevel();
//console.log("mic level " + mic.getLevel());

record.record(soundFile, time); // Recording your voice
//console.log("Recording!");

// Based on "Coding Train 17.9 - 17.11" videos
var spectrum = fft.analyze() ;
noStroke();
translate(width/2, height/2);

// create lines and update based on voice
beginShape();
for(var i = 0; i < spectrum.length; i++) {
// (i, red start, red end, yellow start, yellow end)
var angle = map(i, 0, spectrum.length, 0, 360);
var amp = spectrum[i];
var r = map(amp, 0, 250, 40 + random(vol * 500), 200);
//var r = map(amp, 0, 250, 100 + vol * 300, 200);

// Arrange lines into a circle
var x = r * cos(angle);
var y = r * sin(angle);

//warm colors
// !! HSB: Hue (based on degrees), Saturation, Brightness !! NOT RBG
stroke(i, 255, 255);
line(0, 0, x, y);
}
endShape();
//console.log(spectrum.length);
}

// Phase 3
function reveal() {
noStroke(); //Everything won't be yellow on phase 3
fill(255);
text("Your recorded voice is a part of a data collection of outbursts, confessions, and hope. \nThe message you spoke will not be remembered virtually but cherished biologically.\n\n Our stolen time became manipulated noises. \n\n\n\n Refresh the webpage to rerecord your 2020 confession.", width/2, height/2);

playButt = rect( width/2, 3 * height/4, 150, 50);

fill(0);
text("Listen to your \nsummary...", width/2, 3 * height/4);

// Acts as buttons. I tried createButton() and use button tags.
// Requires document.getblahblahblahTag("button");
// 1. Button spawns multiple times. Can get it to one with right code line placement.
// 2. Even if I solved problem 1, I need to find a way to implement attributes so I can call them to be visible or disappear. Need more time... move on to other finals. >:c

if(mouseX >= width/2 - 75 && mouseX <= width/2 + 75 && mouseY >= height/2 - 25 && mouseY <= height/2 + 25 && mouseIsPressed)
{
console.log('playing');
soundFile.play();
}
}

function timer() {

var startTime = new Date;

// Copy and paste timer code: https://stackoverflow.com/questions/34359818/javascript-setinterval-not-running-on-time

// The flaw is if currentTime.getSeconds() (based on real-time seconds), gets to 60, it will convert to 0 and mess up the timer.
// I modified it so it will continue to count without negative numbers and miscount.
// Timer is 30 seconds so Idk how it'll turn out after a minute. Oh well... I'm on the clock during finals week. Oh my god this part is annoying...
var interval = setInterval(function(){

var currentTime = new Date;

if(currentTime.getSeconds() >= startTime.getSeconds())
{
seconds =   Math.abs(currentTime.getSeconds() - startTime.getSeconds());
}
else if(currentTime.getSeconds() < startTime.getSeconds())
{
seconds =   Math.abs(60 - startTime.getSeconds() + currentTime.getSeconds())
}

console.log(currentTime.getSeconds() + " " + startTime.getSeconds());
console.log(seconds);

if(seconds === 30) // NOTE TO SELF: SET 59 AFTER EVERYTHING WORKS
{
// Stops replay
record.stop();
clearInterval(interval);
}
}, 1000);
}

function error() {
text("Switch Error.", width/2, height/2);
phase = 1;
}