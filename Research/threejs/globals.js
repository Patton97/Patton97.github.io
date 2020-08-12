// Document structuring (css, etc)
var container = document.getElementById('threejs-container')

function getCanvasWidth()
{
  let containerWidth = container.offsetWidth
  let paddingWidth = 0 
  paddingWidth += parseInt(window.getComputedStyle(container).paddingLeft)
  paddingWidth += parseInt(window.getComputedStyle(container).paddingRight)
  return (containerWidth - paddingWidth)
}
function getCanvasHeight()
{
  let containerHeight = container.offsetHeight
  let paddingHeight = 0 
  paddingHeight += parseInt(window.getComputedStyle(container).paddingTop)
  paddingHeight += parseInt(window.getComputedStyle(container).paddingBottom)
  return (containerHeight - paddingHeight)
}

// Scene global reqs
var scene    = new THREE.Scene()
//var camera   = new THREE.PerspectiveCamera( 60, getCanvasWidth() / getCanvasHeight())
const CAMSCALE = 2.6
var camera   = new THREE.OrthographicCamera( -CAMSCALE, CAMSCALE, CAMSCALE, -CAMSCALE, 1, 1000 )


var renderer = new THREE.WebGLRenderer()

var iFrame   = 0

// Scene objects
var objectManager = new ObjectManager
var tileFactory = new TileFactory
var levelLoader = new LevelLoader
var microbit = new Microbit


// DEBUG Switcher
var debug = false