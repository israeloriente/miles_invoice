import { ParseObject } from "./api.main";

export class Workspace extends ParseObject {
  className = "Workspace";
  constructor() {
    super();
    this.name = "";
  }
}
