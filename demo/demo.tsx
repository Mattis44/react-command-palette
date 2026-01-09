import React from 'react';
import ReactDOM from 'react-dom/client';
import { CommandPaletteProvider, SHORTCUTS, type Command } from '../src';

const icons = {
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6m5.66-13l-3.46 3.46m0 6.93l3.46 3.46M23 12h-6m-6 0H1m20.66 5.66l-3.46-3.46m-6.93 0l-3.46 3.46" />
    </svg>
  ),
  plus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  trash: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  download: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  folder: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  file: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
  palette: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
};

const commands: Command[] = [
  {
    id: 'open-settings',
    label: 'Open Settings',
    icon: icons.settings,
    category: 'Navigation',
    action: () => alert('Settings opened! ⚙️'),
    keywords: ['config', 'preferences', 'options'],
    helper: 'Configure your application',
  },
  {
    id: 'create-project',
    label: 'Create New Project',
    icon: icons.plus,
    category: 'Actions',
    action: () => alert('New project created! 🚀'),
    keywords: ['new', 'add', 'init'],
    helper: 'Start a fresh project',
  },
  {
    id: 'open-profile',
    label: 'Open Profile',
    icon: icons.user,
    category: 'Navigation',
    action: () => alert('Profile opened! 👤'),
    keywords: ['user', 'account', 'me'],
    helper: 'View your profile',
  },
  {
    id: 'search-files',
    label: 'Search Files',
    icon: icons.search,
    category: 'Search',
    action: () => alert('File search activated! 🔍'),
    keywords: ['find', 'locate', 'grep'],
    helper: 'Find files in workspace',
  },
  {
    id: 'open-folder',
    label: 'Open Folder',
    icon: icons.folder,
    category: 'Navigation',
    action: () => alert('Folder browser opened! 📁'),
    keywords: ['directory', 'browse'],
  },
  {
    id: 'export-data',
    label: 'Export Data',
    icon: icons.download,
    category: 'Actions',
    action: () => alert('Data export started! 💾'),
    keywords: ['save', 'backup', 'download'],
    helper: 'Export to JSON/CSV',
  },
  {
    id: 'new-file',
    label: 'New File',
    icon: icons.file,
    category: 'Actions',
    action: () => alert('New file created! 📄'),
    keywords: ['create', 'document'],
  },
  {
    id: 'open-code',
    label: 'Open Code Editor',
    icon: icons.code,
    category: 'Development',
    action: () => alert('Code editor opened! 💻'),
    keywords: ['ide', 'edit', 'develop'],
  },
  {
    id: 'theme-settings',
    label: 'Theme Settings',
    icon: icons.palette,
    category: 'Appearance',
    action: () => alert('Theme customization! 🎨'),
    keywords: ['color', 'dark', 'light', 'style'],
    helper: 'Customize colors',
  },
  {
    id: 'delete-account',
    label: 'Delete Account',
    icon: icons.trash,
    category: 'Danger',
    action: () => alert('⚠️ Account deletion initiated'),
    keywords: ['remove', 'destroy', 'terminate'],
    helper: 'Permanent deletion',
  },
];

function App() {
  return (
    <CommandPaletteProvider 
      commands={commands} 
      shortcut={SHORTCUTS.COMMAND}
      options={{
        fuzzySearch: {
          threshold: 0.3,
        },
        enableHistory: true,
        maxHistorySize: 10,
        maxResults: 8,
        overlayStyle: {
          backgroundColor: 'rgba(10,12,20,0.55)',
          backdropFilter: 'blur(8px)'
        },
        containerStyle: {
          backgroundColor: 'rgba(13,17,23,0.88)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.45)',
          border: '1px solid rgba(255,255,255,0.08)'
        },
        containerInputFieldStyle: {
          borderBottom: '1px solid rgba(255,255,255,0.12)'
        },
        listStyle: {
          maxHeight: '50vh'
        },
        inputFieldStyle: {
          fontSize: '1.05rem',
          color: '#ffffff',
          caretColor: '#a78bfa'
        },
        itemStyle: {
          border: '1px solid transparent',
          padding: '0.35rem 0'
        },
        categoryItemStyle: {
          borderBottom: '1px solid rgba(255,255,255,0.12)'
        },
        helper: [
          {
            text: 'Press',
            keys: ['↵'],
            description: 'to select',
          },
          {
            text: 'Use',
            keys: ['↑', '↓'],
            description: 'to navigate',
          },
          {
            text: 'Press',
            keys: ['Esc'],
            description: 'to close',
          },
        ],
      }}
    >
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '4rem',
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              margin: '0 0 1rem 0',
              background: 'linear-gradient(to right, #fff, #e0e0ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}>
              Command Palette Demo
            </h1>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}>
              A powerful, accessible command palette for React applications
            </p>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}>
              <span>Press</span>
              <kbd style={{
                padding: '0.4rem 0.8rem',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}>
                ⌘K
              </kbd>
              <span>or</span>
              <kbd style={{
                padding: '0.4rem 0.8rem',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}>
                Ctrl+K
              </kbd>
              <span>to open</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}>
            {[
              { icon: '🔍', title: 'Fuzzy Search', desc: 'Find commands even with typos' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Instant command execution' },
              { icon: '♿', title: 'Accessible', desc: 'Full ARIA support & keyboard nav' },
              { icon: '🎨', title: 'Customizable', desc: 'Style it your way' },
            ].map((feature, i) => (
              <div key={i} style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                color: 'white',
                transition: 'transform 0.2s',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '700' }}>
                  {feature.title}
                </h3>
                <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '2.5rem',
            color: 'white',
          }}>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.75rem',
              fontWeight: '700',
            }}>
              Available Commands ({commands.length})
            </h2>
            <div style={{
              display: 'grid',
              gap: '0.75rem',
            }}>
              {commands.map(cmd => (
                <div key={cmd.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s',
                  cursor: 'default',
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    flexShrink: 0,
                  }}>
                    {cmd.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: '600',
                      fontSize: '1rem',
                      marginBottom: '0.25rem',
                    }}>
                      {cmd.label}
                    </div>
                    {cmd.helper && (
                      <div style={{
                        fontSize: '0.85rem',
                        opacity: 0.7,
                      }}>
                        {cmd.helper}
                      </div>
                    )}
                  </div>
                  <div style={{
                    padding: '0.35rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    opacity: 0.8,
                  }}>
                    {cmd.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            color: 'white',
            opacity: 0.8,
            fontSize: '0.95rem',
          }}>
            <p>Try searching for: <strong>"settings"</strong>, <strong>"new file"</strong>, or even <strong>"setngs"</strong> (with typo!) 🎯</p>
            <p style={{ marginTop: '1rem' }}>
              Keywords work too! Try: <strong>"config"</strong>, <strong>"ide"</strong>, or <strong>"backup"</strong>
            </p>
          </div>
        </div>
      </div>
    </CommandPaletteProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
