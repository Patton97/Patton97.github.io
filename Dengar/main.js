//TODO LIST
// Spawn cacti
// Animate dengar movement (pulse)
// Add star twinkle: rng spawn on black sky?  alt sprites?

// Restart
// Start menu
//End game sequence

/************************/
//Autozoom | https://benjymous.gitlab.io/post/2019-08-25-js13k-tips/
onresize=e=>{
  // Zoom the page to maximise content
  // Height = canvas=480 + gamepad=240 + gap= . Gap is bug fix.
  //document.body.style.zoom=Math.min(window.innerWidth/640, window.innerHeight/900);
  let zoom=Math.min(window.innerWidth/640, window.innerHeight/900);
  document.body.style.MozTransform = "scale("+zoom+")";
  document.body.style.MozTransformOrigin = "0 0";
  // Add padding at the top of the page, to centre the content vertically
  document.body.style.paddingTop=((window.innerHeight/document.body.style.zoom)-900)/2;
};
onresize(); //Force resize

// Set the left and right margins, to centre the content horizontally
document.body.style.maxWidth=640;
document.body.style.margin="auto";
/************************/

var context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 480;
context.canvas.width = 640;
var iFrame = 0;
const TILESIZE = 32; //Assume square tiles, 32x32
var gamestate = 1;// 0 Main menu | 1 Playing | 2 Dead
var spritesheet = {
  img: document.getElementById('spritesheet')
}

class Heart
{
  constructor() { this.activate(); }
  activate()    { this.active = true; }
  deactivate()  { this.active = false;}
  draw(i)
  {
    let sx = 160;
    let sy = this.active ? 32 : 0;//should probably flip
    let x = i*(TILESIZE + 8) + 8;
    let y = 8;

    context.drawImage(spritesheet.img,
                      sx,   sy, TILESIZE, TILESIZE,  //source image data
                      x,     y, TILESIZE, TILESIZE); //dest.  image data
  }
}

var character = {
  x:  600,  y:0,
  sx: 0,  sy: 0,
  xVel:   0,  yVel:0,
  jumping: true,
  hp: 3, grace:false, hearts: [new Heart(), new Heart(), new Heart()],
  update:function()
  {
    //Default spritesheet selection
    this.sx=32; this.sy=0;
    //Controller movement
    if(controller.up && !this.jumping)
    {
      this.yVel -= 20;
      this.jumping = true;
    }
    //Ignore input if both L&R are pressed
    if(!(controller.right && controller.left))
    {
      if(controller.left)  { this.xVel -= .5; this.sx=0; }
      if(controller.right) { this.xVel += .5; this.sx=64;}
    }

    //Physics
    this.yVel += 1; //Gravity
    this.xVel *= 0.9; //Friction (x)
    this.x += this.xVel;
    this.y += this.yVel;

    this.checkBoundaries();
    this.draw();
  },
  checkBoundaries:function()
  {
    //Floor
    if(this.y + TILESIZE > floor.y)
    {
      this.jumping = false;
      this.y = floor.y - TILESIZE;
      this.yVel = 0;
    }
    else
    {
      this.sy = 64;
    }
    //Sides of the screen
    if(this.x < 0) {this.x = 1; }
    if(this.x+TILESIZE > context.canvas.width) {this.x = context.canvas.width-TILESIZE}
  },
  draw:function()
  {
    context.drawImage(spritesheet.img,
                      this.sx,   this.sy,   TILESIZE, TILESIZE,  //source image data
                      this.x,    this.y,    TILESIZE, TILESIZE); //dest.  image data
    //Draw heartss
    for(let i = 0; i < this.hearts.length; i++)
    {
      this.hearts[i].draw(i);
    }
  },
  decreaseHealth:function()
  {
    if(!this.grace)
    {
      this.hp--;
      this.hearts[this.hp].deactivate();
      this.yVel -= 10;
      console.log("HIT! New HP: " + this.hp);
      this.gracePeriod();
    }
  },
  gracePeriod:function()
  {
    this.grace = true;
    setTimeout(function(){character.grace = false;}, 1000);
  },
};

//Stores img data on non-collidable tiles
//Note: Could probably just make this all tiles and extend subclasses
class bgTile
{
  constructor(sx,sy,width=32,height=32)
  {
    this.sx = sx;
    this.sy = sy;
    this.width  = width;
    this.height = height;
  }
}

