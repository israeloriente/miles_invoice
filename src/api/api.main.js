const Parse = require("parse");

export function initParse() {
  Parse.serverURL = "https://parseapi.back4app.com";
  Parse.initialize(
    "P7qd36WYGLBMXYmDKtxbFiutCf6M6vyOwr0i0Bey", // This is your Application ID
    "cjbmc5ia32G7xgSGYS4nf3bLdysp7MCKurVfouFN", // This is your Javascript key
    "🤫" // This is your Master key (never use it in the frontend)
  );
  console.log("Successfully connected to Parse");
}

export class ParseObject {
  className = undefined;

  async getObjects() {
    const Collaborator = Parse.Object.extend(this.className);
    const query = new Parse.Query(Collaborator);
    return await query.find();
  }
}
