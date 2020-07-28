// Scene
scene.background = new THREE.Color( 0xffffff )
// Camera
camera.rotateX(THREE.Math.degToRad(-90))
camera.translateZ(5)
camera.translateY(-1)
// Renderer
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT )
container.appendChild( renderer.domElement )

// Lights
pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set(1,1,2)
camera.add(pointLight)
scene.add(camera)

// Floor
let geo = new THREE.PlaneGeometry( 1, 1, 32 )
let colours =  [0xff0000, 0x00ff00, 0x0000ff]
for(let i = 0; i < 3; i++)
{
  let mat = new THREE.MeshBasicMaterial( {color: colours[i], side: THREE.DoubleSide} )
  let floor = new THREE.Mesh(geo, mat)
  floor.translateZ(i)
  floor.translateY(-0.3)
  floor.rotateX(THREE.Math.degToRad(90))
  scene.add(floor)
}


// DEBUG CONTROLS ONLY (toggle in globals.js)
function UpdateControls()
{  
  if(!debug) { return }
  // Movement
  if(controls.forward)  { camera.translateZ(-moveSpeed) }
  if(controls.backward) { camera.translateZ( moveSpeed) }
  if(controls.left)     { camera.translateX(-moveSpeed) }
  if(controls.right)    { camera.translateX( moveSpeed) }
  if(controls.up)   { camera.translateY( moveSpeed) }
  if(controls.down) { camera.translateY(-moveSpeed) }
  // Rotation
  if(controls.rotleft)  { camera.rotateY( rotSpeed) }
  if(controls.rotright) { camera.rotateY(-rotSpeed) }
  if(controls.rotup)    { camera.rotateX( rotSpeed) }
  if(controls.rotdown)  { camera.rotateX(-rotSpeed) }
  if(controls.rotcw)    { camera.rotateZ( rotSpeed) }
  if(controls.rotccw)   { camera.rotateZ(-rotSpeed) }
}

// MOVE THIS SOMEWHERE
class Action
{
  constructor(actionName, frameLength)
  {
    this.actionName = actionName
    this.frameLength = frameLength
  }
}

var running = false
var actionNumber = 0
var actionList = []
var actionFrame = 0
// every frame
function animate() 
{
  requestAnimationFrame( animate )
  // ----------
  objectManager.animateAll(iFrame)
  UpdateControls()
  ExecuteUserCode()  
  // ----------
  iFrame = iFrame >= 60 ? 1 : iFrame+1 // loops from 1 to 60 to 1 ... 
  renderer.render( scene, camera )
}
animate();

function moveForward()
{
  actionList.push(new Action('moveForward', 200))
  actionList.push(new Action('stop', 60))
}
function moveBackward()
{
  actionList.push(new Action('moveBackward', 200))
  actionList.push(new Action('stop', 60))
}
function turnLeft()
{
  actionList.push(new Action('turnLeft', 180))
  actionList.push(new Action('stop', 60))
}

function resetLevel()
{
  running = false
  actionList = []
  action = 0
}
let code = 
`
moveForward()
moveForward()
moveBackward()
turnLeft()
`
function runTest()
{
  resetLevel()
  eval(code) //load in new attempt
  running = true
}

//
function ExecuteUserCode()
{
  if(!running){return}
  if(actionNumber < actionList.length)
  {
    Perform(actionList[actionNumber])
  }
  else
  {
    running = false
  }
}

function Perform(action)
{
  if(!(action.actionName in actionDictionary)) 
  {
    console.log(`${action.actionName} has no implementation`)
    return;
  }
  actionDictionary[action.actionName]()
  console.log(`${action.actionName} frame #${actionFrame}`)
  actionFrame++
  if(actionFrame >= action.frameLength)
  {
    actionNumber++
    actionFrame = 0
  }  
}

var actionDictionary = {
  'moveForward': function() { microbit.setMoveSpeed(1) },
  'moveBackward' : function() { microbit.setMoveSpeed(-1) },
  'turnLeft' : function() { microbit.setRotSpeed(-1) },
  'turnRight' : function() { microbit.setRotSpeed(1) },
  'stop' : function() { microbit.setMoveSpeed(0); microbit.setRotSpeed(0) }
}