
function readFromTextFile(file) {
  let fileContents;
  let rawFile = new XMLHttpRequest()
  rawFile.open("GET", file, false)
  rawFile.overrideMimeType("text/plain")
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

function GenerateCode(event, environment)
{
  if(environment == 'physical')
  { 
    GenerateCode_Microbit(event)
    return
  }
  if(environment == 'simulated') 
  { 
    GenerateCode_ThreeJS(event)
    return
  }
  alert('invalid environment arg')
}

function GenerateCode_ThreeJS(event)
{
  Blockly.JavaScript.addReservedWords('code')
  let code = Blockly.JavaScript.workspaceToCode(workspace)
  console.log(code)
  // Attempt to catch any discrepencies in the code (like an IDE would)
  try {
    eval(code)
  } 
  catch (error) {
    console.log(`${error}\n${error.stack}\n${code}`)
  }
}

function GenerateCode_Microbit(event) 
{
  //loadWorkspace(event.target);
  Blockly.Python.addReservedWords('code')
  
  let required_import = readFromTextFile(`/Research/Blockly/base.py`)

  // inject level data
  let levelData = readDataJSON().levels[localStorage.getItem("levelID")]

  let level_code = `# Load level-specific data`
  level_code += `level = ${levelData.grid}`
  level_code += `startingPos    = [${levelData.startingPos.x},    ${levelData.startingPos.y}]`
  level_code += `startingDir    = [${levelData.startingDir.x},    ${levelData.startingDir.y}]`
  level_code += `destinationPos = [${levelData.destinationPos.x}, ${levelData.destinationPos.y}]`
  level_code += `currentPos = startingPos`
  level_code += `currentDir = startingDir`
  level_code += `myDestination = destinationPos`

  let user_code = Blockly.Python.workspaceToCode(workspace)
  let full_code = `${required_import}\n${level_code}\n${user_code}`

  // Attempt to catch any discrepencies in the code (like an IDE would)
  try {
    eval(full_code)
  } 
  catch (error) {
    console.log(`${error}\n${full_code}`)
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
  let workspaceWidth = blocklyArea.offsetWidth - (parseInt(window.getComputedStyle(blocklyArea).paddingLeft)*4)
  let workspaceHeight = blocklyArea.offsetHeight - (parseInt(window.getComputedStyle(blocklyArea).paddingTop)*4)
  blocklyDiv.style.width = workspaceWidth + 'px'
  blocklyDiv.style.height = workspaceHeight + 'px'

  // Resize the buttons
  let buttons = document.getElementById(`blocklyButtons`)
  buttons.style.width = `${workspaceWidth}px`
  //Blockly.svgResize(workspace)
};

function CreateBlocklyArea()
{
  let container = document.getElementById(`blocklyContainer`)
  let levelID = localStorage.getItem(`levelID`)
  let blocklyHTML = ``
  blocklyHTML += `<div id="blockly" style="height: 480px; width: 600px;">`
  blocklyHTML += `  <xml id="toolbox" style="display: none">`
  blocklyHTML += readFromTextFile(`/Research/Blockly/toolboxes/level${levelID}.html`)
  blocklyHTML += `  </xml>`
  blocklyHTML += `</div>`
  container.innerHTML = blocklyHTML + container.innerHTML
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

CreateBlocklyArea()
var blocklyArea = document.getElementById('blocklyContainer') //store area for resize ops
var blocklyDiv = document.getElementById('blockly')
var workspace = CreateWorkspace()

blocklyDiv.style.width = `100%`
blocklyDiv.style.height = `90%`

//force colour change
document.getElementsByClassName(`blocklyFlyoutBackground`)[0].style.fill = `#888888`

function myUpdateFunction(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace)
  console.log(`---\n${code}\n---`)
}
workspace.addChangeListener(myUpdateFunction);

//Handle resize operation | NOTE: Could be removed if planning to keep area fixed
/*
window.addEventListener('resize', OnResize, false)
OnResize()

*/
Blockly.svgResize(workspace)

function readDataJSON()
{
  let tile_json = null
  $.ajax({
      'async': false,
      'global': false,
      'url': '/Research/threejs/levels/data.json',
      'dataType': "json",
      'success': function (data) {
        tile_json = data
      }
  })
  return tile_json
}