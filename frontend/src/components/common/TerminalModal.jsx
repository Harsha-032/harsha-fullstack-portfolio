import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Command } from "lucide-react";
import { audio } from "../../lib/audio";
import { useTheme } from "../../lib/theme";

export default function TerminalModal({ isOpen, onClose, profile }) {
  const [terminalLogs, setTerminalLogs] = useState([
    "INITIATING ENCRYPTED CONNECTION...",
    "HANDSHAKE PROTOCOL ESTABLISHED.",
    "WELCOME TO SYSTEM KERNEL v2.0",
    "Type 'help' for available commands."
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const { activeTheme } = useTheme();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLogs, isOpen]);

  const handleTerminalSubmit = (cmd) => {
    audio.playTerminalClick();
    const input = (cmd || terminalInput).trim().toLowerCase();
    if (!input) return;

    setTerminalLogs(prev => [...prev, `root@harshac:~$ ${input}`]);

    let response = "";
    if (input === "help") {
      response = "Available commands: help, about, skills, projects, contact, clear, sudo";
    } else if (input === "about") {
      response = profile?.about_description || "Passionate about building scalable backend systems, elegant frontends, and converting logics into premium dimensions.";
    } else if (input === "skills") {
      response = "System proficiency: React, Django, Python, Node.js, AWS, Docker, WebGL.";
    } else if (input === "projects") {
      response = "Check out the projects section or visit github.com/harshac032";
    } else if (input === "contact") {
      response = `Initiate protocol via: ${profile?.email || 'harshac032@gmail.com'}`;
    } else if (input === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (input === "sudo") {
      response = "Nice try. Incident logged and reported to the cybernetic council.";
    } else {
      response = `Command not found: ${input}`;
    }

    setTerminalLogs(prev => [
      ...prev,
      response
    ]);
    setTerminalInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <Command className={`w-4 h-4 ${activeTheme.ui.accent}`} />
                <h3 className="text-sm font-bold text-white tracking-tight">hc_terminal_console</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <button 
                  onClick={() => {
                    audio.playTerminalClick();
                    onClose();
                  }}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 flex items-center justify-center cursor-pointer group"
                >
                  <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="p-4 sm:p-6 h-80 sm:h-96 overflow-y-auto space-y-4 text-xs sm:text-sm custom-scrollbar"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex gap-2 mb-6 opacity-70">
                <span className="text-white/40">Suggested:</span>
                {['about', 'projects', 'contact'].map(cmd => (
                  <button 
                    key={cmd}
                    onClick={() => handleTerminalSubmit(cmd)}
                    className={`hover:${activeTheme.ui.accent} underline underline-offset-4 cursor-pointer transition-colors`}
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {terminalLogs.map((log, index) => {
                const isCommand = log.startsWith("root@harshac:~$");
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={isCommand ? "text-white/60" : activeTheme.ui.accent}
                  >
                    {log}
                  </motion.div>
                );
              })}
              
              <div className="flex items-center gap-2 text-white">
                <span className="text-white/60">root@harshac:~$</span>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTerminalSubmit();
                  }}
                  className="flex-1"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="w-full bg-transparent outline-none border-none caret-white"
                    spellCheck="false"
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
