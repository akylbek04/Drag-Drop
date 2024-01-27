export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  template: HTMLTemplateElement;
  host: T;
  element: U;
  constructor(
    templateId: string,
    hostId: string,
    insertAtStart: boolean,
    newElementId?: string | undefined
  ) {
    this.template = document.getElementById(templateId)! as HTMLTemplateElement;
    this.host = document.getElementById(hostId)! as T;
    // this.assignedProjects = [];

    const importedNode = document.importNode(this.template.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.host.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
