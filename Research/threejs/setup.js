// Scene
scene.background = new THREE.Color( 0xffffff )

// Camera
scene.add(camera)

// Renderer
function ResizeRenderer(width, height)
{
  let x = 0, y = 0, size = 0
  
  if(height < width)
  {
    x = (width/2) - (height/2)
    size = height
  }
  else if(width> height)
  {
    y = (height/2) - (width/2)
    size = width
  }
  else // assume width === height
  {
    size = height
  }
  renderer.setSize( width, height )
  renderer.setViewport(x,y,size,size)
}
ResizeRenderer(getCanvasWidth(),getCanvasHeight() )
container.appendChild( renderer.domElement )

// Lights
pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set(1,1,2)
camera.add(pointLight)

// Scene creation
levelLoader.loadLevel()


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
var actionManager = new ActionManager
// every frame
function animate() 
{
  requestAnimationFrame( animate )
  // ----------
  objectManager.animateAll(iFrame)
  UpdateControls()
  actionManager.update()  
  // ----------
  iFrame = iFrame >= 60 ? 1 : iFrame+1 // loops from 1 to 60 to 1 ... 
  renderer.render( scene, camera )
}
animate();

function btnPlay_Pressed()
{
  ResetLevel()
  GenerateCode(event,'simulated')
  StartAnimation()
}

function ResetLevel()
{
  microbit.reset()
  actionManager.reset()
}

// Short delay to allow user to acknowledge level has been reset
function StartAnimation()
{
  setTimeout(function(){ actionManager.running = true }, 1000)
}

window.addEventListener(`resize`, threejs_OnResize)

function threejs_OnResize()
{
  let newWidth = getCanvasWidth()
  let newHeight = getCanvasHeight()
  ResizeRenderer(newWidth,newHeight)
  camera.aspect = newWidth / newHeight
}