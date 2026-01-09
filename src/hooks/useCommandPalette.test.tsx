import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderHook, waitFor, act } from '@testing-library/react';
import { CommandPaletteProvider } from '../context/CommandPaletteContext';
import { useCommandPalette } from './useCommandPalette';
import type { Command } from '../types/palette';

describe('useCommandPalette', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useCommandPalette(), {
      wrapper: ({ children }) => (
        <CommandPaletteProvider commands={[]}>
          {children}
        </CommandPaletteProvider>
      ),
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.query).toBe('');
  });

  it('opens and closes the palette', () => {
    const { result } = renderHook(() => useCommandPalette(), {
      wrapper: ({ children }) => (
        <CommandPaletteProvider commands={[]}>
          {children}
        </CommandPaletteProvider>
      ),
    });

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles the palette', () => {
    const { result } = renderHook(() => useCommandPalette(), {
      wrapper: ({ children }) => (
        <CommandPaletteProvider commands={[]}>
          {children}
        </CommandPaletteProvider>
      ),
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('updates query', () => {
    const { result } = renderHook(() => useCommandPalette(), {
      wrapper: ({ children }) => (
        <CommandPaletteProvider commands={[]}>
          {children}
        </CommandPaletteProvider>
      ),
    });

    act(() => {
      result.current.setQuery('test query');
    });
    expect(result.current.query).toBe('test query');
  });

  it('provides commands from provider', async () => {
    const commands: Command[] = [
      { id: '1', label: 'Command 1', category: 'Test', action: () => {} },
      { id: '2', label: 'Command 2', category: 'Test', action: () => {} },
    ];

    const { result } = renderHook(() => useCommandPalette(), {
      wrapper: ({ children }) => (
        <CommandPaletteProvider commands={commands}>
          {children}
        </CommandPaletteProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.commands.length).toBe(2);
    });
  });
});
