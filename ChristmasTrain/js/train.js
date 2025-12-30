/************
 * COMPILER *
 * PROMISES *
 ************/
var loader = new THREE.TextureLoader();

//Wood texture+material
var wood_txt = loader.load( 'textures/wood.jpg', function ( texture ) 
{
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set( 0, 0 );
  texture.repeat.set( 1, 1 );
});
var wood_mat = new THREE.MeshPhongMaterial({
  map: wood_txt,
  shininess: 0
});

//Array of all wheels
var wheelArray = [];
/***********
 * CLASSES *
 ***********/
class Wheel extends THREE.Mesh{
  constructor(size){
    size = size || 1; //Default to 1 if no size provided
    var wheel_geo = new THREE.CylinderGeometry(size, size, 1, 24);
    var wheel_txt = loader.load( 'textures/wood.jpg', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 1, 1 );
    });
    var wheel_mat = new THREE.MeshPhongMaterial({
      map: wheel_txt,
      bumpMap: wheel_txt,
      shininess: 0
    });

    wheel_mat.color.set(0x8B0000);
    
    super(wheel_geo, wheel_mat);
  }
}

//INCOMPLETE
class Smoke extends THREE.Mesh{
  constructor(){
    var smoke_geo = new THREE.SphereGeometry(0.5, 0.5, 0.5, 1 );
    var smoke_mat = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });

    super(smoke_geo, smoke_mat);
  }
}

/*************
 * THE TRAIN *
 *************/
