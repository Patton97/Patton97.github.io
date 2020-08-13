// Document structuring (css, etc)
var container = document.getElementById('threejs-container')
var levelDescription = document.getElementById('levelDescription')
var levelButtons = document.getElementById(`levelButtons-container`)

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
  let canvasHeight = container.offsetHeight
  
  let containerStyle = window.getComputedStyle(container)
  canvasHeight -= parseInt(containerStyle.paddingTop)
  canvasHeight -= parseInt(containerStyle.paddingBottom)

  canvasHeight -= getElementHeight(levelDescription)
  canvasHeight -= getElementHeight(levelButtons)
 
  return canvasHeight
}

function getElementWidth(element)
{
  let width = element.offsetWidth
  let elementStyle = window.getComputedStyle(element)
  width += parseInt(elementStyle.marginLeft)
  width += parseInt(elementStyle.marginRight)  
  width += parseInt(elementStyle.paddingLeft)
  width += parseInt(elementStyle.paddingRight)
  return width
}

function getElementHeight(element)
{
  let height = element.offsetHeight
  let elementStyle = window.getComputedStyle(element)
  height += parseInt(elementStyle.marginTop)
  height += parseInt(elementStyle.marginBottom)
  height += parseInt(elementStyle.paddingTop)
  height += parseInt(elementStyle.paddingBottom)
  return height
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