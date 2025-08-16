import React from 'react';

/**
 * AttemptsLimit component
 * Shows a button to create a new project when attempts reach 3
 * Props:
 *   attempts: number (current number of attempts)
 *   onCreateNewProject: function (callback when button is clicked)
 */
export default function AttemptsLimit({ attempts, onCreateNewProject, onUpgrade }) {
  if (attempts < 3) return null;
  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <button
        onClick={() => {
          console.log('Upgrade to Pro button clicked');
          if (onUpgrade) onUpgrade();
          else if (onCreateNewProject) onCreateNewProject();
        }}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          background: '#ff9800',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Upgrade to Pro
      </button>
    </div>
  );
}
