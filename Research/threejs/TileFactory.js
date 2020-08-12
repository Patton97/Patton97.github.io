const ROADCOLOUR = 0x696969
const CURBCOLOUR = 0xf32800
const GRASSCOLOUR = 0x77b5fe
const ERRORCOLOUR = 0xFF66CC

var tileDict = {
  "Grass": function() { return tileFactory.createGrass() },
  "Star" : function() { return tileFactory.createStar()  },
  "RoadVertical"  : function() { return tileFactory.createRoadVertical()   },
  "RoadHorizontal": function() { return tileFactory.createRoadHorizontal() },
  "RoadCross"     : function() { return tileFactory.createRoadCross() },
  "RoadCornerTL"  : function() { return tileFactory.createRoadCorner(0) },
  "RoadCornerTR"  : function() { return tileFactory.createRoadCorner(1) },
  "RoadCornerBR"  : function() { return tileFactory.createRoadCorner(2) },
  "RoadCornerBL"  : function() { return tileFactory.createRoadCorner(3) }  
}

var grassMat = new THREE.MeshBasicMaterial({color: 0x008800 })

class TileFactory
{
  constructor()
  {
    
  }
  create(tileName)
  {
    if(!tileName in tileDict)
    {
      console.log(`Error: ${tileName} is an invalid tile name`)
      return null
    }
    return tileDict[tileName]()
  }
  createGrass()
  {
    let tile = new Tile(GRASSCOLOUR)
    return objectManager.addObject(tile)
  }  
  createStar()
  {
    let star = new Star
    return objectManager.addObject(star)
  }
  createRoadVertical()
  {
    let tile = new RoadStraight(false)
    return objectManager.addObject(tile)
  }
  createRoadHorizontal()
  {
    let tile = new RoadStraight(true)
    return objectManager.addObject(tile)
  }
  createRoadCross()
  {
    let tile = new Tile(ROADCOLOUR)
    return objectManager.addObject(tile)
  }
  createRoadCorner(side)
  {
    let tile = new RoadCorner(side)
    return objectManager.addObject(tile)
  }
}

class Star extends THREE.Sprite
{
  constructor()
  {
    let spriteMap = new THREE.TextureLoader().load( "/Images/Blockly/star.png" )
    let mat = new THREE.SpriteMaterial( { map: spriteMap } )
    super( mat )
    this.scale.set(0.75,0.75,0.75)
    this.translateZ(-0.25)
  }
}

class Tile extends THREE.Mesh
{
  constructor(color)
  {
    color = color ? color : ERRORCOLOUR
    
    let geo = new THREE.PlaneGeometry( 1, 1, 32 )
    let mat = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide } )
    super(geo, mat)
  }
}

class RoadTile extends THREE.Group
{
  constructor()
  {
    super()
    this.curbMat = new THREE.MeshBasicMaterial( { color: CURBCOLOUR } )
    this.add(new Tile(ROADCOLOUR))
  }
}

class Curb extends THREE.Group
{
  constructor()
  {
    super()
    let geo = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    let mat_red   = new THREE.MeshBasicMaterial( { color: 0xf32800 } )
    let mat_white = new THREE.MeshBasicMaterial( { color: 0xffffff } )

    let numSegments = 1 + (1/geo.parameters.height)
    let matFlipper = false // alternate red/white/red/white/red
    for(let i = 0; i < numSegments; i++)
    {
      // alternate red/white/red/white/red
      let mat = matFlipper ? mat_red : mat_white
      matFlipper = !matFlipper

      let mesh = new THREE.Mesh(geo, mat)
      mesh.translateY((i * geo.parameters.height) - 0.5)
      this.add(mesh)
    }
  }
}

class RoadStraight extends RoadTile
{
  constructor(horizontal)
  {
    super()
    this.horizontal = horizontal
    this.createCurbs()
  }
  createCurbs()
  {
    let curbs = [new Curb, new Curb]

    if(this.horizontal)
    {
      curbs.forEach(curb=>{curb.rotateZ(THREE.Math.degToRad(90))})
    }
    curbs[0].translateX(-0.5)
    curbs[1].translateX(0.5)

    curbs.forEach(curb=>{this.add(curb)})
  }
}

class RoadCorner extends RoadTile
{
  constructor(side)
  {
    super()
    this.side = side || 0
    this.createCurbs()
  }
  createCurbs()
  {
    let geo = new THREE.BoxGeometry(0.1, 1, 0.1)
    let curbs = [new Curb, new Curb]

    // rotate to fit different corner sides 
    // (0 = left&top, 1 = top&right, 2 = right&bottom, 3 = bottom&left)
    curbs.forEach(curb=>{curb.rotateZ(THREE.Math.degToRad(this.side * -90))})

    // left
    curbs[0].translateX(-0.5)    

    // top
    curbs[1].translateY(0.5)   
    curbs[1].rotateZ(THREE.Math.degToRad(90))

    // add to group
    curbs.forEach(curb=>{this.add(curb)})
  }
}

function getRandomColour() {
  var letters = '0123456789ABCDEF';
  var colour = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}