from microbit import *
from random import randint
import neopixel
import music
I2caddr = 0x10
# Maqueen motor control
# direction:0=forward  1=back
# speed: 0~255
def motor(directionL, speedL, directionR, speedR):
  buf = bytearray(5)
  buf[0] = 0x00
  buf[1] = directionL
  buf[2] = speedL
  buf[3] = directionR
  buf[4] = speedR
  i2c.write(I2caddr, buf)
  
# Setup the Neopixel strip on pin15 with a length of 4 pixels
np = neopixel.NeoPixel(pin15, 4)

def rgb(pixel_id, red, green, blue):
  if pixel_id > len(np) or pixel_id < 0:
    return
  np[pixel_id] = (red, green, blue)

def rgb_all(red,green,blue):
  for pixel_id in range(0, len(np)):
    rgb(pixel_id,red,green,blue)