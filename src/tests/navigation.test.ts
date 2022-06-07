import { test, expect } from '@playwright/test'
import config from '../utils/config'

test.describe('Navigation test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Home test', async ({ page }) => {
    const logo = page.locator('css=[class*="Header_logo"]')
    await expect(logo).toContainText(config.appName)
    await logo.click()
    await expect(page).toHaveURL('/')
  })

  test('Login test', async ({ page }) => {
    const loginBtn = page.locator(`text=login`)
    await expect(loginBtn).toContainText('Login')
    await loginBtn.click()
    await expect(page).toHaveURL('/account/login')
  })

  test('Register test', async ({ page }) => {
    const registerBtn = page.locator(`text=register`)
    await expect(registerBtn).toContainText('Register')
    await registerBtn.click()
    await expect(page).toHaveURL('/account/register')
  })

  test('ToS test', async ({ page }) => {
    const registerBtn = page.locator(`text=Terms of service`)
    await expect(registerBtn).toContainText('Terms of service')
    await registerBtn.click()
    await expect(page).toHaveURL('/tos')
  })

  test('Privacy test', async ({ page }) => {
    const registerBtn = page.locator(`text=Privacy policy`)
    await expect(registerBtn).toContainText('Privacy policy')
    await registerBtn.click()
    await expect(page).toHaveURL('/privacy')
  })
})
