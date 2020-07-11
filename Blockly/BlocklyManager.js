function loadWorkspace(button) {
  let workspace = Blockly.getMainWorkspace();
  workspace.clear();
  if (button.blocklyXml) {
    Blockly.Xml.domToWorkspace(button.blocklyXml, workspace);
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
  
  //Change to file read
  var code;
  code = `from microbit import *\n`

  code += Blockly.Python.workspaceToCode(workspace);
  console.log(code)
  try 
  {
    eval(code);
  } 
  catch (error) 
  {
    console.log(error);
  }

  // Start file download.
  download("microbit-full-pipeline-test.py", code)
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
  html += `      <block type="microbit_turnonled"><field name="Turn on LED"></field></block>`
  html += `      <block type="microbit_turnoffled"><field name="Turn off LED"></field></block>`
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
  html += `<button id="GenerateCode" onclick="GenerateCode(event)">Run</button>`
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