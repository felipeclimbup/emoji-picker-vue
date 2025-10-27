<template>
  <div class="emoji-picker-container" :class="{ 'is-open': isEmojiPickerOpen }">
    <!-- Trigger Button -->
    <button 
      class="emoji-trigger-button" 
      @click="toggleEmojiPicker"
      :style="triggerButtonStyles"
    >
      <span v-if="content.triggerButtonText">{{ content.triggerButtonText }}</span>
      <span v-else-if="content.triggerButtonEmoji">{{ content.triggerButtonEmoji }}</span>
      <span v-else>😊</span>
    </button>

    <!-- Emoji Picker Panel -->
    <div 
      v-if="isEmojiPickerOpen" 
      class="emoji-picker-panel"
      :style="panelStyles"
    >
      <!-- Header -->
      <div class="emoji-picker-header">
        <div class="emoji-picker-title">{{ content.pickerTitle || 'Pick an emoji' }}</div>
        <button class="emoji-picker-close" @click="closeEmojiPicker">×</button>
      </div>

      <!-- Search -->
      <div v-if="content.showSearch" class="emoji-picker-search">
        <input 
          type="text" 
          v-model="searchQuery" 
          :placeholder="content.searchPlaceholder || 'Search emoji...'" 
          class="emoji-search-input"
        />
      </div>

      <!-- Categories -->
      <div v-if="content.showCategories" class="emoji-categories">
        <button 
          v-for="(category, index) in emojiCategories" 
          :key="index"
          class="emoji-category-button"
          :class="{ 'active': selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          {{ category.emoji }}
        </button>
      </div>

      <!-- Emoji Grid -->
      <div class="emoji-grid">
        <button 
          v-for="(emoji, index) in filteredEmojis" 
          :key="index"
          class="emoji-button"
          @click="selectEmoji(emoji)"
          :title="emoji.name"
        >
          {{ emoji.emoji }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // Editor state
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Component state
    const isEmojiPickerOpen = ref(false);
    const searchQuery = ref('');
    const selectedCategory = ref('smileys');

    // Internal variable for selected emoji
    const { value: selectedEmoji, setValue: setSelectedEmoji } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'selectedEmoji',
      type: 'object',
      defaultValue: null,
    });

    // Emoji data
    const emojiCategories = [
      { id: 'smileys', emoji: '😊', name: 'Smileys & Emotion' },
      { id: 'people', emoji: '👋', name: 'People & Body' },
      { id: 'nature', emoji: '🐶', name: 'Animals & Nature' },
      { id: 'food', emoji: '🍎', name: 'Food & Drink' },
      { id: 'activities', emoji: '⚽', name: 'Activities' },
      { id: 'travel', emoji: '🚗', name: 'Travel & Places' },
      { id: 'objects', emoji: '💡', name: 'Objects' },
      { id: 'symbols', emoji: '❤️', name: 'Symbols' },
      { id: 'flags', emoji: '🏁', name: 'Flags' }
    ];

    // Emoji data by category
    const emojis = {
      smileys: [
        { emoji: '😀', name: 'Grinning Face', category: 'smileys' },
        { emoji: '😃', name: 'Grinning Face with Big Eyes', category: 'smileys' },
        { emoji: '😄', name: 'Grinning Face with Smiling Eyes', category: 'smileys' },
        { emoji: '😁', name: 'Beaming Face with Smiling Eyes', category: 'smileys' },
        { emoji: '😆', name: 'Grinning Squinting Face', category: 'smileys' },
        { emoji: '😅', name: 'Grinning Face with Sweat', category: 'smileys' },
        { emoji: '🤣', name: 'Rolling on the Floor Laughing', category: 'smileys' },
        { emoji: '😂', name: 'Face with Tears of Joy', category: 'smileys' },
        { emoji: '🙂', name: 'Slightly Smiling Face', category: 'smileys' },
        { emoji: '🙃', name: 'Upside-Down Face', category: 'smileys' },
        { emoji: '😉', name: 'Winking Face', category: 'smileys' },
        { emoji: '😊', name: 'Smiling Face with Smiling Eyes', category: 'smileys' },
        { emoji: '😇', name: 'Smiling Face with Halo', category: 'smileys' },
        { emoji: '🥰', name: 'Smiling Face with Hearts', category: 'smileys' },
        { emoji: '😍', name: 'Smiling Face with Heart-Eyes', category: 'smileys' }
      ],
      people: [
        { emoji: '👋', name: 'Waving Hand', category: 'people' },
        { emoji: '🤚', name: 'Raised Back of Hand', category: 'people' },
        { emoji: '🖐️', name: 'Hand with Fingers Splayed', category: 'people' },
        { emoji: '✋', name: 'Raised Hand', category: 'people' },
        { emoji: '🖖', name: 'Vulcan Salute', category: 'people' },
        { emoji: '👌', name: 'OK Hand', category: 'people' },
        { emoji: '🤌', name: 'Pinched Fingers', category: 'people' },
        { emoji: '🤏', name: 'Pinching Hand', category: 'people' },
        { emoji: '✌️', name: 'Victory Hand', category: 'people' },
        { emoji: '🤞', name: 'Crossed Fingers', category: 'people' },
        { emoji: '🤟', name: 'Love-You Gesture', category: 'people' },
        { emoji: '🤘', name: 'Sign of the Horns', category: 'people' },
        { emoji: '🤙', name: 'Call Me Hand', category: 'people' }
      ],
      nature: [
        { emoji: '🐶', name: 'Dog Face', category: 'nature' },
        { emoji: '🐱', name: 'Cat Face', category: 'nature' },
        { emoji: '🐭', name: 'Mouse Face', category: 'nature' },
        { emoji: '🐹', name: 'Hamster Face', category: 'nature' },
        { emoji: '🐰', name: 'Rabbit Face', category: 'nature' },
        { emoji: '🦊', name: 'Fox Face', category: 'nature' },
        { emoji: '🐻', name: 'Bear Face', category: 'nature' },
        { emoji: '🐼', name: 'Panda Face', category: 'nature' },
        { emoji: '🐨', name: 'Koala Face', category: 'nature' },
        { emoji: '🐯', name: 'Tiger Face', category: 'nature' }
      ],
      food: [
        { emoji: '🍎', name: 'Red Apple', category: 'food' },
        { emoji: '🍐', name: 'Pear', category: 'food' },
        { emoji: '🍊', name: 'Tangerine', category: 'food' },
        { emoji: '🍋', name: 'Lemon', category: 'food' },
        { emoji: '🍌', name: 'Banana', category: 'food' },
        { emoji: '🍉', name: 'Watermelon', category: 'food' },
        { emoji: '🍇', name: 'Grapes', category: 'food' },
        { emoji: '🍓', name: 'Strawberry', category: 'food' },
        { emoji: '🫐', name: 'Blueberries', category: 'food' },
        { emoji: '🍈', name: 'Melon', category: 'food' }
      ],
      activities: [
        { emoji: '⚽', name: 'Soccer Ball', category: 'activities' },
        { emoji: '🏀', name: 'Basketball', category: 'activities' },
        { emoji: '🏈', name: 'American Football', category: 'activities' },
        { emoji: '⚾', name: 'Baseball', category: 'activities' },
        { emoji: '🥎', name: 'Softball', category: 'activities' },
        { emoji: '🎾', name: 'Tennis', category: 'activities' },
        { emoji: '🏐', name: 'Volleyball', category: 'activities' },
        { emoji: '🏉', name: 'Rugby Football', category: 'activities' },
        { emoji: '🥏', name: 'Flying Disc', category: 'activities' },
        { emoji: '🎱', name: 'Pool 8 Ball', category: 'activities' }
      ],
      travel: [
        { emoji: '🚗', name: 'Car', category: 'travel' },
        { emoji: '🚕', name: 'Taxi', category: 'travel' },
        { emoji: '🚙', name: 'Sport Utility Vehicle', category: 'travel' },
        { emoji: '🚌', name: 'Bus', category: 'travel' },
        { emoji: '🚎', name: 'Trolleybus', category: 'travel' },
        { emoji: '🏎️', name: 'Racing Car', category: 'travel' },
        { emoji: '🚓', name: 'Police Car', category: 'travel' },
        { emoji: '🚑', name: 'Ambulance', category: 'travel' },
        { emoji: '🚒', name: 'Fire Engine', category: 'travel' },
        { emoji: '🚐', name: 'Minibus', category: 'travel' }
      ],
      objects: [
        { emoji: '💡', name: 'Light Bulb', category: 'objects' },
        { emoji: '🔦', name: 'Flashlight', category: 'objects' },
        { emoji: '🕯️', name: 'Candle', category: 'objects' },
        { emoji: '🧯', name: 'Fire Extinguisher', category: 'objects' },
        { emoji: '🛢️', name: 'Oil Drum', category: 'objects' },
        { emoji: '💸', name: 'Money with Wings', category: 'objects' },
        { emoji: '💵', name: 'Dollar Banknote', category: 'objects' },
        { emoji: '💴', name: 'Yen Banknote', category: 'objects' },
        { emoji: '💶', name: 'Euro Banknote', category: 'objects' },
        { emoji: '💷', name: 'Pound Banknote', category: 'objects' }
      ],
      symbols: [
        { emoji: '❤️', name: 'Red Heart', category: 'symbols' },
        { emoji: '🧡', name: 'Orange Heart', category: 'symbols' },
        { emoji: '💛', name: 'Yellow Heart', category: 'symbols' },
        { emoji: '💚', name: 'Green Heart', category: 'symbols' },
        { emoji: '💙', name: 'Blue Heart', category: 'symbols' },
        { emoji: '💜', name: 'Purple Heart', category: 'symbols' },
        { emoji: '🖤', name: 'Black Heart', category: 'symbols' },
        { emoji: '🤍', name: 'White Heart', category: 'symbols' },
        { emoji: '🤎', name: 'Brown Heart', category: 'symbols' },
        { emoji: '💔', name: 'Broken Heart', category: 'symbols' }
      ],
      flags: [
        { emoji: '🏁', name: 'Chequered Flag', category: 'flags' },
        { emoji: '🚩', name: 'Triangular Flag', category: 'flags' },
        { emoji: '🎌', name: 'Crossed Flags', category: 'flags' },
        { emoji: '🏴', name: 'Black Flag', category: 'flags' },
        { emoji: '🏳️', name: 'White Flag', category: 'flags' },
        { emoji: '🏳️‍🌈', name: 'Rainbow Flag', category: 'flags' },
        { emoji: '🏳️‍⚧️', name: 'Transgender Flag', category: 'flags' },
        { emoji: '🏴‍☠️', name: 'Pirate Flag', category: 'flags' },
        { emoji: '🇺🇳', name: 'United Nations', category: 'flags' },
        { emoji: '🇪🇺', name: 'European Union', category: 'flags' }
      ]
    };

    // Computed properties
    const filteredEmojis = computed(() => {
      let result = emojis[selectedCategory.value] || [];
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        return Object.values(emojis)
          .flat()
          .filter(emoji => 
            emoji.name.toLowerCase().includes(query) || 
            emoji.emoji.includes(query)
          );
      }
      
      return result;
    });

    const triggerButtonStyles = computed(() => {
      return {
        backgroundColor: props.content?.triggerButtonBgColor || 'transparent',
        color: props.content?.triggerButtonTextColor || 'inherit',
        fontSize: props.content?.triggerButtonSize || '24px',
        padding: props.content?.triggerButtonPadding || '8px',
        borderRadius: props.content?.triggerButtonBorderRadius || '4px',
        border: props.content?.triggerButtonBorder || 'none',
      };
    });

    const panelStyles = computed(() => {
      return {
        width: props.content?.pickerWidth || '300px',
        maxHeight: props.content?.pickerMaxHeight || '400px',
        backgroundColor: props.content?.pickerBgColor || '#ffffff',
        borderRadius: props.content?.pickerBorderRadius || '8px',
        boxShadow: props.content?.pickerBoxShadow || '0 2px 10px rgba(0,0,0,0.2)',
        border: props.content?.pickerBorder || '1px solid #e0e0e0',
      };
    });

    // Methods
    const toggleEmojiPicker = () => {
      if (isEditing.value) return;
      isEmojiPickerOpen.value = !isEmojiPickerOpen.value;
      
      if (isEmojiPickerOpen.value) {
        emit('trigger-event', {
          name: 'open',
          event: {}
        });
      } else {
        emit('trigger-event', {
          name: 'close',
          event: {}
        });
      }
    };

    const closeEmojiPicker = () => {
      if (isEditing.value) return;
      isEmojiPickerOpen.value = false;
      emit('trigger-event', {
        name: 'close',
        event: {}
      });
    };

    const selectCategory = (categoryId) => {
      if (isEditing.value) return;
      selectedCategory.value = categoryId;
      searchQuery.value = '';
    };

    const selectEmoji = (emoji) => {
      if (isEditing.value) return;
      setSelectedEmoji(emoji);
      
      emit('trigger-event', {
        name: 'select',
        event: { 
          emoji: emoji.emoji,
          name: emoji.name,
          category: emoji.category
        }
      });
      
      if (props.content?.closeOnSelect) {
        isEmojiPickerOpen.value = false;
      }
    };

    // Reset search when picker is closed
    watch(isEmojiPickerOpen, (newValue) => {
      if (!newValue) {
        searchQuery.value = '';
      }
    });

    // Actions
    const openPicker = () => {
      isEmojiPickerOpen.value = true;
      emit('trigger-event', {
        name: 'open',
        event: {}
      });
    };

    const closePicker = () => {
      isEmojiPickerOpen.value = false;
      emit('trigger-event', {
        name: 'close',
        event: {}
      });
    };

    return {
      isEmojiPickerOpen,
      searchQuery,
      selectedCategory,
      emojiCategories,
      filteredEmojis,
      triggerButtonStyles,
      panelStyles,
      toggleEmojiPicker,
      closeEmojiPicker,
      selectCategory,
      selectEmoji,
      openPicker,
      closePicker,
      selectedEmoji,
      setSelectedEmoji
    };
  }
};
</script>

<style lang="scss" scoped>
.emoji-picker-container {
  position: relative;
  display: inline-block;
}

.emoji-trigger-button {
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 24px;
  padding: 8px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
}

.emoji-picker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 300px;
  max-height: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  border: 1px solid #e0e0e0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.emoji-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
}

.emoji-picker-title {
  font-weight: bold;
  font-size: 14px;
}

.emoji-picker-close {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
}

.emoji-picker-search {
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
  
  .emoji-search-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #4d90fe;
    }
  }
}

.emoji-categories {
  display: flex;
  overflow-x: auto;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 2px;
  }
  
  .emoji-category-button {
    flex: 0 0 auto;
    background: transparent;
    border: none;
    font-size: 18px;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 4px;
    
    &:hover {
      background-color: rgba(0,0,0,0.05);
    }
    
    &.active {
      background-color: rgba(0,0,0,0.1);
    }
  }
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  padding: 8px;
  overflow-y: auto;
  max-height: 250px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 3px;
  }
  
  .emoji-button {
    background: transparent;
    border: none;
    font-size: 20px;
    padding: 6px;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.1s, background-color 0.1s;
    
    &:hover {
      background-color: rgba(0,0,0,0.05);
      transform: scale(1.2);
    }
  }
}
</style>
