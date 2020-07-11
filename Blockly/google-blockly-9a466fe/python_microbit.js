Blockly.Python['microbit_turnonled'] = function(block) {
  return 'pin8.write_digital(1)\n'
};
Blockly.Python['microbit_turnoffled'] = function(block) {
  return 'pin8.write_digital(0)\n'
};
Blockly.Python['microbit_wait'] = function(block) {
  return 'sleep(500)\n';
};