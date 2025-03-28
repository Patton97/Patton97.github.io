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
  if xPos < 0 or yPos < 0 or xPos >= len(level[0]) or yPos >= len(level):
    return False
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
    rgb_all(125, 75, 0) # orange
    return

  if isComplete:
    display.show(Image.YES)
    rgb_all(0, 75, 0) # green
    return
  
  if not isRunning and not isComplete:
    display.show(Image.NO)
    rgb_all(125, 0, 0) # red

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
MOVESPEED = 35 # possible speed range: 0 - 255

def movePhysical(direction):
  global MOVESPEED
  motor(direction, MOVESPEED, direction, MOVESPEED)
  wait()
  motor(0,0,0,0)
  wait()

def moveLogical(direction):
  global currentPos
  global currentDir
  currentPos[0] += currentDir[0]
  currentPos[1] += currentDir[1]

def move(direction):
  global isCrashed
  
  if isCrashed:
    updateStatus()
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
  np.show()

def rgb_all(red,green,blue):
  # first reset all
  for pixel_id in range(0, len(np)):
    rgb(pixel_id, 0,0,0)
  # then apply new rgb
  for pixel_id in range(0, len(np)):
    rgb(pixel_id,red,green,blue)

# --------------------------------------------------------------------------------
# MAIN CODE ----------------------------------------------------------------------
# --------------------------------------------------------------------------------

# The user's generated code will be appended below
