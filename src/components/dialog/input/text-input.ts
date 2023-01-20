import { BaseComponet } from "./../../component.js";
export class TextSectionInput extends BaseComponet<HTMLElement> {
  constructor() {
    super(`
    <div>
        <div class="form__container">
          <label for="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div class="form__container">
          <label for="body">Body</label>
          <textarea type="text" row="3" id="body"></textarea>
        </div>
    </div>
`);
  }
  // 사용자가 정보를 입력하고 add btn을 누르면 url getter를 이용하여 입력된 data를 얻는다
  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  get body(): string {
    const element = this.element.querySelector("#body")! as HTMLInputElement;
    return element.value;
  }
}
