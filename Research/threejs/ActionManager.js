class Action
{
  constructor(name, frameLength)
  {
    this.name = name
    this.frameLength = frameLength
  }
}
var Action_MoveForward  = new Action('MoveForward', 200)
var Action_MoveBackward = new Action('MoveBackward', 200)
var Action_TurnLeft     = new Action('TurnLeft', 180)
var Action_TurnRight    = new Action('TurnRight', 180)
var Action_Stop         = new Action('Stop', 60)

class ActionManager
{
  constructor()
  {
    this.actionList = []
    this.running = false
    this.actionNumber = 0
    this.actionFrame = 0
    this.reset()
  }
  addAction(action)
  {
    this.actionList.push(action)
  }
  addAction_MoveForward()
  {
    this.addAction(Action_MoveForward)
    this.addAction_Stop()
  }
  addAction_MoveBackward()
  {
    this.addAction(Action_MoveBackward)
    this.addAction_Stop()
  }
  addAction_TurnLeft()
  {
    this.addAction(Action_TurnLeft)
    this.addAction_Stop()
  }
  addAction_TurnRight()
  {
    this.addAction(Action_TurnRight)
    this.addAction_Stop()
  }
  addAction_Stop()
  {
    this.addAction(Action_Stop)
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
      this.running = false
    }
  }
  perform(action)
  {
    if(!(action.name in actionDictionary)) 
    {
      console.log(`${action.name} has no implementation`)
      return;
    }
    actionDictionary[action.name]() // call action func via dictionary of "delegates" (not really delegates, but same idea)

    this.actionFrame++
    if(this.actionFrame >= action.frameLength)
    {
      this.actionNumber++
      this.actionFrame = 0
    } 
  }
  reset()
  {
    this.actionList = []
    this.running = false
    this.actionNumber = 0
    this.actionFrame = 0
  }
}

var actionDictionary = {
  'MoveForward': function() { microbit.setMoveSpeed(1) },
  'MoveBackward' : function() { microbit.setMoveSpeed(-1) },
  'TurnLeft' : function() { microbit.setRotSpeed(-1) },
  'TurnRight' : function() { microbit.setRotSpeed(1) },
  'Stop' : function() { microbit.setMoveSpeed(0); microbit.setRotSpeed(0) }
}