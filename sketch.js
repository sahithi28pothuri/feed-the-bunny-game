const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;
var shelf;
var bubble,bubbleImg;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  //it should be bubbleImg
  bubbleImg=loadImage("bubble.png");
  //bubble=loadImage("bubble.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
    createCanvas(500,700);
    
    frameRate(80);

    bk_song.play();
    bk_song.setVolume(0.5);

    engine = Engine.create();
    world = engine.world;

    //btn 1
    button = createImg('cut_btn.png');
    button.position(5,400);
    button.size(50,50);
    button.mouseClicked(drop);

    //btn 2
    button2 = createImg('cut_btn.png');
    button2.position(150,285);
    button2.size(60,60);
    //button2.mouseClicked(drop2);
  
    mute_btn = createImg('mute.png');
    mute_btn.position(450,20);
    mute_btn.size(50,50);
    mute_btn.mouseClicked(mute);
    
    rope = new Rope(3,{x:20,y:400});
    rope2 = new Rope(6,{x:170,y:290});
      
    shelf = new Ground(250,60,50,20);
    blink.frameDelay = 20;
    eat.frameDelay = 20;

    bunny = createSprite(230,60,100,100);
    bunny.scale = 0.2;

    bunny.addAnimation('blinking',blink);
    bunny.addAnimation('eating',eat);
    bunny.addAnimation('crying',sad);
    bunny.changeAnimation('blinking');
    //No quotes for sprites, removed quotes
    bubble=createSprite(160,450,10,10);
    bubble.addImage(bubbleImg);
    bubble.scale = 0.1;
    
    fruit = Bodies.circle(300,300,20);
    Matter.Composite.add(rope.body,fruit);

    fruit_con = new Link(rope,fruit);
    fruit_con_2 = new Link(rope2,fruit);

    rectMode(CENTER);
    ellipseMode(RADIUS);
    textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  
  shelf.show();
  drawSprites();

  // var d = dist(fruit.position.x,fruit.position.y,bunny.position.x,bunny.position.y);
  // console.log(d);

  if(collide(fruit,bunny,90)==true)
  {
    bunny.changeAnimation('eating');
    bk_song.stop();
    eating_sound.play();
    console.log("hii")
    cut_sound.play();
    rope2.break();
    //fruit_con_2.detach();
    //fruit_con_2 = null;
    
    bubble.visible = false; 
    World.remove(engine.world,fruit);
    fruit = null;
    
  }

  

  if(collide(fruit,bubble,40)==true)
  {
    engine.world.gravity.y = -1;
    bubble.position.x = fruit.position.x;
    bubble.position.y = fruit.position.y;

  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
  // if(collide(fruit,bubble)===true){
  //   //Its should be Matter.body.applyforce
  //   Matter.Body.applyForce(bubble,{x:0,y:0},{x:0.1,y:0.5});
  //   //fruit.Body.applyForce(ball,{x:0,y:0},{x:0.1,y:0.5});
  // }
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

//create remove rope function
// function remove_Rope()
// {
//   rope2.break();
//   fruit_con_2.detach();
//   fruit_con_2 = null; 
// }

//passing one more argument to track distance between sprite and physics body
function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}