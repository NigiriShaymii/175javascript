class Virus {
  constructor(spectrum, size, coloring, music, particle, speed) {
    this.spectrum = spectrum; // Grabs FFT
    this.size = size; // Length of the lines (int)
    this.coloring = coloring; // Start gradient (int)
    this.music = music;
    
    this.xdirection = 1; // Left or Right
    this.ydirection = 1; // Top to Bottom
    this.speed = speed;
    
    if( particle === 1)
      {
          this.xpos = 200;
          this.ypos = 200;

      }
    else if(particle === 2)
      {
          this.xpos = windowWidth - 200;
          this.ypos = 200;
      }
    else if(particle === 3)
      {
          this.xpos = 200;
          this.ypos = windowHeight - 200;        
      }
    else if(particle === 4)
      {
          this.xpos = windowWidth - 200;
          this.ypos = windowHeight - 200;        
      }

  }
  
  spawn() {
  
      // Based on "Coding Train 17.9 - 17.11" videos
    noStroke(); 
    
    //this.music.setVolume(0.01);
    //this.music.play();
  
    // create lines and update based on voice
    beginShape();
    for(var i = 0; i < this.spectrum.length; i++) {
      // (i, red start, red end, yellow start, yellow end)
      var angle = map(i, 0, this.spectrum.length, 0, 360);
      var amp = this.spectrum[i];
      var r = map(amp, 0, 250, this.size, 200);
      //var r = map(amp, 0, 250, 100 + vol * 300, 200);
    
      // Arrange lines into a circle
      var x = r * cos(angle);
      var y = r * sin(angle);
    
      //warm colors
      // !! HSB: Hue (based on degrees), Saturation, Brightness !! NOT RBG
      stroke(this.coloring, 255, 255);
      
        // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (this.xpos > windowWidth - 10 || this.xpos < 10) {
    this.xdirection *= -1;
  }
  if (this.ypos > windowHeight - 10 || this.ypos < 10) {
    this.ydirection *= -1;
  }
      
        // Update the position of the shape
      this.xpos = this.xpos + (this.speed * this.xdirection);
      this.ypos = this.ypos + (this.speed * this.ydirection);
      
      //console.log('VIRUS');
      //use this line to move the 'virus'
      line(this.xpos, this.ypos, x + this.xpos, y + this.ypos);
      //line(100, 100, x + 100 , y+ 100 );
      
      //console.log("xpos: " + this.xpos);
      //console.log("ypos: " + this.ypos);

    }
    endShape();
  }
}