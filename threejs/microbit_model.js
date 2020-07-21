class Microbit_Wheel extends THREE.Mesh
{
  constructor()
  {
    let geo = new THREE.CylinderGeometry(.4,.4,.08,16,1)
    let mat = new THREE.MeshPhongMaterial( { color: 0xffffff })
    super(geo, mat)
    this.rotation.z += THREE.Math.degToRad(90)
  }
}

class Microbit extends THREE.Group
{
  constructor()
  {
    super();
    this.parts = []
    this.wheels = []
    this.createWheels()

    objectManager.addObject(this)
  }
  createWheels()
  {
    let wheel_L = new Microbit_Wheel
    let wheel_R = new Microbit_Wheel
    this.add(wheel_L)
    wheel_L.position.x -= .4
    this.add(wheel_R)
    wheel_R.position.x += .4
  }
  animate()
  {

  }
}