import React from 'react';
import { useCommandHandlers } from './CommandHandlers';
import { TerminalEntry } from '../components/Terminal';

export function useCommandParser(setEntries: React.Dispatch<React.SetStateAction<TerminalEntry[]>>) {
  const { handleCommand: baseHandler } = useCommandHandlers();

  function parseCommand(input: string): React.JSX.Element {
    const [base, ...args] = input.trim().split(' ');
    return baseHandler(base.toLowerCase(), args);
  }

  return { parseCommand };
}

function getInitialOutput(): TerminalEntry[] {
  return [
    {
      command: '',
      output: (
        <div>
          <p>👋 Welcome to my terminal portfolio!</p>
          <p>Here are some commands you can try:</p>
          <ul className="list-disc pl-4">
            <li><code>about</code> – Show developer bio</li>
            <li><code>projects</code> – List all projects</li>
            <li><code>project &lt;name&gt;</code> – Show project details</li>
            <li><code>resume</code> – Download/view resume</li>
            <li><code>contact</code> – Developer's contact info</li>
            <li><code>theme dark|light</code> – Toggle theme</li>
            <li><code>help</code> – Show all commands</li>
            <li><code>clear</code> – Reset the terminal</li>
          </ul>
        </div>
      )
    }
  ];
}


