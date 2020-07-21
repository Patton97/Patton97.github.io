//import * as THREE from './node_modules/three/build/three.module'
//import { OrbitControls } from './OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//var controls = new OrbitControls( camera, renderer.domElement );


var objectManager = new ObjectManager()

class Cube extends THREE.Mesh{
  constructor(color)
  {
    //Defaults if parameter omitted
    color = color || 0xffffff
    let geo = new THREE.BoxGeometry()
    let mat = new THREE.MeshBasicMaterial( { color: color })
    super(geo, mat)

    objectManager.addObject(this)
  }
  animate()
  {
    this.rotation.x += 0.01
    this.rotation.y += 0.01
  }
}
/*
var cube1 = new Cube()
var cube2 = new Cube(0xff0000)
cube2.position.x += 5
*/

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

var microbit1 = new Microbit()

//controls.update()
function animate() {
  requestAnimationFrame( animate )
  objectManager.animateAll()
  //controls.update()
  renderer.render( scene, camera )
}
animate();