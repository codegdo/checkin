module.exports = {
  "color": {
    "base": {
      "gray": {
        "light": {
          "value": "#cccccc",
          "filePath": "tokens/color/base.json",
          "isSource": true,
          "original": {
            "value": "#CCCCCC"
          },
          "name": "ColorBaseGrayLight",
          "attributes": {
            "category": "color",
            "type": "base",
            "item": "gray",
            "subitem": "light"
          },
          "path": [
            "color",
            "base",
            "gray",
            "light"
          ]
        },
        "medium": {
          "value": "#999999",
          "filePath": "tokens/color/base.json",
          "isSource": true,
          "original": {
            "value": "#999999"
          },
          "name": "ColorBaseGrayMedium",
          "attributes": {
            "category": "color",
            "type": "base",
            "item": "gray",
            "subitem": "medium"
          },
          "path": [
            "color",
            "base",
            "gray",
            "medium"
          ]
        },
        "dark": {
          "value": "#111111",
          "filePath": "tokens/color/base.json",
          "isSource": true,
          "original": {
            "value": "#111111"
          },
          "name": "ColorBaseGrayDark",
          "attributes": {
            "category": "color",
            "type": "base",
            "item": "gray",
            "subitem": "dark"
          },
          "path": [
            "color",
            "base",
            "gray",
            "dark"
          ]
        }
      },
      "red": {
        "value": "#ff0000",
        "filePath": "tokens/color/base.json",
        "isSource": true,
        "original": {
          "value": "#FF0000"
        },
        "name": "ColorBaseRed",
        "attributes": {
          "category": "color",
          "type": "base",
          "item": "red"
        },
        "path": [
          "color",
          "base",
          "red"
        ]
      },
      "green": {
        "value": "#00ff00",
        "filePath": "tokens/color/base.json",
        "isSource": true,
        "original": {
          "value": "#00FF00"
        },
        "name": "ColorBaseGreen",
        "attributes": {
          "category": "color",
          "type": "base",
          "item": "green"
        },
        "path": [
          "color",
          "base",
          "green"
        ]
      }
    },
    "font": {
      "base": {
        "value": "#ff0000",
        "filePath": "tokens/color/font.json",
        "isSource": true,
        "original": {
          "value": "{color.base.red.value}"
        },
        "name": "ColorFontBase",
        "attributes": {
          "category": "color",
          "type": "font",
          "item": "base"
        },
        "path": [
          "color",
          "font",
          "base"
        ]
      },
      "secondary": {
        "value": "#00ff00",
        "filePath": "tokens/color/font.json",
        "isSource": true,
        "original": {
          "value": "{color.base.green.value}"
        },
        "name": "ColorFontSecondary",
        "attributes": {
          "category": "color",
          "type": "font",
          "item": "secondary"
        },
        "path": [
          "color",
          "font",
          "secondary"
        ]
      },
      "tertiary": {
        "value": "#cccccc",
        "filePath": "tokens/color/font.json",
        "isSource": true,
        "original": {
          "value": "{color.base.gray.light.value}"
        },
        "name": "ColorFontTertiary",
        "attributes": {
          "category": "color",
          "type": "font",
          "item": "tertiary"
        },
        "path": [
          "color",
          "font",
          "tertiary"
        ]
      }
    }
  },
  "size": {
    "font": {
      "small": {
        "value": "0.75rem",
        "comment": "the small size of the font",
        "filePath": "tokens/size/font.json",
        "isSource": true,
        "original": {
          "value": "0.75",
          "comment": "the small size of the font"
        },
        "name": "SizeFontSmall",
        "attributes": {
          "category": "size",
          "type": "font",
          "item": "small"
        },
        "path": [
          "size",
          "font",
          "small"
        ]
      },
      "medium": {
        "value": "1rem",
        "comment": "the medium size of the font",
        "filePath": "tokens/size/font.json",
        "isSource": true,
        "original": {
          "value": "1",
          "comment": "the medium size of the font"
        },
        "name": "SizeFontMedium",
        "attributes": {
          "category": "size",
          "type": "font",
          "item": "medium"
        },
        "path": [
          "size",
          "font",
          "medium"
        ]
      },
      "large": {
        "value": "2rem",
        "comment": "the large size of the font",
        "filePath": "tokens/size/font.json",
        "isSource": true,
        "original": {
          "value": "2",
          "comment": "the large size of the font"
        },
        "name": "SizeFontLarge",
        "attributes": {
          "category": "size",
          "type": "font",
          "item": "large"
        },
        "path": [
          "size",
          "font",
          "large"
        ]
      },
      "base": {
        "value": "1rem",
        "comment": "the base size of the font",
        "filePath": "tokens/size/font.json",
        "isSource": true,
        "original": {
          "value": "{size.font.medium.value}",
          "comment": "the base size of the font"
        },
        "name": "SizeFontBase",
        "attributes": {
          "category": "size",
          "type": "font",
          "item": "base"
        },
        "path": [
          "size",
          "font",
          "base"
        ]
      }
    }
  }
}