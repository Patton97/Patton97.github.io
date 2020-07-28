Blockly.JavaScript['microbit_wait'] = function(block) {
  return 'actionManager.addAction_Stop()\n'
};
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
};*/

Blockly.JavaScript['microbit_motor'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION')
  let code = ''
  if(dropdown_direction == 'forward')
  {
    code = `actionManager.addAction_MoveForward()`
  }
  else if(dropdown_direction == 'backward')
  {
    code = `actionManager.addAction_MoveBackward()`
  }
  return `${code}\n`
};

/*
Blockly.JavaScript['microbit_display_image'] = function(block) {
  var dropdown_image = block.getFieldValue('IMAGE')
  return `display.show(Image.${dropdown_image})\n`
};
*/

/*
Blockly.JavaScript['microbit_music'] = function(block) {
  return `music.play(music.${dropdown_track})\n`
};
*/
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