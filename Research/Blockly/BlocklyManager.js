
function readFromTextFile(file) {
  let fileContents;
  let rawFile = new XMLHttpRequest()
  rawFile.open("GET", file, false)
  //rawFile.overrideMimeType("text/html")
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        fileContents = rawFile.responseText
      }
    }
  }
  rawFile.send(null)
  return fileContents
}

function loadWorkspace(button) {
  let workspace = Blockly.getMainWorkspace()
  workspace.clear()
  if (button.blocklyXml) {
    Blockly.Xml.domToWorkspace(button.blocklyXml, workspace)
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
  
  let required_import = `from microbit import *\n`
  let code = Blockly.Python.workspaceToCode(workspace)

  // Attempt to catch any discrepencies in the code (like an IDE would)
  try {
    eval(required_import + code)
  } 
  catch (error) {
    console.log(`${error}\n${required_import}${code}`)
  }

  // Start file download.
  let output_hex = ConvertToHex(code)
  download('microbit.hex', output_hex)
}

function OnResize() {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea
  var x = 0
  var y = 0
  do {
    x += element.offsetLeft
    y += element.offsetTop
    element = element.offsetParent
  } while (element)
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px'
  blocklyDiv.style.top = y + 'px'
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px'
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px'
  Blockly.svgResize(workspace)
};

function CreateBlocklyArea()
{
  let main = document.getElementsByTagName("main")[0]  
  main.innerHTML += readFromTextFile("/Research/Blockly/blockly_toolbox.html")
  
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

var blocklyArea = CreateBlocklyArea() //store area for resize ops
var blocklyDiv = document.getElementById('blockly')
var workspace = CreateWorkspace()

function myUpdateFunction(event) {
  var code = Blockly.Python.workspaceToCode(workspace)
  console.log(`---\n${code}\n---`)
}
workspace.addChangeListener(myUpdateFunction);

//Handle resize operation | NOTE: Could be removed if planning to keep area fixed
window.addEventListener('resize', OnResize, false)
OnResize()
Blockly.svgResize(workspace)
