import React from 'react';
import { useCommandHandlers } from './CommandHandlers';

export function useCommandParser() {
  const { handleCommand } = useCommandHandlers();

  function parseCommand(input: string): React.JSX.Element {
    const [base, ...args] = input.trim().split(' ');
    return handleCommand(base.toLowerCase(), args);
  }

  return { parseCommand };
}
