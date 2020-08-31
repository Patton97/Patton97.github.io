from microbit import *
from random import randint
import neopixel
import music
I2caddr = 0x10

isRunning = True
isCrashed = False
isComplete = False

# --------------------------------------------------------------------------------
# UTILITY FUNCTIONS --------------------------------------------------------------
# --------------------------------------------------------------------------------

def waitFor(secs):
  sleep(secs * 1000)

def wait():
  waitFor(1)

def isJourneyComplete():
  global currentPos
  xPos = currentPos[0]
  yPos = currentPos[1]
  
  global myDestination
  xDest = myDestination[0]
  yDest = myDestination[1]

  return xPos == xDest and yPos == yDest

def isValidPosition(xPos, yPos):  
  return not level[yPos][xPos] == 0

def isSafe_Ahead():
  global currentPos
  global currentDir
  xTgt = currentPos[0] + currentDir[0]
  yTgt = currentPos[1] + currentDir[1]

  return isValidPosition(xTgt, yTgt)

def isSafe_Left():
  global currentPos
  xTgt = currentPos[0]
  yTgt = currentPos[1]

  global currentDir
  if currentDir[0] == 0:
    xTgt += currentDir[1]
  else:
    yTgt -= currentDir[0]
  
  return isValidPosition(xTgt, yTgt)

def isSafe_Right():
  global currentPos
  xTgt = currentPos[0]
  yTgt = currentPos[1]
  
  global currentDir
  if currentDir[0] == 0:
    xTgt -= currentDir[1]
  else:
    yTgt += currentDir[0]

  return isValidPosition(xTgt, yTgt)

def updateStatus():
  global isRunning
  global isComplete
  global isCrashed
  global currentPos
  
  # update flags
  if isJourneyComplete():
    isComplete = True 
  
  if not isValidPosition(currentPos[0], currentPos[1]):
    isCrashed = True

  # update display
  if isRunning:
    display.show(Image.HAPPY)
    return

  if isComplete:
    display.show(Image.YES)
    return
  
  if not isRunning and not isComplete:
    display.show(Image.NO)

# --------------------------------------------------------------------------------
# MOTOR SETUP --------------------------------------------------------------------
# --------------------------------------------------------------------------------

def motor(directionL, speedL, directionR, speedR):
  buf = bytearray(5)
  buf[0] = 0x00
  buf[1] = directionL
  buf[2] = speedL
  buf[3] = directionR
  buf[4] = speedR
  i2c.write(I2caddr, buf)

# --------------------------------------------------------------------------------
# MOVEMENT -----------------------------------------------------------------------
# --------------------------------------------------------------------------------

# direction: 0 = forward, 1 = back
def movePhysical(direction):
  MOVESPEED = 50 # possible speed range: 0 - 255
  motor(direction, MOVESPEED, direction, MOVESPEED)
  wait()
  motor(0,0,0,0)
  wait()

# direction: 0 = forward, 1 = back
def moveLogical(direction):
  global currentPos
  global currentDir
  currentPos[0] += currentDir[0]
  currentPos[1] += currentDir[1]

# direction: 0 = forward, 1 = back
def move(direction):
  global isCrashed
  
  if isCrashed:
    return

  movePhysical(direction)
  moveLogical(direction)
  updateStatus()

def moveForward():
  move(0)

def moveBackward():
  move(1)

# --------------------------------------------------------------------------------
# TURNING ------------------------------------------------------------------------
# --------------------------------------------------------------------------------

# direction: 0 = left, 1 = right
TURNSPEED = 25 # possible speed range: 0 - 255

def turnPhysical(direction):
  global TURNSPEED
  if bool(direction):
    motor(0, TURNSPEED, 1, TURNSPEED)
  else:
    motor(1, TURNSPEED, 0, TURNSPEED)
  wait()
  motor(0,0,0,0)
  wait()

def turnLogical(direction):
  global currentDir
  if bool(direction):
    currentDir = [-currentDir[1],  currentDir[0]]
  else:
    currentDir = [ currentDir[1], -currentDir[0]]

def turn(direction):
  global isCrashed
  if isCrashed:
    return

  turnPhysical(direction)
  turnLogical(direction)

def turnLeft():
  turn(0)

def turnRight():
  turn(1)
  
# --------------------------------------------------------------------------------
# NEOPIXEL SETUP -----------------------------------------------------------------
# --------------------------------------------------------------------------------

# Neopixel strip is on pin15 with a length of 4 pixels
np = neopixel.NeoPixel(pin15, 4)

def rgb(pixel_id, red, green, blue):
  if pixel_id > len(np) or pixel_id < 0:
    return
  np[pixel_id] = (red, green, blue)

def rgb_all(red,green,blue):
  for pixel_id in range(0, len(np)):
    rgb(pixel_id,red,green,blue)

# --------------------------------------------------------------------------------
# MAIN CODE ----------------------------------------------------------------------
# --------------------------------------------------------------------------------
"""
# Load level-specific data
level = [ [ 0, 0, 0, 0, 8], [ 0, 0, 0, 0, 1], [11, 2, 2, 2, 6], [ 0, 0, 0, 0, 1], [ 0, 0, 0, 0, 0] ]

startingPos    = [ 0, 2]
startingDir    = [ 1, 0]
destinationPos = [ 4, 0]

# initalise
currentPos = startingPos
currentDir = startingDir
myDestination = destinationPos
"""
# Run user code
moveForward()
moveForward()
moveForward()
moveForward()
turnLeft()
moveForward()
moveForward()

# Mark end of user code
isRunning = False
updateStatus()