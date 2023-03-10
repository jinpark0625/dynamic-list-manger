import { BaseComponet } from "../../component.js";

export class VideoComponent extends BaseComponet<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
            <section class="video">
                <div class="title-wrap"><h2 class="video__title"></h2></div>
                <div class="video__player"><iframe class="video__iframe"></iframe></div>
            </section>
        `);

    const iframe = this.element.querySelector(
      ".video__iframe"
    )! as HTMLIFrameElement;

    iframe.src = this.convertToEmbeddedURL(url);

    const titleElement = this.element.querySelector(
      ".video__title"
    )! as HTMLHeadingElement;
    titleElement.innerHTML = `<i class="ai-video title__icons" id="video_icon"></i> ${title}`;
  }

  private convertToEmbeddedURL(url: string): string {
    //regex
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
