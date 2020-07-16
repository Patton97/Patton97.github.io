Blockly.Python['microbit_wait'] = function(block) {
  return 'sleep(500)\n'
};

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

Blockly.Python['microbit_motor'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION')
  let speed = 100
  let direction = dropdown_direction == 'forward' ? '0' : '1'
  return `motor(${direction},${speed},${direction},${speed})\nsleep(500)\nmotor(0,0,0,0)\n`
};

Blockly.Python['microbit_display_image'] = function(block) {
  var dropdown_image = block.getFieldValue('IMAGE')
  return `display.show(Image.${dropdown_image})\n`
};