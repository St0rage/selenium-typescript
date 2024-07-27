import { Container } from "inversify";
import { Driver } from "../driver/driver";
import { LoginPage } from "../page/loginPage";
import { HomePage } from "../page/homePage";
import { LoginFacade } from "../facade/loginFacade";

export const container = new Container();

// Driver
container.bind<Driver>(Driver).toSelf().inSingletonScope();
// Page
container.bind<LoginPage>(LoginPage).toSelf().inTransientScope();
container.bind<HomePage>(HomePage).toSelf().inTransientScope();
// Facade
container.bind<LoginFacade>(LoginFacade).toSelf().inTransientScope();
