// --------------------------------------------------------------------------------

Blockly.JavaScript['microbit_wait'] = function(block) {
  return 'actionManager.addAction_Stop()\n'
};

// --------------------------------------------------------------------------------

Blockly.JavaScript['microbit_indicator'] = function(block) {
  var dropdown_side = block.getFieldValue('SIDE')
  let dropdown_on = block.getFieldValue('ON')

  // Capitalise first letter 
  let side = dropdown_side.charAt(0).toUpperCase() + dropdown_side.slice(1)
  let on = dropdown_on === 'true' ? `On` : `Off`

  return `actionManager.addAction_Turn${on}${side}LED()\n`
};

// --------------------------------------------------------------------------------

Blockly.JavaScript['microbit_motor'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION')
  
  // Capitalise first letter 
  let direction = dropdown_direction.charAt(0).toUpperCase() + dropdown_direction.slice(1)
  
  return `actionManager.addAction_Move${direction}()\n`
};

// --------------------------------------------------------------------------------

Blockly.JavaScript['microbit_motor_turn'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION')

  // Capitalise first letter 
  let direction = dropdown_direction.charAt(0).toUpperCase() + dropdown_direction.slice(1)
  
  return `actionManager.addAction_Turn${direction}()\n`
};

// --------------------------------------------------------------------------------

Blockly.JavaScript['repeat_until_star'] = function(block) {
  // Convert sub-block(s) fist, then wrap & return 
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME')

  let code = `let numIterations = 0\n`
  code += `let maxIterations = 100\n`
  code += `let maxActions = 100\n`
  code += `while(!actionManager.isJourneyComplete())\n`
  code += `{\n`
  code += `  ${statements_name}\nconsole.log(numIterations)\n`
  code += `  numIterations++\n`
  code += `  if(actionManager.actionList.length >= maxActions || numIterations >= maxIterations || !actionManager.predictionSuccess) { break }\n`
  code += `}\n`
  return code
};

// --------------------------------------------------------------------------------

Blockly.JavaScript['if_path_safe'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');

  // in case this block is used in a loop, we must avoid redeclaring a variable (of the same name) via let/var
  // to circumvent this, we instead store the variable as a property of the window
  let code = `window.microbit_position = {x: actionManager.position.x, y: actionManager.position.y} \n`
  
  if(dropdown_direction === `ahead`)
  {
    code += `window.microbit_position.x += actionManager.facing.x\n`
    code += `window.microbit_position.y += actionManager.facing.y\n`
  }
  if(dropdown_direction === `left`)
  {
    code += `if(actionManager.facing.x === 0)\n{\n`
    code += `  window.microbit_position.x = actionManager.position.x + actionManager.facing.y\n}\n`
    code += `else\n{\n`
    code += `  window.microbit_position.y = actionManager.position.y - actionManager.facing.x\n}\n`
  }
  if(dropdown_direction === `right`)
  {
    code += `if(actionManager.facing.x === 0)\n{\n`
    code += `  window.microbit_position.x = actionManager.position.x - actionManager.facing.y\n}\n`
    code += `else\n{\n`
    code += `  window.microbit_position.y = actionManager.position.y + actionManager.facing.x\n}\n`
  }
  code += `if(actionManager.isValidPosition(window.microbit_position))\n{\n${statements_name}}\n`
  return code;
};

// --------------------------------------------------------------------------------

/*
Blockly.JavaScript['microbit_display_image'] = function(block) {
  var dropdown_image = block.getFieldValue('IMAGE')
  return `display.show(Image.${dropdown_image})\n`
};
*/

// --------------------------------------------------------------------------------

/*
Blockly.JavaScript['microbit_music'] = function(block) {
  return `music.play(music.${dropdown_track})\n`
};
*/

// --------------------------------------------------------------------------------

/*
Blockly.JavaScript['microbit_rgb'] = function(block) {
  var dropdown_colour = block.getFieldValue('RGB_COLOUR')
  
  // Remove # from hex value
  if (dropdown_colour.charAt(0) === `#`) {
    dropdown_colour = dropdown_colour.substring(1)
  }
  // Convert hex to dec, split RGB (via bitwise)
  let hex = parseInt(dropdown_colour, 16)
  let r = (hex >> 16) & 255
  let g = (hex >> 8) & 255
  let b = hex & 255

  return `rgb_all(${r},${g},${b})\n`
}
*/