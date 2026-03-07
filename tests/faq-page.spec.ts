import { test, expect } from '@playwright/test';

test.describe('FAQ Page E2E', () => {

  test('should display the general questions', async ({ page }) => {
    await page.goto('/faq');
    
    // Ensure the main heading exists
    await expect(page.locator('h1').first()).toContainText(/Frequently Asked Questions/i);

    // Verify FAQ items
    await expect(page.getByText(/Sharing Data/i)).toBeVisible();
    await expect(page.getByText(/How can I share my dog's health records/i).first()).toBeVisible();
  });

});
