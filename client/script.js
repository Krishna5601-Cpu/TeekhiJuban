// State Management -
let state = "home";

function renderView() {
  if (state === "select") {
  }
  if (state === "input") {
  }
  if (state === "result") {
  }
}

// DOM Selectors -

const startBtn = document.querySelector("#startRoast");
const appFlow = document.querySelector("#app-flow");

const hero = document.querySelector(".hero");
const how = document.querySelector(".how");
const sample = document.querySelector(".sample");
const cta = document.querySelector(".cta");

// Functions -
const showParameterSelection = () => {
  hero.style.display = "none";
  how.style.display = "none";
  sample.style.display = "none";
  cta.style.display = "none";

  appFlow.style.display = "block";
  renderParameterCards();
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
    });

    grid.appendChild(card);
  });
};

// Event Listner -
startBtn.addEventListener("click", showParameterSelection);
