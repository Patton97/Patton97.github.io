var moveSpeed = 0.01
var rotSpeed = 0.01

// true = pressed
var controls = {
  forward:   false,
  backward:  false,
  left:      false,
  right:     false,
  up:   false,
  down: false,  
  rotup:    false,
  rotdown:  false,
  rotleft:  false,
  rotright: false,
};

// acts as a referrer to controls dict (above), so mapping can be easily modified
let keys = {
  'KeyW': function(b) { MoveForward(b)  },
  'KeyS': function(b) { MoveBackward(b) },
  'KeyA': function(b) { MoveLeft(b)     },
  'KeyD': function(b) { MoveRight(b)    },
  'ShiftLeft'  : function(b) { MoveUp(b)   },
  'ControlLeft': function(b) { MoveDown(b) },
  'ArrowUp'  : function(b) { RotateUp(b)   },
  'ArrowDown': function(b) { RotateDown(b) },
  'ArrowLeft'  : function(b) { RotateCW(b)   },
  'ArrowRight': function(b) { RotateCCW(b) },
  'KeyQ': function(b) { RotateLeft(b) },
  'KeyE': function(b) { RotateRight(b) },
};

// b is a boolean, indicating if the key was pressed (true) or unpressed (false)
function MoveForward(b)  { controls.forward  = b }
function MoveBackward(b) { controls.backward = b }
function MoveLeft(b)     { controls.left     = b }
function MoveRight(b)    { controls.right    = b }
function MoveUp(b)       { controls.up       = b }
function MoveDown(b)     { controls.down     = b }
function RotateUp(b)     { controls.rotup    = b }
function RotateDown(b)   { controls.rotdown  = b }
function RotateLeft(b)   { controls.rotleft  = b }
function RotateRight(b)  { controls.rotright = b }
function RotateCW(b)     { controls.rotcw    = b }
function RotateCCW(b)    { controls.rotccw   = b }

function HandleKey(keycode, pressed) {
  if(!(keycode in keys)) 
  {
    console.log(`${keycode} has no implementation`)
    return;
  }
  
  // Signal key was pressed/unpressed (true/false)
  keys[keycode](pressed) 
}

function HandleWheel(deltaY)
{
  let newSpeed
  
  if(deltaY > 0) { newSpeed = moveSpeed - 0.01 }
  if(deltaY < 0) { newSpeed = moveSpeed + 0.01 }

  newSpeed = Clamp(newSpeed, 0.01, 0.1)
  newSpeed = Math.round((newSpeed + Number.EPSILON) * 100) / 100
  moveSpeed = newSpeed
}

function Clamp (number, min, max) {
  return Math.max(min, Math.min(number, max));
}

document.onkeydown = function(e) { HandleKey(e.code, true)  }
document.onkeyup   = function(e) { HandleKey(e.code, false) }
document.onwheel   = function(e) { HandleWheel(e.deltaY)    }