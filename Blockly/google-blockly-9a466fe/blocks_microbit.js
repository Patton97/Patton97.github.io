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
          "src": "./images/LED_bulb.png",
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
          "src": "./images/wheel.png",
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
      "type": "microbit_display_image",
      "message0": "%1 Display %2",
      "args0": [
        {
          "type": "field_image",
          "src": "./images/display.png",
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
            [ {"src": "./images/display_happy.png", "width": 25, "height": 25, "alt": "happy face"}, "HAPPY" ],
            [ {"src": "./images/display_sad.png",   "width": 25, "height": 25, "alt": "sad face"  }, "SAD" ],
            [ {"src": "./images/display_yes.png",   "width": 25, "height": 25, "alt": "tick (yes)"}, "YES" ],
            [ {"src": "./images/display_no.png",    "width": 25, "height": 25, "alt": "cross (no)"}, "NO" ],
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
          "src": "./images/music.png",
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
          "src": "./images/RGB.png",
          "width": 25,
          "height": 25,
          "alt": "*",
          "flipRtl": false
        },
        {
          "type": "field_dropdown",
          "name": "NAME",
          "options": 
          [
            [ { "src": "./images/red.png",   "width": 25, "height": 25, "alt": "red"   }, "#FF0000"   ],
            [ { "src": "./images/green.png", "width": 25, "height": 25, "alt": "green" }, "#00FF00" ],
            [ { "src": "./images/blue.png",  "width": 25, "height": 25, "alt": "blue"  }, "#0000FF"  ],
            [ { "src": "./images/white.png", "width": 25, "height": 25, "alt": "white" }, "#FFFFFF" ],
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