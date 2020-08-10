
class Microbit_Wheel extends THREE.Group
{
  constructor()
  {
    super()    
    
    this.createRim()
    this.createTyre()

    this.speed = 0
  }
  createRim()
  {
    let geo = new THREE.CylinderGeometry(0.19, 0.19, 0.1, 16, 1)
    let mat = new THREE.MeshPhongMaterial( { color: 0xffffff } )
    let rim = new THREE.Mesh(geo, mat)
    this.add(rim)

    //decorate rim to make highlight when moving
    geo = new THREE.CylinderGeometry(0.06, 0.06, 0.11, 8, 1)
    mat = new THREE.MeshPhongMaterial( { color: 0x000000 } )
    for(let i = 0; i < 3; i++)
    {
      let decoration = new THREE.Mesh(geo, mat)
      rim.add(decoration)
      decoration.rotateY(THREE.Math.degToRad(i*120))
      decoration.translateZ(0.1)
    }
    geo = new THREE.CylinderGeometry(0.03, 0.03, 0.11, 8, 1)
    for(let i = 0; i < 3; i++)
    {
      let decoration = new THREE.Mesh(geo, mat)
      rim.add(decoration)
      decoration.rotateY(THREE.Math.degToRad((i*120)+60))
      decoration.translateZ(0.1)
    }
  }
  createTyre()
  {
    let geo = new THREE.CylinderGeometry(0.22, 0.22, 0.099, 16, 1)
    let mat = new THREE.MeshPhongMaterial( { color: 0x000000 } )
    let tyre = new THREE.Mesh(geo, mat)
    this.add(tyre)
  }
  animate()
  {
    if(this.speed === 0) { return }
    let rotAmount = THREE.Math.degToRad(this.speed)
    this.rotateY(rotAmount)
  }
}

class Microbit_Battery extends THREE.Group
{
  constructor(color)
  {
    super()
    color = color || 0x00FF00
    this.createRod()
    this.createShell()
  }
  createRod()
  {
    let geo = new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8, 1)
    let mat = new THREE.MeshPhongMaterial( { color: 0xADADAD } )
    let rod = new THREE.Mesh(geo, mat)
    this.add(rod)
  }
  createShell()
  {
    let geo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16, 1)
    let mat = new THREE.MeshPhongMaterial( { color: 0x00FF00 } )
    let shell = new THREE.Mesh(geo, mat)
    this.add(shell)
  }
}

class Microbit_BatteryPack extends THREE.Group
{
  constructor()
  {
    super()
    this.pack = this.createPack()
    this.batteries = this.createBatteries()
  }
  createPack()
  {
    let geo = new THREE.BoxGeometry(0.54, 0.14, 0.4)
    let mat = new THREE.MeshPhongMaterial( { color: 0x000000 } )
    let pack = new THREE.Mesh(geo, mat)
    this.add(pack)
    return pack
  }
  createBatteries()
  {
    let batteries = []
    for(let i = 0; i < 3; i++)
    {
      batteries[i] = new Microbit_Battery
      batteries[i].rotateZ(THREE.Math.degToRad(90))
      batteries[i].translateX(0.05)
      batteries[i].translateZ((i-1) * 0.1)
      this.pack.add(batteries[i])
    }    
  }
}

