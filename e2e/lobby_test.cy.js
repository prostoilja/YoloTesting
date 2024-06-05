/// <reference types="cypress" />
import "cypress-iframe";

describe("Ensure that all components in menu-component front-page presented", () => {
  it("should click Desktop Lobby and interact with front-end components", () => {
    cy.visit("https://bombaylobby.com/");

    // Click the "Desktop Lobby" button
    cy.get("a.btn-link").contains("Desktop Lobby").click();

    cy.origin("https://demo.bombay.live", () => {
      cy.location("href", { timeout: 20000 }).should(
        "include",
        "/operator/bombaydemo/bombay-live-lobby/fun"
      );
      cy.get("iframe").then(($iframe) => {
        const iframeBody = $iframe.contents().find("body");
        cy.wrap(iframeBody).as("iframeBody");

        cy.get("@iframeBody").should("exist");
        cy.wait(2000);
        cy.get("@iframeBody")
          //ensure that all components presented
          .find(".menu-component.front-page .category-home")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .category-highrollers")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .menu-item.button-icon.baccarat")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .menu-item.button-icon.roulette")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .menu-item.button-icon.gameshows")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .menu-item.button-icon.dragonTiger")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .menu-item.button-icon.indianGames")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .menu-item.button-icon.poker")
          .should("exist");
        cy.get("@iframeBody")
          .find(".menu-component.front-page .menu-item.button-icon.favourites")
          .should("exist");
      });
    });
  });
});
