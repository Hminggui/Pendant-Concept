import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate, MotionConfig } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown, 
  Leaf, 
  Globe, 
  PenTool, 
  Box, 
  Calendar, 
  ArrowRight,
  Mountain,
  Sprout,
  Wind,
  AlertCircle,
  ShoppingBag,
  Share2,
  Maximize,
  Heart,
  Layers,
  Zap,
  ZapOff,
  Download,
  Loader2,
  Bookmark,
  MapPin
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Slide Component Wrapper
 */
const Slide = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section className={`slide-section ${className}`} id={id}>
    {children}
  </section>
);

/**
 * Section Header Component
 */
const SectionHeader = ({ num, title, en, isExporting = false }: { num: string, title: string, en: string, isExporting?: boolean }) => (
  <motion.div 
    initial={isExporting ? false : { opacity: 0, y: 20 }}
    whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    className={`flex justify-between items-end border-b border-white/10 mb-12 pb-6`}
  >
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30">{en}</p>
      <h2 className="text-2xl font-serif italic text-white/90">{title}</h2>
    </div>
    <div className="text-[11px] font-mono text-white/30 tabular-nums pb-1">SEC_REF / {num}_07</div>
  </motion.div>
);

/**
 * Decorative Irregular Shape
 */
const IrregularShape = ({ delay = 0, className = "", color = "var(--color-brand-vibrant)", animationsEnabled = true, isExporting = false }: { delay?: number; className?: string, color?: string, animationsEnabled?: boolean, isExporting?: boolean }) => (
  <motion.svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute pointer-events-none opacity-30 blur-xl ${className}`}
    initial={isExporting ? false : { opacity: 0, scale: 0.7, rotate: -15 }}
    whileInView={isExporting ? undefined : { opacity: 0.4, scale: 1.2, rotate: 0 }} 
    animate={isExporting ? { opacity: 0.4, scale: 1.2, rotate: 0 } : undefined}
    transition={{ duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] }}
  >
    <motion.path
      fill={color}
      d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.5,-0.9C83.9,13.8,77.3,27.7,69.1,40.1C60.9,52.5,51.1,63.5,39,71.2C26.9,78.9,13.5,83.3,-0.7,84.4C-14.8,85.5,-29.6,83.3,-42.4,76.4C-55.2,69.5,-66,57.9,-73.6,44.7C-81.2,31.5,-85.7,16.7,-84.9,2.2C-84.1,-12.3,-78,-26.4,-69.5,-38.7C-61,-51,-50.1,-61.5,-37.7,-69.4C-25.3,-77.3,-12.7,-82.6,1,-84.3C14.7,-86,28.4,-84.1,44.7,-76.4Z"
      transform="translate(100 100)"
      animate={animationsEnabled ? {
        d: [
            "M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.5,-0.9C83.9,13.8,77.3,27.7,69.1,40.1C60.9,52.5,51.1,63.5,39,71.2C26.9,78.9,13.5,83.3,-0.7,84.4C-14.8,85.5,-29.6,83.3,-42.4,76.4C-55.2,69.5,-66,57.9,-73.6,44.7C-81.2,31.5,-85.7,16.7,-84.9,2.2C-84.1,-12.3,-78,-26.4,-69.5,-38.7C-61,-51,-50.1,-61.5,-37.7,-69.4C-25.3,-77.3,-12.7,-82.6,1,-84.3C14.7,-86,28.4,-84.1,44.7,-76.4Z",
            "M40,-69.3C51.1,-63.9,58.8,-51.1,64.4,-38.4C70,-25.7,73.5,-12.8,73.9,0.2C74.4,13.3,71.7,26.5,65.3,37.8C58.9,49.1,48.7,58.5,37.1,65.8C25.4,73.1,12.7,78.3,-0.7,79.5C-14.1,80.7,-28.2,77.8,-40.4,70.9C-52.5,64.1,-62.7,53.2,-69.7,40.8C-76.7,28.3,-80.5,14.2,-79.8,0.4C-79.1,-13.4,-73.9,-26.8,-65.4,-37.9C-56.9,-49,-45.1,-57.8,-32.8,-62.5C-20.5,-67.2,-10.3,-67.9,1.3,-70.1C12.8,-72.4,25.7,-76.2,40,-69.3Z",
            "M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.5,-0.9C83.9,13.8,77.3,27.7,69.1,40.1C60.9,52.5,51.1,63.5,39,71.2C26.9,78.9,13.5,83.3,-0.7,84.4C-14.8,85.5,-29.6,83.3,-42.4,76.4C-55.2,69.5,-66,57.9,-73.6,44.7C-81.2,31.5,-85.7,16.7,-84.9,2.2C-84.1,-12.3,-78,-26.4,-69.5,-38.7C-61,-51,-50.1,-61.5,-37.7,-69.4C-25.3,-77.3,-12.7,-82.6,1,-84.3C14.7,-86,28.4,-84.1,44.7,-76.4Z"
        ]
      } : {}}
      transition={animationsEnabled ? {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    />
  </motion.svg>
);

const DecorativeBlob = ({ className = "", delay = 0, size = "w-96", animationsEnabled = true, isExporting = false }: { className?: string; delay?: number, size?: string, animationsEnabled?: boolean, isExporting?: boolean }) => (
  <motion.div
    initial={isExporting ? false : { opacity: 0, scale: 0.5 }}
    whileInView={isExporting ? undefined : { opacity: 0.25, scale: 1 }}
    animate={isExporting ? { opacity: 0.25, scale: 1 } : (animationsEnabled ? { x: [0, 20, -20, 0], y: [0, -20, 20, 0] } : {})}
    viewport={{ once: false }}
    transition={{ 
      duration: 3.5, 
      delay, 
      ease: [0.16, 1, 0.3, 1],
      repeat: animationsEnabled ? Infinity : 0,
      repeatType: "reverse"
    }}
    className={`absolute pointer-events-none rounded-full blur-[120px] bg-brand-vibrant aspect-square ${size} ${className}`}
  />
);

export default function App() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [pdfReadyUrl, setPdfReadyUrl] = useState<string | null>(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    // Disable animations temporarily for clean capture
    const wasEnabled = animationsEnabled;
    setAnimationsEnabled(false);
    
    // Save scroll position and scroll to top for html2canvas
    const originalScrollPos = window.scrollY || document.documentElement.scrollTop;
    window.scrollTo(0, 0);

    // Give state time to update, animations to reset, and scrolling to finish
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Capture the whole scroll container
      const element = document.querySelector('.scroll-container') as HTMLElement;
      if (!element) throw new Error("Scroll container not found");

      // Hide interactive elements before capturing
      const exportBtn = document.querySelector('.animations-toggle-container') as HTMLElement;
      if (exportBtn) exportBtn.style.display = 'none';

      const width = element.scrollWidth;
      const height = element.scrollHeight;

      const dataUrl = await htmlToImage.toJpeg(element, { 
        quality: 0.85,
        backgroundColor: '#0A0A0A',
        width: width,
        height: height
      });

      // Restore interactive elements
      if (exportBtn) exportBtn.style.display = '';

      // Calculate sizes to maintain aspect ratio
      const pdf = new jsPDF({
        orientation: width > height ? 'l' : 'p',
        unit: 'px',
        format: [width, height],
        compress: true
      });

      pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
      
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfReadyUrl(url);

    } catch (error) {
      console.error('PDF Export failed:', error);
      alert('导出 PDF 时发生错误：' + (error as Error).message);
    } finally {
      window.scrollTo(0, originalScrollPos);
      setAnimationsEnabled(wasEnabled);
      setIsExporting(false);
    }
  };

  const scrollToInsight = () => {
    const target = document.getElementById('insight');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig transition={!animationsEnabled ? { duration: 0 } : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
      <div className="relative">
        {/* Animation & Export Toggle Button */}
        <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-2 animations-toggle-container">
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500 text-[10px] font-mono uppercase tracking-widest cursor-pointer ${
              animationsEnabled 
                ? 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white' 
                : 'bg-brand-vibrant/20 border-brand-vibrant/40 text-brand-vibrant font-bold'
            }`}
          >
            {animationsEnabled ? (
              <>
                <Zap size={12} />
                <span>Motion On</span>
              </>
            ) : (
              <>
                <ZapOff size={12} />
                <span>Motion Off (Screenshot Mode)</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500 text-[10px] font-mono uppercase tracking-widest cursor-pointer ${
              isExporting 
                ? 'bg-white/10 border-white/20 text-white/60' 
                : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isExporting ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download size={12} />
                <span>Export PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] aspect-square bg-white rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] aspect-square bg-white/20 rounded-full blur-[120px]" />
      </div>

      {/* Navigation removed */}

      <main className="scroll-container">
        
        {/* PDF Ready Modal */}
        <AnimatePresence>
          {pdfReadyUrl && (
            <motion.div 
              initial={isExporting ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-8 backdrop-blur-sm"
            >
              <motion.div 
                initial={isExporting ? false : { scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-brand-mid border border-white/10 p-8 rounded-lg max-w-md w-full text-center space-y-6 shadow-2xl"
              >
                <h3 className="text-xl font-serif italic text-white">PDF 生成完毕</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  由于预览环境限制，直接下载可能被拦截。<br/>请点击下方按钮通过新窗口下载。
                </p>
                <div className="flex gap-4 justify-center">
                  <a 
                    href={pdfReadyUrl} 
                    download="四季瓜果-演示.pdf" 
                    target="_blank"
                    rel="noreferrer"
                    className="bg-brand-vibrant text-black px-6 py-3 rounded-sm font-bold uppercase text-xs hover:opacity-90 transition"
                  >
                    下载 PDF
                  </a>
                  <button 
                    onClick={() => {
                      setPdfReadyUrl(null);
                      // Cleanup the object URL when closed
                      URL.revokeObjectURL(pdfReadyUrl);
                    }} 
                    className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 transition rounded-sm text-xs uppercase"
                  >
                    关闭
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 01. Hero Slide */}
        <Slide id="hero">
          <DecorativeBlob isExporting={isExporting} className="top-1/4 -left-20 opacity-20" size="w-96" animationsEnabled={animationsEnabled} />
          <IrregularShape isExporting={isExporting} className="top-10 right-10 w-64 h-64" delay={0.5} animationsEnabled={animationsEnabled} />
          <div className="absolute inset-0 z-10 flex items-center px-12 md:px-24">
            <div className="w-full grid md:grid-cols-2 items-center gap-12">
              <motion.div
                initial={isExporting ? false : { opacity: 0, x: -30 }}
                whileInView={isExporting ? undefined : { opacity: 1, x: 0 }} animate={isExporting ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="relative z-20"
              >
                  <motion.div 
                  initial={isExporting ? false : { opacity: 0 }}
                  whileInView={isExporting ? undefined : { opacity: 1 }} animate={isExporting ? { opacity: 1 } : undefined}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                  className="text-white/30 text-[10px] font-mono tracking-[0.4em] uppercase mb-8"
                >
                  Rural Revitalization / Strategic Archive
                </motion.div>
                <motion.h1 
                  initial={isExporting ? false : { opacity: 0, y: 20 }}
                  whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                  className="text-6xl md:text-8xl font-serif italic text-white/90 leading-tight mb-8"
                >
                  四季瓜果：<br />
                  <span className="text-brand-accent not-italic font-sans font-black tracking-tighter">田园故事.</span>
                </motion.h1>
                <motion.p 
                  initial={isExporting ? false : { opacity: 0, y: 20 }}
                  whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                  className="text-base text-white/50 max-w-sm leading-relaxed mb-12 font-light"
                >
                  以四季瓜果为媒，探讨极致写实美学与乡村文创的突围之路。让每一把钥匙，都能打开乡土的情怀。
                </motion.p>
                <motion.div 
                  initial={isExporting ? false : { opacity: 0 }}
                  whileInView={isExporting ? undefined : { opacity: 1 }} animate={isExporting ? { opacity: 1 } : undefined}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1 }}
                  className="flex gap-6"
                >
                  <motion.button 
                    onClick={scrollToInsight}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-black px-10 py-4 rounded-sm font-sans font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                  >
                    开始阅读 <ChevronRight size={14} />
                  </motion.button>
                </motion.div>
              </motion.div>

              <div className="relative flex justify-center">
                <motion.div
                  initial={isExporting ? false : { opacity: 0, scale: 0.98, x: 20 }}
                  whileInView={isExporting ? undefined : { opacity: 1, scale: 1, x: 0 }} animate={isExporting ? { opacity: 1, scale: 1, x: 0 } : undefined}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                  className="relative z-10"
                >
                  <div className="w-72 h-96 relative flex items-center justify-center">
                    <div className="absolute w-full h-full border border-white/5 rounded-full blur-3xl opacity-10 bg-white"></div>
                    <div className="w-64 h-80 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl backdrop-blur-sm shadow-2xl relative flex flex-col justify-end p-8 overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.05),_transparent_70%)]"></div>
                        <img src="/Image/大蒜.png" alt="Fresh" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[3s]" referrerPolicy="no-referrer" />
                        <div className="relative z-10">
                          <div className="h-[1px] w-12 bg-white/40 mb-4"></div>
                          <div className="text-[10px] text-white/40 font-mono tracking-widest leading-none mb-2">AURA SERIES</div>
                          <div className="text-xl font-serif italic text-white/90">乡村情谊的微缩版</div>
                        </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Slide>

        {/* 02. Insight Slide: Market & Dilemma */}
        <Slide id="insight">
          <DecorativeBlob isExporting={isExporting} className="-bottom-20 -right-20" size="w-[500px]" delay={0.2} animationsEnabled={animationsEnabled} />
          <IrregularShape isExporting={isExporting} className="top-1/2 left-1/3 w-96 h-96 opacity-10" delay={0.8} animationsEnabled={animationsEnabled} />
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24">
            <SectionHeader isExporting={isExporting} num="01" title="核心困局" en="Market Status & Dilemma" />
            <div className="grid md:grid-cols-2 gap-20 flex-grow content-center">
              <div className="space-y-12">
                <motion.div 
                  initial={isExporting ? false : { opacity: 0, x: -20 }}
                  whileInView={isExporting ? undefined : { opacity: 1, x: 0 }} animate={isExporting ? { opacity: 1, x: 0 } : undefined}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-white/30">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-mono tracking-widest uppercase">市场现状 / Market Reality</span>
                  </div>
                  <h3 className="text-3xl font-serif italic text-white/90">审美疲劳与廉价感标签</h3>
                  <p className="text-sm text-white/40 leading-loose">
                    现有市场充斥着低龄化的“卡通拟人”设计，导致产品缺乏深度。传统乡村文创多为粗糙的塑料制品，无法承载“乡村振兴”的厚重感与社交张力。
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  {[
                    { label: '认知偏差', desc: '习惯了廉价属性，难受高溢价。' },
                    { label: '场景错配', desc: '脱离了产地烟火气或质感不足。' },
                    { label: '复购魔咒', desc: '一锤子买卖，缺乏长效链接。' },
                    { label: '传播断层', desc: '缺乏视觉张力，难以自发传播。' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={isExporting ? false : { opacity: 0, y: 10 }}
                      whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
                      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
                      className="border-l border-white/10 pl-4 space-y-2"
                    >
                      <div className="text-white/80 text-sm font-serif italic">{item.label}</div>
                      <div className="text-[10px] text-white/30 leading-relaxed font-light">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <motion.div 
                   initial={isExporting ? false : { opacity: 0, scale: 0.95 }}
                   whileInView={isExporting ? undefined : { opacity: 1, scale: 1 }} animate={isExporting ? { opacity: 1, scale: 1 } : undefined}
                   className="aspect-square bg-white/[0.02] border border-white/5 p-12 flex flex-col justify-center items-center text-center relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-[10rem] font-serif">!</div>
                  <Maximize className="text-white/10 mb-8" size={48} />
                  <h4 className="text-2xl font-serif italic mb-6">乡村文创的三座大山</h4>
                  <div className="w-12 h-px bg-white/20 mb-8" />
                  <p className="text-xs text-white/40 max-w-xs leading-loose">
                    我们需要一种全新的表述方式，<br />
                    打破“塑料化”困局，<br />
                    重塑乡土美学的高级感。
                  </p>
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </Slide>

        {/* 03. Strategy Slide: Three Pillars */}
        <Slide id="strategy">
          <DecorativeBlob isExporting={isExporting} className="top-0 left-1/2 -translate-x-1/2" size="w-80" delay={0.4} animationsEnabled={animationsEnabled} />
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24">
            <SectionHeader isExporting={isExporting} num="02" title="破圈策略" en="Three-Fold Breakthrough" />
            <div className="grid md:grid-cols-3 gap-8 flex-grow content-center">
              {[
                { 
                  title: '审美破圈', 
                  strategy: '极致写实与“物性”表达', 
                  desc: '拒绝拟人化，还原大蒜干枯皮层、辣椒皱褶肌理，走“微缩艺术标本”路线。',
                  icon: <Maximize size={24} />
                },
                { 
                  title: '心理破圈', 
                  strategy: '从“装饰品”到“情感嘴替”', 
                  desc: '赋予产品社交货币属性，让农产品成为现代人情绪的情绪铭牌。',
                  icon: <Heart size={24} />
                },
                { 
                  title: '商业破圈', 
                  strategy: '买赠纽带与云端入场券', 
                  desc: '挂件是流量入口，后端农产品是增值核心，建立长期复购机制。',
                  icon: <ShoppingBag size={24} />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={isExporting ? false : { opacity: 0, y: 30 }}
                  whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.2 }}
                  className="p-8 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all flex flex-col gap-8 rounded-sm"
                >
                  <div className="text-white/20">{item.icon}</div>
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Strategy 0{i+1}</div>
                    <div className="text-xl font-serif italic text-white/90">{item.title}</div>
                    <div className="h-px w-8 bg-white/20" />
                    <div className="text-sm font-medium text-white/70">{item.strategy}</div>
                    <p className="text-xs text-white/30 leading-loose">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 04. Aesthetic Slide: Realism */}
        <Slide id="aesthetic">
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24">
            <SectionHeader isExporting={isExporting} num="03" title="极致写实" en="Aesthetic Realism" />
            <div className="grid md:grid-cols-2 gap-20 items-center flex-grow">
               <div className="relative">
                  <motion.div 
                    initial={isExporting ? false : { opacity: 0, y: 30 }}
                    whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
                    className="aspect-[4/5] bg-white/[0.02] border border-white/10 p-4 rounded-sm overflow-hidden"
                  >
                    <img src="/Image/苦瓜.png" alt="Bitter Gourd" className="w-full h-full object-cover grayscale brightness-90 hover:scale-105 transition-transform duration-[3s]" referrerPolicy="no-referrer" />
                  </motion.div>
                  <div className="absolute -bottom-8 -left-8 p-12 bg-black border border-white/10 z-20 hidden md:block shadow-2xl">
                     <div className="text-[10px] font-mono text-white/30 mb-2 uppercase">Micro Details</div>
                     <div className="text-xl font-serif italic">还原生命的皱褶</div>
                  </div>
               </div>
               <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Visual Logic</div>
                    <h3 className="text-4xl font-serif italic leading-tight text-white/90">拒绝画眼睛加嘴巴，<br />我们还原“物性”。</h3>
                    <p className="text-sm text-white/40 leading-loose">
                      利用“极致真实”造成的视觉冲击制造溢价。让挂件不再是玩具，而是一个“被缩小的自然艺术品”。从生姜的皮质到大蒜的干枯，每一寸皆是叙事。
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-8">
                     <div className="space-y-2">
                        <div className="text-xl font-serif italic text-white/80">艺术标本化</div>
                        <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wider">Natural Specimen logic</p>
                     </div>
                     <div className="space-y-2">
                        <div className="text-xl font-serif italic text-white/80">视觉溢价</div>
                        <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wider">Visual Value creation</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </Slide>

        {/* 05. Emotion Slide: The emotional labels */}
        <Slide id="emotion">
          <IrregularShape isExporting={isExporting} className="bottom-0 right-0 w-[400px] h-[400px]" delay={0.6} animationsEnabled={animationsEnabled} />
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24">
            <SectionHeader isExporting={isExporting} num="04" title="情感嘴替" en="Psychological Labels" />
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {[
                { 
                  name: '红辣椒', 
                  label: '今日火大，生人勿近。', 
                  spirit: '社交边界的表达',
                  bg: '/Image/辣椒.png'
                },
                { 
                  name: '苦瓜', 
                  label: '生活虽苦，内心清火。', 
                  spirit: '职场压力的共情',
                  bg: '/Image/苦瓜.png'
                },
                { 
                  name: '大蒜', 
                  label: '凡事大不了“算”了。', 
                  spirit: '豁达心态的投射',
                  bg: '/Image/大蒜.png'
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={isExporting ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={isExporting ? undefined : { opacity: 1, scale: 1 }} animate={isExporting ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.2 }}
                  className="group relative h-[450px] overflow-hidden rounded-sm border border-white/5"
                >
                  <img src={item.bg} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 transition-transform duration-[4s]" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                    <div className="text-[10px] font-mono text-white/30 mb-8">{item.spirit}</div>
                    <h4 className="text-2xl font-serif italic text-white/90 mb-4">{item.name}</h4>
                    <div className="w-10 h-px bg-white/40 mb-6" />
                    <p className="text-lg font-serif italic text-white/90">“{item.label}”</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
               <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">人们买的不是大蒜，而是一个替自己表达状态的社交符号。</p>
            </div>
          </div>
        </Slide>

        {/* 06. Commercial Slide: Business Loop */}
        <Slide id="commercial">
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24">
            <SectionHeader isExporting={isExporting} num="05" title="商业破圈" en="The Business Loop" />
            <div className="grid md:grid-cols-12 gap-16 items-center flex-grow">
              <div className="md:col-span-7 space-y-12">
                 <div className="space-y-6">
                    <h3 className="text-4xl font-serif italic text-white/90">买赠纽带与云端入场券</h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      挂件只是流量入口，后端农产品才是增值核心。将“刚需购买”升级为“惊喜体验”，实现乡村振兴的闭环。每一把钥匙扣，都是一张通往田园的云端门票。
                    </p>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-8">
                   <div className="p-8 bg-white/[0.02] border border-white/10 rounded-sm">
                      <Layers className="text-white/20 mb-4" size={20} />
                      <div className="font-serif italic text-white/80 mb-2">数字链接</div>
                      <p className="text-[10px] text-white/30 leading-relaxed">背卡附带二维码，直达产地溯源直播间，建立长期联接机制。</p>
                   </div>
                   <div className="p-8 bg-white/[0.02] border border-white/10 rounded-sm">
                      <ShoppingBag className="text-white/20 mb-4" size={20} />
                      <div className="font-serif italic text-white/80 mb-2">增值核心</div>
                      <p className="text-[10px] text-white/30 leading-relaxed">购买指定金额农产品附赠同款挂件，提升品牌溢价与满意度。</p>
                   </div>
                 </div>
              </div>

              <div className="md:col-span-5 relative">
                 <div className="aspect-[3/4] border-2 border-white/5 p-4 rounded-sm group overflow-hidden relative">
                    <img 
                      src="/Image/蒜头设计图.png" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[5s]" 
                      alt="Design Blueprint" 
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity group-hover:opacity-0" />
                    <div className="w-full h-full relative z-10 flex flex-col justify-center items-center p-12 text-center gap-8 border border-white/10">
                      <Globe className="text-white/20" size={60} />
                      <div className="space-y-4">
                        <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Digital Traceability</div>
                        <div className="text-2xl font-serif italic text-white/90">设计图纸：还原物性</div>
                        <div className="w-12 h-12 border border-white/20 mx-auto opacity-50" />
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* 07. Packaging & Communication */}
        <Slide id="packaging">
           <div className="relative z-10 h-full flex flex-col p-12 md:p-24">
            <SectionHeader isExporting={isExporting} num="06" title="传播与包装" en="Eco-Aesthetic Return" />
            <div className="grid md:grid-cols-2 gap-20 items-center flex-grow">
               <div className="space-y-12 order-2 md:order-1">
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
                       <Sprout size={12} /> Breathable Materials
                    </div>
                    <h3 className="text-3xl font-serif italic text-white/90">高级感的乡土复归</h3>
                    <p className="text-sm text-white/40 leading-loose">
                      包装采用具有“呼吸感”的再生纸、微缩网兜、牛皮纸封。文案摒弃宏大叙事，用最朴素的“大白话”讲最真诚的田园故事。
                    </p>
                  </div>
                  
                  <div className="p-10 border-l-2 border-white/10 bg-white/[0.01]">
                     <blockquote className="text-xl font-serif italic text-white/70 leading-relaxed">
                        “在粗粝的泥土、木材 or 麻布之上，强调‘从泥土中生长出的高级感’。”
                     </blockquote>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 order-1 md:order-2 h-96">
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-white/[0.02] border border-white/10 rounded-sm flex flex-col items-center justify-center gap-4">
                     <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Natural Fibers</span>
                     <div className="w-12 h-px bg-white/20" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-white/[0.03] border border-white/10 rounded-sm flex flex-col items-center justify-center gap-4 translate-y-8">
                     <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Recycled Paper</span>
                     <div className="w-12 h-px bg-white/20" />
                  </motion.div>
               </div>
            </div>
          </div>
        </Slide>

        {/* 08. Cultural Tag System */}
        <Slide id="culture">
          <DecorativeBlob isExporting={isExporting} className="top-10 -right-20 opacity-20" size="w-[450px]" delay={0.3} animationsEnabled={animationsEnabled} />
          <IrregularShape isExporting={isExporting} className="bottom-10 left-10 w-72 h-72 opacity-10" delay={0.6} animationsEnabled={animationsEnabled} />
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24 justify-center">
            <SectionHeader isExporting={isExporting} num="07" title="文化名牌与产品溯源" en="Cultural Tag & Origin System" />
            <div className="grid md:grid-cols-12 gap-12 items-center flex-grow">
               
               {/* Left Description Column */}
               <div className="md:col-span-7 space-y-8 order-2 md:order-1">
                  <div className="space-y-4">
                     <span className="text-[10px] font-mono text-brand-vibrant uppercase tracking-widest flex items-center gap-2">
                        <Layers size={12} /> Cultural Value Identity
                     </span>
                     <h3 className="text-3xl md:text-4xl font-serif italic text-white/95 leading-tight">
                        一枚连接风土与消费者的<span className="text-brand-accent not-italic font-sans font-black">“乡村名牌”</span>
                     </h3>
                     <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
                        我们为每一个农特产品量身定做了“解释性挂饰”。这枚名牌不仅是高美感的实体配饰，更是一套成熟的产品溯源与文化理论体系，用于打破城乡壁垒，让消费者清晰洞察产品来源并深度认同背后故事。
                     </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                     <div className="space-y-2 p-5 bg-white/[0.01] border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 text-white/90 font-serif">
                           <MapPin size={14} className="text-brand-vibrant" />
                           <span className="text-sm tracking-wider">01. 明确的产品来源 (Origin)</span>
                        </div>
                        <p className="text-xs text-white/45 leading-relaxed">
                           详细印制物产的地理原产地、特定山脉与土质指标。让每一颗作物都有专属的身世卡，向消费者诉说它们赖以滋养的真实大地。
                        </p>
                     </div>

                     <div className="space-y-2 p-5 bg-white/[0.01] border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 text-white/90 font-serif">
                           <Bookmark size={14} className="text-brand-vibrant" />
                           <span className="text-sm tracking-wider">02. 深刻的产品理论 (Theory)</span>
                        </div>
                        <p className="text-xs text-white/45 leading-relaxed">
                           引入气候物候循环理论、采摘节气（如清明、秋分等）以及传统农耕常识。通过知识讲解建立消费者对作物品质的理性认知。
                        </p>
                     </div>

                     <div className="space-y-2 p-5 bg-white/[0.01] border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 text-white/90 font-serif">
                           <Leaf size={14} className="text-brand-vibrant" />
                           <span className="text-sm tracking-wider">03. 文化属性嵌入 (Culture)</span>
                        </div>
                        <p className="text-xs text-white/45 leading-relaxed">
                           标签融入方言故事、民间节令民俗和泥土文化，为传统商品赋予极高的人文底蕴。使农产品从简单的基础食材升级为携带体温的“文化伴手礼”。
                        </p>
                     </div>

                     <div className="space-y-2 p-5 bg-white/[0.01] border border-white/5 rounded-sm">
                        <div className="flex items-center gap-2 text-white/90 font-serif">
                           <Globe size={14} className="text-brand-vibrant" />
                           <span className="text-sm tracking-wider">04. 长期复购保障 (Link)</span>
                        </div>
                        <p className="text-xs text-white/45 leading-relaxed">
                           挂随卡片上附带乡村原产故事，消费者可以通过这一纽带建立起温暖的“农耕回访链接”，将一次性单买转变为基于对乡土情怀长期认同的复购。
                        </p>
                     </div>
                  </div>
               </div>

               {/* Right Image Feature Column */}
               <div className="md:col-span-5 order-1 md:order-2 flex flex-col items-center">
                  <motion.div 
                     whileHover={{ scale: 1.02 }}
                     className="w-full relative justify-center items-center flex flex-col"
                  >
                     {/* Outer card frame with glassmorphism */}
                     <div className="w-full max-w-sm bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 p-6 rounded-lg backdrop-blur-sm shadow-2xl space-y-6 overflow-hidden">
                        <div className="relative aspect-[4/5] bg-brand-mid overflow-hidden rounded-md group border border-white/5 shadow-inner">
                           <img 
                              src="/Image/大蒜含名牌.png" 
                              alt="大蒜含名牌" 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s]" 
                              referrerPolicy="no-referrer"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                           <div className="absolute top-4 left-4 bg-black/60 border border-white/15 px-3 py-1 rounded-full text-[8px] font-mono tracking-widest text-brand-vibrant uppercase">
                              Prototype Design
                           </div>
                        </div>

                        {/* Analysis label box simulating label layout mapping */}
                        <div className="space-y-3 text-left">
                           <div className="flex justify-between items-center text-[10px] font-mono text-white/30 border-b border-white/10 pb-2">
                              <span>TAG SPECIFICATIONS</span>
                              <span className="text-brand-vibrant font-semibold">VERIFIED</span>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <span className="block text-[8px] text-white/30 tracking-wider">作物品类</span>
                                 <span className="text-xs font-serif text-white/80">四季瓜果 · 紫皮独头蒜</span>
                              </div>
                              <div>
                                 <span className="block text-[8px] text-white/30 tracking-wider">主要风土地域</span>
                                 <span className="text-xs font-serif text-white/80">关中平原 · 36.2°N</span>
                              </div>
                           </div>
                           <p className="text-[10px] text-white/45 italic leading-relaxed">
                              "利用极致写实的实物特征，挂载极富设计感的解释名签。一针见血凸显高端乡土文创的‘信息诚意’与‘理论自信’。"
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </div>

            </div>
          </div>
        </Slide>

        {/* 09. Collection Gallery */}
        <Slide id="gallery">
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24 justify-center">
            <SectionHeader isExporting={isExporting} num="08" title="全系列图谱" en="Full Product Matrix" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow content-center">
                {[
                  { name: '大蒜', path: '/Image/大蒜.png' },
                  { name: '辣椒', path: '/Image/辣椒.png' },
                  { name: '苦瓜', path: '/Image/苦瓜.png' },
                  { name: '茄子', path: '/Image/茄子.png' },
                  { name: '土豆', path: '/Image/土豆.png' },
                  { name: '榴莲', path: '/Image/榴莲.png' },
                  { name: '洋葱', path: '/Image/洋葱.png' },
                  { name: '白菜', path: '/Image/白菜.jpg' },
                  { name: '腊肉', path: '/Image/腊肉.jpg' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={isExporting ? false : { opacity: 0, y: 20 }}
                    whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }}
                    className="group relative aspect-square bg-white/[0.02] border border-white/5 overflow-hidden flex flex-col justify-end p-4"
                  >
                     <img src={item.path} className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={item.name} />
                     <div className="relative z-10">
                        <div className="text-[8px] font-mono text-white/30 tracking-widest uppercase mb-1">Product.{String(i+1).padStart(2, '0')}</div>
                        <div className="text-sm font-serif italic text-white/80">{item.name}</div>
                     </div>
                     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-60" />
                  </motion.div>
                ))}
                <motion.div 
                   initial={isExporting ? false : { opacity: 0 }}
                   whileInView={isExporting ? undefined : { opacity: 1 }} animate={isExporting ? { opacity: 1 } : undefined}
                   className="hidden md:flex flex-col justify-center p-8 space-y-4"
                >
                   <div className="text-[10px] font-mono text-brand-vibrant uppercase tracking-widest">More Coming Soon</div>
                   <div className="h-px w-full bg-brand-vibrant/20" />
                   <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-tighter">We are continuously exploring Rural beauty.</p>
                </motion.div>
            </div>
          </div>
        </Slide>

        {/* 08. Vision Slide */}
        <Slide id="vision">
          <DecorativeBlob isExporting={isExporting} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="w-[600px]" delay={0.5} animationsEnabled={animationsEnabled} />
          <div className="relative z-10 h-full flex flex-col p-12 md:p-24 items-center justify-center text-center">
            <motion.div 
              initial={isExporting ? false : { opacity: 0, y: 30 }}
              whileInView={isExporting ? undefined : { opacity: 1, y: 0 }} animate={isExporting ? { opacity: 1, y: 0 } : undefined}
              className="max-w-4xl space-y-12"
            >
              <div className="text-[10px] font-mono text-white/30 tracking-[0.6em] uppercase">Project Vision</div>
              <h2 className="text-5xl md:text-8xl font-serif italic text-white/90 leading-[1.1]">
                “让每一把钥匙，<br />
                都能打开<span className="text-brand-accent not-italic font-sans font-black tracking-tighter">乡土的情怀。</span>”
              </h2>
              <div className="w-20 h-px bg-white/10 mx-auto" />
              <p className="text-base text-white/40 leading-loose font-light max-w-2xl mx-auto">
                该项目不仅是文创，更是一次关于城乡情感链接的审美实验。<br />
                我们让每一件产品都成为“田园入场券”，<br />
                建立长期的复购机制，真正实现乡村振兴的闭环。
              </p>
              
              <div className="pt-12 space-y-4">
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Rural Revitalization Aesthetics / 2026 Archive</p>
                <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest italic">© 2026 Design Collective</p>
              </div>
            </motion.div>
          </div>
        </Slide>

      </main>

      {/* Footer Controls removed */}

    </div>
    </MotionConfig>
  );
}
