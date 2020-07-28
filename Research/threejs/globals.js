// Document structuring (css, etc)
var container = document.getElementById('threejs-container')
let paddingWidth = 0
paddingWidth += parseInt(window.getComputedStyle(container).paddingLeft)
paddingWidth += parseInt(window.getComputedStyle(container).paddingRight)

let paddingHeight = 0
paddingHeight += parseInt(window.getComputedStyle(container).paddingTop)
paddingHeight += parseInt(window.getComputedStyle(container).paddingBottom)

const CANVAS_WIDTH  = container.offsetWidth - paddingWidth
const CANVAS_HEIGHT = container.offsetHeight - paddingHeight

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
