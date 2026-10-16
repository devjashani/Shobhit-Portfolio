import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Download,
  Copy,
  ExternalLink,
  Check,
  Compass,
  FileText,
  Briefcase,
  Layers,
  Sparkles,
  Mail,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/content';

interface PaletteItem {
  id: string;
  category: 'NAVIGATION' | 'ACTIONS';
  title: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const items: PaletteItem[] = [
    {
      id: 'nav-home',
      category: 'NAVIGATION',
      title: 'Home // Terminal',
      icon: <Compass className="w-4 h-4 text-cyan" />,
      action: () => scrollTo('hero'),
    },
    {
      id: 'nav-about',
      category: 'NAVIGATION',
      title: 'About // Profile & Education',
      icon: <FileText className="w-4 h-4 text-violet" />,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-exp',
      category: 'NAVIGATION',
      title: 'Experience // Track Record',
      icon: <Briefcase className="w-4 h-4 text-cyan" />,
      action: () => scrollTo('experience'),
    },
    {
      id: 'nav-projects',
      category: 'NAVIGATION',
      title: 'Projects // Valuation & Analytics',
      icon: <Layers className="w-4 h-4 text-mint" />,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-skills',
      category: 'NAVIGATION',
      title: 'Skills & Leadership // Mandates',
      icon: <Sparkles className="w-4 h-4 text-violet" />,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      title: 'Contact // Let\'s Talk Markets',
      icon: <Mail className="w-4 h-4 text-mint" />,
      action: () => scrollTo('contact'),
    },
    {
      id: 'act-cv',
      category: 'ACTIONS',
      title: 'Download Revised CV (PDF)',
      shortcut: 'CV',
      icon: <Download className="w-4 h-4 text-cyan" />,
      action: () => {
        onClose();
        const a = document.createElement('a');
        a.href = PORTFOLIO_DATA.personal.cvUrl;
        a.download = 'Shobhit_Nandwana_CV_Revised.pdf';
        a.click();
      },
    },
    {
      id: 'act-email',
      category: 'ACTIONS',
      title: copied ? 'Copied to Clipboard!' : 'Copy Email Address',
      shortcut: 'COPY',
      icon: copied ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4 text-ink-muted" />,
      action: copyEmail,
    },
    {
      id: 'act-linkedin',
      category: 'ACTIONS',
      title: 'Open LinkedIn Profile',
      shortcut: 'LINK',
      icon: <ExternalLink className="w-4 h-4 text-cyan" />,
      action: () => {
        onClose();
        window.open(PORTFOLIO_DATA.personal.linkedInUrl, '_blank');
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#05060A]/80 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-midnight-surface/95 border border-white/10 rounded-2xl shadow-quant-glow overflow-hidden backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10">
              <Search className="w-5 h-5 text-ink-muted mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-ink-light placeholder-ink-muted text-sm font-sans focus:outline-none"
              />
              <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-ink-muted">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto py-2 px-2 divide-y divide-white/[0.04]">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-ink-muted">
                  No commands matching "{query}"
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-sans transition-colors ${
                        isSelected
                          ? 'bg-gradient-quant-subtle text-white border border-violet/30'
                          : 'text-ink-light hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                          {item.icon}
                        </span>
                        <span className="font-medium text-xs sm:text-sm tracking-tight">
                          {item.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.shortcut && (
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-ink-muted border border-white/10">
                            {item.shortcut}
                          </span>
                        )}
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-cyan" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Palette Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/10 text-[11px] font-mono text-ink-muted">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="text-cyan font-medium">MIDNIGHT QUANT v2.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
