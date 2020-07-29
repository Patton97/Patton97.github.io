class TileFactory
{
  constructor()
  {

  }
  createRoadTile(colour)
  {
    let tile = new RoadTile(colour)
    return tile
  }
}

class RoadTile extends THREE.Mesh
{
  constructor(colour)
  {
    let geo = new THREE.PlaneGeometry( 1, 1, 32 )
    let mat = new THREE.MeshBasicMaterial( {color: colour, side: THREE.DoubleSide} )
    super(geo, mat)
  }
}