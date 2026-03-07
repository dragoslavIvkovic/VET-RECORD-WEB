import { test, expect } from '@playwright/test';

test.describe('Legal Pages E2E', () => {

  test('should display the privacy policy', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page.locator('h1').first()).toContainText(/Privacy Policy/i);
    await expect(page.getByText(/Data Collection and Usage/i)).toBeVisible();
  });

  test('should display the delete data instructions', async ({ page }) => {
    await page.goto('/delete-data');
    await expect(page.locator('h1').first()).toContainText(/Data Deletion Request/i);
    await expect(page.getByText(/Option 1: In-App Deletion/i)).toBeVisible();
  });

});
