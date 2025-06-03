// src/components/Terminal.tsx
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { useCommandParser } from '../core/CommandParser';
import OutputRenderer from './OutputRenderer';
import { useTheme } from '../core/ThemeContext';

const COMMANDS = [
  'about', 'projects', 'project', 'resume', 'contact',
  'clear', 'help', 'theme', 'hello', 'sudo', 'matrix',
  'ls', 'cv', 'mail', 'info'
];

const getInitialOutput = (): { command: string; output: React.JSX.Element }[] => [
  {
    command: '',
    output: (
      <div>
        <p>👋 Welcome to my terminal portfolio!</p>
        <p>Here are some commands you can try:</p>
        <ul className="list-disc pl-4">
          <li><code>about</code> - Show developer bio</li>
          <li><code>projects</code> - List all projects</li>
          <li><code>project &lt;name&gt;</code> - Show project details</li>
          <li><code>resume</code> - Download/view resume</li>
          <li><code>contact</code> - Developer's contact info</li>
          <li><code>theme dark|light</code> - Toggle theme</li>
          <li><code>help</code> - Show all commands</li>
          <li><code>clear</code> - Reset the terminal</li>
        </ul>
      </div>
    )
  }
];

export type TerminalEntry = {
  command: string;
  output: React.JSX.Element;
};

export default function Terminal() {
  const { theme } = useTheme();
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<TerminalEntry[]>([]);

  const [output, setOutput] = useState<React.JSX.Element[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setEntries(getInitialOutput());
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  const inputRef = useRef<HTMLInputElement>(null);
  const { parseCommand } = useCommandParser(setEntries);

  const handleCommand = (command: string) => {
    if (command.trim() === '') return;

    const normalized = command.trim().toLowerCase();
    if (normalized === 'clear') {
      setEntries(getInitialOutput());
      setInput('');
      setHistory((prev) => [...prev, command]);
      setHistoryIndex(null);
      return;
    }
    const result = parseCommand(command);
    setEntries((prev) => [...prev, { command, output: result }]);
    setInput('');
    setHistory((prev) => [...prev, command]);
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
        setInput(matches[0]);
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
