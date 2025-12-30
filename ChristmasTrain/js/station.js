/************
 * TEXTURES *
 ************/
//Brick
var temp_mat = new THREE.MeshPhongMaterial({color:0xAAAAFF});
var brick_txt = loader.load( 'textures/brick.jpg', function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 2, 2 );

} );
var brick_mat = new THREE.MeshPhongMaterial({
  map: brick_txt,
  shininess: 0
});


//Dark wood
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

//Metal
var metal_mat = new THREE.MeshPhongMaterial({
  map: loader.load('textures/metalframe.jpg'),
  shininess: 100
});

//Gravel
var gravel_txt = loader.load( 'textures/gravel.jpg', function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 20,20);

} );
var gravel_mat = new THREE.MeshPhongMaterial({ map: gravel_txt});


/***********
 * CLASSES *
 ***********/

class StationPillar extends THREE.Group{
  constructor(){
    super();
    //Pillar
    var pillar_geo = new THREE.BoxGeometry(1,10,1);
    var pillar_msh = new THREE.Mesh(pillar_geo, woodDark_mat);

    this.add(pillar_msh);

    //Beams
    var beam_geo  = new THREE.BoxGeometry(1,5,.9);
    var beam1_msh = new THREE.Mesh(beam_geo, woodDark_mat);
    var beam2_msh = new THREE.Mesh(beam_geo, woodDark_mat);

    beam1_msh.rotation.z += Math.PI / 4;
    beam2_msh.rotation.z -= Math.PI / 4;

    beam1_msh.position.x -= 1.5;
    beam1_msh.position.y += 3;

    beam2_msh.position.x += 1.5;
    beam2_msh.position.y += 3;

    pillar_msh.add(beam1_msh);
    pillar_msh.add(beam2_msh);

    //Give lights a model of lamp to visualise with context to scene
    var lamp = new Lamp();
    this.add(lamp);
    lamp.position.y += 2;
    lamp.position.z += 1.75;
  }
}

/************************************
 * Generates a seating bench, using *
 *   a specified number of seats    *
 ************************************/
class Seating extends THREE.Group{
  constructor(numSeats){        
    super();//It is a pretendy group :) special

    //Default to 1 seat to avoid breaking
    if(numSeats <= 0){numSeats=1;}

    
    //Seats
    var chairSeatArray = [];
    var chairSeat_geo = new THREE.BoxGeometry(1.5,0.1,1.5);

    for(var i = 0; i < numSeats; i++)
    {
      //Make new seat, add to array
      chairSeatArray.push(new THREE.Mesh(chairSeat_geo, metal_mat));
      this.add(chairSeatArray[i]);
      
      //Position
      chairSeatArray[i].position.y += 1.1;
      chairSeatArray[i].position.x += (i*1.75) + 0.25;
    }

    //Backs
    var chairBackArray = [];
    var chairBack_geo = new THREE.BoxGeometry(1.5,1.5,0.1);

    for(var i = 0; i < numSeats; i++)
    {
      //Make new back, add to array
      chairBackArray.push(new THREE.Mesh(chairBack_geo, metal_mat));
      chairSeatArray[i].add(chairBackArray[i]);
      //Rotate
      chairBackArray[i].rotation.x -= Math.PI/12;
      //Position
      chairBackArray[i].position.y += 0.75;
      chairBackArray[i].position.z -= 0.75;
    }

    //Bases
    var chairBase_geo  = new THREE.TorusGeometry(1, 0.1, 8, 50, Math.PI);
    //Left
    var chairBaseL_msh = new THREE.Mesh(chairBase_geo, new THREE.MeshPhongMaterial({color: 0x555555}));
    chairBaseL_msh.rotation.y += Math.PI /2;
    chairBaseL_msh.position.y -= 1.1;
    chairBaseL_msh.position.x -= 0.75;
    chairSeatArray[0].add(chairBaseL_msh);
    //Right
    var chairBaseR_msh = new THREE.Mesh(chairBase_geo, new THREE.MeshPhongMaterial({color: 0x555555}));
    chairBaseR_msh.rotation.y += Math.PI /2;
    chairBaseR_msh.position.y -= 1.1;
    chairBaseR_msh.position.x += 0.75;    
    chairSeatArray[chairSeatArray.length-1].add(chairBaseR_msh);

    //Beams
    //  Calculate width of entire seat, 
    //  rather than doing it inside geo function.
    var width = (numSeats*1.5) + ((numSeats-1)*0.25);
    var beam_geo = new THREE.BoxGeometry(width,0.1,0.1);
    var beam_msh = new THREE.Mesh(beam_geo, new THREE.MeshPhongMaterial({color: 0x555555}));
    //Displace based on numSeats
    beam_msh.position.x+=(numSeats-1) - ((numSeats-1)*0.125);
    beam_msh.position.y-=0.1;
    chairSeatArray[0].add(beam_msh);
  }
}

