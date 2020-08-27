"use strict";

function readFromTextFile(file) {
  var fileContents;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.overrideMimeType("text/plain");

  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        fileContents = rawFile.responseText;
      }
    }
  };

  rawFile.send(null);
  return fileContents;
}

function loadWorkspace(button) {
  var workspace = Blockly.getMainWorkspace();
  workspace.clear();

  if (button.blocklyXml) {
    Blockly.Xml.domToWorkspace(button.blocklyXml, workspace);
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element); //Fake link click to force download

  element.click();
  document.body.removeChild(element);
}

function GenerateCode(event, environment) {
  if (environment == 'physical') {
    GenerateCode_Microbit(event);
    return;
  }

  if (environment == 'simulated') {
    GenerateCode_ThreeJS(event);
    return;
  }

  alert('invalid environment arg');
}

function GenerateCode_ThreeJS(event) {
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code); // Attempt to catch any discrepencies in the code (like an IDE would)

  try {
    eval(code);
  } catch (error) {
    console.log("".concat(error, "\n").concat(error.stack, "\n").concat(code));
  }
}

function GenerateCode_Microbit(event) {
  //loadWorkspace(event.target);
  Blockly.Python.addReservedWords('code');
  var required_import = "from microbit import *\n";
  var code = Blockly.Python.workspaceToCode(workspace); // Attempt to catch any discrepencies in the code (like an IDE would)

  try {
    eval(required_import + code);
  } catch (error) {
    console.log("".concat(error, "\n").concat(required_import).concat(code));
  } // Start file download.


  var output_hex = ConvertToHex(code);
  download('microbit.hex', output_hex);
}

function OnResize() {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;

  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element); // Position blocklyDiv over blocklyArea.


  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  var workspaceWidth = blocklyArea.offsetWidth - parseInt(window.getComputedStyle(blocklyArea).paddingLeft) * 4;
  var workspaceHeight = blocklyArea.offsetHeight - parseInt(window.getComputedStyle(blocklyArea).paddingTop) * 4;
  blocklyDiv.style.width = workspaceWidth + 'px';
  blocklyDiv.style.height = workspaceHeight + 'px'; // Resize the buttons

  var buttons = document.getElementById("blocklyButtons");
  buttons.style.width = "".concat(workspaceWidth, "px"); //Blockly.svgResize(workspace)
}

;

function CreateBlocklyArea() {
  var container = document.getElementById("blocklyContainer");
  var levelID = localStorage.getItem("levelID");
  var blocklyHTML = "";
  blocklyHTML += "<div id=\"blockly\" style=\"height: 480px; width: 600px;\">";
  blocklyHTML += "  <xml id=\"toolbox\" style=\"display: none\">";
  blocklyHTML += readFromTextFile("/Research/Blockly/toolboxes/level".concat(levelID, ".html"));
  blocklyHTML += "  </xml>";
  blocklyHTML += "</div>";
  container.innerHTML = blocklyHTML + container.innerHTML;
}

function CreateWorkspace() {
  var blocklyDiv = document.getElementById('blockly');
  var workspaceOptions = {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos',
    scrollbars: false
  };
  return Blockly.inject(blocklyDiv, workspaceOptions);
}

CreateBlocklyArea();
var blocklyArea = document.getElementById('blocklyContainer'); //store area for resize ops

var blocklyDiv = document.getElementById('blockly');
var workspace = CreateWorkspace();
blocklyDiv.style.width = "100%";
blocklyDiv.style.height = "90%"; //force colour change

document.getElementsByClassName("blocklyFlyoutBackground")[0].style.fill = "#888888";

function myUpdateFunction(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log("---\n".concat(code, "\n---"));
}

workspace.addChangeListener(myUpdateFunction); //Handle resize operation | NOTE: Could be removed if planning to keep area fixed

/*
window.addEventListener('resize', OnResize, false)
OnResize()

*/

Blockly.svgResize(workspace);