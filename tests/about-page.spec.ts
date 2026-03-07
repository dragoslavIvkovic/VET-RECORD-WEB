import { test, expect } from '@playwright/test';

test.describe('About Page E2E', () => {

  test('should display the about page content', async ({ page }) => {
    await page.goto('/about');
    
    // Ensure the main heading exists
    await expect(page.locator('h1').first()).toContainText(/Simplify Your Pet Parenting/i);

    // Verify Mission section exists
    await expect(page.getByText(/Why Pet Parents Love/i)).toBeVisible();

    // Verify download link exists in the page body
    const downloadLink = page.getByRole('link', { name: /Download Now/i });
    await expect(downloadLink).toBeVisible();
  });

});
