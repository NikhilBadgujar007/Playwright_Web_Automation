require('dotenv').config(); // Load environment variables at the top
import { expect,Locator,Page } from "@playwright/test";


export class SignInPage {
  readonly page: Page;
  readonly usernameInput: Locator
  readonly passwordInput : Locator
  readonly signInButton : Locator
  readonly viewAgreementButton : Locator
  readonly innitLogo : Locator 
  readonly dashboard : Locator
  readonly planName : Locator
  readonly forgotPasswordLink : Locator
  readonly leftSidebarLogo : Locator
  readonly radioButton : Locator
  readonly logoutButton : Locator
  readonly  invalidLoginMessage : Locator

  constructor(page:Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password")
    this.signInButton = page.getByRole('button', { name: 'Login' });
  



    this.innitLogo = page.locator("//img[@alt='LOGO']");
    this.dashboard = page.getByRole('heading', { name: 'Dashboard' });
    this.forgotPasswordLink = page.locator("//a[text()='Forgot password?']")
    this.leftSidebarLogo = page.getByRole('img', { name: 'Logo' })
    this.radioButton = page.getByTestId('CircleIcon');
    this.logoutButton = page.getByRole('button', { name: 'Logout' })
    this.invalidLoginMessage = page.getByText('Failed to sign in!')
  
}

  async gotoSignInPage() {
    await this.page.goto(String(process.env.URL));
    await this.page.waitForLoadState();
  }

  async signIn(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState();
  }

  async signInWithInvalidCredentials(inavlidusername,invalidpassword) {
    await this.usernameInput.fill(inavlidusername);
    await this.passwordInput.fill(invalidpassword);
    await this.signInButton.click();
    await this.page.waitForLoadState();
    
  }

  async logout() {
    //await this.userMenuButton.click();
    await this.logoutButton.click();
  }
}
