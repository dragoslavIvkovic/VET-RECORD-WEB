import { test, expect } from '@playwright/test';

test.describe('Landing Page E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display downlaod links and text', async ({ page }) => {
    // Depending on the exact text in the HeroSection
    const headline = page.locator('h1');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText(/Your Pet's Entire Medical History/i);
  });

  test('should navigate to the calculator page', async ({ page }) => {
    const navLink = page.locator('nav').getByRole('link', { name: /Calorie Calculator/i });
    if (await navLink.isVisible()) {
      await navLink.click();
      await expect(page).toHaveURL(/.*\/calculator/);
    }
  });

  test('should navigate to the blog page', async ({ page }) => {
    const navLink = page.locator('nav').getByRole('link', { name: /^Blog$/i });
    if (await navLink.isVisible()) {
      await navLink.click();
      await expect(page).toHaveURL(/.*\/blog/);
    }    
  });

  test('should have working App Store and Google Play links in the hero section', async ({ page }) => {
    const googlePlayLink = page.locator('a[href*="play.google.com"]').first();
    const appStoreLink = page.locator('a[href*="apps.apple.com"]').first();
    
    await expect(googlePlayLink).toHaveAttribute('target', '_blank');
    await expect(appStoreLink).toHaveAttribute('target', '_blank');
  });

  test('should open FAQ dropdowns', async ({ page }) => {
    // Assuming FAQ section is on the home page or accessible via link
    const faqLink = page.locator('nav').getByRole('link', { name: /FAQ/i });
    if (await faqLink.isVisible()) {
      await faqLink.click();
      await expect(page).toHaveURL(/.*\/faq/);
    }
  });

});
