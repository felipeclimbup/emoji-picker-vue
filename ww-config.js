export default {
  editor: {
    label: { en: "Emoji Picker", es: "Selector de Emojis" },
    icon: "emoji_emotions"
  },
  options: {
    sizable: false,
    hyperlink: false
  },
  properties: {
    width:   { label:{es:"Ancho"}, type:"Text", defaultValue:"420px" },
    radius:  { label:{es:"Radio"}, type:"Number", defaultValue:16 },
    cardBg:  { label:{es:"Fondo"}, type:"Color", defaultValue:"#FFFFFF" },
    border:  { label:{es:"Borde CSS"}, type:"Text", defaultValue:"1px solid #D0D5DD" },
    shadow:  { label:{es:"Sombra"}, type:"Text", defaultValue:"0px 1px 3px rgba(2,2,52,0.2)" },
    columns: { label:{es:"Columnas"}, type:"Number", defaultValue:15, bindable:true },
    gridMaxHeight: { label:{es:"Alto máx grilla"}, type:"Text", defaultValue:"100px" },
    defaultCategory: {
      label:{es:"Categoría por defecto"},
      type:"Text", defaultValue:"people", options:[
        { value:"people", label:"Smileys" },
        { value:"animals", label:"Animals" },
        { value:"food", label:"Food" },
        { value:"activities", label:"Activities" },
        { value:"travel", label:"Travel" },
        { value:"objects", label:"Objects" },
        { value:"symbols", label:"Symbols" },
        { value:"flags", label:"Flags" }
      ]
    },
    // Permite inyectar tu propio dataset
    emojis: {
      label:{es:"Emojis (array)"},
      type:"Array",
      bindable: true,
      section: "advanced"
      // esperado: [{char:"😀", name:"grinning face", cat:"people"}, ...]
    },
    categories: {
      label:{es:"Categorías (array)"},
      type:"Array",
      bindable: true,
      section: "advanced"
      // esperado: [{id:"people", label:"Smileys", icon:"smile"}, ...]
    }
  },
  triggerEvents: [
    { name: "onPick",  label: { es: "Al elegir emoji" } },
    { name: "onClose", label: { es: "Al cerrar" } }
  ]
};
