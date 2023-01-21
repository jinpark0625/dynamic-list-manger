import { BaseComponet, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

// DarkPageItemComponent

export class PageItemComponent
  extends BaseComponet<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(
      `
      <li class="page-item" draggable="true">
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
      this.closeListener && this.closeListener();
    };

    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });
    this.element.addEventListener("dragenter", (e: DragEvent) => {
      this.onDragEnter(e);
    });
    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
    this.element.classList.add("lifted");
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
    this.element.classList.remove("lifted");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
    this.element.classList.add("drop-area");
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
    this.element.classList.remove("drop-area");
  }
  onDropped() {
    console.log(this.element);
    this.element.classList.remove("drop-area");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }
  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}

export class PageComponent
  extends BaseComponet<HTMLUListElement>
  implements Composable
{
  // Map 은 중복된 데이터가질수맀지만, Set은 중복된 데이터 x
  private children = new Set<SectionContainer>();
  private dragTarget?: SectionContainer;
  private dropTarget?: SectionContainer;

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');

    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.onDrop(e);
    });
  }

  onDragOver(event: DragEvent) {
    //prevent additional event
    event.preventDefault();
  }
  onDrop(event: DragEvent) {
    //prevent additional event
    event.preventDefault();
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(
        this.dragTarget,
        dropY < srcElement.y ? "beforebegin" : "afterend"
      );
    }
    this.dropTarget.onDropped();
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        switch (state) {
          case "start":
            this.dragTarget = target;
            this.updateSections("mute");
            break;
          case "stop":
            this.dragTarget = undefined;
            this.updateSections("unmute");
            break;
          case "enter":
            this.dropTarget = target;
            break;
          case "leave":
            this.dropTarget = undefined;
            break;
          default:
            throw new Error(`unsupported state: ${state}`);
        }
      }
    );
  }

  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
