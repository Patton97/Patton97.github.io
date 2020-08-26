"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ROADCOLOUR = 0x696969;
var CURBCOLOUR = 0xf32800;
var SKYCOLOUR = 0x77b5fe;
var GRASSCOLOUR = 0x008800;
var ERRORCOLOUR = 0xFF66CC;
var tileDict = {
  "Grass": function Grass() {
    return tileFactory.createGrass();
  },
  "Star": function Star() {
    return tileFactory.createStar();
  },
  "RoadVertical": function RoadVertical() {
    return tileFactory.createRoadVertical();
  },
  "RoadHorizontal": function RoadHorizontal() {
    return tileFactory.createRoadHorizontal();
  },
  "RoadCross": function RoadCross() {
    return tileFactory.createRoadCross();
  },
  "RoadCornerTL": function RoadCornerTL() {
    return tileFactory.createRoadCorner(0);
  },
  "RoadCornerTR": function RoadCornerTR() {
    return tileFactory.createRoadCorner(1);
  },
  "RoadCornerBR": function RoadCornerBR() {
    return tileFactory.createRoadCorner(2);
  },
  "RoadCornerBL": function RoadCornerBL() {
    return tileFactory.createRoadCorner(3);
  },
  "RoadEndTop": function RoadEndTop() {
    return tileFactory.createRoadEnd(0);
  },
  "RoadEndRight": function RoadEndRight() {
    return tileFactory.createRoadEnd(1);
  },
  "RoadEndBottom": function RoadEndBottom() {
    return tileFactory.createRoadEnd(2);
  },
  "RoadEndLeft": function RoadEndLeft() {
    return tileFactory.createRoadEnd(3);
  }
};

var TileFactory =
/*#__PURE__*/
function () {
  function TileFactory() {
    _classCallCheck(this, TileFactory);
  }

  _createClass(TileFactory, [{
    key: "create",
    value: function create(tileName) {
      if (!tileName in tileDict) {
        console.log("Error: ".concat(tileName, " is an invalid tile name"));
        return null;
      }

      return tileDict[tileName]();
    }
  }, {
    key: "createGrass",
    value: function createGrass() {
      var tile = new Tile(GRASSCOLOUR);
      return objectManager.addObject(tile);
    }
  }, {
    key: "createStar",
    value: function createStar() {
      var star = new Star();
      return objectManager.addObject(star);
    }
  }, {
    key: "createRoadVertical",
    value: function createRoadVertical() {
      var tile = new RoadStraight(false);
      return objectManager.addObject(tile);
    }
  }, {
    key: "createRoadHorizontal",
    value: function createRoadHorizontal() {
      var tile = new RoadStraight(true);
      return objectManager.addObject(tile);
    }
  }, {
    key: "createRoadCross",
    value: function createRoadCross() {
      var tile = new Tile(ROADCOLOUR);
      return objectManager.addObject(tile);
    }
  }, {
    key: "createRoadCorner",
    value: function createRoadCorner(side) {
      var tile = new RoadCorner(side);
      return objectManager.addObject(tile);
    }
  }, {
    key: "createRoadEnd",
    value: function createRoadEnd(side) {
      var tile = new RoadEnd(side);
      return objectManager.addObject(tile);
    }
  }]);

  return TileFactory;
}();

var Star =
/*#__PURE__*/
function (_THREE$Sprite) {
  _inherits(Star, _THREE$Sprite);

  function Star() {
    var _this;

    _classCallCheck(this, Star);

    var spriteMap = new THREE.TextureLoader().load("/Images/Blockly/star.png");
    var mat = new THREE.SpriteMaterial({
      map: spriteMap
    });
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Star).call(this, mat));

    _this.scale.set(0.75, 0.75, 0.75);

    _this.translateZ(-0.25);

    return _this;
  }

  return Star;
}(THREE.Sprite);

var Tile =
/*#__PURE__*/
function (_THREE$Mesh) {
  _inherits(Tile, _THREE$Mesh);

  function Tile(color) {
    _classCallCheck(this, Tile);

    color = color ? color : ERRORCOLOUR;
    var geo = new THREE.PlaneGeometry(1, 1, 32);
    var mat = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide
    });
    return _possibleConstructorReturn(this, _getPrototypeOf(Tile).call(this, geo, mat));
  }

  return Tile;
}(THREE.Mesh);

var RoadTile =
/*#__PURE__*/
function (_THREE$Group) {
  _inherits(RoadTile, _THREE$Group);

  function RoadTile() {
    var _this2;

    _classCallCheck(this, RoadTile);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(RoadTile).call(this));
    _this2.curbMat = new THREE.MeshBasicMaterial({
      color: CURBCOLOUR
    });

    _this2.add(new Tile(ROADCOLOUR));

    return _this2;
  }

  return RoadTile;
}(THREE.Group);

