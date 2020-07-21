var scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff )
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 5
var renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )

document.body.appendChild( renderer.domElement )

pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set(1,1,2)
camera.add(pointLight)
scene.add(camera)

var objectManager = new ObjectManager()

var microbit1 = new Microbit()

function UpdateControls()
{  
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
  objectManager.animateAll()
  UpdateControls()  
  // ----------
  renderer.render( scene, camera )
}
animate();

// SCENE CONSTRUCTION
