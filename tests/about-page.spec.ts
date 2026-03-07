import { test, expect } from '@playwright/test';

test.describe('About Page E2E', () => {

  test('should display the about page content', async ({ page }) => {
    await page.goto('/about');
    
    // Ensure the main heading exists
    await expect(page.locator('h1').first()).toContainText(/Simplify Your Pet Parenting/i);

    // Verify Mission section exists
    await expect(page.getByText(/Why Pet Parents Love/i)).toBeVisible();

    // Verify download link exists
    const downloadLink = page.locator('a[href*="play.google.com"]').first();
    await expect(downloadLink).toBeVisible();
  });

});
