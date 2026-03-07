import { test, expect } from '@playwright/test';

test.describe('Contact Page E2E', () => {

  test('should display contact information', async ({ page }) => {
    await page.goto('/contact');
    
    // Ensure the main heading exists
    await expect(page.locator('h1').first()).toContainText(/We're Here to/i);

    // Verify Email link exists (mailto)
    await expect(page.getByText(/Email Us/i)).toBeVisible();
  });

});
