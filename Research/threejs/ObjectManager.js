class ObjectManager
{
  constructor()
  {
    this.objects = []
  }
  addObject(obj)
  {
    this.objects.push(obj)
    scene.add(obj)
    console.log(`ObjectManager: added ${obj.constructor.name}`)
    return obj
  }
  animateAll()
  {
    this.objects.forEach(obj => { 
      try { obj.animate() } 
      catch(e) { /* object has no animation, that's fine */ }
    })
  }
  objectCount = function()
  {
    return this.objects.length
  }
  removeAllObjects()
  {
    this.objects.forEach(obj=>{
      scene.remove(obj)
      obj = undefined
    })
    this.objects = []
  }
}