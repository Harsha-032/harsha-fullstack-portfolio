import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Droplets, ArrowRightLeft, ShieldAlert, BadgeCent, Percent, Layers, PieChart, Activity, Box, Terminal, Cloud, Code, Cpu, Database, Settings, Zap, Globe, Compass, FileCode } from "lucide-react";
import { useTheme } from "../lib/theme";
import { getSystematicRandomProps } from "../utils/animations";
import { resolveImageUrl } from "../utils/helpers";
import { useMediaQuery } from "../hooks/useMediaQuery";

const FALLBACK_ICONS = [Code, Cpu, Database, Box, Layers, Activity, Terminal, Settings, Zap, Globe, Compass, FileCode];

const getFallbackIcon = (name) => {
  if (!name) return Code;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return FALLBACK_ICONS[hash % FALLBACK_ICONS.length];
};

const SkillIcon = ({ iconName, iconUrl, name, fallbackClass }) => {
  const [hasError, setHasError] = useState(false);

  if (iconName && iconName !== 'default' && !hasError) {
    return (
      <img 
        src={`https://go-skill-icons.vercel.app/api/icons?i=${iconName}`} 
        alt={name} 
        className="w-5 h-5 object-contain"
        onError={() => setHasError(true)}
      />
    );
  }

  if (iconUrl && !hasError) {
    return (
      <img 
        src={resolveImageUrl(iconUrl)} 
        alt={name} 
        className="w-5 h-5 object-contain" 
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Fallback to a seeded random Lucide icon based on name
  const IconComponent = getFallbackIcon(name);
  return <IconComponent className={fallbackClass} />;
};

const SmoothScrollContainer = ({ children, className }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollBy({ top: e.deltaY, behavior: 'smooth' });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={scrollRef} 
      className={className} 
      data-lenis-prevent="true"
    >
      {children}
    </div>
  );
};

export default function Skills({ skills = [] }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const containerRef = useRef(null);
  const { activeTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const getIconForCategory = (categoryName) => {
    const lower = categoryName.toLowerCase();
    if (lower.includes("frontend") || lower.includes("ui") || lower.includes("design")) return Droplets;
    if (lower.includes("backend") || lower.includes("api") || lower.includes("server")) return ArrowRightLeft;
    if (lower.includes("cloud") || lower.includes("devops") || lower.includes("infra")) return Cloud;
    if (lower.includes("methodologies") || lower.includes("methodology") || lower.includes("agile")) return Layers;
    if (lower.includes("tool") || lower.includes("misc")) return Terminal;
    return Box;
  };

  const rolesData = useMemo(() => {
    const list = skills.length ? skills : [
      { name: "React", category: "frontend", proficiency: 90, icon_name: "react" },
      { name: "JavaScript", category: "frontend", proficiency: 90, icon_name: "js" },
      { name: "Python", category: "backend", proficiency: 90, icon_name: "py" },
      { name: "Django", category: "backend", proficiency: 85, icon_name: "django" },
      { name: "PostgreSQL", category: "database", proficiency: 85, icon_name: "postgres" },
      { name: "Git", category: "tools", proficiency: 90, icon_name: "git" }
    ];

    const grouped = {};
    list.forEach(tech => {
      let cat = tech.category ? tech.category.charAt(0).toUpperCase() + tech.category.slice(1) : "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ 
        name: tech.name, 
        proficiency: tech.proficiency || 50,
        icon: tech.icon,
        iconName: tech.icon_name,
        order: tech.order || 0
      });
    });

    const result = Object.keys(grouped).map((catName) => ({
      name: catName + " Stack",
      category: "Skills & Tools",
      icon: getIconForCategory(catName),
      desc: `Specialized tools and technologies within the ${catName} ecosystem.`,
      details: grouped[catName].sort((a, b) => a.order - b.order)
    }));

    const desiredOrder = ["Backend Stack", "Frontend Stack", "Methodologies Stack", "Devops Stack", "Cloud Stack", "Tools Stack"];

    return result.sort((a, b) => {
      const aIdx = desiredOrder.indexOf(a.name);
      const bIdx = desiredOrder.indexOf(b.name);
      
      const aSort = aIdx === -1 ? 999 : aIdx;
      const bSort = bIdx === -1 ? 999 : bIdx;
      
      return aSort - bSort;
    });
  }, [skills]);



  return (
    <section 
      id="liquidity-flows" 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-start py-16 sm:py-24 text-white overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" 
          style={{ backgroundColor: activeTheme.sky.start }} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "0px 0px -100px 0px", once: false }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full flex flex-col justify-between flex-1 px-6 sm:px-12 md:px-16"
      >
        <div className="text-center pt-2 select-none">
          <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.4em] ${activeTheme.ui.badgeText} ${activeTheme.ui.badgeBg} border ${activeTheme.ui.badgeBorder} rounded-full px-5 py-1.5 backdrop-blur-md`}>
            TECH STACK
          </span>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-6">
          <div className="lg:col-span-12 flex flex-col items-center justify-center relative min-h-[360px] sm:min-h-[440px]">
            <motion.div 
              className="w-full relative flex items-center justify-center select-none flex-col mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
                {rolesData.map((role, idx) => {
                  const skillAnim = getSystematicRandomProps(`skill-${idx}`);
                  return (
                  <motion.div
                    key={idx}
                    initial={skillAnim.initial}
                    whileInView={{ ...skillAnim.whileInView, scale: activeIdx === idx ? 1.05 : 1 }}
                    viewport={{ once: false, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.3, delay: idx * 0.02, ease: "easeOut" }}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseLeave={() => setActiveIdx(null)}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-sm overflow-hidden flex flex-col gap-4 ${
                      activeIdx === idx 
                        ? "border-white/20 bg-white/10 shadow-xl shadow-black/50" 
                        : "border-white/5 bg-white/5 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="absolute inset-0 z-0 bg-gradient-to-br opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, ${activeTheme.sky.start}, transparent)` }} />
                    <div className="relative z-10 flex gap-4 items-center border-b border-white/10 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shadow-inner">
                        <role.icon className={`w-5 h-5 ${activeTheme.ui.accent}`} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl font-bold tracking-tight text-white mb-0.5">{role.name}</h4>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#a0a0ab]">{role.category}</span>
                      </div>
                    </div>
                    <div className="relative z-10 space-y-3">
                      <p className="font-sans text-xs text-white/70 leading-relaxed font-light">{role.desc}</p>
                      <SmoothScrollContainer className="mt-4 w-full max-h-[220px] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
                        <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-y-6 gap-x-4 w-full pb-4">
                          {role.details.map((dt, i) => (
                            <li key={i} className="flex items-center w-full">
                              <div className="flex items-center gap-2.5 w-full">
                                <SkillIcon 
                                  iconName={dt.iconName}
                                  iconUrl={dt.icon} 
                                  name={dt.name} 
                                  fallbackClass={`w-5 h-5 ${activeTheme.ui.accent} shrink-0`} 
                                />
                                <span className="font-sans font-medium text-sm tracking-wide text-white/90 leading-tight">{dt.name}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </SmoothScrollContainer>
                    </div>
                  </motion.div>
                )})}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="text-center pb-2 select-none"
        >
          <p className="font-mono text-[9px] text-[#a0a0ab] uppercase tracking-widest">
            VERSATILE STACK.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
