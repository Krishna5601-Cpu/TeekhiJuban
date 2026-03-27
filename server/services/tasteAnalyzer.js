function analyzeTaste(parameter, items) {
  let tags = [];

  if (parameter === "anime") {
    if (items.length > 5) tags.push("anime_addict");

    if (items.some((item) => item.toLowerCase().includes("romance"))) {
      tags.push("romantic");
    }

    if (items.some((item) => item.toLowerCase().includes("naruto"))) {
      tags.push("main_character_delusion");
    }
  }

  if (parameter === "music") {
    if (items.some((item) => item.toLowerCase().includes("arijit"))) {
      tags.push("heartbreak_specialist");
    }

    if (items.length > 10) {
      tags.push("music_overconsumer");
    }
  }

  return tags;
}

module.exports = analyzeTaste;
