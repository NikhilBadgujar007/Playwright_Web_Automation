import test from "../src/fixture/custom-fixure";
import { expect } from "@playwright/test";
import { TimeoutConfig } from "../src/utils/TimeoutConfig";
require('dotenv').config();

test.describe("Dashboard Page Tests", () => {
  const timeout = TimeoutConfig.getTimeout();
  const dashboardTimeout = TimeoutConfig.timeoutForDashboard();

  test.beforeEach(async ({ pages }) => {
    await pages.signInPage.gotoSignInPage();
    //await expect(pages.signInPage.page).toHaveURL("https://membership.boomclouddev.com/member");
    await expect(pages.signInPage.page).toHaveURL("https://staged.boomcloud.com/member/login/DFD0C1CB-A726-47DB-8AD0-92DE97DACB2A");
    await pages.signInPage.signIn(String(process.env.USERNAME), String(process.env.PASSWORD));
    // await expect(pages.signInPage.innitLogo).toBeVisible({timeout});
    // await expect(pages.signInPage.signInButton).toBeVisible({timeout});
    // await expect(pages.signInPage.forgotPasswordLink).toBeVisible({ timeout});
    // await expect(pages.signInPage.usernameInput).toBeVisible({timeout});
    // await expect(pages.signInPage.passwordInput).toBeVisible({timeout});
    await pages.signInPage.signIn(String(process.env.username), String(process.env.password));
    //await pages.signInPage.signIn(String(process.env.username),String(process.env.password));
  });
  //await dashboardPage.waitForLoadState();


  test.only("Verify elements present on the Dashboard Page", async ({
    pages,
  }) => {
    const { dashboardPage } = pages;

    // await expect(pages.signInPage.signInButton).not.toBeVisible();
    await expect(pages.dashboardPage.dashboard).toBeVisible();
    await expect(pages.dashboardPage.viewAgreementButton).toBeVisible();

    await pages.dashboardPage.clickOnDashboardAgreementButton();
    await expect(pages.dashboardPage.viewAgreementButton).not.toBeVisible();

    // await pages.dashboardPage.clickOnDashboardAgreementButton();
    // await expect(pages.dashboardPage.agreementUnavailablePopup).toBeVisible();
    await expect(pages.dashboardPage.agreementUnavailablePopup).toHaveText('The agreement is currently unavailable. Please try again later.');

  });
  //await dashboardPage.waitForLoadState();



  test("Verify the url of the dashboard page", async ({
    pages,
  }) => {
    const { dashboardPage } = pages;

    await expect(dashboardPage.dashboard).toBeVisible({ timeout })
    await expect(dashboardPage.page).toHaveURL("https://membership.boomclouddev.com/member/dashboard?page=1&bpage=1");
  });
  //await dashboardPage.waitForLoadState();


  test("Verify the sections on the dashboard page", async ({
    pages,
  }) => {
    const { dashboardPage } = pages;

    await expect(dashboardPage.page).toHaveURL("https://membership.boomclouddev.com/member/dashboard?page=1&bpage=1");
    await expect(dashboardPage.dashboard).toBeVisible({ timeout })
    await dashboardPage.clickOnLeftSideBarRadioButton()
    await expect(dashboardPage.planprice).toBeVisible({ timeout })
    await expect(dashboardPage.nextBillingAmount).toBeVisible({ timeout })
    await expect(dashboardPage.nextBillingDate).toBeVisible({ timeout })
    await expect(dashboardPage.planBenefits).toBeVisible({ timeout })
    await expect(dashboardPage.paymentHistory).toBeVisible({ timeout })

  });

  test("Verify the logout functionality of the member poratl", async ({
    pages,
  }) => {
    const { dashboardPage } = pages;
    //await dashboardPage.waitForLoadState();
    await expect(dashboardPage.page).toHaveURL("https://membership.boomclouddev.com/member/dashboard?page=1&bpage=1");
    await expect(dashboardPage.dashboard).toBeVisible({ timeout })
    await dashboardPage.clickOnLeftSideBarRadioButton()
    await expect(dashboardPage.planprice).toBeVisible({ timeout })
    await expect(dashboardPage.nextBillingAmount).toBeVisible({ timeout })
    await expect(dashboardPage.nextBillingDate).toBeVisible({ timeout })
    await expect(dashboardPage.planBenefits).toBeVisible({ timeout })
    await expect(dashboardPage.paymentHistory).toBeVisible({ timeout })
    await dashboardPage.logout()
    await expect(pages.signInPage.dashboard).not.toBeVisible({ timeout })
    await expect(pages.signInPage.page).toHaveURL("https://membership.boomclouddev.com/member/login/14716");
    await expect(pages.signInPage.innitLogo).toBeVisible({ timeout });

  });


});
