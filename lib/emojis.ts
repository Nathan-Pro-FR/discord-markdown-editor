export type EmojiCategory = {
  id: string
  label: string
  emojis: EmojiEntry[]
}

export type EmojiEntry = {
  /** Primary Discord-style shortcode without colons, e.g. "heart" */
  name: string
  /** The unicode character, e.g. "❤️" */
  char: string
  /** Extra shortcodes that map to the same emoji */
  aliases?: string[]
}

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: "smileys",
    label: "Smileys & Émotions",
    emojis: [
      { name: "grinning", char: "😀" },
      { name: "smile", char: "😄" },
      { name: "smiley", char: "😃" },
      { name: "grin", char: "😁" },
      { name: "laughing", char: "😆", aliases: ["satisfied"] },
      { name: "sweat_smile", char: "😅" },
      { name: "rofl", char: "🤣" },
      { name: "joy", char: "😂" },
      { name: "slight_smile", char: "🙂", aliases: ["slightly_smiling_face"] },
      { name: "upside_down", char: "🙃" },
      { name: "wink", char: "😉" },
      { name: "blush", char: "😊" },
      { name: "innocent", char: "😇" },
      { name: "heart_eyes", char: "😍" },
      { name: "kissing_heart", char: "😘" },
      { name: "yum", char: "😋" },
      { name: "stuck_out_tongue", char: "😛" },
      { name: "stuck_out_tongue_winking_eye", char: "😜" },
      { name: "zany_face", char: "🤪" },
      { name: "thinking", char: "🤔" },
      { name: "zipper_mouth", char: "🤐" },
      { name: "neutral_face", char: "😐" },
      { name: "expressionless", char: "😑" },
      { name: "no_mouth", char: "😶" },
      { name: "smirk", char: "😏" },
      { name: "unamused", char: "😒" },
      { name: "roll_eyes", char: "🙄" },
      { name: "grimacing", char: "😬" },
      { name: "relieved", char: "😌" },
      { name: "pensive", char: "😔" },
      { name: "sleepy", char: "😪" },
      { name: "sleeping", char: "😴" },
      { name: "mask", char: "😷" },
      { name: "cold_face", char: "🥶" },
      { name: "hot_face", char: "🥵" },
      { name: "sunglasses", char: "😎" },
      { name: "nerd", char: "🤓" },
      { name: "confused", char: "😕" },
      { name: "worried", char: "😟" },
      { name: "frowning", char: "🙁", aliases: ["slightly_frowning_face"] },
      { name: "cry", char: "😢" },
      { name: "sob", char: "😭" },
      { name: "scream", char: "😱" },
      { name: "angry", char: "😠" },
      { name: "rage", char: "😡" },
      { name: "triumph", char: "😤" },
      { name: "flushed", char: "😳" },
      { name: "pleading", char: "🥺", aliases: ["pleading_face"] },
      { name: "skull", char: "💀" },
      { name: "clown", char: "🤡" },
      { name: "ghost", char: "👻" },
      { name: "robot", char: "🤖" },
      { name: "poop", char: "💩", aliases: ["shit", "hankey"] },
    ],
  },
  {
    id: "gestures",
    label: "Personnes & Gestes",
    emojis: [
      { name: "wave", char: "👋" },
      { name: "raised_hand", char: "✋" },
      { name: "ok_hand", char: "👌" },
      { name: "pinching_hand", char: "🤏" },
      { name: "v", char: "✌️", aliases: ["victory"] },
      { name: "crossed_fingers", char: "🤞" },
      { name: "love_you_gesture", char: "🤟" },
      { name: "metal", char: "🤘" },
      { name: "call_me_hand", char: "🤙" },
      { name: "point_left", char: "👈" },
      { name: "point_right", char: "👉" },
      { name: "point_up", char: "☝️" },
      { name: "point_down", char: "👇" },
      { name: "thumbsup", char: "👍", aliases: ["+1", "thumbup"] },
      { name: "thumbsdown", char: "👎", aliases: ["-1", "thumbdown"] },
      { name: "fist", char: "✊" },
      { name: "punch", char: "👊", aliases: ["fist_oncoming"] },
      { name: "clap", char: "👏" },
      { name: "raised_hands", char: "🙌" },
      { name: "open_hands", char: "👐" },
      { name: "pray", char: "🙏" },
      { name: "handshake", char: "🤝" },
      { name: "muscle", char: "💪" },
      { name: "writing_hand", char: "✍️" },
      { name: "person_shrugging", char: "🤷", aliases: ["shrug"] },
      { name: "person_facepalming", char: "🤦", aliases: ["facepalm"] },
      { name: "eyes", char: "👀" },
      { name: "brain", char: "🧠" },
    ],
  },
  {
    id: "nature",
    label: "Animaux & Nature",
    emojis: [
      { name: "dog", char: "🐶" },
      { name: "cat", char: "🐱" },
      { name: "mouse", char: "🐭" },
      { name: "hamster", char: "🐹" },
      { name: "rabbit", char: "🐰" },
      { name: "fox", char: "🦊" },
      { name: "bear", char: "🐻" },
      { name: "panda_face", char: "🐼" },
      { name: "koala", char: "🐨" },
      { name: "tiger", char: "🐯" },
      { name: "lion", char: "🦁" },
      { name: "cow", char: "🐮" },
      { name: "pig", char: "🐷" },
      { name: "frog", char: "🐸" },
      { name: "monkey_face", char: "🐵" },
      { name: "chicken", char: "🐔" },
      { name: "penguin", char: "🐧" },
      { name: "bird", char: "🐦" },
      { name: "unicorn", char: "🦄" },
      { name: "bee", char: "🐝", aliases: ["honeybee"] },
      { name: "butterfly", char: "🦋" },
      { name: "snail", char: "🐌" },
      { name: "fish", char: "🐟" },
      { name: "dolphin", char: "🐬" },
      { name: "whale", char: "🐳" },
      { name: "turtle", char: "🐢" },
      { name: "snake", char: "🐍" },
      { name: "dragon", char: "🐉" },
      { name: "cactus", char: "🌵" },
      { name: "evergreen_tree", char: "🌲" },
      { name: "palm_tree", char: "🌴" },
      { name: "four_leaf_clover", char: "🍀" },
      { name: "maple_leaf", char: "🍁" },
      { name: "rose", char: "🌹" },
      { name: "sunflower", char: "🌻" },
      { name: "blossom", char: "🌼" },
      { name: "tulip", char: "🌷" },
      { name: "sun_with_face", char: "🌞" },
      { name: "star", char: "⭐" },
      { name: "star2", char: "🌟" },
      { name: "sparkles", char: "✨" },
      { name: "zap", char: "⚡" },
      { name: "fire", char: "🔥" },
      { name: "boom", char: "💥" },
      { name: "rainbow", char: "🌈" },
      { name: "snowflake", char: "❄️" },
      { name: "droplet", char: "💧" },
      { name: "ocean", char: "🌊" },
    ],
  },
  {
    id: "food",
    label: "Nourriture & Boissons",
    emojis: [
      { name: "apple", char: "🍎" },
      { name: "banana", char: "🍌" },
      { name: "watermelon", char: "🍉" },
      { name: "grapes", char: "🍇" },
      { name: "strawberry", char: "🍓" },
      { name: "peach", char: "🍑" },
      { name: "cherries", char: "🍒" },
      { name: "pineapple", char: "🍍" },
      { name: "avocado", char: "🥑" },
      { name: "tomato", char: "🍅" },
      { name: "corn", char: "🌽" },
      { name: "hot_pepper", char: "🌶️" },
      { name: "bread", char: "🍞" },
      { name: "cheese", char: "🧀" },
      { name: "hamburger", char: "🍔" },
      { name: "fries", char: "🍟" },
      { name: "pizza", char: "🍕" },
      { name: "hotdog", char: "🌭" },
      { name: "taco", char: "🌮" },
      { name: "burrito", char: "🌯" },
      { name: "egg", char: "🥚" },
      { name: "ramen", char: "🍜" },
      { name: "spaghetti", char: "🍝" },
      { name: "sushi", char: "🍣" },
      { name: "rice", char: "🍚" },
      { name: "cookie", char: "🍪" },
      { name: "cake", char: "🍰" },
      { name: "birthday", char: "🎂" },
      { name: "doughnut", char: "🍩" },
      { name: "candy", char: "🍬" },
      { name: "lollipop", char: "🍭" },
      { name: "chocolate_bar", char: "🍫" },
      { name: "icecream", char: "🍦" },
      { name: "coffee", char: "☕" },
      { name: "tea", char: "🍵" },
      { name: "beer", char: "🍺" },
      { name: "wine_glass", char: "🍷" },
      { name: "cocktail", char: "🍸" },
      { name: "champagne", char: "🍾" },
    ],
  },
  {
    id: "activities",
    label: "Activités & Objets",
    emojis: [
      { name: "soccer", char: "⚽" },
      { name: "basketball", char: "🏀" },
      { name: "football", char: "🏈" },
      { name: "baseball", char: "⚾" },
      { name: "tennis", char: "🎾" },
      { name: "volleyball", char: "🏐" },
      { name: "8ball", char: "🎱" },
      { name: "ping_pong", char: "🏓" },
      { name: "trophy", char: "🏆" },
      { name: "medal", char: "🏅" },
      { name: "first_place", char: "🥇" },
      { name: "dart", char: "🎯" },
      { name: "video_game", char: "🎮" },
      { name: "game_die", char: "🎲" },
      { name: "musical_note", char: "🎵" },
      { name: "notes", char: "🎶" },
      { name: "microphone", char: "🎤" },
      { name: "headphones", char: "🎧" },
      { name: "guitar", char: "🎸" },
      { name: "art", char: "🎨" },
      { name: "clapper", char: "🎬" },
      { name: "rocket", char: "🚀" },
      { name: "airplane", char: "✈️" },
      { name: "car", char: "🚗" },
      { name: "bike", char: "🚲" },
      { name: "phone", char: "📱", aliases: ["iphone"] },
      { name: "computer", char: "💻" },
      { name: "bulb", char: "💡" },
      { name: "book", char: "📖" },
      { name: "gift", char: "🎁" },
      { name: "balloon", char: "🎈" },
      { name: "tada", char: "🎉" },
      { name: "confetti_ball", char: "🎊" },
      { name: "crown", char: "👑" },
      { name: "gem", char: "💎" },
      { name: "money_with_wings", char: "💸" },
      { name: "moneybag", char: "💰" },
      { name: "key", char: "🔑" },
      { name: "lock", char: "🔒" },
      { name: "bell", char: "🔔" },
      { name: "hourglass", char: "⌛" },
      { name: "alarm_clock", char: "⏰" },
    ],
  },
  {
    id: "symbols",
    label: "Symboles & Cœurs",
    emojis: [
      { name: "heart", char: "❤️" },
      { name: "orange_heart", char: "🧡" },
      { name: "yellow_heart", char: "💛" },
      { name: "green_heart", char: "💚" },
      { name: "blue_heart", char: "💙" },
      { name: "purple_heart", char: "💜" },
      { name: "black_heart", char: "🖤" },
      { name: "white_heart", char: "🤍" },
      { name: "brown_heart", char: "🤎" },
      { name: "broken_heart", char: "💔" },
      { name: "two_hearts", char: "💕" },
      { name: "sparkling_heart", char: "💖" },
      { name: "heartpulse", char: "💗" },
      { name: "cupid", char: "💘" },
      { name: "gift_heart", char: "💝" },
      { name: "100", char: "💯" },
      { name: "anger", char: "💢" },
      { name: "exclamation", char: "❗" },
      { name: "question", char: "❓" },
      { name: "warning", char: "⚠️" },
      { name: "no_entry", char: "⛔" },
      { name: "white_check_mark", char: "✅" },
      { name: "heavy_check_mark", char: "✔️" },
      { name: "x", char: "❌" },
      { name: "negative_squared_cross_mark", char: "❎" },
      { name: "heavy_plus_sign", char: "➕" },
      { name: "heavy_minus_sign", char: "➖" },
      { name: "heavy_multiplication_x", char: "✖️" },
      { name: "heavy_division_sign", char: "➗" },
      { name: "infinity", char: "♾️" },
      { name: "recycle", char: "♻️" },
      { name: "checkered_flag", char: "🏁" },
      { name: "triangular_flag_on_post", char: "🚩" },
      { name: "white_flag", char: "🏳️" },
      { name: "black_flag", char: "🏴" },
      { name: "arrow_right", char: "➡️" },
      { name: "arrow_left", char: "⬅️" },
      { name: "arrow_up", char: "⬆️" },
      { name: "arrow_down", char: "⬇️" },
    ],
  },
]

