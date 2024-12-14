import { expect, Locator, Page } from "@playwright/test" 

export class LoginPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async open(){
        await this.page.goto('/')
    }

    async enterCredentialsAndClickSignIn(username: string, password: string){
        await this.page.fill('input#username', username);
        await this.page.fill('input#password', password);
        await this.page.locator('button[type="submit"]').click()
    }
}
