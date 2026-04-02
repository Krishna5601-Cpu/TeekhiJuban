// State Management -
let state = "home";
let selectedParameter = null;
const loadingMessages = [
  "Analysing your questionable taste…",
  "Consulting savage department…",
  "Downloading emotional damage…",
  "Comparing you with worse users…",
  "AI judging silently… then loudly…",
  "Preparing roast missiles…",
  "Scanning cringe levels…",
  "Evaluating the weirdness in you",
  "Judging the one who judges",
];

const placeholderExamples = {
  music: `Example:
Arijit Singh
Drake
Lo-fi Beats`,

  anime: `Example:
Naruto
Death Note
Attack on Titan`,

  games: `Example:
GTA V
Minecraft
Call of Duty`,

  movies: `Example:
Interstellar
Dark
Inception`,

  personality: `Example:
Introvert
Overthinker
Lazy`,
};

// DOM Selectors -

const startBtn = document.querySelector("#startRoast");
const appFlow = document.querySelector("#app-flow");

const hero = document.querySelector(".hero");
const how = document.querySelector(".how");
const sample = document.querySelector(".sample");
const cta = document.querySelector(".cta");

// Functions -

const renderView = () => {
  if (state === "select") {
  }
  if (state === "input") {
  }
  if (state === "result") {
  }
};

const renderLoadingScreen = (items, type, intensity) => {
  const randomMsg =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  appFlow.innerHTML = `
    <h2 style="margin-bottom:30px;">🤖 AI is Thinking...</h2>
    <p style="color:#bbb;font-size:18px;">${randomMsg}</p>
  `;

  // 🔥 CALL BACKEND HERE
  fetch("http://localhost:2027/api/roast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: selectedParameter,
      items,
      roastType: type,
      intensity,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      renderRoastResult(data.roast);
    })
    .catch((err) => {
      console.error(err);
      appFlow.innerHTML = "<p>Something went wrong 😅</p>";
    });
};

const showParameterSelection = () => {
  hero.style.display = "none";
  how.style.display = "none";
  sample.style.display = "none";
  cta.style.display = "none";

  appFlow.style.display = "block";
  renderParameterCards();
};

const renderRoastResult = (roastText) => {
  const formatted = roastText.replace(/\n/g, "<br><br>");

  appFlow.innerHTML = `
  <h2 style="margin-bottom:30px;">🔥 Your Roast is Ready</h2>

  <div id="roastBox" style="
    max-width:600px;
    margin:auto;
    padding:30px;
    border-radius:14px;
    background:linear-gradient(45deg,#ff4d4d20,#ff1a7520);
    border:1px solid #ff4d4d;
    font-style:italic;
  ">
    <p id="roastText">${formatted}</p>
  </div>

  <button id="copyRoast"
    style="
      margin-top:20px;
      margin-right:10px;
      padding:12px 26px;
      border-radius:10px;
      border:none;
      background:#222;
      color:white;
      cursor:pointer;
      font-weight:600;
    ">
    📋 Copy Roast
  </button>

  <button id="roastAgain"
    style="
      margin-top:20px;
      padding:12px 26px;
      border-radius:10px;
      border:none;
      background:linear-gradient(45deg,#ff4d4d,#ff1a75);
      cursor:pointer;
      font-weight:600;
    ">
    Roast Again 🔁
  </button>
`;

  document
    .getElementById("roastAgain")
    .addEventListener("click", showParameterSelection);

  const copyBtn = document.getElementById("copyRoast");

  copyBtn.addEventListener("click", () => {
    const text = roastText; // original text (not HTML)

    navigator.clipboard
      .writeText(text)
      .then(() => {
        copyBtn.innerText = "✅ Copied!";
        setTimeout(() => {
          copyBtn.innerText = "📋 Copy Roast";
        }, 2000);
      })
      .catch(() => {
        copyBtn.innerText = "❌ Failed";
      });
  });
};

const renderInputScreen = (title, paramId) => {
  appFlow.innerHTML = `
    <h2 style="margin-bottom:20px;">${title}</h2>

    <p style="margin-bottom:20px;color:#bbb;">
      Enter items line by line for best roasting 😈
    </p>

    <textarea id="userInput"
  style="
    width:100%;
    max-width:600px;
    height:160px;
    padding:15px;
    border-radius:10px;
    border:none;
    outline:none;
    margin-bottom:20px;
  "
  placeholder="${placeholderExamples[paramId]}"
></textarea>

    <br>

    <select id="roastType"
      style="padding:10px;border-radius:8px;margin-bottom:20px;">
        <option value="friendly">Friendly Roast</option>
        <option value="savage">Savage Roast</option>
        <option value="villain">Villain Roast</option>
    </select>

    <br>

    <input id="intensity" type="range" min="1" max="5" value="3" />

    <p style="margin-bottom:20px;">Intensity Level 🌶️</p>

    <button id="generateRoast"
      style="
        padding:14px 30px;
        background:linear-gradient(45deg,#ff4d4d,#ff1a75);
        border:none;
        border-radius:10px;
        cursor:pointer;
        font-weight:600;
      ">
      Generate Roast 🔥
    </button>
  `;

  const btn = document.getElementById("generateRoast");

  btn.addEventListener("click", () => {
    const text = document.getElementById("userInput").value;
    const type = document.getElementById("roastType").value;
    const intensity = document.getElementById("intensity").value;

    const items = text
      .split("\n")
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    renderLoadingScreen(items, type, intensity);
  });
};

const renderParameterCards = () => {
  const parameters = [
    { id: "music", label: "🎧 Music Taste" },
    { id: "anime", label: "📺 Anime Watchlist" },
    { id: "games", label: "🎮 Games Played" },
    { id: "movies", label: "📚 Movies / Books" },
    { id: "personality", label: "🧠 Personality" },
  ];

  appFlow.innerHTML = `
      <h2 style="margin-bottom:40px;">Select what should be roasted 😈</h2>
      <div id="paramGrid" style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:20px;
          max-width:800px;
          margin:auto;
      "></div>
  `;

  const grid = document.querySelector("#paramGrid");
  parameters.forEach((params) => {
    const card = document.createElement("div");
    card.className = "param-card";
    card.innerText = params.label;

    card.style.padding = "30px";
    card.style.borderRadius = "14px";
    card.style.background = "linear-gradient(45deg,#ff4d4d,#ff1a75)";
    card.style.cursor = "pointer";
    card.style.fontWeight = "600";
    card.style.transition = "0.3s";
    card.style.textAlign = "center";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0px)";
    });

    card.addEventListener("click", () => {
      console.log("Selected: ", params.id);
      selectedParameter = params.id;
      renderInputScreen(params.label, params.id);
    });

    grid.appendChild(card);
  });
};

// Event Listner -
startBtn.addEventListener("click", showParameterSelection);
