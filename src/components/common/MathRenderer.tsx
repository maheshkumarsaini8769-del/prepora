import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content?: string;
  className?: string;
  displayMode?: boolean;
}

/**
 * Fallback converter for raw LaTeX to clean readable Unicode text if KaTeX encounters parsing faults.
 * Guarantees students NEVER see raw broken commands like \frac{1}{2}at^2 or \sqrt{x}.
 */
function fallbackLatexToReadable(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, '$1√($2)')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\times/g, ' × ')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\neq/g, ' ≠ ')
    .replace(/\\le(q)?/g, ' ≤ ')
    .replace(/\\ge(q)?/g, ' ≥ ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\implies/g, ' ⇒ ')
    .replace(/\\rightarrow/g, ' → ')
    .replace(/\\quad/g, '   ')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\^2\b/g, '²')
    .replace(/\^3\b/g, '³')
    .replace(/_([0-9a-z])/gi, '₍$1₎')
    .replace(/[\$\\]/g, '');
}

/**
 * Production-grade MathRenderer for PREPORA.
 * Safely parses inline ($...$) and display ($$...$$ or \[...\]) math expressions,
 * rendering crisp mathematical notation via KaTeX with zero syntax crashes.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  content = '',
  className = '',
  displayMode = false
}) => {
  if (!content) return null;

  // If content is pure math without markdown text surrounding it
  if (
    displayMode ||
    content.startsWith('$$') ||
    content.startsWith('\\[') ||
    (!content.includes(' ') && (content.includes('\\') || content.includes('^') || content.includes('_')))
  ) {
    const rawMath = content.replace(/^(\$\$|\\\[|\$)/, '').replace(/(\$\$|\\\]|\$)$/, '').trim();
    try {
      const html = katex.renderToString(rawMath, {
        displayMode: true,
        throwOnError: false
      });
      return <div className={`katex-display-container my-2 overflow-x-auto ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <div className={`font-mono text-emerald-300 my-2 ${className}`}>{fallbackLatexToReadable(rawMath)}</div>;
    }
  }

  // Parse mixed text with inline $...$ or display $$...$$ delimiters
  // Split into tokens: $$...$$ (display), $...$ (inline), or plain text
  const tokens = content.split(/(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g);

  return (
    <span className={`inline-math-wrapper ${className}`}>
      {tokens.map((part, idx) => {
        if (!part) return null;

        // Display math $$...$$
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2).trim();
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return (
              <span
                key={idx}
                className="block my-2 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return (
              <span key={idx} className="block my-2 font-mono text-emerald-300">
                {fallbackLatexToReadable(math)}
              </span>
            );
          }
        }

        // Inline math $...$
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1).trim();
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return (
              <span
                key={idx}
                className="inline-block px-1"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return (
              <span key={idx} className="inline-block px-1 font-mono text-emerald-300">
                {fallbackLatexToReadable(math)}
              </span>
            );
          }
        }

        // Check if plain text part has common LaTeX remnants like \frac or \sqrt without $ delimiters
        if (part.includes('\\frac') || part.includes('\\sqrt') || part.includes('\\cdot')) {
          try {
            const html = katex.renderToString(part.trim(), { displayMode: false, throwOnError: false });
            return (
              <span
                key={idx}
                className="inline-block px-1"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return <span key={idx}>{fallbackLatexToReadable(part)}</span>;
          }
        }

        // Standard text
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
};

export default MathRenderer;
