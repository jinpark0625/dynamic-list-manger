import { BaseComponet } from "../../component.js";
export class NoteComponent extends BaseComponet<HTMLElement> {
  constructor(title: string, body: string) {
    super(
      `
      <section class="note">
        <div class="title-wrap"><h2 class="note__title"></h2></div>
        <p class="note__body"></p>
      </section>
    `
    );

    const titleElement = this.element.querySelector(
      ".note__title"
    )! as HTMLHeadingElement;
    titleElement.innerHTML = `<i class="ai-clipboard title__icons" id="note_icon"></i> ${title}`;

    const bodyElement = this.element.querySelector(
      ".note__body"
    )! as HTMLParagraphElement;
    bodyElement.textContent = body;
  }
}
