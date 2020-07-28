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
  actionManager.reset()
  //load in new attempt
  GenerateCode(event,'simulated')
  //eval(code) // used for injecting mock code
  actionManager.running = true
}