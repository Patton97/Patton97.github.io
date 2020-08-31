// --------------------------------------------------------------------------------

Blockly.Python['microbit_wait'] = function(block) {
  //return 'sleep(500)\n'
  return 'wait()\n'
};

// --------------------------------------------------------------------------------
/*
Blockly.Python['microbit_indicator'] = function(block) {
  var dropdown_side = block.getFieldValue('SIDE')
  var dropdown_on = block.getFieldValue('ON')
  
  let pin = dropdown_side == 'left' ? 'pin8' : 'pin12'
  let on = dropdown_on == 'true' ? '1' : '0'

  if(dropdown_side == 'both')
  {
    return `pin8.write_digital(${on})\npin12.write_digital(${on})\n`
  }

  return `${pin}.write_digital(${on})\n`
};
*/
// --------------------------------------------------------------------------------

Blockly.Python['microbit_motor'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION')
  //let speed = 100
  //let direction = dropdown_direction == 'forward' ? '0' : '1'
  //return `motor(${direction},${speed},${direction},${speed})\nsleep(500)\nmotor(0,0,0,0)\n`
  let direction = dropdown_direction.charAt(0).toUpperCase() + dropdown_direction.slice(1)
  return `move${direction}()\n`
};

// --------------------------------------------------------------------------------

Blockly.Python['microbit_motor_turn'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION')

  // Capitalise first letter 
  let direction = dropdown_direction.charAt(0).toUpperCase() + dropdown_direction.slice(1)
  
  return `turn${direction}()\n`
};

// --------------------------------------------------------------------------------

Blockly.Python['repeat_until_star'] = function(block) {
  // Convert sub-block(s) fist, then wrap & return 
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME')
  return `while not isJourneyComplete():\n  ${statements_name}\n`
};

// --------------------------------------------------------------------------------

Blockly.Python['if_path_safe'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME')

  let code = ``
  
  if(dropdown_direction === `ahead`) { code += `if isSafe_Ahead():\n` }
  if(dropdown_direction === `left`)  { code += `if isSafe_Left():\n`  }
  if(dropdown_direction === `right`) { code += `if isSafe_Right():\n` }
  
  code += `  ${statements_name}\n`
  return code
};

// --------------------------------------------------------------------------------

Blockly.Python['microbit_display_image'] = function(block) {
  var dropdown_image = block.getFieldValue('IMAGE')
  return `display.show(Image.${dropdown_image})\n`
};

// --------------------------------------------------------------------------------

Blockly.Python['microbit_music'] = function(block) {
  return `music.play(music.${dropdown_track})\n`
};

// --------------------------------------------------------------------------------

Blockly.Python['microbit_rgb'] = function(block) {
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