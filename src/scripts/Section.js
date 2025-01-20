import { noCardsMessage } from "./utils.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._renderedItems.forEach((item) => this._renderer(item));
    noCardsMessage();
  }
  addItem(item) {
    this._container.append(item);
  }
}