/************************
 * Generates a fence of *
 *   specified length   *
 ************************/
class Fence extends THREE.Group{
  constructor(length){        
    super();//It is a pretendy group :) special

    //Default length to 1 to avoid breaking
    if(length <= 0){length=1;}

    //Beams
    //  Makes one more beam then the specified
    //   length to close off fence at end
    var beamArray = [];
    var beam_geo = new THREE.CylinderGeometry(0.1,0.1,2.5);

    for(var i = 0; i <= length; i++)
    {
      //Make new beam, add to array
      beamArray.push(new THREE.Mesh(beam_geo, temp_mat));
      this.add(beamArray[i]);

      //Position
      beamArray[i].position.x += i * 2;
    }

    //Panels
    var panelArray = [];
    var panel_geo = new THREE.BoxGeometry(2,2,0.1);

    for(var i = 0; i < length; i++)
    {
      //Make new panel, add to array
      panelArray.push(new THREE.Mesh(panel_geo, temp_mat));
      beamArray[i].add(panelArray[i]);
      
      //Position
      panelArray[i].position.x += 1;
    }
  }
}

class Station extends THREE.Group
{
  constructor()
  {
    super();
    
    
    //Base
    //Material
    var asphalt_txt = loader.load( 'textures/asphalt.png', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 30, 8 );
    });
    var asphalt_mat = new THREE.MeshPhongMaterial({
      map: asphalt_txt,
      bumpMap: asphalt_txt,
      //shininess: 0
    });
    var base_geo = new THREE.BoxGeometry(75,3,20);
    var base_msh = new THREE.Mesh(base_geo, asphalt_mat);

    base_msh.position.y -= 1;
    base_msh.position.z -= 15;

    this.add(base_msh);

    //Tactile paving (the yellow bit)
    var tactile_txt = loader.load( 'textures/tactile2.jpg', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 75, 1 );
    } );
    var tactile_mat = new THREE.MeshPhongMaterial({
      map: tactile_txt,
      bumpMap: tactile_txt,
      shininess: 0
    });
    var tactile_geo = new THREE.PlaneGeometry(75,1);
    var tactile_msh = new THREE.Mesh(tactile_geo, tactile_mat);
    base_msh.add(tactile_msh);

    tactile_msh.rotation.x -= Math.PI/2;
    tactile_msh.position.y += 1.51;
    tactile_msh.position.z += 7;

    //Warning Lines
    var warning_geo = new THREE.PlaneGeometry(75,0.5);
    var paintedAsphalt_txt = loader.load( 'textures/asphalt.png', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(  0, 0 );
      texture.repeat.set( 30, 0.2 );
    });
    //Yellow
    var yellowAsphalt_mat = new THREE.MeshPhongMaterial({
      bumpMap: paintedAsphalt_txt,
      shininess: 0
    });
    yellowAsphalt_mat.color.set(0xFFFF00);
    var warningYellow_msh = new THREE.Mesh(warning_geo, yellowAsphalt_mat);
    base_msh.add(warningYellow_msh);

    warningYellow_msh.rotation.x -= Math.PI/2;
    warningYellow_msh.position.y += 1.52;
    warningYellow_msh.position.z += 8.5;

    //Warning Lines
    //White    
    var whiteAsphalt_mat = new THREE.MeshPhongMaterial({
      bumpMap: paintedAsphalt_txt,
      shiniess: 0,
      color: 0xffffff
    });
    var warningWhite_msh = new THREE.Mesh(warning_geo, whiteAsphalt_mat);
    base_msh.add(warningWhite_msh);

    warningWhite_msh.rotation.x -= Math.PI/2;
    warningWhite_msh.position.y += 1.52;
    warningWhite_msh.position.z += 9.75;

    //Ramps
    //Material
    //Reshape same material used for base_msh
    var asphalt_txt = loader.load( 'textures/asphalt.png', function ( texture ) 
    {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 6, 8 );
    });
    
    //asphalt_txt.repeat.set(6,8);
    var asphalt_mat = new THREE.MeshPhongMaterial({
      map: asphalt_txt,
      bumpMap: asphalt_txt,
      shininess: 0
    });

    var ramp_geo = new THREE.BoxGeometry(12,3,20);
    var rampLeft_msh = new THREE.Mesh(ramp_geo, asphalt_mat);

    rampLeft_msh.rotation.z += Math.PI / 12;
    rampLeft_msh.position.x -= 42.9;
    rampLeft_msh.position.y -= 1.5;
    rampLeft_msh.position.z -= 0;

    base_msh.add(rampLeft_msh);

    var rampRight_msh = new THREE.Mesh(ramp_geo, asphalt_mat);

    rampRight_msh.rotation.z -= Math.PI / 12;
    rampRight_msh.position.x += 42.9;
    rampRight_msh.position.y -= 1.5;
    rampRight_msh.position.z -= 0;

    base_msh.add(rampRight_msh);

    //Building
    //Walls
    //Back
    var wall_geo = new THREE.BoxGeometry(1,10,15);
    var wallBackLeft_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallBackLeft_msh.position.x -= 15;
    wallBackLeft_msh.position.y += 4;
    wallBackLeft_msh.position.z -= 24.5;
    wallBackLeft_msh.rotation.y += Math.PI /2;
    this.add(wallBackLeft_msh);
    //Back Right
    var wall_geo = new THREE.BoxGeometry(1,10,15);
    var wallBackRight_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallBackRight_msh.position.x -= 30;
    wallBackRight_msh.position.y += 4;
    wallBackRight_msh.position.z -= 24.5;
    wallBackRight_msh.rotation.y += Math.PI /2;
    this.add(wallBackRight_msh);
    //More back walls - bad code but works, should use array if had more time
    var wallBackRight2_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallBackRight2_msh.position.x -= 0;
    wallBackRight2_msh.position.y += 4;
    wallBackRight2_msh.position.z -= 24.5;
    wallBackRight2_msh.rotation.y += Math.PI /2;
    this.add(wallBackRight2_msh);

    var wallBackRight3_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallBackRight3_msh.position.x += 15;
    wallBackRight3_msh.position.y += 4;
    wallBackRight3_msh.position.z -= 24.5;
    wallBackRight3_msh.rotation.y += Math.PI /2;
    this.add(wallBackRight3_msh);

    var wallBackRight4_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallBackRight4_msh.position.x += 30;
    wallBackRight4_msh.position.y += 4;
    wallBackRight4_msh.position.z -= 24.5;
    wallBackRight4_msh.rotation.y += Math.PI /2;
    this.add(wallBackRight4_msh);

    //Far right
    var wall_geo = new THREE.BoxGeometry(15,10,1);
    var wallFarRight_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallFarRight_msh.position.x += 30;
    wallFarRight_msh.position.y += 4;
    wallFarRight_msh.position.z -= 17;
    wallFarRight_msh.rotation.y += Math.PI /2;
    this.add(wallFarRight_msh);

    //Right
    var wall_geo = new THREE.BoxGeometry(1,10,15);
    var wallRight_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallRight_msh.position.x -= 8;
    wallRight_msh.position.y += 4;
    wallRight_msh.position.z -= 17;
    this.add(wallRight_msh);
    //Left
    var wall_geo = new THREE.BoxGeometry(1,10,15);
    var wallLeft_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallLeft_msh.position.x -= 37;
    wallLeft_msh.position.y += 4;
    wallLeft_msh.position.z -= 17;
    this.add(wallLeft_msh);
    //Attach lamp to this wall
    var wallLeftLamp = new Lamp();
    wallLeftLamp.rotation.y -= Math.PI /2;
    wallLeftLamp.position.x -= 2;
    wallLeftLamp.position.y += 2;
    wallLeft_msh.add(wallLeftLamp);

    //Front
    var wall_geo = new THREE.BoxGeometry(10,10,1);
    var wallFront_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallFront_msh.position.x -= 32.5;
    wallFront_msh.position.y += 4;
    wallFront_msh.position.z -= 10;
    this.add(wallFront_msh);
    //Inside
    var wall_geo = new THREE.BoxGeometry(1,10,15);
    var wallInside_msh = new THREE.Mesh(wall_geo, brick_mat);  
    wallInside_msh.position.x -= 27.5;
    wallInside_msh.position.y += 4;
    wallInside_msh.position.z -= 17;
    this.add(wallInside_msh);

    //Pillars
    var pillar1 = new StationPillar();
    this.add(pillar1);
    pillar1.position.x-=17.5;
    pillar1.position.y+=4;
    pillar1.position.z-=10;

    var pillar2 = new StationPillar();
    //this.add(pillar2);
    pillar2.position.x+=15;
    pillar2.position.y+=4;
    pillar2.position.z-=23;
    //pillar2.rotation.y+= Math.PI;

    var pillar3 = new StationPillar();
    this.add(pillar3);
    pillar3.position.x+=15;
    pillar3.position.y+=4;
    pillar3.position.z-=10;

    //Door
    //Frame
    var frame_geo = new THREE.BoxGeometry(1.5,7,1);
    var frameLeft_msh = new THREE.Mesh(frame_geo, temp_mat);
    var frameRight_msh = new THREE.Mesh(frame_geo, temp_mat);

    var frame_geo = new THREE.BoxGeometry(1.5,1,4);
    var frameTop_msh = new THREE.Mesh(frame_geo, temp_mat);

    frameLeft_msh.position.z  -= 2;
    frameRight_msh.position.z -= 6;

    frameTop_msh.position.y += 3;
    frameTop_msh.position.z -= 4;

    wallInside_msh.add(frameLeft_msh);
    wallInside_msh.add(frameRight_msh);
    wallInside_msh.add(frameTop_msh);

    //The actual Door..like...the swingy bit
    // It currently clips directly with wallArray
    // They're separated so they can have different textures
    var door_geo = new THREE.BoxGeometry(10,10,1);
    var door_msh = new THREE.Mesh(door_geo, temp_mat);

    //Flat ceiling
    var ceiling_geo = new THREE.BoxGeometry(85,0.5,18);
    var ceiling_msh = new THREE.Mesh(ceiling_geo, woodDark_mat);

    ceiling_msh.position.x += 10;
    ceiling_msh.position.y += 5;
    ceiling_msh.position.z -= 0;
    wallRight_msh.add(ceiling_msh);
    //Overarching Tunnel    
    var tunnel_txt = loader.load( 'textures/brick.jpg', function ( texture ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.repeat.set( 16, 16 );
      texture.rotation += Math.PI /2;
    } );

    var tunnel_mat = new THREE.MeshPhongMaterial({map: tunnel_txt, 
                                                   side:  THREE.BackSide});
    var tunnel_geo = new THREE.CylinderGeometry(30,30,150,
                                                 6,10,
                                                 false,
                                                 0,Math.PI);
    var tunnel_msh = new THREE.Mesh(tunnel_geo, tunnel_mat);
    tunnel_msh.rotation.z += Math.PI /2;
    tunnel_msh.position.y -= 10;
    wallRight_msh.add(tunnel_msh);
    
    //Floor
    var floor_geo = new THREE.PlaneGeometry(100, 100);

    var floor_msh = new THREE.Mesh(floor_geo, gravel_mat);
    floor_msh.rotation.x =  Math.PI / 2;
    floor_msh.rotation.y += Math.PI;
    floor_msh.position.y = -2.5;
    this.add(floor_msh);

    //Clock
    this.clock = new Clock;
    wallRight_msh.add(this.clock);

    //Station Name Plate
    //Frame
    var nameplateFrame_geo = new THREE.BoxGeometry(5.5,1,1);
    var nameplateFrame_msh = new THREE.Mesh(nameplateFrame_geo, new THREE.MeshPhongMaterial({color: 0x000000}));

    nameplateFrame_msh.position.x += 0.1;
    nameplateFrame_msh.position.y += 2;
    nameplateFrame_msh.position.z += 0;

    nameplateFrame_msh.rotation.y += Math.PI /2;
    wallRight_msh.add(nameplateFrame_msh);
    //Background
    var name_mat = new THREE.MeshBasicMaterial({
      map: loader.load('textures/name.jpg'),
    });
    var nameplateBack_geo = new THREE.BoxGeometry(5,0.5,0.5);  
    var nameplateBack_msh = new THREE.Mesh(nameplateBack_geo, name_mat);
    nameplateBack_msh.position.z+=0.26;
    nameplateFrame_msh.add(nameplateBack_msh);

    //Seating - hardcoding this seems best/only option.
    var benchLeft = new Seating(6);
    base_msh.add(benchLeft);

    benchLeft.rotation.y += Math.PI/2;
    benchLeft.position.x -= 6;
    benchLeft.position.y += 1.5;
    benchLeft.position.z += 3;

    var benchBackLeft = new Seating(10);
    base_msh.add(benchBackLeft);

    benchBackLeft.position.x -= 4;
    benchBackLeft.position.y += 1.5;
    benchBackLeft.position.z -= 8;

    var benchInsideRight = new Seating(6);
    base_msh.add(benchInsideRight);

    benchInsideRight.rotation.y -= Math.PI/2;
    benchInsideRight.position.x += 14;
    benchInsideRight.position.y += 1.5;
    benchInsideRight.position.z -= 6.25;

    var benchInsideLeft = new Seating(6);
    base_msh.add(benchInsideLeft);

    benchInsideLeft.rotation.y += Math.PI/2;
    benchInsideLeft.position.x += 16;
    benchInsideLeft.position.y += 1.5;
    benchInsideLeft.position.z += 3;

    var benchBackRight = new Seating(10);
    base_msh.add(benchBackRight);

    benchBackRight.position.x += 18;
    benchBackRight.position.y += 1.5;
    benchBackRight.position.z -= 8;

    //Fencing - REMOVED (Fences didn't look right in the tunnel)
    /*var fenceBack = new Fence(22);
    base_msh.add(fenceBack);

    fenceBack.position.x -= 7.5;
    fenceBack.position.y += 2.75;
    fenceBack.position.z -= 9.9;

    var fenceSide = new Fence(8);
    base_msh.add(fenceSide);

    fenceSide.rotation.y -= Math.PI /2;
    fenceSide.position.x += 36.5;
    fenceSide.position.y += 2.75;
    fenceSide.position.z -= 9.9;*/
  }

  animate()
  {
    this.clock.animate();
  }
}

