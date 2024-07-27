import { injectable } from "inversify";
import { WebDriver } from "selenium-webdriver";
import { container } from "../di/inversify.config";
import { Driver } from "../driver/driver";
import { LoginPageLocator } from "../locator/loginPageLocator";
import { DriverUtil } from "../util/driverUtil";

@injectable()
export class LoginPage {
  private driver: WebDriver;

  constructor() {
    this.driver = container.get<Driver>(Driver).getDriver();
  }

  public async setUsername(username: string): Promise<void> {
    try {
      const usernameField = await DriverUtil.waitUntilElementLocated(
        LoginPageLocator.usernameField,
        5000
      );

      await usernameField.clear();
      await usernameField.sendKeys(username);
      await DriverUtil.screenshoot();
    } catch (e) {
      await DriverUtil.screenshoot();
      throw new Error("Object usernameField Tidak Ditemukan");
    }
  }

  public async setPassword(password: string): Promise<void> {
    try {
      const passwordField = await DriverUtil.waitUntilElementLocated(
        LoginPageLocator.passwordField,
        5000
      );

      await passwordField.clear();
      await passwordField.sendKeys(password);
      await DriverUtil.screenshoot();
    } catch (e) {
      await DriverUtil.screenshoot();
      throw new Error("Object passwordField Tidak Ditemukan");
    }
  }

  public async clickSubmit(): Promise<void> {
    try {
      const submitButton = await DriverUtil.waitUntilElementLocated(
        LoginPageLocator.submitButton,
        5000
      );

      await submitButton.click();
      await DriverUtil.screenshoot();
    } catch (e) {
      await DriverUtil.screenshoot();
      throw new Error("Object submitButton Tidak Ditemukan");
    }
  }

  public async checkErrorLoginIsExist(): Promise<boolean> {
    try {
      const errorElement = await DriverUtil.waitUntilElementLocated(
        LoginPageLocator.errorAlertElement,
        5000
      );

      await DriverUtil.delay(3000);
      await DriverUtil.scrollToElement(errorElement);
      return errorElement.isDisplayed();
    } catch (e) {
      await DriverUtil.screenshoot();
      throw new Error("Object errorElement Tidak Ditemukan");
    }
  }
}
