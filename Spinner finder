import { browser, ElementFinder, element, by, ExpectedConditions, ElementArrayFinder, protractor } from "protractor";
import { BasePage } from '../base.po';

export class AccountsPage extends BasePage {

    readonly accountIcon: ElementFinder = element(by.xpath(`//li[a[@class='navSidebarLinkDisplay' and span[text()='Account']]]`));
    readonly accountSearchIcon: ElementFinder = element(by.xpath(`//a[span[text()='Account Search']]`));
    readonly accountsImage: ElementFinder = element(by.xpath("//span[text()='Account']//parent::a//i"));
    readonly account: ElementFinder = element(by.xpath("//span[text()='Account']//parent::a"));
    readonly accountSearch: ElementFinder = element(by.xpath("//span[text()='Account Search']//parent::a"));
    readonly accountSearchInputField: ElementFinder = element(by.xpath("//div[@class='form-group']/input"));
    readonly spinnerLoadingXpath: ElementFinder = element(by.xpath("//jbh-spinner[//div[contains(@class, 'spinner') and @style='display: none;']]"));
    readonly processingServiceRequestsXpath: ElementFinder = element(by.xpath("//*[@id='spinnerText' and (text()='Processing Service Requests ...') and not(@style='display: none;')]"));
    readonly divisionDropdown: ElementFinder = element(by.xpath("//*[@placeholder='Division']/div"));
    readonly navigationIcon: ElementFinder = element(by.xpath(`//div[span[@id='nav-sidebar-control']]`));
    readonly locationIcon: ElementFinder = element(by.xpath(`//li[a[@class='navSidebarLinkDisplay' and span[text()='Location']]]`));
    readonly locationSearch: ElementFinder = element(by.xpath(`//a[span[text()='Location Search']]`));
    readonly childNavSideBarOpenState = element(by.xpath(`//ul[@class='nav nav-sidebar-child open']`));
    readonly navSideBarOpenState = element(by.xpath(`//div[@class='sidebar open']`));

    async waitForActionToCompleteTT() {
        let spinnerImage = element(by.xpath("//div[@id='spinnerText']"))
        return await browser.wait(async () => {
            let style: string = await spinnerImage.getAttribute('style');
            return style === "display: none;";
        }, 30000);
    }

    public async clickAccountsImage() {
        await this.actions.waitUntilElementClickable(this.accountsImage, "");
        await this.actions.click(this.accountsImage, "Click on " + this.accountsImage + " ");
        await this.waitForActionToCompleteTT();
    }

    public async clickAccount() {
        await this.actions.waitUntilElementClickable(this.account, "");
        await this.actions.click(this.account, "Click on " + this.account + " ");
        await this.waitForActionToCompleteTT();
    }

    public async clickAccountSearch() {
        await this.actions.waitUntilElementClickable(this.accountSearch, "");
        await this.actions.click(this.accountSearch, "Click on " + this.accountSearch + " ");
        await this.waitForActionToCompleteTT();
    }

    public async setAccountSearchField(value, text) {
        await this.actions.setText(this.accountSearchInputField, value, "");
        await this.actions.click(element(by.xpath("//li[contains(text(),'" + text + "')]")), "");
        await this.actions.click(element(by.xpath("//span[contains(text(),'" + value + "')]")), "")
    }

    public async setText(textToEnter: string) {
        await this.actions.clearText(this.accountSearchInputField, '')
        await this.actions.setText(this.accountSearchInputField, textToEnter, "Enter " + textToEnter + " to " + this.accountSearchInputField + " ");
        await this.waitForActionToCompleteTT();
    }

    public async clickOnAccountName(accountName: string) {
        let accountNameXpath: ElementFinder = element(by.xpath("//span[contains(.,'" + accountName + "')]"));
        await this.actions.waitUntilElementPresenceOf(accountNameXpath)
        await this.actions.click(accountNameXpath, "");
        await this.actions.waitUntilElementPresenceOf(await element(by.tagName('app-account-profile-info')))
    };

    public async clickOnLinkUnderAccountInformation(linkName: string) {
        let linkXpath: ElementFinder = element(by.xpath("//app-account-profile-info//div//a[contains(.,'" + linkName + "')]"));
        await this.actions.click(linkXpath, "");
        await this.actions.waitUntilElementInVisible(this.processingServiceRequestsXpath, '')
    };

    public async clickOnPopulatedSearchList(searchText: string) {
        let listXpath: ElementFinder = element(by.xpath(`//div/ul[not(@hidden) and @class='typeahead-suggestions']/li[1]/strong[1]['` + searchText + `']`))//"//li[.//text()='" + searchText + "']"));
        await this.actions.shortWait('')
        if (await listXpath.isPresent() == false) {
            await this.actions.clearText(this.accountSearchInputField, "clear text");
            await this.actions.setText(this.accountSearchInputField, searchText, "set text");
            await this.actions.shortWait('')
        }
        await this.actions.waitUntilElementPresenceOf(listXpath, '');
        await this.actions.click(listXpath, "");
        if (await this.processingServiceRequestsXpath.isPresent()) {
            await this.actions.waitUntilElementInVisible(this.processingServiceRequestsXpath, '')
        }
    };

    public async waitForProcessing() {
        let spinnerXpath: ElementFinder = element(by.xpath("//div[contains(@class, 'spinner') and not(@style='display: none;')]"));

        try {
            if (await spinnerXpath.isPresent()) {
                await this.actions.waitUntilElementPresenceOf(this.spinnerLoadingXpath)
            }
            if (await this.processingServiceRequestsXpath.isPresent()) {
                await this.actions.waitUntilElementInVisible(this.processingServiceRequestsXpath, "", 35000)
            }

        } catch (error) {
            console.log(error)
        }
    };

