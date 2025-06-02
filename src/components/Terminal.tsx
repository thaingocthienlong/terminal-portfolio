// src/components/Terminal.tsx
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { useCommandParser } from '../core/CommandParser';
import OutputRenderer from './OutputRenderer';
import { useTheme } from '../core/ThemeContext';

type TerminalEntry = {
  command: string;
  output: React.JSX.Element;
};

const COMMANDS = [
  'about', 'projects', 'project', 'resume', 'contact',
  'clear', 'help', 'theme', 'hello', 'sudo', 'matrix',
  'ls', 'cv', 'mail', 'info'
];

export default function Terminal() {
  const { theme } = useTheme();
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<TerminalEntry[]>([]);

  const [output, setOutput] = useState<React.JSX.Element[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  const inputRef = useRef<HTMLInputElement>(null);
  const { parseCommand } = useCommandParser();

  const handleCommand = (command: string) => {
    if (command.trim() === '') return;
    const result = parseCommand(command);
    setEntries((prev) => [...prev, { command, output: result }]);
    setInput('');
    setHistory((prev) => [...prev, command]);
    //setOutput((prev) => [...prev, result]);
    setHistoryIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (history.length === 0) return;
      setHistoryIndex((prev) => {
        const newIndex = prev === null ? history.length - 1 : Math.max(prev - 1, 0);
        setInput(history[newIndex]);
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      if (history.length === 0 || historyIndex === null) return;
      setHistoryIndex((prev) => {
        const newIndex = Math.min((prev ?? 0) + 1, history.length);
        if (newIndex === history.length) {
          setInput('');
          return null;
        }
        setInput(history[newIndex]);
        return newIndex;
      });
    } else if (e.key === 'Tab') {
      e.preventDefault();

      const matches = COMMANDS.filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]); // auto-complete
      } else if (matches.length > 1) {
        const suggestionOutput = (
          <div>
            <p>Available matches:</p>
            <ul className="pl-4 list-disc">
              {matches.map((match) => (
                <li key={match}>{match}</li>
              ))}
            </ul>
          </div>
        );

        setEntries((prev) => [...prev, { command: input, output: suggestionOutput }]);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [output]);

  return (
    <div
      className={`p-4 font-mono min-h-screen transition-all ${theme === 'dark'
        ? 'bg-black text-white'
        : 'bg-white text-gray-800'
        }`}
    >
      {entries.map((entry, i) => (
        <div key={i}>
          <div><span>$localhost:3000\portfolio&gt; {entry.command}</span></div>
          <div>{entry.output}</div>
        </div>
      ))}
      <div className="flex">
        <span className="mr-2">$localhost:3000\portfolio&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bg-transparent outline-none flex-1"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
