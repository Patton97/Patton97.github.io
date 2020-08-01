// levels are drawn as screens are (from top left)
//  0 1 2
// 0+
// 1  +
// 2    +

class LevelLoader
{
  constructor()
  { 
    this.levelData = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    this.tileDict = {
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
    this.levelWidth = 0
    this.levelHeight = 0
  }
  unloadLevel()
  {
    // reset microbit
    scene.remove(microbit)
    microbit = new Microbit
    
    microbit.translateX( this.startingPos.x)
    microbit.translateY(-this.startingPos.y)
    microbit.rotateX(THREE.MathUtils.degToRad(90))
  }
  loadLevel()
  {
    this.unloadLevel()
    this.levelData = this.readFileData()
    this.createLevel()
    this.moveCamera()
  }
  readFileData()
  {
    let fileData
    let i
    while( fileData === undefined)
    {
      fileData = readFromTextFile(`/Research/threejs/levels/level1.txt`)
      console.log(`Attempt #${i}: ${fileData}`)
      i++
    }    
    
    fileData = fileData.split(`\r\n`)
    let newLevelData = []
    let x = 0, y = 0
    
    for(let row in fileData)
    {
      newLevelData.push([])
      for(let char of fileData[row])
      {
        newLevelData[y].push(parseInt(char))

        let rowWidth = fileData[row].length
        if(rowWidth > this.levelWidth) { this.levelWidth = rowWidth }
        x++
      }
      x=0
      y++
    }
    this.levelHeight = fileData.length
    return newLevelData
  }
  createLevel()
  {
    let x = 0, y = 0
    for(let row in this.levelData)
    {
      for(let tile in this.levelData[row])
      {
        let tileData = this.levelData[row][tile]
        let floor = this.tileDict[tileData]()

        floor.translateX(x)
        floor.translateY(-y)
        floor.translateZ(-0.3)

        x++
      }
      x=0
      y++
    }
  }
  moveCamera()
  {
    // note: assumes all rows in level are of equal length
    let offsetX = (this.levelWidth  - 1) * 0.5
    let offsetY = (this.levelHeight - 1) * 0.5
    
    camera.translateX(offsetX)
    camera.translateY(-offsetY)
    camera.translateZ(5)
  }
}