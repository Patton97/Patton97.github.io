"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Microbit_Wheel =
/*#__PURE__*/
function (_THREE$Group) {
  _inherits(Microbit_Wheel, _THREE$Group);

  function Microbit_Wheel() {
    var _this;

    _classCallCheck(this, Microbit_Wheel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Microbit_Wheel).call(this));

    _this.createRim();

    _this.createTyre();

    _this.speed = 0;
    return _this;
  }

  _createClass(Microbit_Wheel, [{
    key: "createRim",
    value: function createRim() {
      var geo = new THREE.CylinderGeometry(0.19, 0.19, 0.1, 16, 1);
      var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff
      });
      var rim = new THREE.Mesh(geo, mat);
      this.add(rim); //decorate rim to make highlight when moving

      geo = new THREE.CylinderGeometry(0.06, 0.06, 0.11, 8, 1);
      mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });

      for (var i = 0; i < 3; i++) {
        var decoration = new THREE.Mesh(geo, mat);
        rim.add(decoration);
        decoration.rotateY(THREE.Math.degToRad(i * 120));
        decoration.translateZ(0.1);
      }

      geo = new THREE.CylinderGeometry(0.03, 0.03, 0.11, 8, 1);

      for (var _i = 0; _i < 3; _i++) {
        var _decoration = new THREE.Mesh(geo, mat);

        rim.add(_decoration);

        _decoration.rotateY(THREE.Math.degToRad(_i * 120 + 60));

        _decoration.translateZ(0.1);
      }
    }
  }, {
    key: "createTyre",
    value: function createTyre() {
      var geo = new THREE.CylinderGeometry(0.22, 0.22, 0.099, 16, 1);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });
      var tyre = new THREE.Mesh(geo, mat);
      this.add(tyre);
    }
  }, {
    key: "animate",
    value: function animate() {
      if (this.speed === 0) {
        return;
      }

      var rotAmount = THREE.Math.degToRad(this.speed);
      this.rotateY(rotAmount);
    }
  }]);

  return Microbit_Wheel;
}(THREE.Group);

var Microbit_Battery =
/*#__PURE__*/
function (_THREE$Group2) {
  _inherits(Microbit_Battery, _THREE$Group2);

  function Microbit_Battery(color) {
    var _this2;

    _classCallCheck(this, Microbit_Battery);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Microbit_Battery).call(this));
    color = color || 0x00FF00;

    _this2.createRod();

    _this2.createShell();

    return _this2;
  }

  _createClass(Microbit_Battery, [{
    key: "createRod",
    value: function createRod() {
      var geo = new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8, 1);
      var mat = new THREE.MeshPhongMaterial({
        color: 0xADADAD
      });
      var rod = new THREE.Mesh(geo, mat);
      this.add(rod);
    }
  }, {
    key: "createShell",
    value: function createShell() {
      var geo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16, 1);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x00FF00
      });
      var shell = new THREE.Mesh(geo, mat);
      this.add(shell);
    }
  }]);

  return Microbit_Battery;
}(THREE.Group);

var Microbit_BatteryPack =
/*#__PURE__*/
function (_THREE$Group3) {
  _inherits(Microbit_BatteryPack, _THREE$Group3);

  function Microbit_BatteryPack() {
    var _this3;

    _classCallCheck(this, Microbit_BatteryPack);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Microbit_BatteryPack).call(this));
    _this3.pack = _this3.createPack();
    _this3.batteries = _this3.createBatteries();
    return _this3;
  }

  _createClass(Microbit_BatteryPack, [{
    key: "createPack",
    value: function createPack() {
      var geo = new THREE.BoxGeometry(0.54, 0.14, 0.4);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });
      var pack = new THREE.Mesh(geo, mat);
      this.add(pack);
      return pack;
    }
  }, {
    key: "createBatteries",
    value: function createBatteries() {
      var batteries = [];

      for (var i = 0; i < 3; i++) {
        batteries[i] = new Microbit_Battery();
        batteries[i].rotateZ(THREE.Math.degToRad(90));
        batteries[i].translateX(0.05);
        batteries[i].translateZ((i - 1) * 0.1);
        this.pack.add(batteries[i]);
      }
    }
  }]);

  return Microbit_BatteryPack;
}(THREE.Group);

