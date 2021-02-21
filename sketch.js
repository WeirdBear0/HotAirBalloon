var balloon
var size = 50
var balloonPosition
var firebaseDB;
function preload(){
  balloonImage = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-02.png", "Hot Air Ballon-03.png","Hot Air Ballon-03.png", "Hot Air Ballon-04.png","Hot Air Ballon-04.png");
  backgroundImage = loadImage('Hot Air Ballon-01.png');
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  firebaseDB = firebase.database();
  console.log(firebaseDB)
  balloonPosition = firebaseDB.ref("Balloon/height");
  balloonPosition.on('value', readPos, showError)


  balloon = createSprite(400, 200, size, size);
  balloon.addAnimation("colors", balloonImage);
  balloon.scale = 0.5;
  
}

function draw() {

  background(backgroundImage);  
  drawSprites();
  if(keyDown(LEFT_ARROW)){
  Move(-10,0)
  }
  if(keyDown(RIGHT_ARROW)){
    Move(10,0)
  }
  if(keyDown(DOWN_ARROW)){
    Move(0,10)
    balloon.scale  = balloon.scale + 0.01

  }
  if(keyDown(UP_ARROW)){
    Move(0,-10) 
    balloon.scale  = balloon.scale - 0.01

  }
  
  
  if (frameCount%30 === 0){
    console.log(size)
  }

}

function Move(x,y){
  balloonPosition.set({
    "x" : height.x + x,
    "y" : height.y+y

  })
}

function readPos(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("There was an error updating to the database")
}