class Microbit_Chassis extends THREE.Group
{
  constructor()
  {
    super()
    this.createBack()
    this.createMiddle()
    this.createFront()
    this.createSides()
    this.slot = this.createSlot()
  }
  createBack()
  {
    let geo = new THREE.BoxGeometry(0.58, 0.02, 0.5)
    let mat = new THREE.MeshPhongMaterial({color:0x000000})
    let back = new THREE.Mesh(geo, mat)
    this.add(back)
  }
  createMiddle()
  {
    let geo = new THREE.BoxGeometry(0.82,0.02,0.16)
    let mat = new THREE.MeshPhongMaterial({color:0x000000})
    let middle = new THREE.Mesh(geo, mat)
    middle.translateZ(0.33)
    this.add(middle)
  }
  createFront()
  {
    let geo = new THREE.BoxGeometry(0.42,0.02,0.24)
    let mat = new THREE.MeshPhongMaterial({color:0x000000})
    let front = new THREE.Mesh(geo, mat)
    front.translateZ(0.53)
    this.add(front)
  }
  createSides()
  {
    let geo = new THREE.BoxGeometry(0.32,0.02,0.16)
    let mat = new THREE.MeshPhongMaterial({color:0x000000})
    let side_L = new THREE.Mesh(geo, mat)
    let side_R = new THREE.Mesh(geo, mat)
    side_L.translateX(-0.2475)
    side_R.translateX( 0.2475)

    let sides = [side_L, side_R]
    sides.forEach(side=>{
      side.translateZ( 0.4775)
      this.add(side)
    })

    side_L.rotateY(THREE.Math.degToRad(-50))
    side_R.rotateY(THREE.Math.degToRad( 50))
  }  
  createSlot()
  {
    let geo = new THREE.BoxGeometry(0.56,0.1,0.05)
    let mat = new THREE.MeshPhongMaterial({color:0xADADAD})
    let slot = new THREE.Mesh(geo, mat)
    slot.translateZ(0.28)
    this.add(slot)
    return slot
  }  
}

class Microbit_LED extends THREE.Group
{
  constructor()
  {
    super()
    this.cylinder = this.createCylinder()
    this.sphere = this.createSphere()
    this.active = false
    this.colors = [0x580000, 0xff0000] // toggled when light is off/on
    this.updateLight()
  }
  createCylinder()
  {
    let geo = new THREE.CylinderGeometry(0.02,0.02,0.1)
    let mat = new THREE.MeshPhongMaterial({color:0xff0000})
    let cylinder = new THREE.Mesh(geo, mat)
    cylinder.rotateX(THREE.Math.degToRad(90))
    this.add(cylinder)
    return cylinder
  }
  createSphere()
  {
    let geo = new THREE.SphereGeometry(.02)
    let mat = new THREE.MeshPhongMaterial({color:0xff0000})
    let sphere = new THREE.Mesh(geo, mat)
    sphere.translateZ(0.05)
    this.add(sphere) 
    return sphere
  }
  toggle()
  {
    this.active ? this.turnOff() : this.turnOn()
  }
  turnOn()
  {
    this.active = true
    this.updateLight()
  }
  turnOff()
  {
    this.active = false
    this.updateLight()
  }
  updateLight()
  {
    let newColor = this.colors[+this.active] // unary operator --> false = 0, true = 1
    this.cylinder.material.color.setHex(newColor)
    this.sphere.material.color.setHex(newColor)
  }
}

class Microbit_Board extends THREE.Group
{
  constructor()
  {
    super()
    this.leds = [
      ['','','','',''],  
      ['','','','',''], // super ugly i apologise to
      ['','','','',''], // everyone who ever reads
      ['','','','',''], // this...hopefully 0 people
      ['','','','','']
    ] 
    this.createBoard()
    this.createLEDs()
    this.createButtons()
    this.translateY(0.21)
  }
  createBoard()
  {
    let geo = new THREE.BoxGeometry(0.52,0.42,0.02)
    let mat = new THREE.MeshPhongMaterial({color:0x000000})
    let board = new THREE.Mesh(geo, mat)
    this.add(board)
  }
  createLEDs()
  {
    for(let x = 0; x < 5; x++)
    {
      for(let y = 0; y < 5; y++)
      {
        let geo = new THREE.BoxGeometry(0.01, 0.02, 0.02)
        let mat = new THREE.MeshPhongMaterial({color: 0xADADAD})
        let led = new THREE.Mesh(geo, mat)
        led.translateX((x*0.04)-0.08)
        led.translateY((y*0.04)-0.08)
        led.translateZ(0.01)
        this.add(led)
        this.leds[x][y] = led
      }
    }
  }
  createButtons()
  {

  }

}

