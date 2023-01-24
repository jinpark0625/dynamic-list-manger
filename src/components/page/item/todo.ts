import { BaseComponet } from "../../component.js";

export class TodoComponent extends BaseComponet<HTMLElement> {
  constructor(title: string, todo: string) {
    super(
      `
        <section class="note">
        <div class="title-wrap"><h2 class="todo__title"></h2></div>
        <div class="todo__body">
          <input type="checkbox" class="todo-checkbox">
          <label for="todo-checkbox" class="todo-label"></label>
        </div>
        </section>
      `
    );

    const titleElement = this.element.querySelector(
      ".todo__title"
    )! as HTMLHeadingElement;
    titleElement.innerHTML = `<i class="ai-check-box title__icons" id="todo_icon"></i> ${title}`;

    const todoElement = this.element.querySelector(
      ".todo-checkbox"
    )! as HTMLInputElement;
    todoElement.insertAdjacentText("afterend", todo);
  }
}
