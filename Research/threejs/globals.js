var container = document.getElementById('threejs-container')
const CANVAS_WIDTH  = container.offsetWidth
const CANVAS_HEIGHT = container.offsetHeight
console.log(container.offsetWidth)


// Scene global reqs
var scene    = new THREE.Scene()
var camera   = new THREE.PerspectiveCamera( 60, CANVAS_WIDTH / CANVAS_HEIGHT)
var renderer = new THREE.WebGLRenderer()
var iFrame   = 0

// Scene objects
var objectManager = new ObjectManager
var microbit      = new Microbit

// DEBUG Switcher
var debug = true