class Clock extends THREE.Group
{
  constructor()
  {
    super();
    this.clockGearsArray = [];
    this.clockHandsArray = [];
    
    //Clock
    //Materials
    var clockBlack_mat = new THREE.MeshPhongMaterial({color: 0x000000})
    var clockWhite_mat = new THREE.MeshPhongMaterial({color: 0xFFFFFF})

    //Connecting Rods
    var rod_geo       = new THREE.BoxGeometry(0.1,0.1,2);
    var rodTop_msh    = new THREE.Mesh(rod_geo, clockBlack_mat);
    var rodMiddle_msh = new THREE.Mesh(rod_geo, clockBlack_mat);
    var rodBottom_msh = new THREE.Mesh(rod_geo, clockBlack_mat);

    rodTop_msh.rotation.x += Math.PI / 6;
    rodTop_msh.position.y += 1;
    rodTop_msh.position.z -= 0.5;

    rodMiddle_msh.position.y += 3.25;
    rodMiddle_msh.position.z += 8.5;

    rodBottom_msh.rotation.x -= Math.PI / 6;
    rodBottom_msh.position.y -= 1;
    rodBottom_msh.position.z -= 0.5;

    this.add(rodMiddle_msh);
    rodMiddle_msh.add(rodTop_msh);
    rodMiddle_msh.add(rodBottom_msh);

    //Face
    var clockFace_geo = new THREE.CylinderGeometry(1,1,0.5,12);
    var clockFace_msh = new THREE.Mesh(clockFace_geo, clockWhite_mat);

    clockFace_msh.rotation.z += Math.PI / 2;
    clockFace_msh.position.y += 0;
    clockFace_msh.position.z += 1;

    rodMiddle_msh.add(clockFace_msh);

    //Gears - unconventional use of Array, but works
    //  Big Gear   = Big Hand   (slower rotation)
    //  Small Gear = Small Hand (faster rotation)

    //Big 
    var clockGear_geo = new THREE.CylinderGeometry(0.1,0.1,0.1,6);
    this.clockGearsArray.push(new THREE.Mesh(clockGear_geo, clockBlack_mat));
    this.clockGearsArray.push(new THREE.Mesh(clockGear_geo, clockBlack_mat));
    //Small
    var clockGear_geo = new THREE.CylinderGeometry(0.1,0.1,0.1,6);
    this.clockGearsArray.push(new THREE.Mesh(clockGear_geo, clockBlack_mat));
    this.clockGearsArray.push(new THREE.Mesh(clockGear_geo, clockBlack_mat));

    //Reposition gears
    this.clockGearsArray[0].position.y += 0.3;
    this.clockGearsArray[1].position.y -= 0.3;
    this.clockGearsArray[2].position.y += 0.3;
    this.clockGearsArray[3].position.y -= 0.3;

    for(var i=0; i<4 ;i++)
    {
      clockFace_msh.add(this.clockGearsArray[i]);
    }

    //Gears - unconventional use of Array, but works
    //  Big Gear   = Big Gear   (faster rotation)
    //  Small Hand = Small Gear (slower rotation)

    //Big
    var clockHand_geo = new THREE.BoxGeometry(0.8,0.1,0.1);
    this.clockHandsArray.push(new THREE.Mesh(clockHand_geo, clockBlack_mat));
    this.clockHandsArray.push(new THREE.Mesh(clockHand_geo, clockBlack_mat));

    //Small
    var clockHand_geo = new THREE.BoxGeometry(0.4,0.1,0.1);
    this.clockHandsArray.push(new THREE.Mesh(clockHand_geo, clockBlack_mat));
    this.clockHandsArray.push(new THREE.Mesh(clockHand_geo, clockBlack_mat));

    for(var i = 0; i < 4; i++)
    {
      this.clockGearsArray[i].add(this.clockHandsArray[i]);
    }

    this.clockHandsArray[0].rotation.y -= Math.PI / 2;  
    this.clockHandsArray[1].rotation.y += Math.PI / 2;
    this.clockHandsArray[2].rotation.y -= Math.PI / 2;
    this.clockHandsArray[3].rotation.y += Math.PI / 2;

    this.clockHandsArray[0].position.z += 0.3;  
    this.clockHandsArray[1].position.z -= 0.3;
    this.clockHandsArray[2].position.z += 0.2;    
    this.clockHandsArray[3].position.z -= 0.2;

    //Fix one side being out-of-sync
    this.clockGearsArray[1].rotation.y -= Math.PI /2;
    this.clockGearsArray[3].rotation.y -= Math.PI /2;

    //Frame
    var clockFrame_geo = new THREE.TorusGeometry( 1, 0.3, 8, 50 );
    var clockFrame_msh = new THREE.Mesh( clockFrame_geo, clockBlack_mat);
    clockFrame_msh.rotation.x += Math.PI / 2;

    clockFace_msh.add(clockFrame_msh);
  }
  animate()
  {
    //Rotate clock gears
    //Big
    this.clockGearsArray[0].rotation.y -= 0.012;
    this.clockGearsArray[1].rotation.y += 0.012;

    //Small
    this.clockGearsArray[2].rotation.y -= 0.001;
    this.clockGearsArray[3].rotation.y += 0.001;
  }
}

