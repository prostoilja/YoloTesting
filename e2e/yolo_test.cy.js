// <reference types="cypress" />
//as during the test URL remain the same I can not add assertions based on URL, maybe coders could help with unique elements
import "cypress-iframe";

describe("Navigate and Interact with Bombay Live", () => {
  it("should click Desktop Lobby and interact with iframe", () => {
    cy.visit("https://bombaylobby.com/");

    cy.get("a.btn-link").contains("Desktop Lobby").click();

    cy.origin("https://demo.bombay.live", () => {
      cy.location("href", { timeout: 20000 }).should(
        "include",
        "/operator/bombaydemo/bombay-live-lobby/fun"
      );
      cy.get("iframe").then(($iframe) => {
        const iframeBody = $iframe.contents().find("body");
        cy.wrap(iframeBody).as("iframeBody");
        cy.get("@iframeBody")
          .find('button:contains("Join table")', { timeout: 10000 })
          .should("be.visible")
          .as("joinTableButton");
        cy.get("@joinTableButton").first().click({ force: true });

        // return to lobby page
        cy.get("iframe").then(($iframe) => {
          const iframeBody = $iframe.contents().find("body");
          cy.wrap(iframeBody).as("iframeBody");
          cy.get("@iframeBody")
            .find('button[data-test-id="button-click-back-to-lobby"]', {
              timeout: 10000,
            })
            .should("be.visible")
            .click({ force: true });
          cy.wait(10000);

          // Click on the home button
          cy.get("@iframeBody")
            .find("span.menu-item.button-icon.home", { timeout: 10000 })
            .should("be.visible")
            .click({ force: true });
          cy.wait(10000);
        });
      });
    });
  });
});