class Scrollable
{
  constructor(height = 1, y = 0, speed = 1, sy = 0)
  {
    this.height = height;
    this.y = y;
    this.speed = speed;
    this.sy = sy;
    this.strips = [];
    this.offset = 0;

    //Generate initial strips (fill screen, plus 1 overflow for motion)
    for(let i = 0; i <= context.canvas.width / TILESIZE; i++)
    {
      this.makeNewStrip();
    }
  }
  makeNewStrip()
  {
    let newStrip = [];
    for(let i =0; i < this.height; i++)
    {
      let sx = 97 + Math.floor(Math.random() * 32);
      let sy = this.sy;
      let newTile = new bgTile(sx,sy);
      newStrip.push(newTile);
    }
    //Push new strip to 'strips' array
    this.strips.push(newStrip);
    //Remove head if screen is full (inc. +1 overflow)
    if(this.strips.length-1 > context.canvas.width / TILESIZE)
    {
      this.strips.shift();
    }

    if(this.offset >= 32)
    {
      this.offset = 0;
      //Cactus probability = (distance * -0.0002) + 0.4
      //meaning chance increases from 20% to 40% throughout game
      let cactuschance = (distance * -0.00004) + 0.5;
      if(Math.random() <= cactuschance)
      {
        let cactus = new Cactus(-TILESIZE);
      }
    }
  }
  draw()
  {
    //Assumes base speed (1) moves 16px per 60 frames
    this.offset += this.speed * (16/60);
    //Foreach strip (along x-axis, in reverse)
    for(let i = this.strips.length-1; i >= 0 ; i--)
    {
      //foreach tile in strip *i* (down y-axis)
      for(let j = 0; j < this.strips[i].length; j++)
      {
        //Expanded for readability
        let sx = this.strips[i][j].sx;
        let sy = this.strips[i][j].sy;
        let dx = (context.canvas.width - (i+1)*TILESIZE) + Math.floor(this.offset);
        let dy = j*TILESIZE + this.y;
        context.drawImage(spritesheet.img,
                          sx, sy, TILESIZE, TILESIZE,  //source image data
                          dx, dy, TILESIZE, TILESIZE); //dest.  image data
      }
    }
    //If furthest strip is offscreen, purge & replace
    if(this.offset >= 32)
    {
      this.makeNewStrip();
    }
  }
}

var sky   = new Scrollable(11,0,1);
var hills = new Scrollable(1,10*TILESIZE,1,32);
var floor = new Scrollable(4,context.canvas.height - 4*TILESIZE,10,64);

var controller = {
  left:false, right:false, up:false,
  keyListener:function(event)
  {
    var key_state = (event.type == "keydown")?true:false;
    switch(event.keyCode)
    {
      case 32://Space
        controller.up = key_state;
        break;
      case 37://L-arrow
      case 65://A
        controller.left = key_state;
        break;
      case 39://R-arrow
      case 68://D
        controller.right = key_state;
        break;
      default:
        console.log("Key #" + event.keyCode + " pressed");
        break;
    }
  },
  //Controller's update handles the gamepad img visuals
  update:function()
  {
    //Fairly ugly solution forgive me for my sins
    //Couldn't figure out to how crop-cut HTML<img> from spritesheet
    let filepath = 'gamepad';
    if (this.up) {filepath+='U'}
    //Ignore input if both L&R are pressed
    if(!(this.left && this.right))
    {
      if (this.left) {filepath+='L'}
      if (this.right){filepath+='R'}
    }
    document.getElementById('gamepad').src=filepath+'.png';
  }
};

//Gamepad controller for mobile
//Block default behaviour
cancelEvent=e=>{
  e.preventDefault();
  e.stopPropagation();
  e.cancelBubble = true;
  e.returnValue = false
};
gamepad.ontouchstart = gamepad.ontouchmove = gamepad.ontouchend = gamepad.ontouchcancel = cancelEvent;

//On Android and iOS, use touchstart/end
//Of course, firefox mobile doesn't work, because it sucks.
if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
{
  d = "touchstart";
  u = "touchend";
}
//On PC, use mousedown/up
else
{
  d = "mousedown";
  u = "mouseup";
};

//Event Handlers
//left
touchL.addEventListener(d,e=>{cancelEvent(e); controller.left=true; }, false);
touchL.addEventListener(u,e=>{cancelEvent(e); controller.left=false;}, false);
//Right
touchR.addEventListener(d,e=>{cancelEvent(e); controller.right=true; }, false);
touchR.addEventListener(u,e=>{cancelEvent(e); controller.right=false;}, false);
//Jump
touchJ.addEventListener(d,e=>{cancelEvent(e); controller.up=true; }, false);
touchJ.addEventListener(u,e=>{cancelEvent(e); controller.up=false;}, false);
//End of Gamepad stuff