/******************************
 * Loads obj file for lamp to *
 *  visualise light sources.  *
 ******************************/
class Lamp extends THREE.Group
{
    constructor()
    {
        super();
        var root_geo = new THREE.BoxGeometry(0.01,0.01,0.01);
        var root_mat = new THREE.MeshBasicMaterial( {color: temp_mat } );
        var root = new THREE.Mesh( root_geo, root_mat );
        this.add( root );

        var lampMat = new THREE.MeshPhongMaterial();
        loader.load(
          // resource URL
          'objects/WallLight.jpg',
          // Function when resource is loaded
          function ( texture ) {
            // do something with the texture
            lampMat = new THREE.MeshPhongMaterial( {
                map: texture
            } );
          },
          // Function called when download progresses
          function ( xhr ) { console.log( (xhr.loaded / xhr.total*100)+'% loaded' ); },
          // Function called when download errors
          function ( xhr ) { console.log( 'An error happened' ); }
        );
        //Lamp
        var lamp_obj;
        // instantiate a loader
        var objloader = new THREE.OBJLoader();
        // load a resource
        objloader.load(
            // resource URL
            'objects/WallLight.obj',
            // called when resource is loaded
            function ( object ) {
                lamp_obj = object;
                lamp_obj.scale.set(0.003,0.003,0.003);
                root.add( lamp_obj );
                if (lampMat!=null) {
                    lamp_obj.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) { child.material = lampMat; }
                    });
                }
            },
            // called when loading is in progresses
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
            // called when loading has errors
            function ( error ) { console.log( 'An error happened' ); }
        );      

      //Attach light
      var light = new THREE.PointLight( 0xffffff, 1, 50, 1 );
      light.position.y += 1;
      light.position.z += 1;
      this.add( light );
    }

}