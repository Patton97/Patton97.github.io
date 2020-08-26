
---
while(!actionManager.isJourneyComplete())
{
  window.microbit_position = {x: actionManager.position.x, y: actionManager.position.y}
  window.microbit_position.x += actionManager.facing.x
  window.microbit_position.y += actionManager.facing.y
  if(actionManager.isValidPosition(window.microbit_position))
  {
    actionManager.addAction_MoveForward()
  }
  window.microbit_position = {x: actionManager.position.x, y: actionManager.position.y}
  if(actionManager.facing.x === 0)
  {
    window.microbit_position.x = actionManager.position.x + actionManager.facing.y
  }
  if(actionManager.facing.x === 1)
  {
    window.microbit_position.y = actionManager.position.y - actionManager.facing.x
  }
  if(actionManager.isValidPosition(window.microbit_position))
  {
    actionManager.addAction_TurnLeft()
  }
  window.microbit_position = {x: actionManager.position.x, y: actionManager.position.y}
  console.log('BEFORE: ' + window.microbit_position.x + ', ' + window.microbit_position.y)
  if(actionManager.facing.x === 0)
  {
    window.microbit_position.x = actionManager.position.x - actionManager.facing.y
  }
  if(actionManager.facing.x === 1)
  {
    window.microbit_position.x = actionManager.position.x + actionManager.facing.y
  }
  console.log('AFTER: ' + window.microbit_position.x + ', ' + window.microbit_position.y)
  if(actionManager.isValidPosition(window.microbit_position))
  {
    actionManager.addAction_TurnLeft()
  }
}