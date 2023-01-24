import { MediaData } from "./../dialog";
import { BaseComponet } from "./../../component.js";
export class MediaSectionInput
  extends BaseComponet<HTMLElement>
  implements MediaData
{
  constructor() {
    super(`
    <div>
        <div class="form__container">
          <input type="text" id="title" placeholder="Title.."/>
        </div>
        <div class="form__container">
          <input type="text" id="url" placeholder="Url"/>
        </div>
    </div>
`);
  }
  // 사용자가 정보를 입력하고 add btn을 누르면 url getter를 이용하여 입력된 data를 얻는다
  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  get url(): string {
    const element = this.element.querySelector("#url")! as HTMLInputElement;
    return element.value;
  }
}
