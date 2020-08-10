// levels are drawn as screens are (from top left)
//  0 1 2
// 0+
// 1  +
// 2    +

class LevelLoader
{
  constructor()
  { 
    this.dataJSON = readDataJSON()
    this.levelData = []
    this.startingPos = new THREE.Vector2(0,0)
    this.startingDir = new THREE.Vector2(0,0)
    this.levelWidth = 0
    this.levelHeight = 0
  }
  unloadLevel()
  {
    this.levelJSON = null
    microbit.translateX( this.startingPos.x)
    microbit.translateY(-this.startingPos.y)
    microbit.rotateX(THREE.Math.degToRad(90))
  }
  loadLevel()
  {
    this.unloadLevel()
    let levelID = localStorage.getItem("levelID")
    if(levelID === undefined)   {  levelID = 1}
    this.levelData = this.dataJSON.levels[levelID]
    this.levelGrid = this.levelData.grid
    this.startingPos = this.levelData.startingPos
    this.startingDir = this.levelData.startingDir
    this.createLevel()
    this.moveCamera()
    microbit.reset()
  }
  createLevel()
  {
    for(let y = 0; y < this.levelGrid.length; y++)
    {
      for(let x = 0; x < this.levelGrid[y].length; x++)
      {
        let tileData = this.levelGrid[y][x]
        let tileName = this.dataJSON.tiles[tileData].name
        let floor = tileFactory.create(tileName)
        
        floor.translateX(x)
        floor.translateY(-y)
        floor.translateZ(-0.3)
      }
      let rowWidth = this.levelGrid[y].length
      if(rowWidth > this.levelWidth) { this.levelWidth = rowWidth }
    }
    this.levelHeight = this.levelGrid.length
  }
  moveCamera()
  {
    camera.position.set(0,0,0)
    
    let offsetX = (this.levelWidth  - 1) * 0.5
    let offsetY = (this.levelHeight - 1) * 0.5
    camera.translateX(offsetX)
    camera.translateY(-offsetY)
    camera.translateZ(5)
  }
}

function readDataJSON()
{
  let tile_json = null
  $.ajax({
      'async': false,
      'global': false,
      'url': '/Research/threejs/levels/data.json',
      'dataType': "json",
      'success': function (data) {
        tile_json = data
      }
  })
  return tile_json
}