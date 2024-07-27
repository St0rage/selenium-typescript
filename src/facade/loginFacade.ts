import { injectable } from "inversify";
import { container } from "../di/inversify.config";
import { HomePage } from "../page/homePage";
import { LoginPage } from "../page/loginPage";
import expect from "expect.js";
import { DriverUtil } from "../util/driverUtil";

@injectable()
export class LoginFacade {
  private loginPage: LoginPage;
  private homePage: HomePage;

  constructor() {
    this.loginPage = container.get<LoginPage>(LoginPage);
    this.homePage = container.get<HomePage>(HomePage);
  }

  public async login(username: string, password: string): Promise<void> {
    await this.loginPage.setUsername(username);
    await this.loginPage.setPassword(password);
    await this.loginPage.clickSubmit();

    const isLogoutButtonExist = await this.homePage.checkLogoutButtonIsExist();

    try {
      expect(isLogoutButtonExist).to.be(true);
      await DriverUtil.screenshoot();
    } catch {
      await DriverUtil.screenshoot();
      throw new Error(
        `Expected : Memastikan terdapat logout button \n Actual : Tidak terdapat logout button`
      );
    }
  }

  public async invalidLogin(username: string, password: string): Promise<void> {
    await this.loginPage.setUsername(username);
    await this.loginPage.setPassword(password);
    await this.loginPage.clickSubmit();

    const isErrorAlertExist = await this.loginPage.checkErrorLoginIsExist();

    try {
      expect(isErrorAlertExist).to.be(true);
      await DriverUtil.screenshoot();
    } catch {
      await DriverUtil.screenshoot();
      throw new Error(
        `Expected : Memastikan terdapat error alert \n Actual : Tidak terdapat error alert`
      );
    }
  }
}
