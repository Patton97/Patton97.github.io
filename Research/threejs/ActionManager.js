class Action
{
  constructor(name, frameLength)
  {
    this.name = name
    this.frameLength = frameLength
  }
}

class ActionManager
{
  constructor()
  {
    this.actionList = []
    this.running = false
    this.actionNumber = 0
    this.actionFrame = 0
    this.predictionSuccess = true
    this.position = new THREE.Vector2(0, 0)
    this.facing = new THREE.Vector2(0, 1)
    this.reset()
  }
  addAction(name, frameLength)
  {
    //if prediction has reached fail state, ignore all further actions
    if(!this.predictionSuccess) { return }
    this.actionList.push(new Action(name, frameLength))
  }
  addAction_MoveForward()
  {
    this.addAction('MoveForward', 200)
    this.addAction_Stop()
    
    this.evaluate(1)
  }
  addAction_MoveBackward()
  {
    this.addAction('MoveBackward', 200)
    this.addAction_Stop()
    this.evaluate(-1)
  }
  addAction_TurnLeft()
  {
    this.addAction('TurnLeft', 180)
    this.addAction_Stop()
    
    //surely a better way
    this.facing.set(this.facing.y, -this.facing.x)
  }
  addAction_TurnRight()
  {
    this.addAction('TurnRight', 180)
    this.addAction_Stop()

    //surely a better way
    this.facing.set(-this.facing.y, this.facing.x)
  }
  addAction_Stop() { this.addAction('Stop', 60) }
  addAction_TurnOnLeftLED()  { this.addAction('TurnOnLeftLED',   10) }
  addAction_TurnOnRightLED() { this.addAction('TurnOnRightLED',  10) }
  addAction_TurnOnBothLED()  { this.addAction('TurnOnBothLED',   10) }
  addAction_TurnOffLeftLED() { this.addAction('TurnOffLeftLED',  10) }
  addAction_TurnOffRightLED(){ this.addAction('TurnOffRightLED', 10) }
  addAction_TurnOffBothLED() { this.addAction('TurnOffBothLED',  10) }
  evaluate(direction)
  {
    if(!this.predictionSuccess) { return }

    this.position.add(this.facing.multiplyScalar(direction))
    
    if(!this.isValidPosition())
    {
      this.predicting = false
      this.predictionSuccess = false
    }
  }
  isValidPosition(position)
  {
    // if no position provided, assume they mean the current position
    position = position ? position : this.position 
    
    // if off-grid
    if(position.x < 0 || position.x >= levelLoader.levelWidth
    || position.y < 0 || position.y >= levelLoader.levelHeight)
    {
      return false
    }

    // if grass tile    
    let tileType = levelLoader.levelGrid[position.y][position.x]
    if(!levelLoader.dataJSON.tiles[tileType].safe)
    {
      return false
    }

    // otherwise
    return true
  }
  isJourneyComplete()
  {
    if(this.position.x === levelLoader.destinationPos.x 
    && this.position.y === levelLoader.destinationPos.y)
    {
      console.log(`position:    ${this.position.x}, ${this.position.y}`)
      console.log(`destination: ${levelLoader.destinationPos.x }, ${levelLoader.destinationPos.y}`)
      return true
    }
    return false
  }
  update()
  {
    if(!this.running){return}
    if(this.actionNumber < this.actionList.length)
    {
      this.perform(this.actionList[this.actionNumber])
    }
    else
    {
      this.finalise()
      this.reset()
    }
  }
  perform(action)
  {
    if(!(action.name in actionDictionary)) 
    {
      console.log(`${action.name} has no implementation`)
      return
    }
    actionDictionary[action.name]() // call action func via dictionary of "delegates" (not really delegates, but same idea)

    this.actionFrame++
    if(this.actionFrame >= action.frameLength)
    {
      this.actionNumber++
      this.actionFrame = 0
    } 
  }
  finalise()
  {
    OnJourneyComplete(this.isJourneyComplete())
  }
  reset()
  {
    this.actionList = []
    this.running = false
    this.actionNumber = 0
    this.actionFrame = 0
    this.predicting = false
    this.predictionSuccess = true
    this.position.set(levelLoader.startingPos.x, levelLoader.startingPos.y)
    this.facing.set(levelLoader.startingDir.x, levelLoader.startingDir.y)
  }
}

var actionDictionary = {
  'MoveForward'  : function() { microbit.setMoveSpeed(1)  },
  'MoveBackward' : function() { microbit.setMoveSpeed(-1) },
  'TurnLeft'  : function() { microbit.setRotSpeed(-1) },
  'TurnRight' : function() { microbit.setRotSpeed(1)  },
  'Stop' : function() { microbit.setMoveSpeed(0); microbit.setRotSpeed(0) },
  'TurnOnLeftLED'   : function() { microbit.turnOnLED(0)  },
  'TurnOnRightLED'  : function() { microbit.turnOnLED(1)  },
  'TurnOnBothLED'   : function() { microbit.turnOnLED(2)  },
  'TurnOffLeftLED'  : function() { microbit.turnOffLED(0) },  
  'TurnOffRightLED' : function() { microbit.turnOffLED(1) },  
  'TurnOffBothLED'  : function() { microbit.turnOffLED(2) }
}