/** Flat lookup map: shortcode (and aliases) -> unicode char */
export const EMOJI_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {}
  for (const cat of EMOJI_CATEGORIES) {
    for (const emoji of cat.emojis) {
      map[emoji.name] = emoji.char
      if (emoji.aliases) {
        for (const alias of emoji.aliases) {
          map[alias] = emoji.char
        }
      }
    }
  }
  return map
})()

/** Flat list of all entries, used for search/autocomplete */
export const ALL_EMOJIS: EmojiEntry[] = EMOJI_CATEGORIES.flatMap((c) => c.emojis)

/** Returns up to `limit` emojis whose name/alias starts with or includes the query */
export function searchEmojis(query: string, limit = 30): { name: string; char: string }[] {
  const q = query.toLowerCase().trim()
  if (!q) return ALL_EMOJIS.slice(0, limit).map((e) => ({ name: e.name, char: e.char }))

  const starts: { name: string; char: string }[] = []
  const includes: { name: string; char: string }[] = []

  for (const emoji of ALL_EMOJIS) {
    const names = [emoji.name, ...(emoji.aliases ?? [])]
    let matched: "start" | "include" | null = null
    for (const n of names) {
      if (n.startsWith(q)) {
        matched = "start"
        break
      }
      if (n.includes(q)) {
        matched = "include"
      }
    }
    if (matched === "start") starts.push({ name: emoji.name, char: emoji.char })
    else if (matched === "include") includes.push({ name: emoji.name, char: emoji.char })
  }

  return [...starts, ...includes].slice(0, limit)
}
