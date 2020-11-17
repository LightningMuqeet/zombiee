var survivor, survivor1, BG, zombie,zombieH, zombieD,HumanGroup,DogGroup ;
var gameState, lives, bgm, zDeath, bullet1, bulletGroup ;

function preload()
{
  BG = loadImage("survivor background.jpg");
  survivor1 = loadAnimation("shot1.png","Shot2.png ", "shot3.png ")
  zombieH = loadAnimation("step1.png","step2.png","step3.png","step4.png","step5.png")
  zombieD = loadAnimation("d1.png","d2.png", "d3.png")
 // bgm = loadSound("Background.mp3");
  zDeath = loadSound("Death sound.mp3")
  bullet1 = loadImage("bullet.png")
}

function setup() 
{
  createCanvas(displayWidth,displayHeight);
  survivor= createSprite(50,displayHeight-150 ,20,20);
  survivor.addAnimation("survivor",survivor1);
  HumanGroup = new Group();
  DogGroup = new Group();
  bulletGroup = new Group();
  lives = 5;
  gameState = 1;
 
  
}

function draw() {
  background(BG);  
 // bgm.loop();
  
 
  if(gameState === 1)
  { 
  if(keyDown("UP_ARROW"))
  {
    survivor.y = survivor.y-5;
  }
     
  if(keyDown("DOWN_ARROW"))
  {
    survivor.y = survivor.y+5;
  }

    
  if(keyDown("LEFT_ARROW"))
  {
    survivor.x = survivor.x-5
  }

  if(keyDown("RIGHT_ARROW"))
  {
    survivor.x = survivor.x+5
  }
  if(HumanGroup.isTouching(survivor))
  {
    lives = lives - 1;
  }

  if(DogGroup.isTouching(survivor))
  {
    lives = lives - 1;
  }
  if(lives === 0)
  {
    gameState = 2;
  }

  if(keyWentDown("SPACE"))
  {
    spawnBullet();
  }

   if(bulletGroup.isTouching(HumanGroup))
   {
     bulletGroup.destroyEach();
     HumanGroup.destroyEach();
     zDeath.play();

   }
   if(bulletGroup.isTouching(DogGroup))
   {
    bulletGroup.destroyEach();
    DogGroup.destroyEach();
   }
}
   if(gameState === 2)
   {
     fill("Green")
     testSize = 150;
     text("IF YOU CAN'T BEAT EM JOIN EM! I guess thats what you did right now. ", displayWidth/2,displayHeight/2)

   }
  spawnZombies2()
    spawnZombies1();
    drawSprites();
    fill("RED")
    textSize(20);
    text("LIVES: " + lives, 20,150 );
    console.log(survivor.x +":" + survivor.y)
    text(mouseX+":"+ mouseY, 500,500)

}




      function spawnZombies2() {
        //write code here to spawn the clouds
        if (frameCount % 100 === 0) {
          var zombie = createSprite(width+20,height-10,40,10);
          zombie.y = Math.round(random(height-120,height-5));
          zombie.addAnimation("human",zombieH);
          
          zombie.velocityX = random(-2,-6);
          
           //assign lifetime to the variable
           zombie.lifetime = 400;
          
            HumanGroup.add(zombie);    
        }
 }

    function spawnZombies1() {
    //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var zombie2 = createSprite(width+20,height-10,40,10);
    zombie2.y = Math.round(random(height-150,height-10));
    zombie2.addAnimation("dog",zombieD);
    zombie2.scale = 0.5;
    zombie2.velocityX = random(-3,-7);
    
     //assign lifetime to the variable
     zombie2.lifetime = 400;
    
    DogGroup.add(zombie2)

  }
} 

function spawnBullet() {
  //write code here to spawn the clouds

  var bullet = createSprite(survivor.x+40,survivor.y-30,40,10);
  bullet.addImage(bullet1)
  
  //bullet.addAnimation("dog",zombieD);
  bullet.scale = 0.04;
  bullet.velocityX = 50;
  
   //assign lifetime to the variable
   bullet.lifetime = 400;
  
 bulletGroup.add(bullet)


} 