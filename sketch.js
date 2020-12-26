var player, playerImage

var score, highscore, attackSpeed, attackInterval, distance, size, LeRi, RiLe

//obstacles
var HB, VB, HBrickImage, VBrickImage
var virus, virusLeft, virusRight


function preload(){
  //player
  playerImage = loadImage("Player Items/Player.png")

  //obstacles
  HBrickImage = loadImage("Obstacles/horizontal-brick.jpeg")
  VBrickImage  = loadImage("Obstacles/vertical-brick.jpeg")

  virusLeft  = loadImage("Obstacles/enemy1-left.png")
  virusRight = loadImage("Obstacles/enemy1-right.png")
}

function setup(){
  createCanvas(displayWidth, displayHeight)
  //setup
  attackSpeed = 24
  attackInterval = 24
  score = 0
  highscore = 0
  distance = 420
  size = 0.5
  LeRi = false
  RiLe = true

  //player
  player = createSprite(200,200)
  player.addImage(playerImage)
  player.scale = 0.007

  //obstacles
//bricks
  HB = createSprite(10000,100000)
  HB.addImage(HBrickImage)
  HB.velocityY = attackSpeed

  VB = createSprite(1000000,10000)
  VB.addImage(VBrickImage)
  VB.velocityX = attackSpeed

//virus
  virus = createSprite(1200, player.y)
  virus.addImage(virusLeft)
  virus.scale = 0.45

}


function draw(){
  background("white")

  //player
  player.x = mouseX 
  player.y = mouseY 

  //spawns in bricks
  brick()

  //virus
  Virus()

  //kill detection
  killDetection()

  //score
    fill("black")
    textSize(20)
    text("Your score is: " + score, 50, 50)
    if (score > highscore) {
      highscore = score;
    }
    text("Your highscore is: " + highscore, 50, 70)


  drawSprites()
}

function brick(){

  if (World.frameCount % attackInterval === 0) {

    BrickChoice = Math.floor(Math.random() * 3); 

    BrickAngle = Math.floor(Math.random() * 2); 

    if(BrickChoice === 1){

      if (BrickAngle === 1){
        //top to down
        HB = createSprite(player.x,player.y - distance)
        HB.addImage(HBrickImage)
        HB.velocityY = attackSpeed
        HB.lifetime = 600
        HB.scale = size
        score += 100
        //console.log("H brick fired " + BrickChoice)
      } else {
        //down to top
        HB = createSprite(player.x,player.y + distance)
        HB.addImage(HBrickImage)
        HB.velocityY = attackSpeed * -1
        HB.lifetime = 600
        HB.scale = size
        score += 100
        //console.log("H brick fired " + BrickChoice)
      }
    } else {
      if (BrickAngle === 1){
        //left to right
        VB = createSprite(player.x - distance,player.y)
        VB.addImage(VBrickImage)
        VB.velocityX = attackSpeed
        VB.lifetime = 600
        VB.scale = size
        score += 100
        //console.log("V brick fired " + BrickChoice)
      } else {
        //right to left
        VB = createSprite(player.x + distance,player.y)
        VB.addImage(VBrickImage)
        VB.velocityX = attackSpeed * -1
        VB.lifetime = 600
        VB.scale = size
        score += 100
        //console.log("V brick fired " + BrickChoice)        
      }

    }
  }
}

function killDetection(){
  if (player.isTouching(HB)){
  score = 0
}
  if (player.isTouching(VB)){
  score = 0
  }
}



function Virus(){

  console.log(virus.x)
  if (World.frameCount % 90 === 0 && World.frameCount > 1){
    console.log("virus shot")
    if (RiLe === true && virus.x > 700){
      virus.velocityX = -30
      LeRi = true
      RiLe = false
      console.log("virus shot right to left")
    } 
  }

  if (virus.x < 700 && RiLe === true){
    console.log("virus stopped")
    virus.VelocityX = 0
  }

    
    /*
    if (LeRi === true){
      virus.velocityX = -30
      LeRi = false
      RiLe = true      
      console.log("virus shot left to right")
    } else if (virus.x === 1200){
      virus.velocityX = 0
    }
  } else {
    virus.y = player.y
    */
  
}