var Curb =
/*#__PURE__*/
function (_THREE$Group2) {
  _inherits(Curb, _THREE$Group2);

  function Curb() {
    var _this3;

    _classCallCheck(this, Curb);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Curb).call(this));
    var geo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var mat_red = new THREE.MeshBasicMaterial({
      color: 0xf32800
    });
    var mat_white = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
    var numSegments = 1 + 1 / geo.parameters.height;
    var matFlipper = false; // alternate red/white/red/white/red

    for (var i = 0; i < numSegments; i++) {
      // alternate red/white/red/white/red
      var mat = matFlipper ? mat_red : mat_white;
      matFlipper = !matFlipper;
      var mesh = new THREE.Mesh(geo, mat);
      mesh.translateY(i * geo.parameters.height - 0.5);

      _this3.add(mesh);
    }

    return _this3;
  }

  return Curb;
}(THREE.Group);

var Marking =
/*#__PURE__*/
function (_THREE$Mesh2) {
  _inherits(Marking, _THREE$Mesh2);

  function Marking(length) {
    _classCallCheck(this, Marking);

    var geo = new THREE.PlaneGeometry(0.1, length, 0.1);
    var mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    return _possibleConstructorReturn(this, _getPrototypeOf(Marking).call(this, geo, mat));
  }

  return Marking;
}(THREE.Mesh);

var RoadStraight =
/*#__PURE__*/
function (_RoadTile) {
  _inherits(RoadStraight, _RoadTile);

  function RoadStraight(horizontal) {
    var _this4;

    _classCallCheck(this, RoadStraight);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(RoadStraight).call(this));
    _this4.horizontal = horizontal;

    _this4.createCurbs();

    _this4.createMarkings();

    return _this4;
  }

  _createClass(RoadStraight, [{
    key: "createCurbs",
    value: function createCurbs() {
      var _this5 = this;

      var curbs = [new Curb(), new Curb()];

      if (this.horizontal) {
        curbs.forEach(function (curb) {
          curb.rotateZ(THREE.Math.degToRad(90));
        });
      }

      curbs[0].translateX(-0.5);
      curbs[1].translateX(0.5);
      curbs.forEach(function (curb) {
        _this5.add(curb);
      });
    }
  }, {
    key: "createMarkings",
    value: function createMarkings() {
      var marking = new Marking(0.35);

      if (this.horizontal) {
        marking.rotateZ(THREE.Math.degToRad(90));
      }

      this.add(marking);
    }
  }]);

  return RoadStraight;
}(RoadTile);

var RoadCorner =
/*#__PURE__*/
function (_RoadTile2) {
  _inherits(RoadCorner, _RoadTile2);

  function RoadCorner(side) {
    var _this6;

    _classCallCheck(this, RoadCorner);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(RoadCorner).call(this));
    _this6.side = side || 0;

    _this6.createCurbs();

    _this6.createMarkings();

    return _this6;
  }

  _createClass(RoadCorner, [{
    key: "createCurbs",
    value: function createCurbs() {
      var _this7 = this;

      var curbs = [new Curb(), new Curb()]; // rotate to fit different corner sides 
      // (0 = left&top, 1 = top&right, 2 = right&bottom, 3 = bottom&left)

      curbs.forEach(function (curb) {
        curb.rotateZ(THREE.Math.degToRad(_this7.side * -90));
      }); // sides

      curbs[0].translateX(-0.5); // end

      curbs[1].translateY(0.5);
      curbs[1].rotateZ(THREE.Math.degToRad(90)); // add to group

      curbs.forEach(function (curb) {
        _this7.add(curb);
      });
    }
  }, {
    key: "createMarkings",
    value: function createMarkings() {
      var _this8 = this;

      var markings = [new Marking(0.27), new Marking(0.27)];
      markings.forEach(function (marking) {
        marking.rotateZ(THREE.Math.degToRad(_this8.side * -90));
      });
      markings[0].translateY(-0.09);
      markings[1].translateX(0.09);
      markings[1].rotateZ(THREE.Math.degToRad(90));
      markings.forEach(function (marking) {
        _this8.add(marking);
      });
    }
  }]);

  return RoadCorner;
}(RoadTile);

var RoadEnd =
/*#__PURE__*/
function (_RoadTile3) {
  _inherits(RoadEnd, _RoadTile3);

  function RoadEnd(side) {
    var _this9;

    _classCallCheck(this, RoadEnd);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(RoadEnd).call(this));
    _this9.side = side || 0;

    _this9.createCurbs();

    _this9.createMarkings();

    return _this9;
  }

  _createClass(RoadEnd, [{
    key: "createCurbs",
    value: function createCurbs() {
      var _this10 = this;

      var curbs = [new Curb(), new Curb(), new Curb()]; // rotate to fit different end sides 
      // (0 = top, 1 = right, 2 = bottom, 3 = left)

      curbs.forEach(function (curb) {
        curb.rotateZ(THREE.Math.degToRad(_this10.side * -90));
      }); // sides

      curbs[0].translateX(0.5);
      curbs[1].translateX(-0.5); // end

      curbs[2].translateY(0.5);
      curbs[2].rotateZ(THREE.Math.degToRad(90)); // add to group

      curbs.forEach(function (curb) {
        _this10.add(curb);
      });
    }
  }, {
    key: "createMarkings",
    value: function createMarkings() {
      var marking = new Marking(0.35);
      marking.rotateZ(THREE.Math.degToRad(this.side * -90));
      this.add(marking);
    }
  }]);

  return RoadEnd;
}(RoadTile);

function getRandomColour() {
  var letters = '0123456789ABCDEF';
  var colour = '#';

  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }

  return colour;
}