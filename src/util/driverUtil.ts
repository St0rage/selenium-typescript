import { By, until, WebElement } from "selenium-webdriver";
import { container } from "../di/inversify.config";
import { Driver } from "../driver/driver";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export class DriverUtil {
  //   private static driver = container.get<Driver>(Driver).getDriver();

  static async waitUntilElementLocated(
    locator: By,
    ms: number
  ): Promise<WebElement> {
    const driver = container.get<Driver>(Driver).getDriver();
    return driver.wait(until.elementLocated(locator), ms);
  }

  static async screenshoot(): Promise<void> {
    const driver = container.get<Driver>(Driver).getDriver();
    const binaryScreenshoot = await driver.takeScreenshot();
    const filePath = path.join(
      __dirname,
      "..",
      "image",
      `${uuidv4().replace(/-/g, "")}.png`
    );
    fs.writeFileSync(filePath, binaryScreenshoot, "base64");
  }

  static async scrollToElement(element: WebElement): Promise<void> {
    const driver = container.get<Driver>(Driver).getDriver();

    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
  }

  static async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
