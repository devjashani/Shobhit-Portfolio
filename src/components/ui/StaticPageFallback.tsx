import React from 'react';
import { PORTFOLIO_DATA } from '../../data/content';

export const StaticPageFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05060A] text-[#F1F2F6] font-sans p-6 sm:p-12 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="border-b border-white/10 pb-8 pt-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
          {PORTFOLIO_DATA.personal.name}
        </h1>
        <p className="text-cyan font-mono text-sm tracking-wider uppercase mb-4">
          {PORTFOLIO_DATA.personal.badge}
        </p>
        <p className="text-ink-muted text-base leading-relaxed mb-6">
          {PORTFOLIO_DATA.about.summary}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={PORTFOLIO_DATA.personal.cvUrl}
            download="Shobhit_Nandwana_CV_Revised.pdf"
            className="px-5 py-2.5 rounded-lg bg-cyan text-midnight font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan/90 transition-colors"
          >
            Download CV (PDF)
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="px-5 py-2.5 rounded-lg bg-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
          >
            Email: {PORTFOLIO_DATA.personal.email}
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
          >
            LinkedIn Profile
          </a>
        </div>
      </header>

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
          Experience
        </h2>
        <div className="space-y-8">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <span className="text-xs font-mono text-cyan">{exp.period}</span>
              </div>
              <p className="text-sm font-mono text-ink-muted">{exp.company} · {exp.location}</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-ink-light">
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="leading-relaxed">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
          Education
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PORTFOLIO_DATA.about.education.map((edu, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-xs font-mono text-mint">{edu.period}</span>
              <h3 className="text-base font-bold text-white">{edu.institution}</h3>
              <p className="text-sm text-ink-light">{edu.degree}</p>
              <p className="text-xs font-mono text-cyan">{edu.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
          Featured Research & Projects
        </h2>
        <div className="space-y-6">
          {PORTFOLIO_DATA.projects.map((proj, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-cyan">{proj.companyOrFocus}</span>
              <h3 className="text-lg font-bold text-white">{proj.title}</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-ink-light">
                {proj.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-2">
                {proj.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-white/5 text-xs font-mono text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-white/10 text-center text-xs font-mono text-ink-muted">
        <p>© 2026 {PORTFOLIO_DATA.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};
