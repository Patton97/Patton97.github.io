Blockly.defineBlocksWithJsonArray(
  [
    {
      "type": "microbit_wait",
      "message0": "Wait",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "microbit_indicator",
      "message0": "%1 Switch %2 light %3",
      "args0": [
        {
          "type": "field_image",
          "src": "/Research/Blockly/images/LED_bulb.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [ ["left", "left"], ["right", "right"], ["both", "both"] ]
        },
        {
          "type": "field_dropdown",
          "name": "ON",
          "options": [ ["on", "true"], ["off", "false"] ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Turns on the LED",
      "helpUrl": ""
    },
    {
      "type": "microbit_motor",
      "message0": "%1 Drive %2",
      "args0": [
        {
          "type": "field_image",
          "src": "/Research/Blockly/images/wheel.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [ ["forward", "forward"], ["backward", "backward"] ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Drive the robot",
      "helpUrl": ""
    },
    {
      "type": "microbit_motor_turn",
      "message0": "%1 Turn %2",
      "args0": [
        {
          "type": "field_image",
          "src": "/Research/Blockly/images/steering.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [ ["left", "left"], ["right", "right"] ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Drive the robot",
      "helpUrl": ""
    },
    {
      "type": "repeat_until_star",
      "message0": "Repeat until %1 %2 %3",
      "args0": [
        {
          "type": "field_image",
          "src": "/Images/Blockly/star.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "NAME"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "microbit_display_image",
      "message0": "%1 Display %2",
      "args0": [
        {
          "type": "field_image",
          "src": "/Research/Blockly/images/display.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "field_dropdown",
          "name": "IMAGE",
          "options": 
          [
            [ {"src": "/Research/Blockly/images/display_happy.png", "width": 25, "height": 25, "alt": "happy face"}, "HAPPY" ],
            [ {"src": "/Research/Blockly/images/display_sad.png",   "width": 25, "height": 25, "alt": "sad face"  }, "SAD" ],
            [ {"src": "/Research/Blockly/images/display_yes.png",   "width": 25, "height": 25, "alt": "tick (yes)"}, "YES" ],
            [ {"src": "/Research/Blockly/images/display_no.png",    "width": 25, "height": 25, "alt": "cross (no)"}, "NO" ],
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Turns on the LED",
      "helpUrl": ""
    },
    {
      "type": "microbit_music",
      "message0": "%1 Play music %2",
      "args0": [
        {
          "type": "field_image",
          "src": "/Research/Blockly/images/music.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "field_dropdown",
          "name": "TRACK",
          "options": [
            ["da-da-da-dum", "DADADADUM"],
            ["Entertainer", "ENTERTAINER"],
            ["Prelude", "PRELUDE"],
            ["ODE", "ODE"],
            ["Nyan", "NYAN"],
            ["Ringtone", "RINGTONE"],
            ["Funk", "FUNK"],
            ["Blues", "BLUES"],
            ["Birthday", "BIRTHDAY"],
            ["Wedding", "WEDDING"],
            ["Funeral", "FUNERAL"],
            ["Punchline", "PUNCHLINE"],
            ["Python", "PYTHON"],
            ["Baddy", "BADDY"],
            ["Chase", "CHASE"],
            ["ba-ding", "BA_DING"],
            ["wa-wa-wa-waa", "WAWAWAWAA"],
            ["Jump up", "JUMP_UP"],
            ["Jump down", "JUMP_DOWN"],
            ["Power up", "POWER_UP"],
            ["Power down", "POWER_DOWN"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Plays a musical melody",
      "helpUrl": ""
    },
    {
      "type": "microbit_rgb",
      "message0": "%1 Set RGB lights %2",
      "args0": [
        {
          "type": "field_image",
          "src": "/Research/Blockly/images/RGB.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "field_dropdown",
          "name": "RGB_COLOUR",
          "options": 
          [
            [ { "src": "/Research/Blockly/images/red.png",   "width": 25, "height": 25, "alt": "red"   }, "#FF0000"   ],
            [ { "src": "/Research/Blockly/images/green.png", "width": 25, "height": 25, "alt": "green" }, "#00FF00" ],
            [ { "src": "/Research/Blockly/images/blue.png",  "width": 25, "height": 25, "alt": "blue"  }, "#0000FF"  ],
            [ { "src": "/Research/Blockly/images/white.png", "width": 25, "height": 25, "alt": "white" }, "#FFFFFF" ],
            [ "OFF", "#000000" ]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Changes RGB light colours",
      "helpUrl": ""
    }
  ]
);
