---
name: emoji-picker
description: A customizable emoji picker component that allows users to select emojis from different categories with search functionality.
keywords: emoji, picker, emoticon, selector, reaction
---

#### Emoji Picker

***Purpose:***
This component provides a customizable emoji picker that allows users to select emojis from different categories. When an emoji is selected, it triggers an event with the selected emoji data.

***Features:***
- Toggle button to show/hide the emoji picker
- Category navigation for different emoji types
- Search functionality to find specific emojis
- Customizable appearance for both trigger button and picker panel
- Option to close picker automatically after emoji selection

***Properties:***
- triggerButtonText: string - Text to display on the trigger button
- triggerButtonEmoji: string - Emoji to display on the trigger button if no text is provided
- triggerButtonSize: string - Font size for the trigger button (e.g., '24px')
- triggerButtonPadding: string - Padding for the trigger button (e.g., '8px')
- triggerButtonBgColor: string - Background color for the trigger button
- triggerButtonTextColor: string - Text color for the trigger button
- triggerButtonBorderRadius: string - Border radius for the trigger button
- triggerButtonBorder: string - CSS border value for the trigger button
- pickerTitle: string - Title displayed at the top of the emoji picker
- showSearch: boolean - Whether to show the search input
- searchPlaceholder: string - Placeholder text for the search input
- showCategories: boolean - Whether to show the emoji categories
- closeOnSelect: boolean - Whether to close the picker after an emoji is selected
- pickerWidth: string - Width of the emoji picker panel
- pickerMaxHeight: string - Maximum height of the emoji picker panel
- pickerBgColor: string - Background color for the emoji picker panel
- pickerBorderRadius: string - Border radius for the emoji picker panel
- pickerBoxShadow: string - CSS box-shadow value for the emoji picker panel
- pickerBorder: string - CSS border value for the emoji picker panel

***Events:***
- select: Triggered when an emoji is selected. Payload: { emoji: '😊', name: 'Smiling Face with Smiling Eyes', category: 'smileys' }
- open: Triggered when the emoji picker is opened. No payload.
- close: Triggered when the emoji picker is closed. No payload.

***Exposed Actions:***
- `openPicker`: Opens the emoji picker panel
- `closePicker`: Closes the emoji picker panel

***Exposed Variables:***
- selectedEmoji: The currently selected emoji object containing emoji, name, and category. (path: variables['current_element_uid-selectedEmoji'])

***Notes:***
- The component includes a comprehensive set of emojis organized by categories
- The search functionality searches both emoji names and the actual emoji characters
- The component is designed to be responsive and works well on both desktop and mobile devices
- All styling properties are customizable to match your design system
