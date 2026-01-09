import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from './Item';
import { render } from '../../test/test-utils';

describe('Item', () => {
  const defaultProps = {
    label: 'Test Item',
  };

  it('renders item label', () => {
    render(<Item {...defaultProps} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const icon = <svg data-testid="test-icon" />;
    render(<Item {...defaultProps} icon={icon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('shows helper text on hover', async () => {
    const user = userEvent.setup();
    render(<Item {...defaultProps} helper="Helper text" />);

    const item = screen.getByRole('option');
    await user.hover(item);

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('shows helper text when active', () => {
    render(<Item {...defaultProps} helper="Helper text" isActive={true} />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('executes action on click', async () => {
    const user = userEvent.setup();
    const mockAction = vi.fn();
    render(<Item {...defaultProps} action={mockAction} />);

    await user.click(screen.getByRole('option'));
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('executes action on Enter key when active', async () => {
    const user = userEvent.setup();
    const mockAction = vi.fn();
    render(<Item {...defaultProps} action={mockAction} isActive={true} />);

    const item = screen.getByRole('option');
    item.focus();
    await user.keyboard('{Enter}');

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('executes action on Space key when active', async () => {
    const user = userEvent.setup();
    const mockAction = vi.fn();
    render(<Item {...defaultProps} action={mockAction} isActive={true} />);

    const item = screen.getByRole('option');
    item.focus();
    await user.keyboard(' ');

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('has correct ARIA attributes', () => {
    render(<Item {...defaultProps} isActive={true} itemId="test-item" />);

    const item = screen.getByRole('option');
    expect(item).toHaveAttribute('aria-selected', 'true');
    expect(item).toHaveAttribute('id', 'test-item');
  });

  it('is focusable when active', () => {
    render(<Item {...defaultProps} isActive={true} />);
    expect(screen.getByRole('option')).toHaveAttribute('tabIndex', '0');
  });

  it('is not focusable when inactive', () => {
    render(<Item {...defaultProps} isActive={false} />);
    expect(screen.getByRole('option')).toHaveAttribute('tabIndex', '-1');
  });
});
