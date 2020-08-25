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
    microbit.translateX(0)
    microbit.translateY(0)
    microbit.rotateX(THREE.Math.degToRad(90))
  }
  loadLevel()
  {
    this.unloadLevel()
    this.levelID = getLevelID()
    this.levelData = this.dataJSON.levels[this.levelID]
    this.levelGrid = this.levelData.grid
    this.startingPos = this.levelData.startingPos
    this.startingDir = this.levelData.startingDir
    this.destinationPos = this.levelData.destinationPos
    this.setDescription(this.levelData.description)
    this.updateNavButtons()
    this.createLevel()
    this.moveCamera()
    microbit.reset()
    setStatus(0)
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
        
        floor.translateX( x)
        floor.translateY(-y)
        floor.translateZ(-0.3)
      }
      let rowWidth = this.levelGrid[y].length
      if(rowWidth > this.levelWidth) { this.levelWidth = rowWidth }
    }
    this.levelHeight = this.levelGrid.length

    let star = tileFactory.create("Star")
    star.translateX( this.destinationPos.x)
    star.translateY(-this.destinationPos.y)
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
  setDescription(description)
  {
    document.getElementById(`levelDescription`).innerHTML = `Level ${this.levelID}: ${description}`
    threejs_OnResize()
  }
  updateNavButtons()
  {
    // if current levelID is 1 or lower, disable btnPrevLevel (otherwise, enable it)
    btnPrevLevel_SetDisabled(this.levelID <= 1)

    // if current levelID is the last available level, send user back to main menu
    if(this.levelID >= this.dataJSON.levels.length - 1)
    {
      btnNextLevel_SetFinish()
    }
    else
    {
      btnNextLevel_SetDisabled(false)
      // if current level is NOT complete, set btnNextLevel to "skip" (otherwise, set it to "next")
      btnNextLevel_SetSkip(!isLevelComplete(this.levelID))
    }    
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

function getLevelID()
{  
  // default levelID is 1
  if(!("levelID" in localStorage)) { setLevelID(1) }
  return parseInt(localStorage.getItem("levelID"))
}

function setLevelID(levelID)
{
  localStorage.setItem("levelID", levelID)
}

function getProgress()
{ 
  // level 0 is defaulted to complete
  if(!("progress" in localStorage))
  {
    let defaultProgress = []
    levelLoader.dataJSON.levels.forEach(level => {defaultProgress.push(false)})
    defaultProgress[0] = true
    setProgress(defaultProgress)
  }

  return JSON.parse(localStorage.getItem("progress"))
}

function setProgress(progress)
{
  localStorage.setItem("progress", JSON.stringify(progress))
}

function isLevelComplete(levelID)
{
  let complete = getProgress()[levelID]
  if(complete === undefined || complete === null) { complete = false }
  return complete
}
