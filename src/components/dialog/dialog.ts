import { BaseComponet, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class InputDialog
  extends BaseComponet<HTMLElement>
  implements Composable
{
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;

  constructor(selector: string) {
    super(`
        <section class="dialog">
            <div class="dialog__container">
              <button class="close">
                <i class="ai-cross"></i>
              </button>
              
              <h2 class="dialog__title">Add Task</h2>
              <p class="dialog__subtitle"></p>

              <div id="dialog__body"></div>
              <button class="dialog__submit">
                Add
              </button>
            </div>
            <div class="dialog__overlay"></div>
        </section>
`);
    const subTitle = this.element.querySelector(
      ".dialog__subtitle"
    )! as HTMLParagraphElement;
    this.titleCheck(selector, subTitle);

    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const exitBtn = this.element.querySelector(
      ".dialog__overlay"
    )! as HTMLDivElement;
    exitBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  titleCheck(selected: string, subTitle: HTMLParagraphElement) {
    switch (selected) {
      case "#new-image":
        subTitle.innerHTML = `<i class="ai-image" id="image_dialog_ic"></i> Image`;
        break;
      case "#new-video":
        subTitle.innerHTML = `<i class="ai-video" id="video_dialog_ic"></i> Video(Only Youtube)`;
        break;
      case "#new-todo":
        subTitle.innerHTML = `<i class="ai-check-box" id="todo_dialog_ic"></i> Todo`;
        break;
      case "#new-note":
        subTitle.innerHTML = `<i class="ai-clipboard" id="note_dialog_ic"></i> Note`;
        break;
      default:
        throw new Error(`Unsupported selector: ${selected}`);
    }
  }

  setOnCloseListener(listner: OnCloseListener) {
    this.closeListener = listner;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
