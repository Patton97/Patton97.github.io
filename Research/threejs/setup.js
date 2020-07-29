// Scene
scene.background = new THREE.Color( 0xffffff )
// Camera
camera.rotateX(THREE.Math.degToRad(-90))
camera.translateZ(5)
camera.translateY(-2)
camera.translateX(2)
// Renderer
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT )
container.appendChild( renderer.domElement )

// Lights
pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set(1,1,2)
camera.add(pointLight)
scene.add(camera)

// Floor
function loadLevelGridFromFile()
{
  let levelData = readFromTextFile(`/Research/threejs/levels/level1.txt`)
  levelData = levelData.split(`\r\n`)
  console.log(levelData)
  let floorGrid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
  let x = 0, y = 0
  for(row in levelData)
  {
    for(char of levelData[row])
    {
      floorGrid[y][x] = parseInt(char)
      x++
    }
    x=0
    y++
  }
  return floorGrid
}
var tileFactory = new TileFactory
function loadLevel()
{
  let geo = new THREE.PlaneGeometry( 1, 1, 32 )
  let colours =  [0xC0C0C0, 0x0000C0]
  let floorGrid = loadLevelGridFromFile()

  for(let x = 0; x < floorGrid.length; x++)
  {
    for(let y = 0; y < floorGrid[x].length; y++)
    {
      let tileData = floorGrid[x][y]
      let floor = tileFactory.createRoadTile(colours[tileData])
      
      floor.rotateX(THREE.Math.degToRad(90))      
      floor.translateX(x)
      floor.translateY(y)
      floor.translateZ(0.3)

      scene.add(floor)
    }
  }
}
loadLevel()


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