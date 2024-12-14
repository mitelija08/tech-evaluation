import {test, expect} from '@playwright/test'
import {LoginPage} from '../page-objects/loginPage'
import testData from '../test-data/testData.json'

test.describe('Data-Driven Tests', () => {

    test.beforeEach('Login to Demo App', async ({page}) => {
        const login = new LoginPage(page)
        // Open Login page and enter credentials
        await login.open()
        await login.enterCredentialsAndClickSignIn(process.env.USERNAME as string, process.env.PASSWORD as string)
        // Validate user logged in succesfully
        await expect(page.locator(':text-is("Projects")')).toBeVisible()
    })

    testData.forEach(({id, application, column, task, tags}) => {
        
        test(`Test Case ${id}: Validate task '${task}' and tags in '${application}' at '${column}' column`, async ({page}) => {
            const projectLocator = page.locator('button', {hasText: application})
            const pageHeader = page.locator('h1', {hasText: application})
            
            // Navigate to Project
            await projectLocator.click()
            await expect(pageHeader).toBeVisible()

            // Verify the task is in the expected column
            const columnLocator = page.locator('h2', {hasText: column}).locator('..');
            const taskLocator = columnLocator.locator('h3', {hasText: task})
            await expect(taskLocator).toBeVisible();

            // Verify tags associated with the task
            for (const tag of tags) {
                const tagLocator = taskLocator.locator('..').locator('span.px-2', {hasText: tag})
                await expect(tagLocator).toBeVisible();
            }
        })
    })
})
