import { injectable } from "inversify";
import { WebDriver } from "selenium-webdriver";
import { container } from "../di/inversify.config";
import { Driver } from "../driver/driver";
import { HomePageLocator } from "../locator/homePageLocator";
import { DriverUtil } from "../util/driverUtil";

@injectable()
export class HomePage {
  private driver: WebDriver;

  constructor() {
    this.driver = container.get<Driver>(Driver).getDriver();
  }

  public async getSuccessLoginAlert(): Promise<boolean> {
    try {
      const successLoginElement = await DriverUtil.waitUntilElementLocated(
        HomePageLocator.successLoginElement,
        5000
      );
      const alertMessage = await successLoginElement.getText();
      return alertMessage.includes("Congratulations");
    } catch (e) {
      await DriverUtil.screenshoot();
      throw new Error("Object successLoginElement Tidak Ditemukan");
    }
  }

  public async checkLogoutButtonIsExist(): Promise<Boolean> {
    try {
      const logoutButtonElement = await DriverUtil.waitUntilElementLocated(
        HomePageLocator.logoutButton,
        5000
      );

      return logoutButtonElement.isDisplayed();
    } catch (e) {
      await DriverUtil.screenshoot();
      throw new Error("Object logoutButton Tidak Ditemukan");
    }
  }
}
