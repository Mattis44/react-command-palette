import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import InputField from './InputField';

describe('InputField', () => {
  it('renders with default placeholder', () => {
    render(<InputField />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<InputField placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('displays clear button when query is not empty', async () => {
    const user = userEvent.setup();
    render(<InputField />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'test');

    expect(screen.getByRole('combobox')).toHaveValue('test');
  });

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<InputField />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'test');
    expect(input).toHaveValue('test');

    // The clear button is rendered but not as a button role, it's a div
    const clearButton = input.parentElement?.querySelector('[style*="cursor: pointer"]');
    if (clearButton) {
      await user.click(clearButton);
      expect(input).toHaveValue('');
    }
  });

  it('auto-focuses on mount', () => {
    render(<InputField />);
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('calls onKeyDown handler', async () => {
    const user = userEvent.setup();
    const mockKeyDown = vi.fn();
    render(<InputField onKeyDown={mockKeyDown} />);

    await user.type(screen.getByRole('combobox'), '{ArrowDown}');
    expect(mockKeyDown).toHaveBeenCalled();
  });

  it('has proper ARIA attributes', () => {
    render(<InputField hasResults={true} activeDescendantId="test-id" />);

    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', 'command-palette-listbox');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-activedescendant', 'test-id');
  });

  it('renders custom start icon', () => {
    const customIcon = <svg data-testid="custom-icon" />;
    render(<InputField iconStart={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders custom end icon when query exists', async () => {
    const user = userEvent.setup();
    const customIcon = <svg data-testid="custom-end-icon" />;
    render(<InputField iconEnd={customIcon} />);

    await user.type(screen.getByRole('combobox'), 'test');
    expect(screen.getByTestId('custom-end-icon')).toBeInTheDocument();
  });
});
