describe("Workspace", () => {
  it("Creating Workspace", () => {
    cy.visit("http://localhost:8080/workspace");
    cy.get('[data-cy="add_workspace"]').click();
    cy.get("[data-cy=save_workspace_name]").type("Example name{enter}");
    cy.get("tbody > tr > :nth-child(1)").should("contain", "Example name");
  });
});