class Train extends THREE.Group{
  constructor(){
    super();
    //Variables
    this.pistonArray = [];
    this.wallArray = [];
    this.pillarArray = [];
    this.smokeArray = [];
    this.smokeArray_init = [];
    this.speed=0.05;

    //Root - might be unneeded
    var root_geo = new THREE.BoxGeometry( 1, 1, 1 );
    var root_mat = new THREE.MeshBasicMaterial( { color: 0xAAAAAA } );
    var root_msh = new THREE.Mesh( root_geo, root_mat );
    this.add(root_msh);

    //Wood texture used by many objects
    var wood_txt = loader.load( 'textures/wood.jpg', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 1, 1 );
    });
    var wood_mat = new THREE.MeshPhongMaterial({
      map: wood_txt,
      shininess: 0
    });


    //Base
    var base_geo = new THREE.BoxGeometry( 20, 2, 5 );
    this.base_msh = new THREE.Mesh(base_geo, wood_mat);
    this.add(this.base_msh);

    //Wheels      
    this.wheelArray = [];
    //Create fake wheel
    this.wheelArray.push(new Wheel(0.1));
    //Create 2 front wheels (smaller)
    for (var i = 0; i<2; i++){this.wheelArray.push(new Wheel(2.0));}
    //Create 4 back wheels (larger)
    for (var i = 0; i<4; i++){this.wheelArray.push(new Wheel(2.5));}


    //Add all wheels to scene, as children of base_msh
    // Rotate to correct angle
    for(var i = 0; i<this.wheelArray.length; i++)
    {
      this.base_msh.add(this.wheelArray[i]);
      this.wheelArray[i].rotation.x = Math.PI / 2;
    }

    //Postion manually
    //  TODO: Find a less ugly way of doing this
    //Fake wheel is hidden inside object, used to turn pistons
    this.wheelArray[0].position.x += 2.5;

    this.wheelArray[1].position.x -= 8;
    this.wheelArray[1].position.y -= 0.5;
    this.wheelArray[1].position.z += 3; 

    this.wheelArray[2].position.x -= 8; 
    this.wheelArray[2].position.y -= 0.5;
    this.wheelArray[2].position.z -= 3; 

    this.wheelArray[3].position.x += 0; 
    this.wheelArray[3].position.z += 3; 

    this.wheelArray[4].position.x += 0; 
    this.wheelArray[4].position.z -= 3; 

    this.wheelArray[5].position.x += 5; 
    this.wheelArray[5].position.z += 3;

    this.wheelArray[6].position.x += 5; 
    this.wheelArray[6].position.z -= 3;


    //Wheel pistons
    var piston_geo = new THREE.BoxGeometry(6, 0.25, 0.5);
    var piston_mat = new THREE.MeshPhongMaterial({
        map: loader.load('textures/wood.jpg'),
        normalMap: new THREE.TextureLoader().load('textures/wood.jpg')
      });
    piston_mat.color.set(0xFFFF00);
    for(var i=0; i<2;i++)
    {
      this.pistonArray.push(new THREE.Mesh(piston_geo, piston_mat));
      //Add pistons to either side's rear wheels.
      this.wheelArray[0].add(this.pistonArray[i]);
      //Postion 
      this.pistonArray[i].position.x -= 1.5;
      this.pistonArray[i].position.y -= (i*7.25) - 3.625;
    }


    //Engine
    var engine_geo = new THREE.CylinderGeometry( 2, 2, 10, 96 );
    var engine_msh = new THREE.Mesh(engine_geo, wood_mat);
    this.base_msh.add(engine_msh);
    //rotation
    engine_msh.rotation.z += Math.PI / 2;
    //position
    engine_msh.position.x -= 4;
    engine_msh.position.y += 2;

    //Front Engine Light
    //Border
    var woodDark_txt = loader.load( 'textures/wood2.jpg', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 1, 1 );
    });
    var woodDark_mat = new THREE.MeshPhongMaterial({
      map: woodDark_txt,
      shininess: 0
    });
    var lightBorder_geo = new THREE.CylinderGeometry( 1, 1, 1, 48 );
    var lightBorder_msh = new THREE.Mesh(lightBorder_geo, woodDark_mat);
    engine_msh.add(lightBorder_msh);
    lightBorder_msh.position.y+=4.6;
    //Light
    var engineLight_geo = new THREE.CylinderGeometry( 0.75, 0.75, 1, 48 );
    var engineLightBorder_msh = new THREE.Mesh(engineLight_geo, new THREE.MeshBasicMaterial({color: 0xffffff}));
    lightBorder_msh.add(engineLightBorder_msh);
    engineLightBorder_msh.position.y+=0.1;

    //Cabin
    //Walls
    var wall_geo = new THREE.BoxGeometry(0.5,3,5);
    for(var i=0;i<4;i++)
    {
      this.wallArray.push(new THREE.Mesh(wall_geo, wood_mat));
      this.add(this.wallArray[i]);
      //Position y
      this.wallArray[i].position.y += 2;
    }

    //Position x&z - possibly a cleaner way to do this
    this.wallArray[0].position.x += 1;  
    this.wallArray[0].position.z -= 0;

    this.wallArray[1].position.x += 5;  
    this.wallArray[1].position.z += 0;

    this.wallArray[2].rotation.y += Math.PI/2;  
    this.wallArray[2].position.x += 3;
    this.wallArray[2].position.z -= 2;

    this.wallArray[3].rotation.y -= Math.PI/2;  
    this.wallArray[3].position.x += 3;  
    this.wallArray[3].position.z += 2;

    //Pillars    
    var pillar_geo = new THREE.BoxGeometry(0.5,5,0.5);
    for(var i=0;i<4;i++)
    {
      this.pillarArray.push(new THREE.Mesh(pillar_geo, wood_mat));
      this.add(this.pillarArray[i]);
      //Position y
      this.pillarArray[i].position.y += 4;
    }

    //Position x&z - possibly a cleaner way to do this
    this.pillarArray[0].position.x += 1;  
    this.pillarArray[0].position.z -= 2;

    this.pillarArray[1].position.x += 1;  
    this.pillarArray[1].position.z += 2;

    this.pillarArray[2].position.x += 5;  
    this.pillarArray[2].position.z -= 2;

    this.pillarArray[3].position.x += 5;  
    this.pillarArray[3].position.z += 2;

    //Roof
    var roof_geo = new THREE.BoxGeometry(5,0.5,5);
    var roof_msh = new THREE.Mesh(roof_geo, wood_mat);
    //Position
    roof_msh.position.x += 2;
    roof_msh.position.y += 2.5;
    roof_msh.position.z -= 2;
    this.pillarArray[1].add(roof_msh);

    //Smokestack - all sub-components of this element will be prefaced with "smkstk_"
    //Cylinder
    var smkstk_cylinder_geo = new THREE.CylinderGeometry(0.5,0.5,1,24);
    var smkstk_cylinder_msh = new THREE.Mesh(smkstk_cylinder_geo, wood_mat);
    engine_msh.add(smkstk_cylinder_msh);
    //Rotation
    smkstk_cylinder_msh.rotation.z -= Math.PI /2;
    //Position
    smkstk_cylinder_msh.position.x += 2.25;
    smkstk_cylinder_msh.position.y += 3;
    //Cone
    var smkstk_cone_geo = new THREE.ConeGeometry(1, 2, 32);
    var smkstk_cone_msh = new THREE.Mesh(smkstk_cone_geo, wood_mat);
    smkstk_cylinder_msh.add(smkstk_cone_msh);
    //Rotation 
    smkstk_cone_msh.rotation.z += Math.PI;
    //Position
    smkstk_cone_msh.position.y += 0.5;

    var smokeLimit = 50;
    //Smoke particle effect
    for (var i=0; i<smokeLimit; i++)
    {
      this.smokeArray.push(new Smoke);

      this.smokeArray[i].position.set(smkstk_cone_msh.position.x,
                                      smkstk_cone_msh.position.y-2,
                                      smkstk_cone_msh.position.z);

      this.smokeArray_init.push(new THREE.Vector3());
      this.smokeArray_init[i].x = this.smokeArray[i].position.x;
      this.smokeArray_init[i].y = this.smokeArray[i].position.y;
      this.smokeArray_init[i].z = this.smokeArray[i].position.z;

      smkstk_cone_msh.add(this.smokeArray[i]);
    }

    //Carriages
    this.carriageArray = [];
    
    for(var i = 0; i < 5; i++)
    {
      this.carriageArray.push(new Carriage());
      this.carriageArray[i].position.x+= (i*12.5) + 17.5;
      this.add(this.carriageArray[i]);
    }
	
	this.snowing = false;

  }
  //Add snow
  snow()
  {
	  this.snow = new Snow;
	  this.add(this.snow);
	  this.snowing = true;
  }
  //Looping animation
  animate()
  {
    //Rotate train wheels
    for(var i =0; i<this.wheelArray.length;i++)
    {
      this.wheelArray[i].rotation.y += this.speed;
    }
    //Offset coupling rods
    for(var i=0; i<this.pistonArray.length;i++)
    {
      this.pistonArray[i].rotation.y -= this.speed;
    }
    //Smoke 
    for (var i =0; i<this.smokeArray.length; i++)
    { 
      if(this.speed > 0)
      {
        this.smokeArray[i].position.x -= (Math.random()*0.1);
        this.smokeArray[i].position.y -= (Math.random()*0.05);
        this.smokeArray[i].position.z -= ((Math.random()*2) - 1)*0.1;

        //Recycle old particles
        if (this.smokeArray[i].position.y < -10)
        {
          this.smokeArray[i].position.set(this.smokeArray_init[i].x,
                                          this.smokeArray_init[i].y,
                                          this.smokeArray_init[i].z);
        }
      }
      else
      {
        this.smokeArray[i].position.x = 0;
        this.smokeArray[i].position.y = 1;
        this.smokeArray[i].position.z = 0;
      }
    }

    //Animate carriages
    for(var i=0; i< this.carriageArray.length; i++)
    {
      //for each wheel on current carriage
      for(var j=0; j<this.carriageArray[i].wheelArray.length; j++)
      {
        this.carriageArray[i].wheelArray[j].rotation.y += this.speed;
      }
    }
    
	if(this.snowing)
	{
		this.snow.animate();
	}
  }
}

