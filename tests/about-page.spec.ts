import { test, expect } from '@playwright/test';

test.describe('About Page E2E', () => {

  test('should display the about page content', async ({ page }) => {
    await page.goto('/about');
    
    // Ensure the main heading exists
    await expect(page.locator('h1').first()).toContainText(/Simplify Your Pet Parenting Journey/i);

    // Verify Mission section exists
    await expect(page.getByText(/Why Pet Parents Love/i)).toBeVisible();

    // Verify download links exist in the page body, explicitly avoiding the layout popups (which might be hidden on mobile)
    const googlePlayLink = page.locator('main a[href*="play.google.com"]').last();
    const appStoreLink = page.locator('main a[href*="apps.apple.com"]').last();
    
    await expect(googlePlayLink).toBeVisible();
    await expect(appStoreLink).toBeVisible();
  });

});