var Microbit_Chassis =
/*#__PURE__*/
function (_THREE$Group4) {
  _inherits(Microbit_Chassis, _THREE$Group4);

  function Microbit_Chassis() {
    var _this4;

    _classCallCheck(this, Microbit_Chassis);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Microbit_Chassis).call(this));

    _this4.createBack();

    _this4.createMiddle();

    _this4.createFront();

    _this4.createSides();

    _this4.slot = _this4.createSlot();
    return _this4;
  }

  _createClass(Microbit_Chassis, [{
    key: "createBack",
    value: function createBack() {
      var geo = new THREE.BoxGeometry(0.58, 0.02, 0.5);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });
      var back = new THREE.Mesh(geo, mat);
      this.add(back);
    }
  }, {
    key: "createMiddle",
    value: function createMiddle() {
      var geo = new THREE.BoxGeometry(0.82, 0.02, 0.16);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });
      var middle = new THREE.Mesh(geo, mat);
      middle.translateZ(0.33);
      this.add(middle);
    }
  }, {
    key: "createFront",
    value: function createFront() {
      var geo = new THREE.BoxGeometry(0.42, 0.02, 0.24);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });
      var front = new THREE.Mesh(geo, mat);
      front.translateZ(0.53);
      this.add(front);
    }
  }, {
    key: "createSides",
    value: function createSides() {
      var _this5 = this;

      var geo = new THREE.BoxGeometry(0.32, 0.02, 0.16);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });
      var side_L = new THREE.Mesh(geo, mat);
      var side_R = new THREE.Mesh(geo, mat);
      side_L.translateX(-0.2475);
      side_R.translateX(0.2475);
      var sides = [side_L, side_R];
      sides.forEach(function (side) {
        side.translateZ(0.4775);

        _this5.add(side);
      });
      side_L.rotateY(THREE.Math.degToRad(-50));
      side_R.rotateY(THREE.Math.degToRad(50));
    }
  }, {
    key: "createSlot",
    value: function createSlot() {
      var geo = new THREE.BoxGeometry(0.56, 0.1, 0.05);
      var mat = new THREE.MeshPhongMaterial({
        color: 0xADADAD
      });
      var slot = new THREE.Mesh(geo, mat);
      slot.translateZ(0.28);
      this.add(slot);
      return slot;
    }
  }]);

  return Microbit_Chassis;
}(THREE.Group);

var Microbit_LED =
/*#__PURE__*/
function (_THREE$Group5) {
  _inherits(Microbit_LED, _THREE$Group5);

  function Microbit_LED() {
    var _this6;

    _classCallCheck(this, Microbit_LED);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Microbit_LED).call(this));
    _this6.cylinder = _this6.createCylinder();
    _this6.sphere = _this6.createSphere();
    _this6.active = false;
    _this6.colors = [0x580000, 0xff0000]; // toggled when light is off/on

    _this6.updateLight();

    return _this6;
  }

  _createClass(Microbit_LED, [{
    key: "createCylinder",
    value: function createCylinder() {
      var geo = new THREE.CylinderGeometry(0.02, 0.02, 0.1);
      var mat = new THREE.MeshPhongMaterial({
        color: 0xff0000
      });
      var cylinder = new THREE.Mesh(geo, mat);
      cylinder.rotateX(THREE.Math.degToRad(90));
      this.add(cylinder);
      return cylinder;
    }
  }, {
    key: "createSphere",
    value: function createSphere() {
      var geo = new THREE.SphereGeometry(.02);
      var mat = new THREE.MeshPhongMaterial({
        color: 0xff0000
      });
      var sphere = new THREE.Mesh(geo, mat);
      sphere.translateZ(0.05);
      this.add(sphere);
      return sphere;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.active ? this.turnOff() : this.turnOn();
    }
  }, {
    key: "turnOn",
    value: function turnOn() {
      this.active = true;
      this.updateLight();
    }
  }, {
    key: "turnOff",
    value: function turnOff() {
      this.active = false;
      this.updateLight();
    }
  }, {
    key: "updateLight",
    value: function updateLight() {
      var newColor = this.colors[+this.active]; // unary operator --> false = 0, true = 1

      this.cylinder.material.color.setHex(newColor);
      this.sphere.material.color.setHex(newColor);
    }
  }]);

  return Microbit_LED;
}(THREE.Group);

var Microbit_Board =
/*#__PURE__*/
function (_THREE$Group6) {
  _inherits(Microbit_Board, _THREE$Group6);

  function Microbit_Board() {
    var _this7;

    _classCallCheck(this, Microbit_Board);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(Microbit_Board).call(this));
    _this7.leds = [['', '', '', '', ''], ['', '', '', '', ''], // super ugly i apologise to
    ['', '', '', '', ''], // everyone who ever reads
    ['', '', '', '', ''], // this...hopefully 0 people
    ['', '', '', '', '']];

    _this7.createBoard();

    _this7.createLEDs();

    _this7.createButtons();

    _this7.translateY(0.21);

    return _this7;
  }

  _createClass(Microbit_Board, [{
    key: "createBoard",
    value: function createBoard() {
      var geo = new THREE.BoxGeometry(0.52, 0.42, 0.02);
      var mat = new THREE.MeshPhongMaterial({
        color: 0x000000
      });
      var board = new THREE.Mesh(geo, mat);
      this.add(board);
    }
  }, {
    key: "createLEDs",
    value: function createLEDs() {
      for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
          var geo = new THREE.BoxGeometry(0.01, 0.02, 0.02);
          var mat = new THREE.MeshPhongMaterial({
            color: 0xADADAD
          });
          var led = new THREE.Mesh(geo, mat);
          led.translateX(x * 0.04 - 0.08);
          led.translateY(y * 0.04 - 0.08);
          led.translateZ(0.01);
          this.add(led);
          this.leds[x][y] = led;
        }
      }
    }
  }, {
    key: "createButtons",
    value: function createButtons() {}
  }]);

  return Microbit_Board;
}(THREE.Group);

