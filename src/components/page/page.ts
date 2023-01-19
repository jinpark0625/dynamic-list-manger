import { BaseComponet } from "../component.js";
export class PageComponent extends BaseComponet<HTMLUListElement> {
  constructor() {
    super('<ul class="page">This is PageComponent</ul>');
  }
}
