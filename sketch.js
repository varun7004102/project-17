//creating objects
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage,bananaGroup
var obstacleGroup,obstacle, obstacleImage
var score
var survivalTime = 0;
var ground

//function preload and animation
function preload(){
 
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")       
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
//function setup 
function setup() {
 createCanvas(600, 600);
 //creating monkey 
   monkey = createSprite(80,315,20,20);
   monkey.addAnimation("running", monkey_running)
   monkey.scale = 0.1;
//creating ground 
   ground = createSprite(400,350,900,50);
   ground.x = ground.width /2;
   ground.velocityX = -4;
   console.log(ground.x)
 //creating groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
}
function draw() {
 background("white");
 
//game state play  
if(gameState === PLAY){
  
//creating text 
stroke("white");
textSize(20);  
fill("white")  
text("Score"+ score, 500,50) ; 
  
stroke("white");  
textSize(20);  
fill("black")
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time:"+ survivalTime, 300 ,50);

  //gound
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
 // space key to jump 
 if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  
//mokey collide to ground
  monkey.collide(ground);  
 //spawn objects randomly  
spawnBanana();
spawnObstacles();
 
  // if the monkey is touching the obstacles
   if(obstaclesGroup.isTouching(monkey)){
       gameState = END;     
   }  
} // game sytate play
 else if (gameState === END) {
 
   //ground and monkey velocity 
    ground.velocityX = 0;
    monkey.velocityY = 0 
 
   obstaclesGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0); 
   // giving life time
   obstaclesGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
 }
  // draw sprite
drawSprites();
}
// function spawn banana
function spawnBanana() {
if (frameCount % 80 === 0) {  
 var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
     
    banana.lifetime = 200;
       
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
       
    bananaGroup.add(banana);   
}
}
// creating obstacles
function spawnObstacles() {
if (frameCount % 300 === 0) {  
 var obstacles = createSprite(450,400,40,10);
    obstacles.y = Math.round(random(300,300));
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.1;
    obstacles.velocityX = -3;
     
    obstacles.lifetime = 200;
   
    obstaclesGroup.add(obstacles);  
}
}