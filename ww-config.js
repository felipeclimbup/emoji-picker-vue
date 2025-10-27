export default {
  editor: {
    label: {
      en: 'Emoji Picker'
    },
    icon: 'emoji-picker'
  },
  properties: {
    // Trigger Button Properties
    triggerButtonText: {
      label: { en: 'Trigger Button Text' },
      type: 'Text',
      bindable: true,
      defaultValue: '',
      section: 'settings',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text to display on the trigger button. Leave empty to use emoji.'
      },
      propertyHelp: {
        tooltip: 'Text to display on the trigger button. If empty, the emoji will be shown.'
      }
      /* wwEditor:end */
    },
    triggerButtonEmoji: {
      label: { en: 'Trigger Button Emoji' },
      type: 'Text',
      bindable: true,
      defaultValue: '😊',
      section: 'settings',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Emoji to display on the trigger button if no text is provided.'
      },
      propertyHelp: {
        tooltip: 'Emoji to display on the trigger button when no text is provided.'
      }
      /* wwEditor:end */
    },
    triggerButtonSize: {
      label: { en: 'Trigger Button Size' },
      type: 'Length',
      bindable: true,
      defaultValue: '24px',
      section: 'style',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Font size for the trigger button (e.g., 24px, 1.5rem).'
      },
      propertyHelp: {
        tooltip: 'Sets the font size of the trigger button.'
      }
      /* wwEditor:end */
    },
    triggerButtonPadding: {
      label: { en: 'Trigger Button Padding' },
      type: 'Length',
      bindable: true,
      defaultValue: '8px',
      section: 'style',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Padding for the trigger button (e.g., 8px, 0.5rem).'
      },
      propertyHelp: {
        tooltip: 'Sets the padding around the trigger button content.'
      }
      /* wwEditor:end */
    },
    triggerButtonBgColor: {
      label: { en: 'Trigger Button Background' },
      type: 'Color',
      bindable: true,
      defaultValue: 'transparent',
      section: 'style',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Background color for the trigger button.'
      },
      propertyHelp: {
        tooltip: 'Sets the background color of the trigger button.'
      }
      /* wwEditor:end */
    },
    triggerButtonTextColor: {
      label: { en: 'Trigger Button Text Color' },
      type: 'Color',
      bindable: true,
      defaultValue: '#000000',
      section: 'style',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text color for the trigger button.'
      },
      propertyHelp: {
        tooltip: 'Sets the text color of the trigger button.'
      }
      /* wwEditor:end */
    },
    triggerButtonBorderRadius: {
      label: { en: 'Trigger Button Border Radius' },
      type: 'Length',
      bindable: true,
      defaultValue: '4px',
      section: 'style',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Border radius for the trigger button (e.g., 4px, 50%).'
      },
      propertyHelp: {
        tooltip: 'Sets the border radius of the trigger button.'
      }
      /* wwEditor:end */
    },
    triggerButtonBorder: {
      label: { en: 'Trigger Button Border' },
      type: 'Text',
      bindable: true,
      defaultValue: 'none',
      section: 'style',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'CSS border value for the trigger button (e.g., 1px solid #ccc).'
      },
      propertyHelp: {
        tooltip: 'Sets the border of the trigger button using CSS border syntax.'
      }
      /* wwEditor:end */
    },
    
    // Picker Panel Properties
    pickerTitle: {
      label: { en: 'Picker Title' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Pick an emoji',
      section: 'settings',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Title displayed at the top of the emoji picker.'
      },
      propertyHelp: {
        tooltip: 'Sets the title text displayed at the top of the emoji picker panel.'
      }
      /* wwEditor:end */
    },
    showSearch: {
      label: { en: 'Show Search' },
      type: 'OnOff',
      bindable: true,
      defaultValue: true,
      section: 'settings',
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to show the search input in the emoji picker.'
      },
      propertyHelp: {
        tooltip: 'Toggles the visibility of the search input in the emoji picker.'
      }
      /* wwEditor:end */
    },
    searchPlaceholder: {
      label: { en: 'Search Placeholder' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Search emoji...',
      section: 'settings',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Placeholder text for the search input.'
      },
      propertyHelp: {
        tooltip: 'Sets the placeholder text displayed in the search input when empty.'
      }
      /* wwEditor:end */
    },
    showCategories: {
      label: { en: 'Show Categories' },
      type: 'OnOff',
      bindable: true,
      defaultValue: true,
      section: 'settings',
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to show the emoji categories in the picker.'
      },
      propertyHelp: {
        tooltip: 'Toggles the visibility of the emoji category buttons in the picker.'
      }
      /* wwEditor:end */
    },
    closeOnSelect: {
      label: { en: 'Close On Select' },
      type: 'OnOff',
      bindable: true,
      defaultValue: true,
      section: 'settings',
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether to close the picker after an emoji is selected.'
      },
      propertyHelp: {
        tooltip: 'When enabled, the emoji picker will close automatically after an emoji is selected.'
      }
      /* wwEditor:end */
    },
    pickerWidth: {
      label: { en: 'Picker Width' },
      type: 'Length',
      bindable: true,
      defaultValue: '300px',
section: 'style',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'Width of the emoji picker panel (e.g., 300px, 20rem).'
},
propertyHelp: {
tooltip: 'Sets the width of the emoji picker panel.'
}
/* wwEditor:end */
},
pickerMaxHeight: {
label: { en: 'Picker Max Height' },
type: 'Length',
bindable: true,
defaultValue: '400px',
section: 'style',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'Maximum height of the emoji picker panel (e.g., 400px, 25rem).'
},
propertyHelp: {
tooltip: 'Sets the maximum height of the emoji picker panel. Content will scroll if it exceeds this height.'
}
/* wwEditor:end */
},
pickerBgColor: {
label: { en: 'Picker Background' },
type: 'Color',
bindable: true,
defaultValue: '#ffffff',
section: 'style',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'Background color for the emoji picker panel.'
},
propertyHelp: {
tooltip: 'Sets the background color of the emoji picker panel.'
}
/* wwEditor:end */
},
pickerBorderRadius: {
label: { en: 'Picker Border Radius' },
type: 'Length',
bindable: true,
defaultValue: '8px',
section: 'style',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'Border radius for the emoji picker panel (e.g., 8px, 0.5rem).'
},
propertyHelp: {
tooltip: 'Sets the border radius of the emoji picker panel.'
}
/* wwEditor:end */
},
pickerBoxShadow: {
label: { en: 'Picker Box Shadow' },
type: 'Text',
bindable: true,
defaultValue: '0 2px 10px rgba(0,0,0,0.2)',
section: 'style',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'CSS box-shadow value for the emoji picker panel.'
},
propertyHelp: {
tooltip: 'Sets the box shadow of the emoji picker panel using CSS box-shadow syntax.'
}
/* wwEditor:end */
},
pickerBorder: {
label: { en: 'Picker Border' },
type: 'Text',
bindable: true,
defaultValue: '1px solid #e0e0e0',
section: 'style',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'CSS border value for the emoji picker panel (e.g., 1px solid #e0e0e0).'
},
propertyHelp: {
tooltip: 'Sets the border of the emoji picker panel using CSS border syntax.'
}
/* wwEditor:end */
}
},
triggerEvents: [
{
name: 'select',
label: { en: 'On emoji select' },
event: { 
emoji: '😊',
name: 'Smiling Face with Smiling Eyes',
category: 'smileys'
}
},
{
name: 'open',
label: { en: 'On picker open' },
event: {}
},
{
name: 'close',
label: { en: 'On picker close' },
event: {}
}
],
actions: [
{
action: 'openPicker',
label: { en: 'Open picker' }
},
{
action: 'closePicker',
label: { en: 'Close picker' }
}
]
};
