import React, { useState } from 'react';
import {
  Copy,
  Check,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  Send,
  Download,
  AlertCircle,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/content';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email is required.';
    }
    if (!formData.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }
    setErrors({});

    const subject = encodeURIComponent(`Institutional Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Shobhit,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 8000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative pt-24 sm:pt-36 pb-12 overflow-hidden">
      
      {/* Background Soft Auroras */}
      <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-violet/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-1/4 w-[45vw] h-[45vw] rounded-full bg-cyan/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 section-container">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-mint uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-mint shadow-mint-glow" />
            <span>06 // INITIATE DIALOGUE</span>
          </div>

          <h2 className="font-display font-extrabold tracking-tighter text-white leading-[0.95] mb-6 section-heading">
            Let's talk{' '}
            <span className="gradient-text inline-block">
              markets.
            </span>
          </h2>

          <p className="font-sans text-lg sm:text-2xl text-ink-muted max-w-2xl font-normal leading-relaxed">
            Open to opportunities in Asset Management, Hedge Funds, Private Equity and Private Credit.
          </p>
        </div>

        {/* 2-Column Layout: Direct Channels & Underline Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          
          {/* Left Column: Large Contact Rows Separated by Hairlines */}
          <div className="lg:col-span-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            
            {/* Phone */}
            <a
              href={PORTFOLIO_DATA.personal.phoneTel}
              className="group py-6 flex items-center justify-between text-left transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-ink-muted uppercase tracking-widest block mb-1">
                  DIRECT LINE
                </span>
                <p className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan transition-colors">
                  {PORTFOLIO_DATA.personal.phone}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ink-muted group-hover:text-cyan group-hover:border-cyan/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </div>
            </a>

            {/* Email with Click to Copy */}
            <div className="group py-6 flex items-center justify-between text-left transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">
                    PRIMARY INBOX
                  </span>
                  {copiedEmail && (
                    <span className="font-mono text-xs text-mint flex items-center gap-1">
                      <Check className="w-3 h-3" /> COPIED!
                    </span>
                  )}
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.emailMailto}
                  className="font-display font-bold text-lg sm:text-2xl text-white group-hover:text-cyan transition-colors truncate block"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>
              
              <button
                type="button"
                onClick={copyEmail}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ink-muted hover:text-mint hover:border-mint/40 transition-all flex-shrink-0"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href={PORTFOLIO_DATA.personal.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-6 flex items-center justify-between text-left transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-ink-muted uppercase tracking-widest block mb-1">
                  LINKEDIN PROFILE
                </span>
                <p className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan transition-colors">
                  {PORTFOLIO_DATA.personal.linkedIn}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ink-muted group-hover:text-cyan group-hover:border-cyan/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </div>
            </a>

            {/* Location */}
            <div className="py-6 flex items-center justify-between text-left">
              <div>
                <span className="font-mono text-xs text-ink-muted uppercase tracking-widest block mb-1">
                  GEOGRAPHIC DOMICILE
                </span>
                <p className="font-display font-bold text-xl sm:text-2xl text-white">
                  {PORTFOLIO_DATA.personal.location}
                </p>
                <p className="font-mono text-xs text-ink-muted mt-0.5">
                  Institutional placement · Open to relocation
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cyan">
                <MapPin className="w-4 h-4" />
              </div>
            </div>

          </div>

          {/* Right Column: Minimal Underline Form */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-2xl bg-midnight-surface/50 border border-white/[0.08] backdrop-blur-md">
            <div className="mb-8">
              <span className="font-mono text-xs text-cyan uppercase tracking-widest block mb-1">
                DISPATCH NOTE
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Send a Mandate Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder=" "
                  className="peer w-full bg-transparent border-0 border-b border-white/20 pb-2 text-white font-sans text-sm sm:text-base focus:border-cyan focus:ring-0 focus:outline-none transition-colors"
                />
                <label
                  htmlFor="contact-name"
                  className="absolute left-0 top-0 font-mono text-xs text-ink-muted uppercase tracking-wider transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Your Name *
                </label>
                {errors.name && (
                  <p className="flex items-center gap-1 font-mono text-xs text-coral mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder=" "
                  className="peer w-full bg-transparent border-0 border-b border-white/20 pb-2 text-white font-sans text-sm sm:text-base focus:border-cyan focus:ring-0 focus:outline-none transition-colors"
                />
                <label
                  htmlFor="contact-email"
                  className="absolute left-0 top-0 font-mono text-xs text-ink-muted uppercase tracking-wider transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Institutional Email *
                </label>
                {errors.email && (
                  <p className="flex items-center gap-1 font-mono text-xs text-coral mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Message Input */}
              <div className="relative pt-2">
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder=" "
                  className="peer w-full bg-transparent border-0 border-b border-white/20 pb-2 text-white font-sans text-sm sm:text-base focus:border-cyan focus:ring-0 focus:outline-none transition-colors resize-none"
                />
                <label
                  htmlFor="contact-message"
                  className="absolute left-0 top-2 font-mono text-xs text-ink-muted uppercase tracking-wider transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Message & Role Scope *
                </label>
                {errors.message && (
                  <p className="flex items-center gap-1 font-mono text-xs text-coral mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Magnetic Gradient Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-quant hover:shadow-quant-glow text-midnight font-display font-extrabold text-sm tracking-tight transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  data-cursor="SEND"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>

                {isSent && (
                  <span className="font-mono text-xs text-mint flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Mail client launched!
                  </span>
                )}
              </div>

            </form>
          </div>

        </div>

        {/* Marquee Strip of Skill Keywords in Mono Font */}
        <div className="py-6 border-y border-white/[0.08] overflow-hidden my-12 select-none">
          <div className="flex w-[200%] animate-marquee">
            <div className="flex shrink-0 items-center gap-8 text-xs font-mono tracking-widest text-ink-muted/60 uppercase">
              {PORTFOLIO_DATA.marqueeSkills.map((keyword, kIdx) => (
                <span key={kIdx} className="inline-flex items-center gap-8">
                  <span>{keyword}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-8 text-xs font-mono tracking-widest text-ink-muted/60 uppercase pl-8">
              {PORTFOLIO_DATA.marqueeSkills.map((keyword, kIdx) => (
                <span key={`dup-${kIdx}`} className="inline-flex items-center gap-8">
                  <span>{keyword}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <footer className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">© 2026 Shobhit Nandwana</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5 text-mint font-semibold">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-mint-glow" />
              OPEN TO WORK
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_DATA.personal.cvUrl}
              download="Shobhit_Nandwana_CV_Revised.pdf"
              className="text-ink-muted hover:text-cyan transition-colors flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>

            <span>·</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="text-ink-muted hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan" />
            </button>
          </div>
        </footer>

      </div>

    </section>
  );
};
