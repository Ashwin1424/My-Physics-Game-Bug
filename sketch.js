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
var fruit_con_2, fruit_con_3;
var rope_2, rope_3;

var bg_img;
var food;
var rabbit;

var button;
var button_2, button_3;
var bunny;
//var blink,eat,sad;
//var mute_btn;

var canW, canH;

//var bk_song;
//var cut_sound;
//var sad_sound;
//var eating_sound;
//var air;
//var blower;

//var starImg;
//var star, star_2;
//var starScore, emptyStar, oneStar, twoStar;


function preload()
{
  bg_img = loadImage('ef48d217dc8e23a49277afc4dcf403c3.png');
  food = loadImage('download-removebg-preview.png');
  rabbit = loadImage('556-5567116_basket-cartoon-png-clipart-removebg-preview.png');
  //starImg = loadImage("star.png");



  //bk_song = loadSound('sound1.mp3');
  //sad_sound = loadSound("sad.wav")
  //cut_sound = loadSound('rope_cut.mp3');
  //eating_sound = loadSound('eating_sound.mp3');
  //air = loadSound('air.wav');

  //blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  //eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  //sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  //emptyStar = loadAnimation("empty.png");
  //oneStar = loadAnimation("one_star.png");
  //twoStar = loadAnimation("stars.png");
  
  //blink.playing = true;
  //eat.playing = true;
  //sad.playing = true;
  //sad.looping= false;
  //eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone | iPad | iPod | Android/i.test(navigator.userAgent);
  if (isMobile){
    canW = displayWidth;
    canH = displayHeight;
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
  }
  createCanvas(canW, canH);

  frameRate(80);

  //bk_song.play();
  //bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(canW/4,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button_2 = createImg('cut_btn.png');
  button_2.position(canW/2, 35);
  button_2.size(50, 50);
  button_2.mouseClicked(drop_2);

  button_3 = createImg('cut_btn.png');
  button_3.position(canW/2+50, 180);
  button_3.size(50, 50);
  button_3.mouseClicked(drop_3);
  rope_3
  rope = new Rope(10,{x:canW/4,y:30});
  rope_2 = new Rope(8, {x:canW/2+20, y:40});
  rope_3 = new Rope(6, {x:canW/2+100, y:200});
  ground = new Ground(canW/2,canH,canW,20);

  //blink.frameDelay = 20;
  //eat.frameDelay = 20;

  bunny = createSprite(canW/2,canH-100,100,100);
  bunny.scale = 0.2;

  //bunny.addAnimation('blinking',blink);
  //bunny.addAnimation('eating',eat);
  //bunny.addAnimation('crying',sad);
  //bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope_2, fruit);
  fruit_con_3 = new Link(rope_3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  //blower = createImg("balloon.png")
  //blower.position(canW/2-100, 350);
  //blower.size(150, 100);
  //blower.mouseClicked(airBlow);
  //blower.rotation = blower.rotation-50

  //mute_btn = createImg("mute.png");
  //mute_btn.position(canW-80, 30);
  //mute_btn.size(50, 50);
  //mute_btn.mouseClicked(mute);

  //star = createSprite(canW/2-100, 50, 20, 20);
  //star.addImage(starImg);
  //star.scale = 0.02

  //star_2 = createSprite(canW/4, 250, 20, 20);
  //star_2.addImage(starImg);
  //star_2.scale = 0.02

  //starScore = createSprite(70, 20, 30, 30);
  //starScore.addAnimation("empty", emptyStar);
  //starScore.addAnimation("oneS", oneStar);
  //starScore.addAnimation("twoS", twoStar);
  //starScore.changeAnimation('empty')
  //starScore.scale = 0.2;
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canW,canH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope_2.show();
  rope_3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  /*if(collide(fruit,bunny, 80)==true)
  {
    eating_sound.play();
    bunny.changeAnimation('eating');
  }

  if (collide(fruit, star, 20)== true){
    star.visible = false;
    starScore.changeAnimation('oneS');
  }

  if (collide(fruit, star_2, 20)== true){
    star_2.visible = false;
    starScore.changeAnimation('twoS');
  }*/

  if(fruit!=null && fruit.position.y>=650)
  {
    //sad_sound.play();
    //bunny.changeAnimation('crying');
    fruit=null;
     
   }
   
}

function drop()
{
  //cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 

}

function drop_2()
{
  //cut_sound.play();
  rope_2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 

}

function drop_3()
{
  //cut_sound.play();
  rope_3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 

}

function collide(body,sprite, x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              //World.remove(engine.world,fruit);
               //fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


/*function airBlow(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0, y:-0.03});
  air.play();
}

function mute(){
  if (bk_song.isPlaying()){
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}*/