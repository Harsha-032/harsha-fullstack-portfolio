import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MapPin, Mail, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaLink, FaFilePdf } from "react-icons/fa";
import { useTheme } from "../lib/theme";
import { submitInquiry } from "../services/portfolioApi";
import { getSystematicRandomProps } from "../utils/animations";
import { resolveImageUrl } from "../utils/helpers";

const getSocialIcon = (platform) => {
  const p = platform.toUpperCase();
  if (p.includes('GITHUB')) return <FaGithub className="w-4 h-4 mr-1.5" />;
  if (p.includes('LINKEDIN')) return <FaLinkedin className="w-4 h-4 mr-1.5" />;
  return <FaLink className="w-4 h-4 mr-1.5" />;
};

export default function Contact({ profile = null, socialLinks = [] }) {
  const { activeTheme } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  
  // Magnetic Hover Button State
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (distance < 90) {
      // Translate coordinates toward mouse with damped pull physics
      const dragFactor = 0.38;
      setMagneticPos({
        x: (e.clientX - centerX) * dragFactor,
        y: (e.clientY - centerY) * dragFactor
      });
    } else {
      setMagneticPos({ x: 0, y: 0 });
    }
  };

  const handleMagneticLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("submitting");

    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section 
      id="climb" 
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center py-16 sm:py-24 md:py-32 bg-transparent text-white"
    >
      {/* Background radial highlight flares */}
      <div className={`absolute top-1/2 left-0 w-[500px] h-[500px] ${activeTheme.ui.accent.replace('text-', 'bg-')} opacity-5 rounded-full filter blur-[150px] pointer-events-none`} />
      <div className={`absolute bottom-0 right-0 w-[600px] h-[500px] ${activeTheme.ui.accent.replace('text-', 'bg-')} opacity-5 rounded-full filter blur-[150px] pointer-events-none`} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Contact meta descriptors / Links */}
          <motion.div 
            {...getSystematicRandomProps("contact-left")}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="lg:col-span-5 text-left space-y-12"
          >
            <div className="space-y-6">
              <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.4em] ${activeTheme.ui.badgeText} ${activeTheme.ui.badgeBg} border ${activeTheme.ui.badgeBorder} rounded-full px-5 py-1.5 backdrop-blur-md inline-block`}>
                CONTACT
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white drop-shadow-lg leading-tight">
                Get in <span className={activeTheme.ui.accent}>Touch</span>
              </h2>
              <p className="font-sans text-base text-white/60 font-light leading-relaxed">
                Have a project in mind, a question, or just want to say hi? Feel free to reach out using the form or directly via email.
              </p>
            </div>

            {/* Coordinates detail blocks */}
            <div className="space-y-6 pt-4 border-t border-white/10 max-w-sm flex-col">
              
              <div className="flex gap-4 items-center">
                <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${activeTheme.ui.accent} shadow-sm group hover:border-white/20 transition-all`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase block font-bold leading-none">Email</span>
                    <a 
                      href={`mailto:${profile?.email || ''}`} 
                      className={`text-white transition-colors font-sans text-sm block mt-1 hover:opacity-80`}
                      data-cursor="pointer"
                    >
                      {profile?.email || ''}
                    </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${activeTheme.ui.accent} shadow-sm group hover:border-white/20 transition-all`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase block font-bold leading-none">Location</span>
                  <span className="text-white font-sans text-sm block mt-1">
                    {profile?.location || ''}
                  </span>
                </div>
              </div>

            </div>

            {/* Social credentials row */}
            <div className="space-y-4 pt-4 border-t border-white/10 max-w-sm">
              <span className="text-[10px] font-mono text-white/40 uppercase block font-medium">
                Socials
              </span>
              <div className="flex flex-wrap gap-4 font-mono text-xs font-medium">
                {socialLinks.length > 0 && socialLinks.map((social, i) => (
                  <React.Fragment key={social.platform}>
                    <a 
                      href={social.url} 
                      target="_blank"  
                      rel="noreferrer"
                      className={`text-white ${activeTheme.ui.textHover} flex items-center transition-colors group uppercase`}
                      data-cursor="pointer"
                    >
                      {getSocialIcon(social.platform)}
                      <span>{social.platform}</span>
                      <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <span className="text-white/20">/</span>
                  </React.Fragment>
                ))}
                {/* Always show Resume link at the end */}
                {profile?.resume_url && (
                <a 
                  href={resolveImageUrl(profile.resume_url)} 
                  target="_blank"  
                  rel="noreferrer"
                  className={`text-white ${activeTheme.ui.textHover} flex items-center transition-colors group`}
                  data-cursor="pointer"
                >
                  <FaFilePdf className="w-4 h-4 mr-1.5" />
                  <span>RESUME</span>
                  <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Contacts Form Layer */}
          <motion.div 
            {...getSystematicRandomProps("contact-right")}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 1.2, delay: 0.1, type: "spring", bounce: 0.3 }}
            className="lg:col-span-7"
          >
            
            <div className="p-8 sm:p-10 rounded-3xl relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-xl text-left">
              
              <FormTelemetryOverlay status={status} activeTheme={activeTheme} />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left pointer-events-auto flex flex-col gap-2">
                
                {/* Inputs Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-sans text-white/60 tracking-wider uppercase font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full bg-black/20 hover:bg-black/30 focus:bg-black/40 border border-white/10 ${activeTheme.ui.borderFocus} rounded-xl px-4 py-3 text-sm tracking-wide text-white outline-none focus:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all placeholder:text-white/20`}
                    disabled={status === "submitting" || status === "success"}
                  />
                </div>

                {/* Inputs Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-sans text-white/60 tracking-wider uppercase font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full bg-black/20 hover:bg-black/30 focus:bg-black/40 border border-white/10 ${activeTheme.ui.borderFocus} rounded-xl px-4 py-3 text-sm tracking-wide text-white outline-none focus:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all placeholder:text-white/20`}
                    disabled={status === "submitting" || status === "success"}
                  />
                </div>

                {/* Inputs Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-sans text-white/60 tracking-wider uppercase font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can I help you?"
                    className={`w-full bg-black/20 hover:bg-black/30 focus:bg-black/40 border border-white/10 ${activeTheme.ui.borderFocus} rounded-xl px-4 py-3 text-sm tracking-wide text-white outline-none focus:shadow-[0_0_12px_rgba(255,255,255,0.1)] resize-none transition-all placeholder:text-white/20`}
                    disabled={status === "submitting" || status === "success"}
                  />
                </div>

                {/* Submit Action (Magnetic Decolletage effect) */}
                <div className="pt-4 flex justify-start">
                  <motion.button
                    ref={buttonRef}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    style={{
                      x: magneticPos.x,
                      y: magneticPos.y,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className={`relative px-8 py-3 rounded-full ${activeTheme.ui.badgeBg} border ${activeTheme.ui.badgeBorder} hover:bg-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-lg select-none disabled:opacity-50 transition-all cursor-pointer group`}
                    data-cursor="pointer"
                    data-cursor-text="SEND"
                  >
                    <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
                    <Send className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                </div>

              </form>

            </div>

          </motion.div>

        </div>

      </div>

      {/* Page Footer Closure */}
      <div className="absolute bottom-0 left-0 w-full py-6 flex flex-col items-center justify-center z-20 border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent">
        <p className="font-mono text-[8px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 text-center px-4">
          © {new Date().getFullYear()} {profile?.full_name || "Harsha C"}. All rights reserved.
        </p>
      </div>
    </section>
  );
}

// Subordinate Form Telemetry overlay state manager
function FormTelemetryOverlay({ status, activeTheme }) {
  return (
    <AnimatePresence>
      {status === "submitting" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4 rounded-3xl"
        >
          <div className={`w-10 h-10 border-2 ${activeTheme.ui.badgeBorder} border-t-white rounded-full animate-spin`} />
        </motion.div>
      )}

      {status === "success" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center rounded-3xl"
        >
          <div className={`w-12 h-12 ${activeTheme.ui.badgeBg} border ${activeTheme.ui.badgeBorder} rounded-full flex items-center justify-center ${activeTheme.ui.accent} mb-4 animate-bounce`}>
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-2xl font-light text-white">Message Sent</h4>
          <p className="font-sans text-sm text-white/60 max-w-sm mt-3 leading-relaxed font-light">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="absolute top-4 left-4 right-4 z-20 bg-red-950/90 border border-red-500/30 rounded-xl p-4 flex gap-3 items-center text-left"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <div>
            <h5 className="font-sans text-sm font-bold text-red-300 leading-none">Missing Information</h5>
            <p className="font-sans text-xs text-red-200/75 mt-1 font-light">
              Please fill in all the required fields before submitting.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
