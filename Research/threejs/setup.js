// Scene
scene.background = new THREE.Color( 0xffffff )
// Camera
camera.rotateX(THREE.Math.degToRad(-90))
camera.translateZ(5)
// Renderer
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT )
container.appendChild( renderer.domElement )

// Lights
pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set(1,1,2)
camera.add(pointLight)
scene.add(camera)

// DEBUG CONTROLS ONLY
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

// SCENE CONSTRUCTION

//
function ExecuteUserCode()
{
  console.log("test")
}
