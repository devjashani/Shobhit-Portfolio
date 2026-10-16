import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, CheckCircle2, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/content';

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const projA = PORTFOLIO_DATA.projects[0];
  const projB = PORTFOLIO_DATA.projects[1];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Slide horizontally between the 2 panels: 0vw to -100vw
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const activePanel = useTransform(scrollYProgress, [0, 0.5, 1], ['01', '01', '02']);
  const [panelIndicator, setPanelIndicator] = useState('01');

  useEffect(() => {
    return activePanel.on('change', (latest) => setPanelIndicator(latest));
  }, [activePanel]);

  const steps = projA.stepperSteps || [
    { title: 'Thesis', description: 'Deconstructed industry structure, competitive moats & growth drivers.' },
    { title: 'Valuation', description: 'Applied DCF, EV/EBITDA multiples, and P/E relative benchmarks.' },
    { title: 'Recommendation', description: 'Synthesized valuation ranges into an actionable price corridor.' },
  ];

  return (
    <section id="projects" className="relative border-b border-white/[0.08]">
      
      {/* Pinned Horizontal Container (Desktop) or Vertical Stack (Mobile) */}
      <div ref={containerRef} className={isMobile ? 'py-20' : 'h-[240vh] relative'}>
        
        <div className={isMobile ? 'px-4 sm:px-6' : 'sticky top-0 h-screen flex flex-col justify-center overflow-hidden'}>
          
          {/* Section Indicator Bar */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pt-6 pb-4 flex items-center justify-between border-b border-white/[0.08] relative z-20">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-mint uppercase">
              <span className="w-2 h-2 rounded-full bg-mint shadow-mint-glow" />
              <span>04 // FEATURED VALUATION & ANALYTICS RESEARCH</span>
            </div>

            <div className="font-mono text-xs text-ink-muted flex items-center gap-2">
              <span className="text-cyan font-bold">{panelIndicator}</span>
              <span>/ 02 PANELS</span>
            </div>
          </div>

          {/* Horizontal Track (or vertical on mobile) */}
          <motion.div
            style={isMobile ? {} : { x }}
            className={
              isMobile
                ? 'space-y-16 pt-10'
                : 'flex w-[200vw] h-[calc(100vh-80px)] items-center'
            }
          >

            {/* PANEL A: Equity Research (Apollo Tyres and Devyani International) */}
            <div className={isMobile ? 'w-full' : 'w-[100vw] px-6 lg:px-16 flex items-center justify-center'}>
              <div className="max-w-6xl w-full mx-auto relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-midnight-surface/80 border border-white/[0.08] backdrop-blur-xl shadow-quant-glow overflow-hidden project-card">
                
                {/* Giant Faded 'A' in the Background */}
                <div className="absolute -top-12 -right-8 font-display font-extrabold text-[14rem] sm:text-[18rem] text-white/[0.025] select-none pointer-events-none">
                  A
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  
                  {/* Left Column: Thesis & Stepper */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <span className="font-mono text-xs text-cyan uppercase tracking-wider block mb-2 font-semibold">
                        {projA.companyOrFocus}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                        {projA.title}
                      </h3>
                    </div>

                    {/* Bullets */}
                    <div className="space-y-3">
                      {projA.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0 mt-1" />
                          <p className="text-ink-light/90 text-sm leading-relaxed">{b}</p>
                        </div>
                      ))}
                    </div>

                    {/* Animated 3-Step Stepper */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-ink-muted uppercase">Methodology Progression</span>
                        <span className="text-mint font-semibold">STEP 0{activeStep + 1} / 03</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {steps.map((st, sIdx) => (
                          <button
                            key={st.title}
                            type="button"
                            onClick={() => setActiveStep(sIdx)}
                            className={`py-2 px-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                              activeStep === sIdx
                                ? 'bg-gradient-quant text-midnight shadow-cyan-glow'
                                : 'bg-white/5 text-ink-muted hover:bg-white/10'
                            }`}
                          >
                            {st.title}
                          </button>
                        ))}
                      </div>

                      <div className="text-xs text-ink-muted font-sans bg-black/40 p-3 rounded-lg border border-white/5">
                        <span className="text-white font-semibold">{steps[activeStep].title}: </span>
                        {steps[activeStep].description}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {projA.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Football Field Chart Visual */}
                  <div className="lg:col-span-6 p-6 rounded-2xl bg-black/60 border border-white/10 relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-violet" />
                        <span className="font-mono text-xs font-semibold uppercase text-white tracking-wider">
                          Valuation Corridor Analysis
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-ink-muted border border-white/10">
                        {projA.illustrativeNote}
                      </span>
                    </div>

                    {/* Horizontal Range Bars */}
                    <div className="space-y-4">
                      {projA.valuationRanges?.map((range, rIdx) => {
                        const baseMin = 420;
                        const baseMax = 650;
                        const leftPct = ((range.low - baseMin) / (baseMax - baseMin)) * 100;
                        const widthPct = ((range.high - range.low) / (baseMax - baseMin)) * 100;
                        const midPct = ((range.mid - range.low) / (range.high - range.low)) * 100;

                        return (
                          <div
                            key={rIdx}
                            onMouseEnter={() => setHoveredBar(rIdx)}
                            onMouseLeave={() => setHoveredBar(null)}
                            className="relative space-y-1.5 cursor-pointer group"
                          >
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-ink-light group-hover:text-cyan transition-colors">
                                {range.method}
                              </span>
                              <span className="text-cyan font-bold">
                                {range.format}{range.low} – {range.format}{range.high}
                              </span>
                            </div>

                            <div className="relative h-6 bg-white/[0.04] rounded-md overflow-hidden border border-white/5">
                              {/* Animated Range Bar */}
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.15 + rIdx * 0.1 }}
                                style={{
                                  left: `${leftPct}%`,
                                  width: `${widthPct}%`,
                                  transformOrigin: 'left',
                                }}
                                className="absolute top-1 bottom-1 bg-gradient-quant rounded flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
                              >
                                {/* Mid Target Marker */}
                                <div
                                  style={{ left: `${midPct}%` }}
                                  className="absolute top-0 bottom-0 w-1 bg-white shadow-mint-glow"
                                />
                              </motion.div>
                            </div>

                            {/* Floating Tooltip */}
                            {hoveredBar === rIdx && (
                              <div className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-midnight-elevated border border-cyan/40 text-[10px] font-mono text-cyan shadow-cyan-glow z-20">
                                Median Target: {range.format}{range.mid}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Scale Markings */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-ink-muted/50 mt-6 pt-3 border-t border-white/10">
                      <span>₹420</span>
                      <span>₹500</span>
                      <span className="text-cyan font-semibold">CORRIDOR ₹540–₹565</span>
                      <span>₹650</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* PANEL B: Sales Analytics Dashboard (Tableau) */}
            <div className={isMobile ? 'w-full' : 'w-[100vw] px-6 lg:px-16 flex items-center justify-center'}>
              <div className="max-w-6xl w-full mx-auto relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-midnight-surface/80 border border-white/[0.08] backdrop-blur-xl shadow-quant-glow overflow-hidden project-card">
                
                {/* Giant Faded 'B' in Background */}
                <div className="absolute -top-12 -right-8 font-display font-extrabold text-[14rem] sm:text-[18rem] text-white/[0.025] select-none pointer-events-none">
                  B
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  
                  {/* Left Column: Thesis & Bullets */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <span className="font-mono text-xs text-mint uppercase tracking-wider block mb-2 font-semibold">
                        {projB.companyOrFocus}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                        {projB.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {projB.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-mint flex-shrink-0 mt-1" />
                          <p className="text-ink-light/90 text-sm leading-relaxed">{b}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-ink-muted space-y-2">
                      <div className="flex justify-between items-center text-white">
                        <span>DATA PIPELINE:</span>
                        <span className="text-mint font-bold">10,000+ TXNS CLEANED</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Synthesized transactional telemetry to expose revenue drivers, churn risk indicators, and segment contribution margins.
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {projB.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-mint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Dark Tableau Dashboard Mockup */}
                  <div className="lg:col-span-6 p-6 rounded-2xl bg-black/60 border border-white/10 relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cyan" />
                        <span className="font-mono text-xs font-semibold uppercase text-white tracking-wider">
                          Executive KPI Telemetry
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-ink-muted border border-white/10">
                        {projB.illustrativeNote}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Donut Segment Visual */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center">
                        <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wider mb-2 self-start">
                          Segment Share
                        </span>
                        
                        <div className="relative w-28 h-28 my-1 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                            {/* Segment 1: 44% */}
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#8B5CF6"
                              strokeWidth="14"
                              strokeDasharray="238.76"
                              initial={{ strokeDashoffset: 238.76 }}
                              whileInView={{ strokeDashoffset: 238.76 * (1 - 0.44) }}
                              viewport={{ once: true }}
                              transition={{ duration: 1 }}
                            />
                            {/* Segment 2: 32% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#22D3EE"
                              strokeWidth="14"
                              strokeDasharray="238.76"
                              strokeDashoffset={238.76 * (1 - 0.32)}
                              style={{ transformOrigin: 'center', transform: 'rotate(158deg)' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-mono font-bold text-sm text-white">10K+</span>
                            <span className="font-mono text-[8px] text-ink-muted uppercase">Rows</span>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-1 text-[9px] font-mono mt-2">
                          <span className="flex items-center gap-1 text-violet">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet" /> B2B 44%
                          </span>
                          <span className="flex items-center gap-1 text-cyan">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan" /> Mid 32%
                          </span>
                        </div>
                      </div>

                      {/* Bar Volume Visual */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                            Txn Run Rate
                          </span>
                          <span className="font-mono text-[10px] text-mint font-bold">+34% H1</span>
                        </div>

                        <div className="flex items-end justify-between h-24 gap-1.5 pt-2">
                          {projB.chartData?.monthlyVolume.map((mv, mIdx) => {
                            const max = 2000;
                            const hPct = (mv.value / max) * 100;
                            return (
                              <div key={mv.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                                <motion.div
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${hPct}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.5, delay: mIdx * 0.08 }}
                                  className={`w-full rounded-t-sm ${
                                    mIdx === 5 ? 'bg-gradient-quant' : 'bg-white/20 hover:bg-white/30'
                                  }`}
                                />
                                <span className="font-mono text-[8px] text-ink-muted">
                                  {mv.month}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                      <span>Visualization Suite: Tableau Enterprise</span>
                      <span className="text-cyan">Interactive Drilldown</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>

    </section>
  );
};