var ObjectManager =
{
  gameObjects: [],
  update:function()
  {
    this.purgeInactive();
    this.checkAllCollisions();
    this.drawAll();
  },
  purgeInactive:function()
  {
    for(let i = 0; i < this.gameObjects.length; i++)
    {
      if(!this.gameObjects[i].active)
      {
        //You'd think this is a stupid idea and would break everything, but as
        // long as you don't splice 2 objects at the same time, it's safe :D
        delete this.gameObjects[i];
        this.gameObjects.splice(i,1);
      }
    }
  },
  checkAllCollisions:function()
  {
    for(let i = 0; i < this.gameObjects.length; i++)
    {
      this.gameObjects[i].checkCollisions();
    }
  },
  drawAll:function()
  {
    for(let i = 0; i < this.gameObjects.length; i++)
    {
      this.gameObjects[i].draw();
    }
  }
}

class GameObject
{
  constructor(x=0,y=0,width=TILESIZE,height=TILESIZE,sx=0,sy=0)
  {
    this.x=x; this.y=y;
    this.width=width; this.height=height;
    this.sx=sx; this.sy=sy;
    this.active=true;
    ObjectManager.gameObjects.push(this);
  }
  draw()
  {
    //Objects should move with floor
    this.x += floor.speed * (16/60);
    //Expanded for readability
    context.drawImage(spritesheet.img,         //Source spritesheet
                      this.sx,    this.sy,     //Source coords
                      this.width, this.height, //Source dimensions
                      this.x,     this.y,      //Destination coords
                      this.width, this.height);//Destination dimensions
    //If object is now offscreen, deactivate
    this.active = this.x < context.canvas.width;
  }
  checkCollisions()
  {
    //AABB collision test
    if(character.x < this.x + this.width
    && character.x + TILESIZE > this.x
    && character.y < this.y + this.height
    && character.y + TILESIZE > this.y)
    {
      this.processCollisions();
    }
    //If code reaches this point, no collision detected
    return false;
  }
  processCollisions()
  {
    //Default is to do nothing
    //Objects can override this function to
    //instigate contextual behaviour on collision
  }
}

class Cactus extends GameObject
{
  constructor(x)
  {
    //Randomly select which row to place cactus in
    let y = floor.y+(TILESIZE*(Math.floor(Math.random()*5) - 1));
    //Randomly select which cactus sprite to use
    let sx = (6*TILESIZE) + (TILESIZE * Math.floor(Math.random() * 2));
    let sy = 0;
    super(x,y,TILESIZE,TILESIZE,sx,sy);
  }
  processCollisions()
  {
    //TEMP SOLUTION - reject inactive
    if(this.active)
    {
      character.decreaseHealth();
      this.active = false;
    }
  }
}

var prevFrameTime=0;
var fps=0;
function drawFPS(iFrame)
{
  //Update value every 10 frames for better readability
  if(iFrame % 10 === 0)
  {
    fps = Math.floor(1000/(performance.now()-prevFrameTime));
  }
  prevFrameTime = performance.now();
  //Draw text every frame to avoid flickering
  context.font = "normal bold 1em courier new";
  context.fillStyle = "yellow";
  context.textAlign = "right";
  context.fillText(fps, context.canvas.width,10);
}

var distance = 5000; //meters (?)
function drawDistance()
{
  distance--;
  //Draw text every frame to avoid flickering
  context.font = "normal bold 1em courier new";
  context.fillStyle = "yellow";
  context.textAlign = "right";
  context.fillText(distance + "m", context.canvas.width,10);
}

var game =
{
  update:function()
  {
    switch(gamestate)
    {
      case 0://Main Menu
        break;
      case 1://Playing
        //Construct next frame
        context.fillStyle = "#3F3F3F";
        context.fillRect(0,0,context.canvas.width,context.canvas.height);
        sky.draw();
        hills.draw();
        floor.draw();
        character.update();
        ObjectManager.update();
        controller.update();
        drawDistance(distance);
        //DEBUG ONLY
        //drawFPS(iFrame);

        //Update iframe (yes ugly ew)
        if(iFrame < 60){iFrame++;}else{iFrame = 0;}

        //If char runs out of lives
        if(character.hp <= 0)
        {
          //Draw Game Over text
          context.fillStyle = "yellow";
          context.textAlign = "center";

          context.font = "normal bold 5em courier new";
          let x = context.canvas.width / 2;
          let y = (context.canvas.height / 2) - 32;
          context.fillText("GAME OVER", x,y);

          context.font = "normal bold 1.5em courier new";
          x = context.canvas.width  / 2;
          y = context.canvas.height / 2;
          context.fillText("Jump to try again!", x,y);

          gamestate = 2;
        }
        break;
      case 2://Dead
        //Press jump to try again (false = local cache reload)
        if(controller.up){window.location.reload(false);}
        break;
      default:
        console.log("INVALID GAMESTATE: " + gamestate);
        break;
    }
    //Request next frame, regardless of gamestate
    window.requestAnimationFrame(game.update);
  }
}


//Keyboard controls
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup",   controller.keyListener);
//Instigate game loop
window.requestAnimationFrame(game.update);
