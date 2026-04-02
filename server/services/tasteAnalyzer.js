const analyzeTaste = (parameter, items) => {
  let tags = [];
  const lowerItems = items.map((i) => i.toLowerCase());

  // COMMON PATTERNS

  if (items.length === 0) {
    tags.push("no_personality");
  }

  if (items.length > 15) {
    tags.push("overconsumer");
  }

  if (items.length <= 2) {
    tags.push("basic_taste");
  }

  // MUSIC ANALYSIS

  if (parameter === "music") {
    if (lowerItems.some((i) => i.includes("arijit"))) {
      tags.push("heartbreak_specialist");
    }

    if (lowerItems.some((i) => i.includes("lofi"))) {
      tags.push("fake_deep");
    }

    if (lowerItems.some((i) => i.includes("sad"))) {
      tags.push("emotionally_unstable");
    }

    if (items.length > 10) {
      tags.push("music_overconsumer");
    }

    if (lowerItems.some((i) => i.includes("party"))) {
      tags.push("weekend_personality");
    }
  }

  // ANIME ANALYSIS

  if (parameter === "anime") {
    if (items.length > 5) tags.push("anime_addict");

    if (lowerItems.some((i) => i.includes("romance"))) {
      tags.push("romantic_escape");
    }

    if (lowerItems.some((i) => i.includes("naruto"))) {
      tags.push("main_character_delusion");
    }

    if (lowerItems.some((i) => i.includes("isekai"))) {
      tags.push("reality_escape");
    }

    if (lowerItems.some((i) => i.includes("death note"))) {
      tags.push("fake_genius");
    }

    if (lowerItems.some((i) => i.includes("one piece"))) {
      tags.push("never_finishes_anything");
    }
  }

  // GAMES ANALYSIS

  if (parameter === "games") {
    if (lowerItems.some((i) => i.includes("pubg") || i.includes("cod"))) {
      tags.push("triggered_gamer");
    }

    if (lowerItems.some((i) => i.includes("minecraft"))) {
      tags.push("nostalgia_trapped");
    }

    if (lowerItems.some((i) => i.includes("gta"))) {
      tags.push("chaos_enjoyer");
    }

    if (items.length > 5) {
      tags.push("no_life_gamer");
    }
  }

  // MOVIES / BOOKS

  if (parameter === "movies") {
    if (lowerItems.some((i) => i.includes("interstellar"))) {
      tags.push("fake_philosopher");
    }

    if (lowerItems.some((i) => i.includes("dark"))) {
      tags.push("confused_intellectual");
    }

    if (lowerItems.some((i) => i.includes("romance"))) {
      tags.push("love_delusion");
    }

    if (items.length > 8) {
      tags.push("content_binger");
    }
  }

  // PERSONALITY INPUT

  if (parameter === "personality") {
    if (lowerItems.some((i) => i.includes("introvert"))) {
      tags.push("socially_invisible");
    }

    if (lowerItems.some((i) => i.includes("overthink"))) {
      tags.push("overthinking_machine");
    }

    if (lowerItems.some((i) => i.includes("sigma"))) {
      tags.push("delusional_sigma");
    }

    if (lowerItems.some((i) => i.includes("lazy"))) {
      tags.push("professional_procrastinator");
    }
  }

  // META TAGS

  if (tags.length === 0) {
    tags.push("mysterious_but_boring");
  }

  return tags;
};

module.exports = analyzeTaste;
