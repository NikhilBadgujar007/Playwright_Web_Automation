require('dotenv').config();
import { expect,Locator,Page } from "@playwright/test";


export class DashboardPage {
  waitForLoadState() {
      throw new Error("Method not implemented.");
  }
  readonly page: Page;
  readonly innitLogo : Locator 
  readonly dashboard : Locator
  readonly planName : Locator
  readonly leftSidebarLogo : Locator
  readonly radioButton : Locator
  readonly logoutButton : Locator
  readonly planprice : Locator
  readonly nextBillingAmount : Locator
  readonly nextBillingDate : Locator
  readonly planBenefits : Locator 
  readonly paymentHistory : Locator
  readonly settings : Locator
  readonly dashboardMenu : Locator
  readonly membersMenu : Locator
  readonly paymentsMenu : Locator
  readonly financingMenu : Locator

  constructor(page:Page) {
    this.page = page;
    this.innitLogo = page.locator("//img[@alt='LOGO']")
    this.dashboard = page.getByRole('heading', { name: 'Dashboard' }).locator('span')
    //page.locator("//h6[@class='MuiTypography-root MuiTypography-h6 css-szh2o-MuiTypography-root']//span")
    this.leftSidebarLogo = page.getByAltText('boomcloud lightning img')
    this.radioButton = page.getByTestId('CircleIcon');
    this.logoutButton = page.getByRole('button', { name: 'Logout' })
    this.planprice = page.getByRole('heading', { name: 'Plan Price' })
    this.nextBillingAmount =  page.getByRole('heading', { name: 'Next Billing Amount' })
    this.nextBillingDate =  page.getByRole('heading', { name: 'Next Billing Date' })
    this.planBenefits = page.getByRole('heading', { name: 'Plan Benefits' })
    this.paymentHistory = page.getByRole('heading', { name: 'Payment History' })
    this.settings =  page.getByLabel('Settings')

    this.dashboardMenu =  page.getByRole('button', { name: 'Dashboard' })
    this.membersMenu = page.getByRole('button', { name: 'Members' })
    this.paymentsMenu = page.getByRole('button', { name: 'Payments' })
    this.financingMenu =  page.getByRole('button', { name: 'Financing' })
  
  }

  async gotoSignInPage() {
    await this.page.goto(String(process.env.url));
    await this.page.waitForLoadState();
  }

  async clickOnLeftSideBarRadioButton() {
    await this.leftSidebarLogo.hover()
    await this.radioButton.click()
    await this.page.waitForLoadState();
  }


  async logout() {
    await this.logoutButton.click();
    await this.page.waitForLoadState();
  }
}

