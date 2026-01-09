import { test, expect } from '@playwright/test';

test.describe('Command Palette E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens with keyboard shortcut Ctrl+K', async ({ page }) => {
    await page.keyboard.press('Control+k');
    await expect(page.getByRole('combobox')).toBeVisible();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('closes with Escape key', async ({ page }) => {
    await page.keyboard.press('Control+k');
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('searches and filters commands', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const searchInput = page.getByRole('combobox');
    await searchInput.fill('settings');

    await expect(page.getByText(/settings/i)).toBeVisible();
  });

  test('navigates with arrow keys', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const firstItem = page.getByRole('option').first();
    await expect(firstItem).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowDown');
    const secondItem = page.getByRole('option').nth(1);
    await expect(secondItem).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowUp');
    await expect(firstItem).toHaveAttribute('aria-selected', 'true');
  });

  test('executes command with Enter key', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    await page.keyboard.press('Enter');

    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('executes command with click', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const firstCommand = page.getByRole('option').first();
    await firstCommand.click();

    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('clears search query', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const searchInput = page.getByRole('combobox');
    await searchInput.fill('test query');
    expect(await searchInput.inputValue()).toBe('test query');

    await page.locator('[style*="cursor: pointer"]').last().click();
    expect(await searchInput.inputValue()).toBe('');
  });

  test('shows "no results" message', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const searchInput = page.getByRole('combobox');
    await searchInput.fill('nonexistentcommand12345');

    await expect(page.getByText(/no results found/i)).toBeVisible();
  });

  test('focuses input when opened', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeFocused();
  });

  test('traps focus within palette', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeFocused();

    await page.keyboard.press('Tab');
    
    const dialog = page.getByRole('dialog');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('closes when clicking overlay', async ({ page }) => {
    await page.keyboard.press('Control+k');
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.locator('#portal-container-command-palette').click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('displays command categories', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const categories = page.locator('[style*="fontWeight: 600"]');
    await expect(categories.first()).toBeVisible();
  });

  test('accessibility: has proper ARIA attributes', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-label', 'Command palette');

    const combobox = page.getByRole('combobox');
    await expect(combobox).toHaveAttribute('aria-expanded', 'true');
    await expect(combobox).toHaveAttribute('aria-controls', 'command-palette-listbox');
    await expect(combobox).toHaveAttribute('aria-autocomplete', 'list');

    const listbox = page.getByRole('listbox');
    await expect(listbox).toBeVisible();
  });

  test('accessibility: announces results count', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const announcement = page.locator('[role="status"][aria-live="polite"]').first();
    await expect(announcement).toContainText(/results available/i);
  });

  test('keyboard navigation cycles through commands', async ({ page }) => {
    await page.keyboard.press('Control+k');
    
    const commands = page.getByRole('option');
    const count = await commands.count();

    for (let i = 0; i < count - 1; i++) {
      await page.keyboard.press('ArrowDown');
    }

    const lastItem = commands.nth(count - 1);
    await expect(lastItem).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowDown');
    const firstItem = commands.first();
    await expect(firstItem).toHaveAttribute('aria-selected', 'true');
  });
});