var Microbit =
/*#__PURE__*/
function (_THREE$Group7) {
  _inherits(Microbit, _THREE$Group7);

  function Microbit() {
    var _this8;

    _classCallCheck(this, Microbit);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(Microbit).call(this));
    _this8.moveSpeed = 0;
    _this8.rotSpeed = 0;
    _this8.chassis = _this8.createChassis();
    _this8.leds = _this8.createLEDs();
    _this8.wheels = _this8.createWheels();
    _this8.batterypack = _this8.createBatteryPack();
    _this8.board = _this8.createBoard();

    _this8.chassis.translateY(-0.15);

    _this8.chassis.translateZ(-0.2);

    objectManager.addObject(_assertThisInitialized(_this8));
    return _this8;
  }

  _createClass(Microbit, [{
    key: "createChassis",
    value: function createChassis() {
      var chassis = new Microbit_Chassis();
      this.add(chassis);
      return chassis;
    }
  }, {
    key: "createLEDs",
    value: function createLEDs() {
      var _this9 = this;

      var led_L = new Microbit_LED();
      var led_R = new Microbit_LED();
      led_L.translateX(0.2);
      led_R.translateX(-0.2);
      var leds = [led_L, led_R];
      leds.forEach(function (led) {
        led.translateY(0.025);
        led.translateZ(0.56);

        _this9.chassis.add(led);
      });
      return leds;
    }
  }, {
    key: "createWheels",
    value: function createWheels() {
      var _this10 = this;

      var wheel_L = new Microbit_Wheel();
      var wheel_R = new Microbit_Wheel();
      wheel_L.translateX(0.35);
      wheel_R.translateX(-0.35);
      var wheels = [wheel_L, wheel_R];
      wheels.forEach(function (wheel) {
        wheel.rotateZ(THREE.Math.degToRad(-90));
        wheel.translateX(-0.06);

        _this10.chassis.add(wheel);
      });
      return wheels;
    }
  }, {
    key: "createBatteryPack",
    value: function createBatteryPack() {
      var batterypack = new Microbit_BatteryPack();
      batterypack.translateY(0.22);
      this.chassis.add(batterypack);
      return batterypack;
    }
  }, {
    key: "createBoard",
    value: function createBoard() {
      var board = new Microbit_Board();
      this.chassis.slot.add(board);
      return board;
    }
  }, {
    key: "animate",
    value: function animate() {
      this.wheels.forEach(function (wheel) {
        wheel.animate();
      });
      this.translateZ(this.moveSpeed * 0.01);
      this.rotateY(THREE.Math.degToRad(this.rotSpeed * -0.5));
    }
  }, {
    key: "setMoveSpeed",
    value: function setMoveSpeed(speed) {
      this.moveSpeed = speed;
      this.wheels.forEach(function (wheel) {
        wheel.speed = speed;
      });
    }
  }, {
    key: "setRotSpeed",
    value: function setRotSpeed(speed) {
      this.rotSpeed = speed;

      if (rotSpeed > 0) {
        this.wheels[0].speed = speed;
        this.wheels[1].speed = -speed;
      } else {
        this.wheels[0].speed = -speed;
        this.wheels[1].speed = speed;
      }
    }
  }, {
    key: "turnOnLED",
    value: function turnOnLED(side) // 0 = left, 1 = right, 2 = both
    {
      if (side === 2) {
        this.leds.forEach(function (led) {
          led.turnOn();
        });
      } else {
        this.leds[side].turnOn();
      }
    }
  }, {
    key: "turnOffLED",
    value: function turnOffLED(side) // 0 = left, 1 = right, 2 = both
    {
      if (side === 2) {
        this.leds.forEach(function (led) {
          led.turnOff();
        });
      } else {
        this.leds[side].turnOff();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      microbit.position.set(levelLoader.startingPos.x, -levelLoader.startingPos.y, 0); //surely a better way to autorot than this

      var dir = new THREE.Vector2(levelLoader.startingDir.x, levelLoader.startingDir.y);
      var degToRad_90 = THREE.Math.degToRad(90);
      var degToRad_180 = THREE.Math.degToRad(180); // default to facing up

      microbit.rotation.set(-degToRad_90, 0, degToRad_180);

      if (isFacingRight(dir)) {
        microbit.rotateY(-degToRad_90);
      }

      if (isFacingDown(dir)) {
        microbit.rotateY(degToRad_180);
      }

      if (isFacingLeft(dir)) {
        microbit.rotateY(degToRad_90);
      }
    }
  }]);

  return Microbit;
}(THREE.Group);

function isFacingUp(v) {
  return v.equals(new THREE.Vector2(0, -1));
}

function isFacingRight(v) {
  return v.equals(new THREE.Vector2(1, 0));
}

function isFacingDown(v) {
  return v.equals(new THREE.Vector2(0, 1));
}

function isFacingLeft(v) {
  return v.equals(new THREE.Vector2(-1, 0));
}