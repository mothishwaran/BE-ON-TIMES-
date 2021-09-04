
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var initial_mothish;
var running_mothish;
var jumping_mothish;
var falling_mothish;
var back_Img;
var roadImg;

var obstacle_group;
var house_group;

var mothish;
var road;
var gamestates = "PLAY"

function preload()
{
	
  initial_mothish=loadAnimation("MOTHISH-INITIAL/22.png","MOTHISH-INITIAL/21.png","MOTHISH-INITIAL/20.png","MOTHISH-INITIAL/19.png",
  "MOTHISH-INITIAL/18.png","MOTHISH-INITIAL/17.png","MOTHISH-INITIAL/16.png","MOTHISH-INITIAL/15.png","MOTHISH-INITIAL/14.png",
  "MOTHISH-INITIAL/13.png","MOTHISH-INITIAL/12.png","MOTHISH-INITIAL/11.png","MOTHISH-INITIAL/10.png","MOTHISH-INITIAL/9.png",
  "MOTHISH-INITIAL/8.png","MOTHISH-INITIAL/7.png","MOTHISH-INITIAL/6.png","MOTHISH-INITIAL/5.png","MOTHISH-INITIAL/4.png"
  );
	
  running_mothish=loadAnimation("MOTHISH-RUNNING/8.png","MOTHISH-RUNNING/7.png","MOTHISH-RUNNING/6.png",
  "MOTHISH-RUNNING/10.png","MOTHISH-RUNNING/3.png");

  jumping_mothish=loadAnimation("JUMPING-MOTHISH/7.png","JUMPING-MOTHISH/6.png",
  "JUMPING-MOTHISH/5.png","JUMPING-MOTHISH/4.png","JUMPING-MOTHISH/3.png","JUMPING-MOTHISH/2.png","JUMPING-MOTHISH/1.png");

  falling_mothish=loadAnimation("FALLING-MOTHISH/2.png","FALLING-MOTHISH/2.png","FALLING-MOTHISH/1.png","FALLING-MOTHISH/1.png")

  back_Img=loadImage("background.png");

  roadImg=loadImage("road.png")

  house1Img = loadImage("house1.png")
  house2Img = loadImage("house2.png")
  house3Img = loadImage("house3.png")
  house4Img = loadImage("house4.png")
  house5Img = loadImage("house5.png")

  obstacle1 = loadImage("OBSTACLE/CORONA.png")
  obstacle2 = loadImage("OBSTACLE/STONE 1.png")
  obstacle3 = loadImage("OBSTACLE/STONE 2.png")
  obstacle4 = loadImage("OBSTACLE/STONE 3.png")
  obstacle5 = loadImage("OBSTACLE/STONE 4.png")
}

function setup() {
  canvas = createCanvas(displayWidth-400,530);
 



	//Create the Bodies Here.
road=createSprite(400,500,40,40);
road.addImage(roadImg);
road.scale=0.05;

mothish = createSprite(100,350)
mothish.addAnimation("initial",running_mothish)
mothish.addAnimation("falling",falling_mothish)
mothish.scale = 0.2
mothish.debug = true
mothish.setCollider("rectangle",0,0,30,1000)

obstacle_group = new Group()
house_group = new Group()
	


}


function draw() {
  
  background(back_Img) ;
  
  if(gamestates == "PLAY"){
    spawnhouses()
    spawnobstacles() 
    
     if(mothish.isTouching(obstacle_group)){
     gamestates = "END"
     
  }

  }else if(gamestates == "END"){
    obstacle_group.setVelocityXEach(0)
    house_group.setVelocityXEach(0)
    mothish.changeAnimation("falling",falling_mothish)
    obstacle_group.setLifetimeEach(-1)
    house_group.setLifetimeEach(-1)
  }


  drawSprites();
 
}

function spawnhouses(){
  if(frameCount %300==0){
    var house= createSprite(width,280)
    var rand = Math.floor(Math.random()*4 +1)

    switch(rand){
      case 1:
        house.addImage(house1Img)
        break

        case 2:
          house.addImage(house2Img)
          break

          case 3:
        house.addImage(house3Img)
        break

        case 4:
        house.addImage(house4Img)
         
        break

        case 5:
        house.addImage(house5Img)
        break

        default:break
    }
    house.lifetime = 300
    house.velocityX = -5
    house.scale = 0.3
    mothish.depth = house.depth+1
    house_group.add(house)
    house.debug = true
  
  }
}

function spawnobstacles(){
  if(frameCount %300==0){
    var stone= createSprite(width,450)
    var rand = Math.floor(Math.random()*4 +1)

    switch(rand){
      case 1:
        stone.addImage(obstacle1)
        stone.scale = 0.1
      
        break
        case 2:
          stone.addImage(obstacle2)
          stone.scale = 0.3
            
          break

          case 3:
        stone.addImage(obstacle3)
        stone.scale = 0.3
        
        break

        case 4:
        stone.addImage(obstacle4)
        stone.scale = 0.3
          
        break

        case 5:
        stone.addImage(obstacle5)
        stone.scale = 0.3
         
        break

        default:break
    }
    stone.lifetime = 300
    stone.velocityX = -3
    obstacle_group.add(stone)
    stone.debug = true
    mothish.depth = stone.depth +1


  }
}
