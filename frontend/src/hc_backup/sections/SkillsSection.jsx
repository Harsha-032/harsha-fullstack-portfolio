import React, { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Droplets, ArrowRightLeft, Percent, Activity, Box, Terminal, Cloud } from "lucide-react";
import { useTheme } from "../lib/theme";

export default function SkillsSection({ techStack = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const { activeTheme } = useTheme();

  const getIconForCategory = (categoryName) => {
    const lower = categoryName.toLowerCase();
    if (lower.includes("frontend") || lower.includes("ui") || lower.includes("design")) return Droplets;
    if (lower.includes("backend") || lower.includes("api") || lower.includes("server")) return ArrowRightLeft;
    if (lower.includes("cloud") || lower.includes("devops") || lower.includes("infra")) return Cloud;
    if (lower.includes("tool") || lower.includes("misc")) return Terminal;
    return Box;
  };

  const rolesData = useMemo(() => {
    // Group tech stack by category
    const grouped = {};
    techStack.forEach(tech => {
      const cat = tech.category?.name || "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(tech.name);
    });

    return Object.keys(grouped).map((catName) => ({
      name: catName,
      category: "Proficiency",
      icon: getIconForCategory(catName),
      desc: `Specialized tools and technologies within the ${catName} ecosystem.`,
      details: grouped[catName].slice(0, 4) // Show top 4 items in the list
    }));
  }, [techStack]);

  if (!rolesData.length) {
    rolesData.push({
      name: "Development Stack",
      category: "General",
      icon: Box,
      desc: "Loading tools and technologies...",
      details: ["Pending"]
    });
  }

  return (
    <section 
      id="skills-section" 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-start py-24 text-white overflow-hidden bg-transparent"
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
        transition={{ duration: 0.8 }}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full px-4">
                {rolesData.map((role, idx) => {
                  const rx = Math.sin((idx + 5) * 17.5) * 150;
                  const ry = Math.cos((idx + 4) * 9.2) * 150;
                  return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: rx, y: ry, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: activeIdx === idx ? 1.05 : 1 }}
                    viewport={{ once: false, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                    onMouseEnter={() => setActiveIdx(idx)}
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
                      <ul className="space-y-2 mt-4 ml-1">
                        {role.details.map((dt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Activity className={`w-3 h-3 ${activeTheme.ui.accent}`} />
                            <span className="font-mono text-[10px] tracking-wider text-white/50">{dt}</span>
                          </li>
                        ))}
                      </ul>
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
