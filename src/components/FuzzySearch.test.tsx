import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import { CommandPalette } from './CommandPalette';

describe('Fuzzy Search', () => {
  it('finds commands with typos', async () => {
    const user = userEvent.setup();
    const commands = [
      { id: '1', label: 'Open Settings', category: 'Navigation', action: () => {} },
      { id: '2', label: 'Close Window', category: 'Actions', action: () => {} },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'setngs'); // Typo: missing 'ti'

    await waitFor(() => {
      expect(screen.getByText('Open Settings')).toBeInTheDocument();
    });
  });

  it('matches partial words', async () => {
    const user = userEvent.setup();
    const commands = [
      { id: '1', label: 'Create New Project', category: 'Actions', action: () => {} },
      { id: '2', label: 'Open Recent', category: 'Actions', action: () => {} },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'creat proj');

    await waitFor(() => {
      expect(screen.getByText('Create New Project')).toBeInTheDocument();
    });
  });

  it('searches in keywords', async () => {
    const user = userEvent.setup();
    const commands = [
      { 
        id: '1', 
        label: 'User Profile', 
        category: 'Navigation',
        keywords: ['account', 'settings', 'preferences'],
        action: () => {} 
      },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'account');

    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });
  });

  it('respects custom threshold option', async () => {
    const user = userEvent.setup();
    const commands = [
      { id: '1', label: 'Open Settings', category: 'Navigation', action: () => {} },
    ];
    
    // Strict threshold - should not find with many typos
    render(<CommandPalette />, { 
      commands,
      providerProps: {
        options: {
          fuzzySearch: {
            threshold: 0.1, // Very strict
          },
        },
      },
    });

    const input = screen.getByRole('combobox');
    await user.type(input, 'stngs'); // Too many errors

    await waitFor(() => {
      expect(screen.queryByText('Open Settings')).not.toBeInTheDocument();
    });
  });

  it('searches in category names', async () => {
    const user = userEvent.setup();
    const commands = [
      { id: '1', label: 'Profile Page', category: 'Navigation', action: () => {} },
      { id: '2', label: 'Delete Item', category: 'Danger Zone', action: () => {} },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'danger');

    await waitFor(() => {
      expect(screen.getByText('Delete Item')).toBeInTheDocument();
    });
  });

  it('handles case-insensitive search', async () => {
    const user = userEvent.setup();
    const commands = [
      { id: '1', label: 'OpenFile', category: 'Actions', action: () => {} },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'OPENFILE');

    await waitFor(() => {
      expect(screen.getByText('OpenFile')).toBeInTheDocument();
    });
  });

  it('prioritizes exact matches over fuzzy matches', async () => {
    const user = userEvent.setup();
    const commands = [
      { id: '1', label: 'Test', category: 'A', action: () => {} },
      { id: '2', label: 'Testing Framework', category: 'B', action: () => {} },
      { id: '3', label: 'Unit Test Runner', category: 'C', action: () => {} },
    ];
    render(<CommandPalette />, { commands });

    const input = screen.getByRole('combobox');
    await user.type(input, 'test');

    await waitFor(() => {
      const items = screen.getAllByRole('option');
      // "Test" (exact match) should be first
      expect(items[0]).toHaveTextContent('Test');
    });
  });
});
