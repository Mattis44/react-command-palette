import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CommandPaletteProvider } from '../context/CommandPaletteContext';
import type { Command } from '../types/palette';

const mockCommands: Command[] = [
  {
    id: 'test-1',
    label: 'Test Command 1',
    category: 'Test',
    action: () => {},
  },
  {
    id: 'test-2',
    label: 'Test Command 2',
    category: 'Test',
    keywords: ['keyword'],
    action: () => {},
  },
];

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  commands?: Command[];
  providerProps?: any;
}

function customRender(
  ui: ReactElement,
  { commands = mockCommands, providerProps = {}, ...renderOptions }: CustomRenderOptions = {}
) {
  // renderPalette defaults to false unless explicitly set in providerProps
  const mergedProviderProps = { 
    initialOpen: true, 
    renderPalette: providerProps.renderPalette !== undefined ? providerProps.renderPalette : false,
    ...providerProps 
  };
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <CommandPaletteProvider commands={commands} {...mergedProviderProps}>
        {children}
      </CommandPaletteProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { customRender as render, mockCommands };
