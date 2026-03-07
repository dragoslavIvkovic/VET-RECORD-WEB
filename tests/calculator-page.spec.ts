import { test, expect } from '@playwright/test';

test.describe('Calculator Page E2E', () => {

  test('should display the calculator tool', async ({ page }) => {
    await page.goto('/calculator');
    
    // Ensure the main heading exists
    await expect(page.locator('h1').first()).toContainText(/Pet Weight Calculator/i);

    // Verify form elements exist
    await expect(page.getByText(/Dog/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate Result/i })).toBeVisible();
  });

});
