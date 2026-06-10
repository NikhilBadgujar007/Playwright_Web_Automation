import test from "../src/fixture/custom-fixure";
import { expect } from "@playwright/test";
import { TimeoutConfig } from "../src/utils/TimeoutConfig";
require('dotenv').config(); 

test.describe("Sign-In Page Tests", () => {
  const timeout = TimeoutConfig.getTimeout();

  test.beforeEach(async ({ pages }) => {
    await pages.signInPage.gotoSignInPage();
  });

  test("Verify elements present on the login page", async ({
    pages,
  }) => {
    const { signInPage } = pages;
    await expect(signInPage.page).toHaveURL("https://staged.boomcloud.com/member/login/DFD0C1CB-A726-47DB-8AD0-92DE97DACB2A");
   // await expect(signInPage.innitLogo).toBeVisible({timeout});
    await signInPage.signIn(String(process.env.USERNAME),String(process.env.PASSWORD));
    await signInPage.page.waitForTimeout(1000000);
    await expect(signInPage.viewAgreementButton).not.toBeVisible({ timeout});
  });


  test("Verify signin with incorrect credentials", async ({ pages }) => {
    const { signInPage } = pages;
    await signInPage.signInWithInvalidCredentials(String(process.env.inavlidusername),String(process.env.inavlidpassword));
    await expect(signInPage.invalidLoginMessage).toBeVisible();
  });


  
  test("Verify signin with correct credentials", async ({
    pages,
  }) => {
    const { signInPage } = pages;
    await expect(signInPage.page).toHaveURL("https://membership.boomclouddev.com/member/login/E92E921C-DBB1-4258-8CB4-DA6460CE6456");
    // await expect(signInPage.innitLogo).toBeVisible({timeout});
    // await expect(signInPage.usernameInput).toBeVisible({timeout});
    // await expect(signInPage.passwordInput).toBeVisible({timeout});
    await expect(signInPage.signInButton).toBeVisible({timeout});
    await signInPage.signIn(String(process.env.username),String(process.env.password));
    await expect(signInPage.signInButton).not.toBeVisible({ timeout});
    // await expect(pages.signInPage.dashboard).toBeVisible({timeout})
    
  });

});
