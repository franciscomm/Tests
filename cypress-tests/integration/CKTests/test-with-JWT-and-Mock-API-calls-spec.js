describe("Filter cards for names/emails that partially match the search criteria", function() {
  before(function() {
    cy.MockRequests();
    cy.LogInWithJWT();
  });

  it("Filter contacts by partially typing the name attribute", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("sam");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(2);
    });
  });
  it("Filter contacts by partially typing the email attribute", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("uni");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
  });

  it("Filter contacts that share the same characters in name attribute", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("sam");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(2);
    });
    cy.get("@contacts")
      .children(".text-primary")
      .should("contain", "Sam");
  });

  it("Filter contacts that share the same characters in email attribute", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("fake");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(2);
    });
    cy.get("ul.List")
      .children("li")
      .should("contain", "fake");
  });

  it("Filter contacts with an upper-case name given upper-case text to type", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("UPPER");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".card > .text-primary").should("contain", "UPPER");
  });

  it("Filter contacts with an upper-case email given upper-case text to type", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("LETTER");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".List > :nth-child(1)").should("contain", "LETTER");
  });

  it("Filter contacts with an upper-case name given lower-case text to type", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("upper");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".List > :nth-child(2)").should("contain", "543-064-1359");
  });

  it("Filter contacts with an upper-case email given lower-case text to type", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("letter@gmail.com");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".List > :nth-child(2)").should("contain", "543-064-1359");
  });

  it("Filter contacts with numbers in name attribute", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("11");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".card > .text-primary").should("contain", "11Francisco");
    cy.get(".List > :nth-child(2)").should("contain", "111-111-1111");
  });

  it("Filter contacts with symbols in name attribute", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("~`|!@#$%^&*(){}_+/");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".card > .text-primary").should("contain", "~`|!@#$%^&*(){}_+/");
    cy.get(".List > :nth-child(2)").should("contain", "444-555-8888");
  });

  it("Filter contacts with numbers in email attribute", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("123456789");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".List > :nth-child(1)").should("contain", "123456789");
  });

  it("Filter contacts whose name attribute has front spaces by typing those spaces", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("        name");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".List > :nth-child(2)").should("contain", "576-821-4367");
  });

  it("Filter contacts whose name attribute has front spaces without typing those spaces", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("Name with");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contacts");
    cy.get("@contacts").should(($contacts) => {
      expect($contacts.length).to.equal(1);
    });
    cy.get(".card > .text-primary").should("contain", "Name with");
    cy.get(".List > :nth-child(2)").should("contain", "576-821-4367");
  });
});

describe("Update results on keypress", function() {
  before(function() {
    cy.MockRequests();
    cy.LogInWithJWT();
  });
  it("Update and display contact cards on every key-press", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("s");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(7);
      });
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("sa");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(2);
      });
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("sam");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(2);
      });
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("sama");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(1);
      });
  });
});

describe("Filter contacts and display zero cards if there are no matches", function() {
  before(function() {
    cy.MockRequests();
    cy.LogInWithJWT();
  });
  it("Should not display any card with email as input", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("zzz@gmail.com");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(0);
      });
  });

  it("Should not display any card with numbers as input", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("555");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(0);
      });
  });

  it("Should not display any card with symbols as input", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("++");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(0);
      });
  });

  it("Should not display any card with letters as input", function() {
    cy.get(":nth-child(2) > form > input")
      .clear()
      .type("Eric");
    cy.get(".grid-2 > :nth-child(2) > :nth-child(2)")
      .children()
      .as("contactsList")
      .should(($contactList) => {
        expect($contactList.length).to.equal(0);
      });
  });
});
