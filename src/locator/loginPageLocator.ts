import { By } from "selenium-webdriver";

export class LoginPageLocator {
  public static usernameField = By.id("username");
  public static passwordField = By.id("password");
  public static submitButton = By.id("submit");
  public static errorAlertElement = By.id("error");
}
