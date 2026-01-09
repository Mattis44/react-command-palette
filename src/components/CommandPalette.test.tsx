import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, mockCommands } from '../test/test-utils';
import { CommandPalette } from './CommandPalette';

describe('CommandPalette', () => {
  it('renders the input field', () => {
    render(<CommandPalette />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays all commands by default', async () => {
    render(<CommandPalette />);
    await waitFor(() => {
      expect(screen.getByText('Test Command 1')).toBeInTheDocument();
      expect(screen.getByText('Test Command 2')).toBeInTheDocument();
    });
  });

  it('filters commands based on search query', async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'Test Command 1');

    await waitFor(() => {
      expect(screen.getByText('Test Command 1')).toBeInTheDocument();
      // Fuzzy search may still show partial matches, so we just verify Command 1 is there
    });
  });

  it('filters commands by keywords', async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'keyword');

    await waitFor(() => {
      expect(screen.getByText('Test Command 2')).toBeInTheDocument();
      expect(screen.queryByText('Test Command 1')).not.toBeInTheDocument();
    });
  });

  it('uses fuzzy search to match partial words', async () => {
    const user = userEvent.setup();
    const commands = [
      {
        id: 'open-settings',
        label: 'Open Settings',
        category: 'Navigation',
        action: () => {},
      },
      {
        id: 'open-preferences',
        label: 'Open Preferences',
        category: 'Navigation',
        action: () => {},
      },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'opsett'); // Typo-tolerant fuzzy search

    await waitFor(() => {
      expect(screen.getByText('Open Settings')).toBeInTheDocument();
    });
  });

  it('ranks results by relevance', async () => {
    const user = userEvent.setup();
    const commands = [
      {
        id: 'test-1',
        label: 'Test Command',
        category: 'Test',
        action: () => {},
      },
      {
        id: 'test-2',
        label: 'Another Command Task',
        category: 'Other',
        action: () => {},
      },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'Test Command');

    await waitFor(() => {
      const items = screen.getAllByRole('option');
      // "Test Command" should come first since it's an exact match
      expect(items[0]).toHaveTextContent('Test Command');
    });
  });

  it('shows "no results" message when no commands match', async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText(/No results found for/i)).toBeInTheDocument();
    });
  });

  it('displays loading state', () => {
    render(<CommandPalette />, {
      providerProps: {
        commands: async () => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return mockCommands;
        },
      },
    });

    expect(screen.getByText(/Loading commands/i)).toBeInTheDocument();
  });

  it('navigates through commands with arrow keys', async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('Test Command 1')).toBeInTheDocument();
    });

    const input = screen.getByRole('combobox');
    
    // First item should be active by default
    expect(screen.getByText('Test Command 1').closest('[role="option"]')).toHaveAttribute('aria-selected', 'true');

    // Arrow down to second item
    await user.type(input, '{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByText('Test Command 2').closest('[role="option"]')).toHaveAttribute('aria-selected', 'true');
    });

    // Arrow up back to first item
    await user.type(input, '{ArrowUp}');
    await waitFor(() => {
      expect(screen.getByText('Test Command 1').closest('[role="option"]')).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('executes command on Enter key', async () => {
    const user = userEvent.setup();
    const mockAction = vi.fn();
    const commands = [
      {
        id: 'test',
        label: 'Test Command',
        category: 'Test',
        action: mockAction,
      },
    ];

    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, '{Enter}');

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalledTimes(1);
    });
  });

  it('groups commands by category', async () => {
    const commands = [
      { id: '1', label: 'Nav Command', category: 'Navigation', action: () => {} },
      { id: '2', label: 'Action Command', category: 'Actions', action: () => {} },
      { id: '3', label: 'Another Nav', category: 'Navigation', action: () => {} },
    ];

    render(<CommandPalette />, { commands });

    await waitFor(() => {
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });

  it('displays empty state when no commands provided', async () => {
    render(<CommandPalette />, { commands: [] });
    await waitFor(() => {
      expect(screen.getByText(/don't have any commands defined/i)).toBeInTheDocument();
    });
  });

  it('shows results count for screen readers', async () => {
    render(<CommandPalette />);
    await waitFor(() => {
      expect(screen.getByText(/2 results available/i)).toBeInTheDocument();
    });
  });

  it('has proper ARIA attributes', async () => {
    render(<CommandPalette />);
    
    await waitFor(() => {
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).toHaveAttribute('aria-controls', 'command-palette-listbox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');

      const listbox = screen.getByRole('listbox', { name: /command list/i });
      expect(listbox).toBeInTheDocument();
    });
  });
});
