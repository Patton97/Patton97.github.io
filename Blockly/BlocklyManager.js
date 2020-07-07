function RunCode(event) 
{
  loadWorkspace(event.target);
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
  code += 'console.log("it worked");';
  try 
  {
    eval(code);
  } 
  catch (error) 
  {
    console.log(error);
  }
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
}

function Initialise()
{
  CreateBlocklyArea();  
  var blocklyDiv = document.getElementById('blockly');
  var workspace = Blockly.inject(blocklyDiv,
          {toolbox: document.getElementById('toolbox'),
            renderer: 'zelos'}
          );
  
  window.addEventListener('resize', OnResize, false);
  OnResize();
  Blockly.svgResize(workspace);
}

Initialise();
var blocklyArea = document.getElementById('blockly'); //store area for resize ops