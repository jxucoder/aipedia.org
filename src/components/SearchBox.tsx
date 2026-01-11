import { useState, useRef, useEffect } from 'react';

interface Page {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  pages: Page[];
}

export function SearchBox({ pages }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 0
    ? pages.filter(page => 
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase()) ||
        page.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = `/${results[selectedIndex].slug}`;
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search concepts..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-bg-secondary/80 backdrop-blur-sm border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text placeholder:text-text-secondary"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden z-50">
          {results.map((page, index) => (
            <a
              key={page.slug}
              href={`/${page.slug}`}
              className={`block px-4 py-3 transition-colors ${
                index === selectedIndex
                  ? 'bg-accent/20 text-accent'
                  : 'hover:bg-bg-tertiary'
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="font-medium">{page.title}</div>
              <div className="text-sm text-text-secondary truncate">{page.description}</div>
            </a>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary/95 backdrop-blur-md border border-border rounded-xl shadow-2xl p-4 text-center text-text-secondary z-50">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}

