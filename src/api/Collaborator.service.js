import Parse from "parse";
import { ParseObject } from "./api.main";

export class Collaborator extends ParseObject {
  className = "Collaborator";
  constructor() {
    super();
  }

  async saveObject(item) {
    const newObject = new Parse.Object(this.className);
    newObject.set("fullName", item.full_name);
    newObject.set("age", item.age);
    newObject.set("areaWork", item.area_work);
    newObject.set("salary", item.salary);
    return await newObject.save();
  }

  async getObjectById(id) {
    const Collaborator = Parse.Object.extend(this.className);
    const query = new Parse.Query(Collaborator);
    return (await query.get(id)) || undefined;
  }

  async getWorkspacesList(collaborator) {
    let relation = collaborator.relation("workspace").query();
    return (await relation.find()) || [];
  }

  async updateWorkspaceRelation(id, workspaceId) {
    const Collaborator = Parse.Object.extend(this.className);
    const query = new Parse.Query(Collaborator);
    let res = await query.get(id);
    const relation = res.relation("workspace");
    const workspace = new Parse.Object("Workspace");
    workspace.id = workspaceId;
    relation.add(workspace);
    return await res.save();
  }

  async updateObject(item) {
    item.set("fullName", item.full_name);
    item.set("age", item.age);
    item.set("areaWork", item.area_work);
    item.set("salary", item.salary);
    return await item.save();
  }
}