/************
 * CARRIAGE *
 ************/
class Carriage extends THREE.Group{
  constructor(){        
    super();//It is a pretendy group :) special
    
    //Base
    var base_geo = new THREE.BoxGeometry(10,0.5,5);
    this.base_msh = new THREE.Mesh(base_geo, wood_mat);
    this.add(this.base_msh);
    this.base_msh.position.y-=1;
    
    //Walls
    //Sides
    var wall_geo = new THREE.BoxGeometry(10,2.5,0.5);
    var left_msh  = new THREE.Mesh(wall_geo, wood_mat);
    var right_msh = new THREE.Mesh(wall_geo, wood_mat);

    this.add(left_msh);
    left_msh.position.z += 2.25;
    this.add(right_msh);
    right_msh.position.z -= 2.25;
    
    //Front+Back
    var wall_geo  = new THREE.BoxGeometry(0.5,2.5,5);
    var front_msh = new THREE.Mesh(wall_geo, wood_mat);
    var back_msh  = new THREE.Mesh(wall_geo, wood_mat);

    this.add(front_msh);
    front_msh.position.x -= 5;
    this.add(back_msh);
    back_msh.position.x += 5;
    
    //Wheels
    this.wheelArray = [];
    for (i = 0; i < 4; i++)
    {
      this.wheelArray.push(new Wheel(2.0));
      this.add(this.wheelArray[i]);
      this.wheelArray[i].rotation.x += Math.PI / 2;
      this.wheelArray[i].position.y -= 0.5;
    }
    
    //Front
    this.wheelArray[0].position.z += 3;
    this.wheelArray[0].position.x -= 3;
    this.wheelArray[1].position.z -= 3;
    this.wheelArray[1].position.x -= 3;
    //Back
    this.wheelArray[2].position.z += 3;
    this.wheelArray[2].position.x += 3;
    this.wheelArray[3].position.z -= 3;
    this.wheelArray[3].position.x += 3;

    //Presents
    var presentArray = [];
    //3 rows of 8 presents

    for(var i = 1; i < 4; i++)
    {
      for(var j = 0; j < 8; j++)
      {
        presentArray.push(new Present(1,1,1));
        this.add(presentArray[presentArray.length - 1]);
        presentArray[presentArray.length - 1].position.x += (j*1.1) - 3.8;
        presentArray[presentArray.length - 1].position.y += Math.random() * (1 - 0.5) + 0.5;
        presentArray[presentArray.length - 1].position.z += (i*1.2) - 2.4;
      }
    }
  }
}

