<template>
  <div class="ww-emoji-card" :style="cardStyle" @click.stop>
    <!-- Cerrar -->
    <button class="ww-emoji-close" @click="emitClose" aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>
    </button>

    <!-- Grilla emojis -->
    <div class="ww-emoji-grid" :style="gridStyle" role="listbox">
      <button
        v-for="(e,i) in visibleEmojis"
        :key="i"
        class="ww-emoji-btn"
        @click="pick(e)"
        :aria-label="e.name || e.char"
        role="option"
      >{{ e.char }}</button>
    </div>

    <!-- Categorías -->
    <div class="ww-emoji-cats">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="ww-emoji-cat-btn"
        :class="{ active: cat.id === state.activeCat }"
        @click="setCat(cat.id)"
        :title="cat.label"
        aria-label="Category"
      >
        <span v-if="cat.icon === 'smile'">😊</span>
        <span v-else-if="cat.icon === 'paw'">🐾</span>
        <span v-else-if="cat.icon === 'food'">🍔</span>
        <span v-else-if="cat.icon === 'activities'">⚽</span>
        <span v-else-if="cat.icon === 'travel'">✈️</span>
        <span v-else-if="cat.icon === 'objects'">💡</span>
        <span v-else-if="cat.icon === 'symbols'">❤</span>
        <span v-else-if="cat.icon === 'flags'">🏳️</span>
        <span v-else>🙂</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WwEmojiPicker",
  props: {
    content: { type: Object, required: true },
    uid: String,
    wwEditorState: Object,
    wwFrontState: Object
  },
  data() {
    return {
      state: {
        activeCat: this.content.defaultCategory || "people"
      }
    };
  },
  computed: {
    categories() {
      // Si no te pasan categorías desde WeWeb, usa estas por defecto (orden y look como tu HTML)
      return this.content.categories?.length
        ? this.content.categories
        : [
            { id: "people",     label: "Smileys",    icon: "smile" },
            { id: "animals",    label: "Animals",    icon: "paw" },
            { id: "food",       label: "Food",       icon: "food" },
            { id: "activities", label: "Activities", icon: "activities" },
            { id: "travel",     label: "Travel",     icon: "travel" },
            { id: "objects",    label: "Objects",    icon: "objects" },
            { id: "symbols",    label: "Symbols",    icon: "symbols" },
            { id: "flags",      label: "Flags",      icon: "flags" }
          ];
    },
    sourceEmojis() {
      // Estructura esperada: { char: "😀", name?: "...", cat: "people" }
      return Array.isArray(this.content.emojis) && this.content.emojis.length
        ? this.content.emojis
        : this.defaultEmojis();
    },
    visibleEmojis() {
      return this.sourceEmojis.filter(e => e.cat === this.state.activeCat);
    },
    cardStyle() {
      return {
        background: this.content.cardBg || "#fff",
        borderRadius: (this.content.radius ?? 16) + "px",
        boxShadow: this.content.shadow || "0px 1px 3px rgba(2,2,52,0.2)",
        border: this.content.border || "1px solid #D0D5DD",
        width: this.content.width || "420px",
        padding: "8px 12px 10px"
      };
    },
    gridStyle() {
      // Tu HTML usa 15 columnas con altura contenida; lo hacemos responsive con minmax
      const cols = this.content.columns || 15;
      const rowsH = this.content.gridMaxHeight || "100px";
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        maxHeight: rowsH
      };
    }
  },
  methods: {
    pick(emoji) {
      // Evento para workflows
      this.$emit("trigger-event", { name: "onPick", payload: { emoji } });
    },
    emitClose() {
      this.$emit("trigger-event", { name: "onClose", payload: {} });
    },
    setCat(id) {
      this.state.activeCat = id;
    },
    defaultEmojis() {
      // subset “people” similar a tu captura
      const P = "people";
      const arr = "😀 😃 😄 😁 😆 😅 😂 🤣 🥲 ☺️ 😊 😇 🙂 🙃 😉 😍 🥰 😘 😗 😙 😚 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔".split(/\s+/).map(c=>({char:c,cat:P}));
      // Crea mínimos para otras categorías para que la barra funcione
      const mk = (chars, cat) => chars.split(/\s+/).map(c=>({char:c,cat}));
      return [
        ...arr,
        ...mk("🐶 🐱 🐭 🐹 🐰 🦊 🐻", "animals"),
        ...mk("🍎 🥐 🍔 🍟 🍕 🍣 🍩", "food"),
        ...mk("⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉", "activities"),
        ...mk("✈️ 🚗 🚕 🚌 🚎 🚓 🚑", "travel"),
        ...mk("💡 🔑 🔨 🔧 🧰 🧲 💾", "objects"),
        ...mk("❤ 💛 💚 💙 💜 🖤 🤍", "symbols"),
        ...mk("🇨🇱 🇺🇸 🇪🇸 🇫🇷 🇩🇪 🇧🇷 🇯🇵", "flags")
      ];
    }
  }
};
</script>

<style scoped>
.ww-emoji-card{
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ww-emoji-close{
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px; height: 20px;
  border: 0; outline: none; background: transparent;
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; color: #020234;
}
.ww-emoji-close svg{ width: 16px; height: 16px; }

.ww-emoji-grid{
  display: grid;
  gap: 0px;
  overflow: auto;
  padding-top: 12px;
}

.ww-emoji-btn{
  display: flex; align-items:center; justify-content:center;
  width: 100%; height: 24px;
  padding: 2px;
  background: transparent;
  border: 0; cursor: pointer;
  border-radius: 100px;
  font-size: 16px; line-height: 1;
  transition: background .12s ease-in-out, transform .05s;
}
.ww-emoji-btn:hover{ background: rgba(2,2,52,0.06); }
.ww-emoji-btn:active{ transform: scale(0.96); }

.ww-emoji-cats{
  display: flex; gap: 8px;
  align-items: center; justify-content: flex-start;
  padding-top: 8px;
  border-top: 1px solid #eee;
}
.ww-emoji-cat-btn{
  width: 28px; height: 28px; border-radius: 999px;
  display: inline-flex; align-items:center; justify-content:center;
  background: transparent; border: 0; cursor: pointer;
  color: #A8A8A8;
  transition: background .12s, color .12s;
  font-size: 16px;
}
.ww-emoji-cat-btn:hover{ background: rgba(2,2,52,0.06); }
.ww-emoji-cat-btn.active{ color: #020234; background: rgba(2,2,52,0.08); }
</style>
