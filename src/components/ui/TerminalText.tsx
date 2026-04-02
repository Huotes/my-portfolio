'use client';

import { useState, useEffect } from 'react';

interface TerminalTextProps {
  lines: string[];
  typingSpeed?: number;
  lineDelay?: number;
  className?: string;
  prefix?: string;
}

export default function TerminalText({
  lines,
  typingSpeed = 30,
  lineDelay = 500,
  className = '',
  prefix = '❯',
}: TerminalTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsComplete(true);
      return;
    }

    if (currentChar === 0 && currentLine > 0) {
      const lineTimeout = setTimeout(() => {
        setCurrentChar(1);
      }, lineDelay);
      return () => clearTimeout(lineTimeout);
    }

    if (currentChar <= lines[currentLine].length) {
      const charTimeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = lines[currentLine].slice(0, currentChar);
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(charTimeout);
    }

    setCurrentLine((l) => l + 1);
    setCurrentChar(0);
  }, [currentLine, currentChar, lines, typingSpeed, lineDelay]);

  return (
    <div className={`font-mono text-sm ${className}`}>
      {displayedLines.map((line, i) => (
        <div key={i} className="flex gap-2 leading-relaxed">
          <span className="text-neon-green shrink-0">{prefix}</span>
          <span className="text-gruvbox-fg2">
            {line}
            {i === currentLine && !isComplete && (
              <span className="inline-block w-2 h-4 bg-neon-green ml-0.5 animate-pulse" />
            )}
          </span>
        </div>
      ))}
      {isComplete && (
        <div className="flex gap-2 mt-1">
          <span className="text-neon-green shrink-0">{prefix}</span>
          <span className="inline-block w-2 h-4 bg-neon-green animate-pulse" />
        </div>
      )}
    </div>
  );
}
