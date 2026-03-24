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

// Event Listner -
startBtn.addEventListener("click", () => {
  hero.style.display = "none";
  how.style.display = "none";
  sample.style.display = "none";
  cta.style.display = "none";

  appFlow.style.display = "block";
});
