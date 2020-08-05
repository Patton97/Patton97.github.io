// levels are drawn as screens are (from top left)
//  0 1 2
// 0+
// 1  +
// 2    +

class LevelLoader
{
  constructor()
  { 
    this.tileData = readTileDataJSON()
    this.levelData = []
    this.tileDict = {
      "RoadBase"       : function() { return tileFactory.createRoadTile()},
      "RoadVertical"   : function() { return tileFactory.createRoadVertical()},
      "RoadHorizontal" : function() { return tileFactory.createRoadHorizontal()},
      "RoadCross"      : function() { return tileFactory.createRoadCross()},
      "RoadCornerTL"   : function() { return tileFactory.createRoadCorner(0)},
      "RoadCornerTR"   : function() { return tileFactory.createRoadCorner(1)},
      "RoadCornerBR"   : function() { return tileFactory.createRoadCorner(2)},
      "RoadCornerBL"   : function() { return tileFactory.createRoadCorner(3)},
      0: function() { return tileFactory.createRoadTile()},
      1: function() { return tileFactory.createRoadVertical()},
      2: function() { return tileFactory.createRoadHorizontal()},
      3: function() { return tileFactory.createRoadCross()},
      4: function() { return tileFactory.createRoadCorner(0)},
      5: function() { return tileFactory.createRoadCorner(1)},
      6: function() { return tileFactory.createRoadCorner(2)},
      7: function() { return tileFactory.createRoadCorner(3)},
    }
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
  loadLevel(levelID)
  {
    levelID = levelID || 0
    this.unloadLevel()
    this.levelData = this.tileData.levels[levelID]
    this.levelGrid = this.levelData.grid
    this.startingPos = this.levelData.startingPos
    this.startingDir = this.levelData.startingDir
    this.createLevel()
    this.moveCamera()
  }
  createLevel()
  {
    //let x = 0, y = 0
    for(let y = 0; y < this.levelGrid.length; y++)
    {
      for(let x = 0; x < this.levelGrid[y].length; x++)
      {
        let tileData = this.levelGrid[y][x]
        let floor = this.tileDict[tileData]()
        
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

function readTileDataJSON()
{
  let tile_json = null
  $.ajax({
      'async': false,
      'global': false,
      'url': '/Research/threejs/levels/leveldata.json',
      'dataType': "json",
      'success': function (data) {
        tile_json = data
      }
  })
  return tile_json
}