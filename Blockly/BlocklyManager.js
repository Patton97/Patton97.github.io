
function loadWorkspace(button) {
  let workspace = Blockly.getMainWorkspace();
  workspace.clear();
  if (button.blocklyXml) {
    Blockly.Xml.domToWorkspace(button.blocklyXml, workspace);
  }
}

function DownloadHex()
{
  // Getting a file through XMLHttpRequest as an arraybuffer and creating a Blob
  var base_hex_storage = localStorage.getItem("base_hex")
  var base_hex = document.getElementById("base_hex")

  if (base_hex_storage) 
  {
    // Reuse existing Data URL from localStorage
    base_hex.setAttribute("src", base_hex_storage);
  }
  else 
  {
      // Create XHR, Blob and FileReader objects
      var xhr = new XMLHttpRequest()
      var blob
      var fileReader = new FileReader()

      xhr.open("GET", "base.hex", true);
      // Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, 
      // but the support for "blob" is not widespread enough yet
      xhr.responseType = "arraybuffer";

      xhr.addEventListener("load", function () {
          if (xhr.status === 200) {
              // Create a blob from the response
              blob = new Blob([xhr.response], {type: "text/plain"});

              // onload needed since Google Chrome doesn't support addEventListener for FileReader
              fileReader.onload = function (evt) {
                  // Read out file contents as a Data URL
                  var result = evt.target.result;
                  // Set image src to Data URL
                  base_hex.setAttribute("src", result);
                  // Store Data URL in localStorage
                  try {
                      localStorage.setItem("base_hex", result);
                  }
                  catch (e) {
                      console.log("Storage failed: " + e);
                  }
              };
              // Load blob as Data URL
              fileReader.readAsDataURL(blob);
          }
      }, false);
      // Send XHR
      xhr.send();
  }
}

function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  //Fake link click to force download
  element.click()
  document.body.removeChild(element)
}

function GenerateCode(event) 
{
  //loadWorkspace(event.target);
  Blockly.Python.addReservedWords('code');
  
  let code = `
from microbit import *
I2caddr = 0x10
# Maqueen motor control
# direction:0=forward  1=back
# speed: 0~255
def motor(directionL, speedL, directionR, speedR):
  buf = bytearray(5)
  buf[0] = 0x00
  buf[1] = directionL
  buf[2] = speedL
  buf[3] = directionR
  buf[4] = speedR
  i2c.write(I2caddr, buf)\n`

  code += Blockly.Python.workspaceToCode(workspace);
  try 
  {
    eval(code);
  } 
  catch (error) 
  {
    console.log(error);
  }

  // Start file download.
  let output_hex = ConvertToHex(code)
  download('microbit.hex', output_hex)
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
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};

function CreateBlocklyArea()
{
  let main = document.getElementsByTagName("main")[0]
  let html = ``
  html += `<section id="blockly" style="height: 480px; width: 600px;">`
  html += `  <xml id="toolbox" style="display: none">`
  html += `    <category name="Microbit" colour="%{BKY_MATH_HUE}">`
  html += `      <block type="microbit_indicator"><field name="%1 Turn %2 indicator %3"></field></block>`
  html += `      <block type="microbit_motor"><field name=%1 Drive %2"></field></block>`
  html += `      <block type="microbit_display_image"><field name="%1 Display %2"></field></block>`  
  html += `      <block type="microbit_wait"><field name="Wait"></field></block>`
  html += `      <block type="controls_whileUntil"></block>`
  html += `      <block type="logic_boolean"></block>`
  html += `    </category>`
  html += `    <category name="Math" colour="%{BKY_MATH_HUE}">`
  html += `      <block type="math_number">`
  html += `        <field name="NUM">123</field>`
  html += `      </block>`
  html += `    </category>`
  html += `    <category name="Variables" colour="330" custom="VARIABLE"></category>`
  html += `    <category name="Functions" colour="290" custom="PROCEDURE"></category>`
  html += `  </xml>`
  html += `</section>`
  main.innerHTML += html
  
  return document.getElementById('blockly')
}

function CreateWorkspace()
{
  let blocklyDiv = document.getElementById('blockly')
  let workspaceOptions = 
  { 
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos',
    scrollbars: false
  }
  return Blockly.inject(blocklyDiv, workspaceOptions)
}

var blocklyArea = CreateBlocklyArea(); //store area for resize ops
var blocklyDiv = document.getElementById('blockly');
var workspace = CreateWorkspace();

function myUpdateFunction(event) {
  var code = Blockly.Python.workspaceToCode(workspace);
  console.log(code);
}
workspace.addChangeListener(myUpdateFunction);

//Handle resize operation | NOTE: Could be removed if planning to keep area fixed
window.addEventListener('resize', OnResize, false);
OnResize();
Blockly.svgResize(workspace);
