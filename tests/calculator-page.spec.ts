import { test, expect } from '@playwright/test';

test.describe('Calculator Page Detailed E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
    // Ensure the page is fully loaded and breeds are fetched
    await expect(page.getByPlaceholder(/Search for a dog breed\.\.\./i)).toBeVisible({ timeout: 10000 });
  });

  test('should display the calculator tool and initial elements', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText(/Pet Weight Calculator/i);
    await expect(page.getByText(/Dog/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate Result/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate Result/i })).toBeDisabled();
  });

  test('should successfully calculate a dog ideal weight', async ({ page }) => {
    // Select dog tab (should be default)
    await page.getByText(/🐶 Dog/i).click();

    // Search and select breed
    const breedInput = page.getByPlaceholder(/Search for a dog breed\.\.\./i);
    await breedInput.fill('Golden Retriever');
    // Wait for dropdown and select the breed
    await page.getByRole('button', { name: 'Golden Retriever' }).click();

    // Ensure the selected breed is populated in the input
    await expect(breedInput).toHaveValue('Golden Retriever');

    // Select kg as weight unit
    await page.getByRole('button', { name: 'kg' }).click();

    // Enter weight (30kg for Golden Retriever is generally ideal)
    await page.getByPlaceholder(/e\.g\. 7\.0/i).fill('30');

    // Click Calculate
    const calcButton = page.getByRole('button', { name: /Calculate Result/i });
    await expect(calcButton).toBeEnabled();
    await calcButton.click();

    // Verify results
    await expect(page.getByText(/Assessment Result/i)).toBeVisible();
    // Assuming 30kg is ideal or within a reasonable range for a Golden Retriever
    await expect(page.getByText(/Target adult range:/i)).toBeVisible();
  });

  test('should successfully calculate a cat weight', async ({ page }) => {
    // Select cat tab
    await page.getByText(/🐱 Cat/i).click();

    // Wait for breed loading to finish for cats
    await expect(page.getByPlaceholder(/Search for a cat breed\.\.\./i)).toBeVisible({ timeout: 10000 });

    // Search and select breed
    const breedInput = page.getByPlaceholder(/Search for a cat breed\.\.\./i);
    await breedInput.fill('Siamese');
    
    // Select from dropdown
    await page.getByRole('button', { name: 'Siamese' }).click();

    // Switch to lbs this time
    await page.getByRole('button', { name: 'lbs' }).click();

    // Enter weight (say 15 lbs which might be overweight for Siamese)
    await page.getByPlaceholder(/e\.g\. 15\.4/i).fill('15');

    // Select life stage
    await page.locator('select').selectOption('senior');

    // Calculate
    await page.getByRole('button', { name: /Calculate Result/i }).click();

    // Check result appears
    await expect(page.getByText(/Assessment Result/i)).toBeVisible();
    await expect(page.getByText(/Target adult range:/i)).toBeVisible();
  });
});
