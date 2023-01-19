import { BaseComponet } from "../../component.js";

export class ImageComponent extends BaseComponet<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="image">
     <div class="image__holder">
      <div class="image__holder">
        <img src="" alt="" class="image__thumbnail" />
      </div>
      <h2 class="image__title"></h2>
    </div>
    </section>
    `);

    const imageElement = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      ".image__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
}
