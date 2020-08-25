"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function Action(name, frameLength) {
  _classCallCheck(this, Action);

  this.name = name;
  this.frameLength = frameLength;
};

var ActionManager =
/*#__PURE__*/
function () {
  function ActionManager() {
    _classCallCheck(this, ActionManager);

    this.actionList = [];
    this.running = false;
    this.actionNumber = 0;
    this.actionFrame = 0;
    this.predictionSuccess = true;
    this.position = new THREE.Vector2(0, 0);
    this.facing = new THREE.Vector2(0, 1);
    this.reset();
  }

  _createClass(ActionManager, [{
    key: "addAction",
    value: function addAction(name, frameLength) {
      //if prediction has reached fail state, ignore all further actions
      if (!this.predictionSuccess) {
        return;
      }

      this.actionList.push(new Action(name, frameLength));
    }
  }, {
    key: "addAction_MoveForward",
    value: function addAction_MoveForward() {
      this.addAction('MoveForward', 50);
      this.addAction_Stop();
      this.evaluate(1);
    }
  }, {
    key: "addAction_MoveBackward",
    value: function addAction_MoveBackward() {
      this.addAction('MoveBackward', 50);
      this.addAction_Stop();
      this.evaluate(-1);
    }
  }, {
    key: "addAction_TurnLeft",
    value: function addAction_TurnLeft() {
      this.addAction('TurnLeft', 45);
      this.addAction_Stop(); //surely a better way

      this.facing.set(this.facing.y, -this.facing.x);
    }
  }, {
    key: "addAction_TurnRight",
    value: function addAction_TurnRight() {
      this.addAction('TurnRight', 45);
      this.addAction_Stop(); //surely a better way

      this.facing.set(-this.facing.y, this.facing.x);
    }
  }, {
    key: "addAction_Stop",
    value: function addAction_Stop() {
      this.addAction('Stop', 20);
    }
  }, {
    key: "addAction_TurnOnLeftLED",
    value: function addAction_TurnOnLeftLED() {
      this.addAction('TurnOnLeftLED', 10);
    }
  }, {
    key: "addAction_TurnOnRightLED",
    value: function addAction_TurnOnRightLED() {
      this.addAction('TurnOnRightLED', 10);
    }
  }, {
    key: "addAction_TurnOnBothLED",
    value: function addAction_TurnOnBothLED() {
      this.addAction('TurnOnBothLED', 10);
    }
  }, {
    key: "addAction_TurnOffLeftLED",
    value: function addAction_TurnOffLeftLED() {
      this.addAction('TurnOffLeftLED', 10);
    }
  }, {
    key: "addAction_TurnOffRightLED",
    value: function addAction_TurnOffRightLED() {
      this.addAction('TurnOffRightLED', 10);
    }
  }, {
    key: "addAction_TurnOffBothLED",
    value: function addAction_TurnOffBothLED() {
      this.addAction('TurnOffBothLED', 10);
    }
  }, {
    key: "evaluate",
    value: function evaluate(direction) {
      if (!this.predictionSuccess) {
        return;
      }

      this.position.add(this.facing.multiplyScalar(direction));

      if (!this.isValidPosition()) {
        this.predicting = false;
        this.predictionSuccess = false;
      }
    }
  }, {
    key: "isValidPosition",
    value: function isValidPosition(position) {
      // if no position provided, assume they mean the current position
      position = position ? position : this.position; // if off-grid

      if (position.x < 0 || position.x >= levelLoader.levelWidth || position.y < 0 || position.y >= levelLoader.levelHeight) {
        return false;
      } // if grass tile    


      var tileType = levelLoader.levelGrid[position.y][position.x];

      if (!levelLoader.dataJSON.tiles[tileType].safe) {
        return false;
      } // otherwise


      return true;
    }
  }, {
    key: "isJourneyComplete",
    value: function isJourneyComplete() {
      if (this.position.x === levelLoader.destinationPos.x && this.position.y === levelLoader.destinationPos.y) {
        console.log("position:    ".concat(this.position.x, ", ").concat(this.position.y));
        console.log("destination: ".concat(levelLoader.destinationPos.x, ", ").concat(levelLoader.destinationPos.y));
        return true;
      }

      return false;
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.running) {
        return;
      }

      if (this.actionNumber < this.actionList.length) {
        this.perform(this.actionList[this.actionNumber]);
      } else {
        this.finalise();
        this.reset();
      }
    }
  }, {
    key: "perform",
    value: function perform(action) {
      if (!(action.name in actionDictionary)) {
        console.log("".concat(action.name, " has no implementation"));
        return;
      }

      actionDictionary[action.name](); // call action func via dictionary of "delegates" (not really delegates, but same idea)

      this.actionFrame++;

      if (this.actionFrame >= action.frameLength) {
        this.actionNumber++;
        this.actionFrame = 0;
      }
    }
  }, {
    key: "finalise",
    value: function finalise() {
      OnJourneyComplete(this.isJourneyComplete());
    }
  }, {
    key: "reset",
    value: function reset() {
      this.actionList = [];
      this.running = false;
      this.actionNumber = 0;
      this.actionFrame = 0;
      this.predicting = false;
      this.predictionSuccess = true;
      this.position.set(levelLoader.startingPos.x, levelLoader.startingPos.y);
      this.facing.set(levelLoader.startingDir.x, levelLoader.startingDir.y);
    }
  }]);

  return ActionManager;
}();

var actionDictionary = {
  'MoveForward': function MoveForward() {
    microbit.setMoveSpeed(1);
  },
  'MoveBackward': function MoveBackward() {
    microbit.setMoveSpeed(-1);
  },
  'TurnLeft': function TurnLeft() {
    microbit.setRotSpeed(-1);
  },
  'TurnRight': function TurnRight() {
    microbit.setRotSpeed(1);
  },
  'Stop': function Stop() {
    microbit.setMoveSpeed(0);
    microbit.setRotSpeed(0);
  },
  'TurnOnLeftLED': function TurnOnLeftLED() {
    microbit.turnOnLED(0);
  },
  'TurnOnRightLED': function TurnOnRightLED() {
    microbit.turnOnLED(1);
  },
  'TurnOnBothLED': function TurnOnBothLED() {
    microbit.turnOnLED(2);
  },
  'TurnOffLeftLED': function TurnOffLeftLED() {
    microbit.turnOffLED(0);
  },
  'TurnOffRightLED': function TurnOffRightLED() {
    microbit.turnOffLED(1);
  },
  'TurnOffBothLED': function TurnOffBothLED() {
    microbit.turnOffLED(2);
  }
};