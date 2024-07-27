import "reflect-metadata";
import { WebDriver } from "selenium-webdriver";
import { container } from "../di/inversify.config";
import { Driver } from "../driver/driver";
import { LoginFacade } from "../facade/loginFacade";
import { LoginPage } from "../page/loginPage";

describe("Test Suite For Login", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = container.get<Driver>(Driver).getDriver();
  });

  afterEach(async () => {
    console.info("CALL REPORT SAVE");
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("should can login with correct user", async () => {
    const loginFacade = container.get<LoginFacade>(LoginFacade);

    await driver.get("https://practicetestautomation.com/practice-test-login/");

    await loginFacade.login("student", "Password123");
  }, 35000);

  it("should error login with invalid password", async () => {
    const loginFacade = container.get<LoginFacade>(LoginFacade);

    await driver.get("https://practicetestautomation.com/practice-test-login/");

    await loginFacade.invalidLogin("student", "123");
  }, 35000);

  it("should error login with invalid username", async () => {
    const loginFacade = container.get<LoginFacade>(LoginFacade);

    await driver.get("https://practicetestautomation.com/practice-test-login/");

    await loginFacade.invalidLogin("asdasd", "Password123");
  }, 35000);
});
