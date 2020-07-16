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
      "message0": "%1 Switch %2 indicator %3",
      "args0": [
        {
          "type": "field_image",
          "src": "./images/LED.png",
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
          "options": [
            [
              "forward",
              "forward"
            ],
            [
              "backward",
              "backward"
            ]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Drive the robot",
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
          "options": [
            [
              "forward",
              "forward"
            ],
            [
              "backward",
              "backward"
            ]
          ]
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
    }
  ]
);