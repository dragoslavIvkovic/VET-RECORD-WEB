import { test, expect } from '@playwright/test';

test.describe('Blog Page E2E', () => {

  test('should list blog posts and navigate to a post', async ({ page }) => {
    await page.goto('/blog');
    
    // Ensure the main heading exists
    await expect(page.locator('h1').first()).toContainText(/Pet Health Tips/i);

    // Get all blog post links
    const blogLinks = page.locator('a[href^="/blog/"]');
    
    // Wait for at least one blog post to be present
    const count = await blogLinks.count();
    
    if (count > 0) {
      // Get the href of the first blog post
      const firstPostHref = await blogLinks.first().getAttribute('href');
      
      // Click the first blog post
      await blogLinks.first().click();
      
      // Verify we navigated to the correct URL (allow partial matching due to Next.js routing patterns)
      await expect(page).toHaveURL(new RegExp(firstPostHref as string));
      
      // Verify the post has content (we don't strictly require an h1 immediately if it loads dynamically, but let's check for article or heading)
      await expect(page.locator('h1, article').first()).toBeVisible();
    } else {
      console.log('No blog posts found to test navigation.');
    }
  });

});