class Microbit extends THREE.Group
{
  constructor()
  {
    super()
    this.moveSpeed=0
    this.rotSpeed=0
    
    this.chassis = this.createChassis()
    this.leds = this.createLEDs()
    this.wheels = this.createWheels()    
    this.batterypack = this.createBatteryPack()
    this.board = this.createBoard()

    this.chassis.translateY(-0.15)
    this.chassis.translateZ(-0.2)

    objectManager.addObject(this)
  }
  
  createChassis()
  {
    let chassis = new Microbit_Chassis
    this.add(chassis)
    return chassis
  }
  createLEDs()
  {
    let led_L = new Microbit_LED
    let led_R = new Microbit_LED

    led_L.translateX( 0.2)
    led_R.translateX(-0.2)

    let leds = [led_L, led_R]
    leds.forEach(led=>{
      led.translateY(0.025)
      led.translateZ(0.56)
      this.chassis.add(led)
    })

    return leds
  }  
  createWheels()
  {
    let wheel_L = new Microbit_Wheel
    let wheel_R = new Microbit_Wheel
    
    wheel_L.translateX( 0.35)
    wheel_R.translateX(-0.35)

    let wheels = [wheel_L, wheel_R]
    wheels.forEach(wheel=>{
      wheel.rotateZ(THREE.Math.degToRad(-90))
      wheel.translateX(-0.06)
      this.chassis.add(wheel)
    })

    return wheels
  }
  createBatteryPack()
  {
    let batterypack = new Microbit_BatteryPack
    batterypack.translateY(0.22)
    this.chassis.add(batterypack)
    return batterypack
  }
  createBoard()
  {
    let board = new Microbit_Board
    this.chassis.slot.add(board)
    return board
  }
  animate()
  {
    this.wheels.forEach(wheel=>{wheel.animate()})
    this.translateZ(this.moveSpeed * 0.005)
    this.rotateY(THREE.Math.degToRad(this.rotSpeed * -0.5))
  }
  setMoveSpeed(speed)
  {
    this.moveSpeed = speed
    this.wheels.forEach(wheel=>{wheel.speed = speed})
  }
  setRotSpeed(speed)
  {
    this.rotSpeed = speed
    if(rotSpeed > 0)
    {
      this.wheels[0].speed =  speed
      this.wheels[1].speed = -speed
    }
    else
    {
      this.wheels[0].speed = -speed
      this.wheels[1].speed =  speed
    }
  }
  turnOnLED(side) // 0 = left, 1 = right, 2 = both
  {
    if(side === 2) { this.leds.forEach(led=>{led.turnOn()}) }
    else {this.leds[side].turnOn()}    
  }
  turnOffLED(side) // 0 = left, 1 = right, 2 = both
  {
    if(side === 2) { this.leds.forEach(led=>{led.turnOff()}) }
    else {this.leds[side].turnOff()}  
  }
  reset()
  {
    microbit.position.set(levelLoader.startingPos.x,-levelLoader.startingPos.y,0)
    
    //surely a better way to autorot than this
    let dir = new THREE.Vector2(levelLoader.startingDir.x, levelLoader.startingDir.y)
    console.log(dir)
    let degToRad_90  = THREE.Math.degToRad( 90)
    let degToRad_180 = THREE.Math.degToRad(180)

    // default to facing up
    microbit.rotation.set(-degToRad_90, 0, degToRad_180) 
    
    if(isFacingRight(dir)) { microbit.rotateY(-degToRad_90)  }
    if(isFacingDown(dir))  { microbit.rotateY( degToRad_180) }
    if(isFacingLeft(dir))  { microbit.rotateY( degToRad_90)  }

    
  }
}

function isFacingUp(v)    { return v.equals(new THREE.Vector2( 0,-1)) }
function isFacingRight(v) { return v.equals(new THREE.Vector2( 1, 0)) }
function isFacingDown(v)  { return v.equals(new THREE.Vector2( 0, 1)) }
function isFacingLeft(v)  { return v.equals(new THREE.Vector2(-1, 0)) }