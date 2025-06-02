import projectData from '../data/projects.json';
import contactData from '../data/contact.json';
import OutputText from '../components/OutputText';
import { useTheme } from './ThemeContext';
import React from 'react';

export function useCommandHandlers() {
  const { setTheme } = useTheme();

  function handleCommand(command: string, args: string[]): React.JSX.Element {
    const aliases: Record<string, string> = {
      ls: 'projects',
      cv: 'resume',
      mail: 'contact',
      info: 'about'
    };

    const normalizedCommand = aliases[command] || command;
    switch (normalizedCommand) {
      case 'help':
        return (
          <div>
            <p>Available commands:</p>
            <ul className="list-disc pl-4">
              <li><code>about</code> - Show developer bio</li>
              <li><code>projects</code> - List all projects</li>
              <li><code>project [name]</code> - Show details of a project</li>
              <li><code>resume</code> - Download/view resume</li>
              <li><code>contact</code> - Developer's contact info</li>
              <li><code>theme dark|light</code> - Switch UI theme</li>
              <li><code>clear</code> - Clear terminal</li>
              <li><code>help</code> - Show this help message</li>
              <li><code>goodbye</code> - Say bye to the user</li>
              <li><code>hello</code> - Greet the user</li>
              <li><code>sudo</code> - Try to run a command as root (spoof)</li>
              <li><code>matrix</code> - A fun Easter egg</li>
            </ul>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-2">
            <p>Hello, I'm <strong>Thái Ngọc Thiên Long</strong> — a full-stack developer and software engineering student with a passion for building interactive interfaces and practical web applications.</p>
            <p>I specialize in React, Node.js, TypeScript, and modern UI/UX. My projects range from academic platforms and language learning apps to full-featured admin systems.</p>
            <p>Type <code>help</code> to see what else you can do!</p>
          </div>
        );

      case 'hello':
        return <OutputText>Hello there! 👋 Welcome to my terminal portfolio!</OutputText>;

      case 'sudo':
        return <OutputText>⛔ Permission denied: You are not root 😎</OutputText>;

      case 'theme':
        if (args[0] === 'dark' || args[0] === 'light') {
          setTheme(args[0]);
          return <OutputText>Theme switched to <strong>{args[0]}</strong>.</OutputText>;
        }
        return <OutputText>Invalid theme. Use <code>theme dark</code> or <code>theme light</code>.</OutputText>;

      case 'projects':
        return (
          <div>
            <OutputText>My Projects:</OutputText>
            <ul className="list-disc pl-4">
              {projectData.map((proj) => (
                <li key={proj.name}>
                  <strong>{proj.name}</strong>: {proj.description}<br />
                  <a href={proj.url} className="underline" target="_blank">[link]</a>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'project':
        const name = args.join(' ').toLowerCase();
        const proj = projectData.find((p) => p.name.toLowerCase() === name);
        return proj ? (
          <div>
            <h3 className="font-bold">{proj.name}</h3>
            <OutputText>{proj.description}</OutputText>
            <a href={proj.url} className="underline" target="_blank">Project Link</a>
          </div>
        ) : <OutputText>Project not found.</OutputText>;

      case 'resume':
        return (
          <OutputText>
            <a href="/resume.pdf" download className="underline">Click here to download resume</a>
          </OutputText>
        );

      case 'contact':
        return (
          <div>
            <OutputText>Email: <a href={`mailto:${contactData.email}`} className="underline">{contactData.email}</a></OutputText>
            <OutputText>GitHub: <a href={contactData.github} className="underline" target="_blank">{contactData.github}</a></OutputText>
            <OutputText>LinkedIn: <a href={contactData.linkedin} className="underline" target="_blank">{contactData.linkedin}</a></OutputText>
          </div>
        );

      case 'clear':
        window.location.reload();
        return <></>;

      case 'matrix':
        return <OutputText>Wake up, Neo... The Matrix has you. 🟩</OutputText>;

      case 'goodbye':
        return <OutputText>In case I don't see you, good afternoon, good evening, and goodnight!</OutputText>


      default:
        return <OutputText>Command not found: <strong>{command}</strong></OutputText>;
    }
  }

  return { handleCommand };
}
