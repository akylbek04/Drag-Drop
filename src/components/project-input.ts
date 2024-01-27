import { Component } from "./base";
import { Validatable, validate } from "../utils/validation";
import { Autobind } from "../decorators/autobind";
import { state } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  title: HTMLInputElement;
  description: HTMLInputElement;
  people: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.title = this.element.querySelector("#title")! as HTMLInputElement;
    this.description = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.people = this.element.querySelector("#people")! as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInputs(): [string, string, number] | void {
    const enteredTitle = this.title.value;
    const enteredDescription = this.description.value;
    const enteredPeople = this.people.value;

    const titleValidate: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidate: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 8,
    };
    const peopleValidate: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 2,
      max: 5,
    };

    if (
      !validate(titleValidate) &&
      !validate(descriptionValidate) &&
      !validate(peopleValidate)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.title.value = "";
    this.description.value = "";
    this.people.value = "";
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInputs = this.gatherUserInputs();
    if (Array.isArray(userInputs)) {
      const [title, description, people] = userInputs;
      state.addProject(title, description, people);
      console.log(title);
      console.log(description);
      console.log(people);
      this.clearInputs();
    }
  }
}
