Cypress.Commands.add("MockRequests", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "/api/auth",
    response: {
      _id: "5e7bf0e5c15c023ef50cc75b",
      name: "Sample User",
      email: "sample@gmail.com",
      date: "2020-03-26T00:01:41.095Z",
      __v: 0
    },
    status: 200
  });
  //cy.server();
  cy.fixture("contacts").as("contacts");
  cy.route({
    method: "GET",
    url: "/api/contacts",
    response: "@contacts",
    status: 200
  });
});

Cypress.Commands.add("LogInWithJWT", () => {
  //   cy.request("POST", "http://localhost:3000/api/auth", {
  //     email: Cypress.env("email"),
  //     password: Cypress.env("password")
  //   })
  //     .its("body.token")
  //     .should("exist")
  //     .then((token) => {
  //       window.localStorage.setItem("jwt", token);
  //     });
  window.localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU3YmYwZTVjMTVjMDIzZWY1MGNjNzViIn0sImlhdCI6MTU4NTE4MjU5NiwiZXhwIjoxNTg1NTQyNTk2fQ.rIdROIxDeE2Hhf0l0Nq3_KmiawUdbeNvqs_myuGct_g"
  );
  cy.visit("/");
});
