"use strict";

// Scene
scene.background = new THREE.Color(0x77b5fe); // Camera

scene.add(camera); // Renderer

function ResizeRenderer(width, height) {
  var x = 0,
      y = 0,
      size = 0;

  if (height < width) {
    x = width / 2 - height / 2;
    size = height;
  } else if (width < height) {
    y = height / 2 - width / 2;
    size = width;
  } else // assume width === height
    {
      size = height;
    }

  renderer.setSize(width, height);
  renderer.setViewport(x, y, size, size);
}

ResizeRenderer(getCanvasWidth(), getCanvasHeight());
container.appendChild(renderer.domElement); // Lights

pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 2);
camera.add(pointLight); // Scene creation

levelLoader.loadLevel(); // DEBUG CONTROLS ONLY (toggle in globals.js)

function UpdateControls() {
  if (!debug) {
    return;
  } // Movement


  if (controls.forward) {
    camera.translateZ(-moveSpeed);
  }

  if (controls.backward) {
    camera.translateZ(moveSpeed);
  }

  if (controls.left) {
    camera.translateX(-moveSpeed);
  }

  if (controls.right) {
    camera.translateX(moveSpeed);
  }

  if (controls.up) {
    camera.translateY(moveSpeed);
  }

  if (controls.down) {
    camera.translateY(-moveSpeed);
  } // Rotation


  if (controls.rotleft) {
    camera.rotateY(rotSpeed);
  }

  if (controls.rotright) {
    camera.rotateY(-rotSpeed);
  }

  if (controls.rotup) {
    camera.rotateX(rotSpeed);
  }

  if (controls.rotdown) {
    camera.rotateX(-rotSpeed);
  }

  if (controls.rotcw) {
    camera.rotateZ(rotSpeed);
  }

  if (controls.rotccw) {
    camera.rotateZ(-rotSpeed);
  }
}

var actionManager = new ActionManager(); // every frame

function animate() {
  // Limit framerate 
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1000 / MAXFPS); // ----------

  objectManager.animateAll(iFrame);
  UpdateControls();
  actionManager.update(); // ----------

  iFrame = iFrame >= 60 ? 1 : iFrame + 1; // loops from 1 to 60 to 1 ... 

  renderer.render(scene, camera);
}

animate();

function btnPlay_Pressed() {
  ResetLevel();
  GenerateCode(event, 'simulated');
  StartAnimation();
}

function ResetLevel() {
  microbit.reset();
  actionManager.reset();
} // Short delay to allow user to acknowledge level has been reset


function StartAnimation() {
  setTimeout(function () {
    actionManager.running = true;
  }, 1000);
  setStatus(1);
}

window.addEventListener("resize", threejs_OnResize);

function threejs_OnResize() {
  var newWidth = getCanvasWidth();
  var newHeight = getCanvasHeight();
  ResizeRenderer(newWidth, newHeight);
  camera.aspect = newWidth / newHeight;
}

function btnPrevLevel_Pressed() {
  var currentLevel = parseInt(localStorage.getItem("levelID"));
  var prevLevel = Math.max(currentLevel - 1, 1);
  localStorage.setItem("levelID", prevLevel);
  location.reload();
}

function btnNextLevel_Pressed() {
  var currentLevel = parseInt(localStorage.getItem("levelID"));
  var numLevels = levelLoader.dataJSON.levels.length - 1;
  var nextLevel = Math.min(currentLevel + 1, numLevels);
  localStorage.setItem("levelID", nextLevel);
  location.reload();
}

function btnPrevLevel_SetDisabled(disabled) {
  var btnPrevLevel = document.getElementById("btnPrevLevel");
  btnPrevLevel.disabled = disabled;
  btnPrevLevel.textContent = disabled ? "🔒 Prev" : "← Prev";
}

function btnNextLevel_SetDisabled(disabled) {
  var btnNextLevel = document.getElementById("btnNextLevel");
  btnNextLevel.disabled = disabled;
  btnNextLevel.textContent = disabled ? "Next 🔒" : "Next →";
} // toggles button between "skip" and "next" (for when the user completes the level)


function btnNextLevel_SetSkip(skip) {
  var btnNextLevel = document.getElementById("btnNextLevel");

  if (skip) {
    btnNextLevel.classList += "skip";
    btnNextLevel.textContent = "Skip \u2192";
  } else {
    btnNextLevel.classList -= "skip";
    btnNextLevel.textContent = "Next \u2192";
  }
}

function setLevelComplete(levelID) {
  var progress = getProgress();
  progress[levelID] = true;
  setProgress(progress);
}

function OnJourneyComplete(success) {
  if (success) {
    setLevelComplete(getLevelID());
    btnNextLevel_SetSkip(false);
    setStatus(3);
  } else {
    setStatus(2);
  }
} // 0 = waiting, 1 = running, 2 = failed, 3 = complete


function setStatus(status) {
  var element = document.getElementById("statusIndicator");
  var messages = ["\uD83D\uDCA4 idle", "\u231B running", "\u274C failed", "\u2714\uFE0F complete"];
  element.textContent = messages[status];
}