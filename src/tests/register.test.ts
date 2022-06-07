import { test, expect } from '@playwright/test'
// import config from '../utils/config'

test.describe('Register test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(`window.localStorage.clear()`)
    await page.evaluate(`window.sessionStorage.clear()`)
    await page.goto('/')
  })

  test('Wrong email', async ({ page }) => {
    await page.goto('/account/register')
    await page.fill(`#username_input`, 'Username')
    await page.fill(`#email_input`, 'Email')
    await page.fill(`#password_input`, 'Password')
    const submitBtn = page.locator(`button[type="submit"]`)
    await submitBtn.click()
    await expect(page).toHaveURL('/account/register')
    const errorMsg = page.locator('css=[class*="Register_error"]')
    await expect(errorMsg).toContainText('email_must_be_an_email')
  })

  test('Username too short', async ({ page }) => {
    await page.goto('/account/register')
    await page.fill(`#username_input`, '1')
    await page.fill(`#email_input`, 'maildeouf@gmail.com')
    await page.fill(`#password_input`, 'Password')
    const submitBtn = page.locator(`button[type="submit"]`)
    await submitBtn.click()
    await expect(page).toHaveURL('/account/register')
    const errorMsg = page.locator('css=[class*="Register_error"]')
    await expect(errorMsg).toContainText('username_must_be_at_least_3_characters')
  })

  test('Username too long', async ({ page }) => {
    await page.goto('/account/register')
    await page.fill(`#username_input`, 'a'.repeat(51))
    await page.fill(`#email_input`, 'maildeouf@gmail.com')
    await page.fill(`#password_input`, 'Password')
    const submitBtn = page.locator(`button[type="submit"]`)
    await submitBtn.click()
    await expect(page).toHaveURL('/account/register')
    const errorMsg = page.locator('css=[class*="Register_error"]')
    await expect(errorMsg).toContainText('username_must_be_less_than_50_characters')
  })

  // const errorMsg0 = page.locator('css=[class*="Register_error"]').nth(0)
  // const errorMsg1 = page.locator('css=[class*="Register_error"]').nth(1)
  // await expect(errorMsg0).toContainText('username_must_be_at_least_3_characters')
  // await expect(errorMsg0).toContainText('username_must_be_at_least_3_characters')
  // await expect(errorMsg).toContainText('email_must_be_an_email')
})
