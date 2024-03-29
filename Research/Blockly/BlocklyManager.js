
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

function GenerateCode_Microbit_Pre_User_Code(levelGrid, startingPos, startingDir, destinationPos)
{
  let pre_user_code = `# Load level-specific data\n`
  pre_user_code += `level = ${JSON.stringify(levelGrid)}\n`
  pre_user_code += `startingPos    = [${startingPos.x}, ${startingPos.y}]\n`
  pre_user_code += `startingDir    = [${startingDir.x}, ${startingDir.y}]\n`
  pre_user_code += `destinationPos = [${destinationPos.x}, ${destinationPos.y}]\n`
  pre_user_code += `currentPos = startingPos\n`
  pre_user_code += `currentDir = startingDir\n`
  pre_user_code += `myDestination = destinationPos\n`
  pre_user_code += `updateStatus()\n`
  return pre_user_code
}

function GenerateCode_Microbit_Post_User_Code()
{
  let post_user_code = `# Mark end of user code\n`
  post_user_code += `isRunning = False\n`
  post_user_code += `updateStatus()\n`
  return post_user_code
}

function GenerateCode_Microbit(event) 
{
  //loadWorkspace(event.target);
  Blockly.Python.addReservedWords('code')

  // Craft user code w/pre&post reqs
  let levelData = readDataJSON().levels[localStorage.getItem("levelID")]
  let pre_user_code = GenerateCode_Microbit_Pre_User_Code(levelData.grid,levelData.startingPos,levelData.startingDir,levelData.destinationPos)
  let user_code = Blockly.Python.workspaceToCode(workspace)
  let post_user_code = GenerateCode_Microbit_Post_User_Code()

  let full_code = `${pre_user_code}\n${user_code}\n${post_user_code}\n`
  
  // DEBUG ONLY: print generated code
  console.log(`${full_code}`)

  //hexlify generated code
  let output_hex = ConvertToHex(full_code)
  // Start file download
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