    public async getDivisionText(headerText: string) {
        let headerLinkXpath: ElementFinder = element(by.xpath("//span[.//text()='" + headerText + "']"));
        return await this.actions.getText(headerLinkXpath, "");
    };

    public async selectHjbtJbhaFromDivisionDropDown() {
        let divisionXpath: ElementFinder = element(by.xpath("(//i[@class='caret pull-right'])[1]"));
        await this.actions.waitUntilElementVisible(divisionXpath, '');
        await this.actions.click(divisionXpath, '');
        await this.waitForProcessing();
        await browser.actions().sendKeys("HJBT JBHA").perform();
        await this.actions.sendKeysEnter("");
        await this.waitForProcessing();
    }

    public async openAccountsUrl() {
        let processingServiceRequestsXpath: ElementFinder = element(by.xpath("//*[@id='spinnerText' and (text()='Processing Service Requests ...') and @style='display: none;']"));
        let spinnerXpath: ElementFinder = element(by.xpath("//*[contains(@class, 'spinner') and @style='display: none;']"));
        let spinnerBackground: ElementFinder = element(by.xpath(`//*[@id='backdrop' and @style='display: none;']`));
        let test: ElementFinder = element(by.xpath(`//app-root[@ng-version]`));
        await this.actions.get(this.accountsUrl, "Opening  url");
        await this.loginIfRequired();
        await this.actions.waitUntilElementPresenceOf(processingServiceRequestsXpath, '')
        await this.actions.waitUntilElementPresenceOf(spinnerBackground, '')
        await this.waitForSpinner()
        await browser.wait(ExpectedConditions.urlContains(this.accountsUrl), 30000);
    }

    public async clickLocationIcon() {
        await this.actions.waitUntilElementPresenceOf(this.navigationIcon)
        await browser.executeScript("arguments[0].click()", this.navigationIcon);
        await this.actions.waitUntilElementPresenceOf(this.navSideBarOpenState)
        await browser.executeScript("arguments[0].click()", this.locationIcon);
        await this.actions.waitUntilElementPresenceOf(this.childNavSideBarOpenState)
        await browser.executeScript("arguments[0].click()", this.locationSearch);
    }

    public async clickAccountIcon() {
        await this.actions.waitUntilElementPresenceOf(this.navigationIcon)
        await browser.executeScript("arguments[0].click()", this.navigationIcon);
        await this.actions.waitUntilElementPresenceOf(this.navSideBarOpenState)
        await browser.executeScript("arguments[0].click()", this.accountIcon);
        await this.actions.waitUntilElementPresenceOf(this.childNavSideBarOpenState)
        await browser.executeScript("arguments[0].click()", this.accountSearchIcon);
    }

    public async waitForSpinner() {
        let EC = protractor.ExpectedConditions;
        let processingServiceRequestsXpath: ElementFinder = element(by.xpath("//*[@id='spinnerText' and (text()='Processing Service Requests ...') and @style='display: none;']"));
        let spinnerXpath: ElementFinder = element(by.xpath("//*[contains(@class, 'spinner') and @style='display: none;']"));
        let spinnerBackground: ElementFinder = element(by.xpath(`//*[@id='backdrop' and @style='display: none;']`));
        let unKnownSpinner: ElementFinder = element(by.xpath(`//*[contains(@class, 'spinner') and @style='display: inherit;']`));

        processingServiceRequestsXpath.isPresent().then(async (status) => {
            if (status) {
                console.log('processingServiceRequestsXpath Status: ' + status)
                try {
                    await browser.wait(EC.not(EC.presenceOf(processingServiceRequestsXpath)), 10000);
                } catch (error) {
                    console.log(error)
                }
            }
        });

        spinnerXpath.isPresent().then(async (status) => {
            if (status) {
                console.log('spinnerXpath Status: ' + status)
                try {
                    await browser.wait(EC.not(EC.presenceOf(spinnerXpath)), 10000);
                } catch (error) {
                    console.log(error)
                }
            }
        });

        spinnerBackground.isPresent().then(async (status) => {
            if (status) {
                console.log('spinnerBackground Status: ' + status)
                try {
                    await browser.wait(EC.not(EC.presenceOf(spinnerBackground)), 10000);
                } catch (error) {
                    console.log(error)
                }
            }
        });

        unKnownSpinner.isPresent().then(async (status) => {
            if (status) {
                console.log('unKnownSpinner Status: ' + status)
                try {
                    await browser.wait(EC.not(EC.presenceOf(unKnownSpinner)), 10000);
                } catch (error) {
                    console.log(error)
                }
            }
        })

    }

    public async verifyShipperRole() {
        let columnHeaderText: ElementArrayFinder = element.all(by.xpath(`//div[@class='datatable-header-cell-title ']`))
        let tabIndex: number
        await this.actions.waitUntilElementPresenceOf(columnHeaderText.get(0))
        for (let index = 0; index <= await columnHeaderText.count(); index++) {
            if (await columnHeaderText.get(index).getText() == 'Role') {
                tabIndex = index+1
                break;
            }
        }
        let shipperRoleXpath: ElementFinder = element(by.xpath(`//datatable-body-cell[${tabIndex}]`));
        
        return (await shipperRoleXpath.getText())

    }
};
