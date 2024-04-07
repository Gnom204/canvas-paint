import Paint from "./paint.js";

const template = document.querySelector("#paint");
const placePaint = document.querySelector(".app");

const paint = new Paint(template, placePaint);
paint.renderPaint();
