"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// levels are drawn as screens are (from top left)
//  0 1 2
// 0+
// 1  +
// 2    +
var LevelLoader =
/*#__PURE__*/
function () {
  function LevelLoader() {
    _classCallCheck(this, LevelLoader);

    this.dataJSON = readDataJSON();
    this.levelData = [];
    this.startingPos = new THREE.Vector2(0, 0);
    this.startingDir = new THREE.Vector2(0, 0);
    this.levelWidth = 0;
    this.levelHeight = 0;
  }

  _createClass(LevelLoader, [{
    key: "unloadLevel",
    value: function unloadLevel() {
      this.levelJSON = null;
      microbit.translateX(0);
      microbit.translateY(0);
      microbit.rotateX(THREE.Math.degToRad(90));
    }
  }, {
    key: "loadLevel",
    value: function loadLevel() {
      this.unloadLevel();
      this.levelID = getLevelID();
      this.levelData = this.dataJSON.levels[this.levelID];
      this.levelGrid = this.levelData.grid;
      this.startingPos = this.levelData.startingPos;
      this.startingDir = this.levelData.startingDir;
      this.destinationPos = this.levelData.destinationPos;
      this.setDescription(this.levelData.description);
      this.updateNavButtons();
      this.createLevel();
      this.moveCamera();
      microbit.reset();
      setStatus(0);
    }
  }, {
    key: "createLevel",
    value: function createLevel() {
      for (var y = 0; y < this.levelGrid.length; y++) {
        for (var x = 0; x < this.levelGrid[y].length; x++) {
          var tileData = this.levelGrid[y][x];
          var tileName = this.dataJSON.tiles[tileData].name;
          var floor = tileFactory.create(tileName);
          floor.translateX(x);
          floor.translateY(-y);
          floor.translateZ(-0.3);
        }

        var rowWidth = this.levelGrid[y].length;

        if (rowWidth > this.levelWidth) {
          this.levelWidth = rowWidth;
        }
      }

      this.levelHeight = this.levelGrid.length;
      var star = tileFactory.create("Star");
      star.translateX(this.destinationPos.x);
      star.translateY(-this.destinationPos.y);
    }
  }, {
    key: "moveCamera",
    value: function moveCamera() {
      camera.position.set(0, 0, 0);
      var offsetX = (this.levelWidth - 1) * 0.5;
      var offsetY = (this.levelHeight - 1) * 0.5;
      camera.translateX(offsetX);
      camera.translateY(-offsetY);
      camera.translateZ(5);
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      document.getElementById("levelDescription").textContent = "Level ".concat(this.levelID, ": ").concat(description);
      threejs_OnResize();
    }
  }, {
    key: "updateNavButtons",
    value: function updateNavButtons() {
      // if current levelID is 1 or lower, disable btnPrevLevel (otherwise, enable it)
      btnPrevLevel_SetDisabled(this.levelID <= 1); // if current levelID is the last available level, disable btnNextLevel

      if (this.levelID >= this.dataJSON.levels.length - 1) {
        btnNextLevel_SetDisabled(true);
      } else {
        btnNextLevel_SetDisabled(false); // if current level is NOT complete, set btnNextLevel to "skip" (otherwise, set it to "next")

        btnNextLevel_SetSkip(!isLevelComplete(this.levelID));
      }
    }
  }]);

  return LevelLoader;
}();

function readDataJSON() {
  var tile_json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': '/Research/threejs/levels/data.json',
    'dataType': "json",
    'success': function success(data) {
      tile_json = data;
    }
  });
  return tile_json;
}

function getLevelID() {
  // default levelID is 1
  if (!("levelID" in localStorage)) {
    setLevelID(1);
  }

  return parseInt(localStorage.getItem("levelID"));
}

function setLevelID(levelID) {
  localStorage.setItem("levelID", levelID);
}

function getProgress() {
  // level 0 is defaulted to complete
  if (!("progress" in localStorage)) {
    var defaultProgress = [];
    levelLoader.dataJSON.levels.forEach(function (level) {
      defaultProgress.push(false);
    });
    defaultProgress[0] = true;
    setProgress(defaultProgress);
  }

  return JSON.parse(localStorage.getItem("progress"));
}

function setProgress(progress) {
  localStorage.setItem("progress", JSON.stringify(progress));
}

function isLevelComplete(levelID) {
  var complete = getProgress()[levelID];

  if (complete === undefined || complete === null) {
    complete = false;
  }

  return complete;
}