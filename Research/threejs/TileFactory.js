var tileDict = {
  "RoadBase"       : function() { return tileFactory.createRoadBase()},
  "RoadVertical"   : function() { return tileFactory.createRoadVertical()},
  "RoadHorizontal" : function() { return tileFactory.createRoadHorizontal()},
  "RoadCross"      : function() { return tileFactory.createRoadCross()},
  "RoadCornerTL"   : function() { return tileFactory.createRoadCorner(0)},
  "RoadCornerTR"   : function() { return tileFactory.createRoadCorner(1)},
  "RoadCornerBR"   : function() { return tileFactory.createRoadCorner(2)},
  "RoadCornerBL"   : function() { return tileFactory.createRoadCorner(3)},
}

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
  createRoadBase()
  {
    let tile = new RoadTile    
    return objectManager.addObject(tile)
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
    let tile = new RoadCross
    return objectManager.addObject(tile)
  }
  createRoadCorner(side)
  {
    let tile = new RoadCorner(side)
    return objectManager.addObject(tile)
  }
}

class RoadTile extends THREE.Group
{
  constructor()
  {
    super()
    let roadColour = debug ? getRandomColour() : 0x696969
    this.roadMat = new THREE.MeshBasicMaterial( { color: roadColour, side: THREE.DoubleSide } )
    this.curbMat = new THREE.MeshBasicMaterial( { color: 0xf32800 } )
    this.add(new RoadBase(this.roadMat))
  }
}

class RoadBase extends THREE.Mesh
{
  constructor(mat)
  {
    let geo = new THREE.PlaneGeometry( 1, 1, 32 )
    super(geo, mat)
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
    let geo = new THREE.BoxGeometry(0.1, 0.9, 0.1)
    let curb_L = new THREE.Mesh(geo, this.curbMat)
    let curb_R = new THREE.Mesh(geo, this.curbMat)
    let curbs = [curb_L, curb_R]

    if(this.horizontal)
    {
      curbs.forEach(curb=>{curb.rotateZ(THREE.Math.degToRad(90))})
    }
    curb_L.translateX(-0.5)
    curb_R.translateX(0.5)

    curbs.forEach(curb=>{this.add(curb)})
  }
}

class RoadCross extends RoadTile
{
  constructor()
  {
    super()
    this.createCurbs()
  }
  createCurbs()
  {
    let geo = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    let curbs = []
    for(let i = 0; i < 4; i++)
    {
      curbs.push(new THREE.Mesh(geo, this.curbMat))
    }

    // top left
    curbs[0].translateX(-0.5)
    curbs[0].translateY(0.5)   

    // top right
    curbs[1].translateX(0.5)
    curbs[1].translateY(0.5)
    
    // bottom left
    curbs[2].translateX(-0.5)
    curbs[2].translateY(-0.5)    

    // bottom right
    curbs[3].translateX(0.5)
    curbs[3].translateY(-0.5)

    // add to group
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
    let curbs = []

    for(let i = 0; i < 2; i++)
    {
      curbs.push(new THREE.Mesh(geo, this.curbMat))
    }

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

