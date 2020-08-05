// this script is similar to ActionManager.js but instead of moving the model,
// it instead predicts where the model *will* go at execution
/*
class ActionPredictor
{
  constructor()
  {
    this.actionList = []
    this.actionNumber = 0
    this.predicting = false
    this.predictionSuccess = false
    this.position = new THREE.Vector2(0, 0)
    this.facing = new THREE.Vector2(0, 1)
    this.reset()
  }
  moveForward()
  {
    this.addAction(actionDictionary_Fake['MoveForward'])
    this.addAction_Stop()
    this.predictionSuccess = this.evaluate(1)
  }
  evaluate(direction)
  {
    let newPosition = this.position + (this.facing * direction)
    if (!this.isValid(newPosition)) { return false }
  }
  isValid(position)
  {
    
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
      return
    }
    actionDictionary[action.name]() // call action func via dictionary of "delegates" (not really delegates, but same idea)

    this.actionNumber++
  }
  reset()
  {
    this.actionList = []
    this.actionNumber = 0
    this.predicting = false
    this.predictionSuccess = false
  }
}
*/