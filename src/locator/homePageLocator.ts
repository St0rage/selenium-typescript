import { By } from "selenium-webdriver";

export class HomePageLocator {
  public static successLoginElement = By.className("post-title");
  public static logoutButton = By.linkText("Log out");
}
