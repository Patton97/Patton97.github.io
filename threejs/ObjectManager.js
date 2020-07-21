class ObjectManager
{
  constructor()
  {
    this.objects = [];
  }
  addObject(obj)
  {
    this.objects.push(obj)
    scene.add(obj)
    console.log("adding: " + obj)
  }
  animateAll()
  {
    this.objects.forEach(obj => {
      obj.animate()
    });
  }
}
//var objectManager = new ObjectManager