/**********************************
 *  Generates a present based on  *
 * size params. Colour is random. *
 **********************************/
class Present extends THREE.Group
{
  constructor(x,y,z)
  {
    super();
    var paper_txt = loader.load( 'textures/paper.png', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 1, 1 );
    });
    //Array of colours used to accomodate random presents    
    var matArray = [];
    matArray.push(new THREE.MeshPhongMaterial({map:   paper_txt,
                                               color: 0xffffff,
                                               shininess:0 }));//White
    matArray.push(new THREE.MeshPhongMaterial({map:   paper_txt,
                                               color: 0xff0000,
                                               shininess:0 }));//Red
    matArray.push(new THREE.MeshPhongMaterial({map:   paper_txt,
                                               color: 0x006400,
                                               shininess:0 }));//Dark Green
    matArray.push(new THREE.MeshPhongMaterial({map:   paper_txt,
                                               color: 0x162A72,
                                               shininess:0 }));//Blue
    matArray.push(new THREE.MeshPhongMaterial({map:   paper_txt,
                                               color: 0xFFD700,
                                               shininess:0 }));//Gold

    var min = Math.ceil(0);
    var max = Math.floor(matArray.length);

    //Pick colours
    var present_mat = matArray[Math.floor(Math.random() * (max - min)) + min];
    var ribbon_mat  = matArray[Math.floor(Math.random() * (max - min)) + min];
    //Ensure both colours are unique
    while (present_mat === ribbon_mat)
    {
      ribbon_mat  = matArray[Math.floor(Math.random() * (max - min)) + min];
    }
  
    //Present
    var present_geo = new THREE.BoxGeometry(x,y,z);
    var present_msh = new THREE.Mesh(present_geo, present_mat);
    this.add(present_msh);

    //Ribbon
    var ribbon_geo = new THREE.BoxGeometry(x+0.1,y+0.1,z*0.1);
    var ribbon1_msh = new THREE.Mesh(ribbon_geo, ribbon_mat);
    var ribbon2_msh = new THREE.Mesh(ribbon_geo, ribbon_mat);
    ribbon2_msh.rotation.y+= Math.PI / 2;
    this.add(ribbon1_msh);
    this.add(ribbon2_msh);
    
  }
}

/**/
class Snow extends THREE.Group
{
    constructor()
    {
        super();
        //Particles
        // An array of particles
        var geoArray = [];
        var matArray = [];
        this.meshArray = [];
        var iNumber = 500;
        this.meshArray_init = [];
        var dirArray = [];//directions

        for (var i=0; i<iNumber; i++)
        {
            geoArray.push(new THREE.SphereGeometry(0.1, 0.1, 0.1, 4 ));
            matArray.push(new THREE.MeshPhongMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 }));
            this.meshArray.push(new THREE.Mesh(geoArray[i], matArray[i]));

            this.meshArray[i].position.z = Math.random()*50 - 25;
            this.meshArray[i].position.x = Math.random()*50 - 25;
            this.meshArray[i].position.y = Math.random()*100;


            this.meshArray_init.push(new THREE.Vector3());
            this.meshArray_init[i].x = this.meshArray[i].position.x;
            this.meshArray_init[i].y = this.meshArray[i].position.y;
            this.meshArray_init[i].z = this.meshArray[i].position.z;

            this.add(this.meshArray[i]);
        }
    }
    animate()
    {
        for (var i=0; i<this.meshArray.length; i++)
        {
            this.meshArray[i].position.y -= 0.1;
            this.meshArray[i].position.x = this.meshArray_init[i].x + Math.sin(iFrame/25 + i);
            this.meshArray[i].position.z = this.meshArray_init[i].z + Math.sin(iFrame/25 + i);
            //Recycle old particles
            if (this.meshArray[i].position.y < -50)
            {
                this.meshArray[i].position.y = Math.random()*100;
            }
        }
    }
}