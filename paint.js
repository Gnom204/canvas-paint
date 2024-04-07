export default class Paint {
  constructor(template, place) {
    this.template = template;
    this.place = place;
    this.isMobile = false;
    this.drawing;
  }
  _createPaint() {
    let width = window.innerWidth;
    if (width < 700) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.clone = this.template.content.cloneNode(true);
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.ctx = this.canvas.getContext("2d");
    this.pen = this.clone.querySelector(".pen");
    this.circle = this.clone.querySelector(".circle");
    this.line = this.clone.querySelector(".line");

    this.circle.addEventListener("mousemove", (e) => this._draw(e));
    this.circle.addEventListener("mousedown", (e) => this._startDrawing(e));
    this.circle.addEventListener("mouseout", (e) => this._draw(e));
    this.circle.addEventListener("mouseup", () => this._stopDrawing());
    this.canvas.addEventListener("mouseup", this._stopDrawing);
    this.circle.addEventListener("mouseout", (e) => this._draw(e));

    this.circle.addEventListener("touchmove", (e) => this._draw(e));
    this.circle.addEventListener("touchstart", (e) => this._startDrawing(e));
    this.circle.addEventListener("touchout", (e) => this._draw(e));
    this.circle.addEventListener("touchend", () => this._stopDrawing());
    this.canvas.addEventListener("touchend", this._stopDrawing);
    this.circle.addEventListener("touchout", (e) => this._draw(e));

    return this.clone;
  }
  renderPaint() {
    this.paint = this._createPaint();
    this.place.appendChild(this.canvas);
    this.place.appendChild(this.paint);
  }
  _draw(e) {
    e.preventDefault();
    if (!this.drawing) {
      return;
    } else {
      if (this.isMobile) {
        this.x = e.touches[0].clientX - this.canvas.offsetLeft;
        this.y = e.touches[0].clientY - this.canvas.offsetTop;
      } else {
        this.x = e.clientX - this.canvas.offsetLeft;
        this.y = e.clientY - this.canvas.offsetTop;
      }
      let circleCords = this.circle.getBoundingClientRect();
      let lineCords = this.line.getBoundingClientRect();
      console.log(this.x, this.y);
      this.pen.style.left = this.x - circleCords.width / 3 + "px";
      this.pen.style.top = this.y - circleCords.height / 3 + "px";

      this.ctx.lineTo(
        this.x - circleCords.width / 3 - lineCords.width / 3,
        this.y + circleCords.height / 3 + lineCords.height
      );
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.x - circleCords.width / 3 - lineCords.width / 3,
        this.y + circleCords.height / 3 + lineCords.height
      );
    }
  }
  _startDrawing(e) {
    if (this.isMobile) {
      this.x = e.touches[0].clientX - this.canvas.offsetLeft;
      this.y = e.touches[0].clientY - this.canvas.offsetTop;
    } else {
      this.x = e.clientX - this.canvas.offsetLeft;
      this.y = e.clientY - this.canvas.offsetTop;
    }
    let circleCords = this.circle.getBoundingClientRect();

    this.drawing = true;

    this.pen.style.left = this.x - circleCords.width / 3 + "px";
    this.pen.style.top = this.y - circleCords.height / 3 + "px";
  }
  _stopDrawing() {
    this.drawing = false;
    this.ctx.beginPath();
  }
}
