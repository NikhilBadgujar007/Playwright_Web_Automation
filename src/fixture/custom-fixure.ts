import * as base from "@playwright/test";
import { SignInPage } from "../pages/signInPage/signIn-page"
import { DashboardPage } from "../pages/dashboardPage/dashboard-page"

type Fixtures = {
  pages: {
    signInPage: SignInPage;
    dashboardPage : DashboardPage
  };
};
const test = base.test.extend<Fixtures>({
  pages: async ({ page }, use) => {
    const pages = {
      signInPage: new SignInPage(page),
      dashboardPage : new DashboardPage(page)
    };
    await use(pages);
  },
});

export default test;
