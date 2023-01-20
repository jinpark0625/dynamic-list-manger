import { BaseComponet, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  SetOnCloseListener(listener: OnCloseListener): void;
}

type SectionContainerConstructor = {
  // new라는 키워드를 이용해서 만들면 SectionContainer 라는 오브젝트를 만들 수 있는,
  // 생성할 수 있는 클래스 타입! 자체를 정의 하는것
  new (): SectionContainer;
};

// DarkPageItemComponent

export class PageItemComponent
  extends BaseComponet<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  constructor() {
    super(
      `
      <li class="page-item">
        <section class="page-item__body">
          <div class="page-item__controls">
            <button class="close">&times;</button>
          </div>
        </section>
      </li>
      `
    );

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      console.log(this.closeListener);
      this.closeListener && this.closeListener();
    };
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
  SetOnCloseListener(listener: OnCloseListener) {
    console.log(listener); //() => {item.removeFrom(this.element);}
    this.closeListener = listener;
  }
}

export class PageComponent
  extends BaseComponet<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    console.log(this.element); //ul.page
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.SetOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
