let slime1, slime2,slime3,slime4,slime5,slime6, slime7, slime8, slime9;
let explodeAmmount =0
let picDots = [];
let picTime =0;
let picSize;
let colorMode, nightMode;
let randx1, randy1,randx2, randy2;


function preload(){
  slime1 = loadImage('creativeCoding/images/orangeslime1.jpg');
  slime2 = loadImage('creativeCoding/images/slime2.jpg');
  slime3 = loadImage('creativeCoding/images/greyslime3.jpg');
  slime4 = loadImage('creativeCoding/images/pinkslime4.jpg');
  slime5 = loadImage('creativeCoding/images/beigeslime5.jpg');
  slime6 = loadImage('creativeCoding/images/tanslime6.jpg');
  slime7 = loadImage('creativeCoding/images/limeslime7.jpg');
  slime8 = loadImage('creativeCoding/images/purpleslime8.jpg');
  slime9 = loadImage('creativeCoding/images/coralslime9.jpg');
  webcursor = loadImage('creativeCoding/images/cursor2jpg.jpg')
}

function setup() {
  pixelDensity(1) 
  let canvas = createCanvas(600, 600);
  canvas.parent("slimeMoldScreenCanvas");
  background(0); 
  noCursor();

  picSize = 50;
  colorMode = true;
  nightMode = true;
  slime1.loadPixels() 
  slime2.loadPixels() 
  slime3.loadPixels() 
  slime4.loadPixels() 
  slime5.loadPixels() 
  slime6.loadPixels() 
  slime7.loadPixels() 
  slime8.loadPixels() 
  slime9.loadPixels() 

 createPicDots(slime1, 356, 0, 0);
 createPicDots(slime2, 700, picSize * 4, 0);
 createPicDots(slime3, 575, picSize * 8, 0);
 createPicDots(slime4, 339, 0, picSize * 4);
 createPicDots(slime5, 736, picSize * 4, picSize * 4);
 createPicDots(slime6, 768, picSize * 8, picSize * 4);
 createPicDots(slime7, 743, 0, picSize * 8);
 createPicDots(slime8, 600, picSize * 4, picSize * 8);
 createPicDots(slime9, 3024, picSize * 8, picSize * 8);
 
 
}


function draw() {
  for (let i=0; i<picDots.length; i++){
    picDots[i].display();
    picDots[i].move();
  } 

  if(nightMode==true){
    loadPixels()

    for(let x=0; x<width; x++){
      for(let y=0; y<height; y++){
        let distance = dist(x,y, mouseX, mouseY)
        if(colorMode==true){
          let braincircle = map(distance, 0, 845, 0, 5)
          let loc = (x+(y*width))*4
          pixels[loc] *= braincircle
          pixels[loc+1] *=braincircle
          pixels[loc+2] *=braincircle*2
          pixels[loc+3] = 255
        } else {
          let braincircle = map(distance, 0, 845, 0, 200)
          let loc = (x+(y*width))*4
          pixels[loc] -= braincircle
          pixels[loc+1] -=braincircle
          pixels[loc+2] -=braincircle*2
          pixels[loc+3] = 255
        }
      }
    }
    updatePixels()
    tint(255, 30);
    let webx = constrain(mouseX, 0, 600)
    let weby = constrain(mouseY, 0, 600)
    image(webcursor, webx-(webcursor.width), weby-(webcursor.height*1.5),webcursor.width*2, webcursor.height*3)
  }
  //console.log("\npixelsarray:",pixels.length/4,"\nmouseX:",mouseX,"\nmouseY:",mouseY, "\ncolorMode:",colorMode,"\nrandy1:",randy1,)
  print("press the mouse or any key to interact")
}

function mousePressed(){
  colorMode = !colorMode
}

function keyPressed(){
  nightMode = !nightMode
}

class picDot{

  constructor (x,y,scale, r,g,b){
    this.x =x; 
    this.y = y;
    this.scale = scale;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  display(){
    noStroke()
    fill(this.r,this.g, this.b, 255)
    ellipse(this.x, this.y, this.scale, this.scale)
  }
  move(){
    this.x+=random(-.2,.2)
    this.y+=random(-.2,.2)
  }
}

function createPicDots(picture, OGsize, xpos,ypos){
  for(let x=0; x<picSize; x+=1){
    for(let y=0; y<picSize; y+=1){
      let x1= round(map(x,0,picSize,0,OGsize))
      let y1= round(map(y,0,picSize,0,OGsize))
      let loc = (x1+(y1*picture.width))*4
      let r =  picture.pixels[loc];
      let g =  picture.pixels[loc+1];
      let b =  picture.pixels[loc+2];
      picDots.push(new picDot (xpos+(x*4),ypos+(y*4),2, r,g,b))
   }
 }
}
