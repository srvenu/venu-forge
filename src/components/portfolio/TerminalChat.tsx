import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

// ── Chat API (Netlify function proxy — key stays server-side) ─────────────────
interface Message { role: "user" | "assistant"; content: string; }

async function callChat(
  messages: Message[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (msg: string) => void
) {
  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();

    if (!res.ok) {
      onError(data.error ?? `Error ${res.status}`);
      onDone();
      return;
    }

    // Typewriter effect — simulate streaming character by character
    const text: string = data.content ?? "";
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        onChunk(text.slice(0, ++i));
        setTimeout(tick, 12);
      } else {
        onDone();
      }
    };
    tick();
  } catch (e: unknown) {
    onError(e instanceof Error ? e.message : "Network error");
    onDone();
  }
}

// ── ASCII art from image ──────────────────────────────────────────────────────
const ASCII_CHARS = "@%#S+*:,. ";

function imageToAscii(src: string, width = 52): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const ratio = img.height / img.width;
      const h = Math.floor(width * ratio * 0.46);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, h);
      const { data } = ctx.getImageData(0, 0, width, h);
      const rows: string[] = [];
      for (let y = 0; y < h; y++) {
        let row = "";
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const brightness = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          row += ASCII_CHARS[Math.floor(brightness * (ASCII_CHARS.length - 1))];
        }
        rows.push(row);
      }
      resolve(rows);
    };
    img.onerror = () => resolve([]);
    img.src = src;
  });
}

// ── Built-in commands ─────────────────────────────────────────────────────────
const BUILTINS: Record<string, string> = {
  help:
    "Commands: help | whoami | skills | projects | contact | clear\nOr ask ATHINA anything about Venu's professional background.",
  whoami:
    "Venu Raj — AI & Software Engineer\nPython · React · TensorFlow · AWS · FastAPI\nBuilding intelligent systems that think, learn, and scale.",
  skills:
    "Languages : Python, TypeScript, JavaScript, Java, C++\nAI/ML     : TensorFlow, PyTorch, OpenCV, NLP, Hugging Face\nFrontend  : React, Next.js, Tailwind, Framer Motion\nBackend   : FastAPI, Node.js, Flask\nCloud     : AWS (EC2/S3/CloudFront), Docker, CI/CD\nDatabases : PostgreSQL, MongoDB, Redis, SQLite",
  projects:
    "1. AI Video Assistant    — YouTube → structured PDF notes\n2. Sign Language         — Real-time ASL 95%+ accuracy\n3. Track Drive Assist    — Vehicle service tracker (React)\n4. Raw Materials Search  — Desktop DB tool (Python, in production)",
  contact:
    "Email    : srvenugopal2002@gmail.com\nGitHub   : github.com/srvenu\nLinkedIn : linkedin.com/in/srvenu\nYouTube  : @CodeAlchemists\nLocation : India  |  Open to Remote",
};

// ── Types ─────────────────────────────────────────────────────────────────────
type LineType = "input" | "output" | "error" | "system" | "ascii";
interface Line { id: number; type: LineType; text: string; }

let _id = 0;
const mk = (type: LineType, text: string): Line => ({ id: _id++, type, text });

// ── ATHINA boot lines ─────────────────────────────────────────────────────────
const BOOT: Line[] = [
  mk("system", "  ___  _____ _   _ ___ _   _    _    "),
  mk("system", " / _ \\|_   _| | | |_ _| \\ | |  / \\   "),
  mk("system", "| |_| | | | | |_| || ||  \\| | / _ \\  "),
  mk("system", "|  _  | | | |  _  || || |\\  |/ ___ \\ "),
  mk("system", "|_| |_| |_| |_| |_|___|_| \\_/_/   \\_\\"),
  mk("system", ""),
  mk("system", "Adaptive Terminal Helper & Intelligent Network Assistant"),
  mk("system", "Portfolio AI for Venu Raj "),
  mk("system", "─────────────────────────────────────────────────────────"),
  mk("system", ""),
  mk("output", "[✓] Professional context loaded"),
  mk("output", "[✓] Scope: Venu Raj's professional background only"),
  mk("system", ""),
  mk("output", "Type 'help' for commands or ask me anything about Venu."),
  mk("system", ""),
];

// ── Terminal component ────────────────────────────────────────────────────────
const TerminalChat = () => {
  const [lines, setLines]           = useState<Line[]>(BOOT);
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isError, setIsError]       = useState(false);
  const [input, setInput]           = useState("");
  const [history, setHistory]       = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const [messages, setMessages]     = useState<Message[]>([]);
  const [minimized, setMinimized]   = useState(false);
  const [asciiLoaded, setAsciiLoaded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal container (NOT the page)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, streamText, isStreaming]);

  // Load ASCII portrait on mount
  useEffect(() => {
    if (asciiLoaded) return;
    setAsciiLoaded(true);
    imageToAscii("/images/profile.jpg", 52).then((rows) => {
      if (rows.length === 0) return;
      const asciiLines: Line[] = [
        mk("system", ""),
        mk("system", "── Portrait ──────────────────────────────────────────"),
        ...rows.map((r) => mk("ascii", r)),
        mk("system", "── Venu Raj ──────────────────────────────────────────"),
        mk("system", ""),
      ];
      setLines((prev) => [...prev, ...asciiLines]);
    });
  }, [asciiLoaded]);

  const pushLine = useCallback((line: Line) => {
    setLines((p) => [...p, line]);
  }, []);

  const handleSubmit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd || isStreaming) return;

    pushLine(mk("input", cmd));
    setInput("");
    setHistory((h) => [cmd, ...h.slice(0, 49)]);
    setHistIdx(-1);

    // clear
    if (cmd.toLowerCase() === "clear") {
      setLines([mk("system", "Terminal cleared. Type 'help' to start.")]);
      return;
    }

    // built-in
    const builtin = BUILTINS[cmd.toLowerCase()];
    if (builtin) {
      pushLine(mk("output", builtin));
      return;
    }

    // stream from Groq
    const updatedMsgs: Message[] = [...messages, { role: "user", content: cmd }];
    setMessages(updatedMsgs);
    setIsStreaming(true);
    setIsError(false);
    setStreamText("");

    let full = "";

    callChat(
      updatedMsgs,
      (chunk: string) => {
        full = chunk;
        setStreamText(full);
      },
      () => {
        setIsStreaming(false);
        setStreamText("");
        if (full) {
          setMessages((m) => [...m, { role: "assistant", content: full }]);
          pushLine(mk("output", full));
        }
      },
      (errMsg: string) => {
        setIsError(true);
        setStreamText(errMsg);
      }
    );
  }, [input, isStreaming, messages, pushLine]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();   // ← prevents page scroll
      e.stopPropagation();
      handleSubmit();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  const lineColor = (type: LineType) => {
    if (type === "input")  return "text-green-300";
    if (type === "error")  return "text-red-400";
    if (type === "system") return "text-green-800";
    if (type === "ascii")  return "text-green-600";
    return "text-green-400";
  };

  return (
    <section id="terminal" className="py-28 px-4 relative">
      <div className="container mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label mb-3">Interactive AI</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Meet{" "}
            <span className="gradient-text">ATHINA</span>
          </h2>
          <div className="section-divider mb-4" />
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-xl overflow-hidden border border-green-900/30"
          style={{ boxShadow: "0 0 80px hsl(120 70% 40% / 0.1), 0 24px 80px rgba(0,0,0,0.7)" }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1a0d] border-b border-green-900/25 select-none">
            <div className="flex gap-1.5">
              <button
                onClick={() => { setLines(BOOT); setAsciiLoaded(false); setMessages([]); }}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                title="Reset"
              />
              <button
                onClick={() => setMinimized((m) => !m)}
                className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors"
                title="Toggle"
              />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center font-mono text-xs text-green-700/70 tracking-widest">
              ATHINA  —  venu@portfolio:~/assistant
            </div>
            <Terminal className="h-3.5 w-3.5 text-green-800" />
          </div>

          {/* Body */}
          <AnimatePresence>
            {!minimized && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-[#060e06]"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Scroll area */}
                <div
                  ref={scrollRef}
                  className="h-[440px] overflow-y-auto px-5 pt-5 pb-2 space-y-0.5"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#1a3a1a transparent" }}
                >
                  {lines.map((line) => (
                    <div
                      key={line.id}
                      className={`font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-words ${lineColor(line.type)}`}
                    >
                      {line.type === "input" && (
                        <span className="text-green-500 select-none">venu@portfolio:~$ </span>
                      )}
                      {line.text}
                    </div>
                  ))}

                  {/* Live streaming line */}
                  {(isStreaming || (isError && streamText)) && (
                    <div className={`font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-words ${isError ? "text-red-400" : "text-green-400"}`}>
                      {!isError && (
                        <span className="text-green-700 text-xs mr-2">[ATHINA]</span>
                      )}
                      {streamText}
                      {isStreaming && (
                        <motion.span
                          className="inline-block w-[7px] h-[13px] bg-green-400 ml-0.5 align-middle"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                      )}
                    </div>
                  )}

                  {/* Thinking dots */}
                  {isStreaming && !streamText && (
                    <div className="flex items-center gap-1.5 font-mono text-xs text-green-800">
                      <span>[ATHINA]</span>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1 h-1 rounded-full bg-green-700 inline-block"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Input row */}
                <div className="border-t border-green-900/20 px-5 py-3 flex items-center gap-2 bg-[#040a04]">
                  <span className="font-mono text-[13px] text-green-500 flex-shrink-0 select-none">
                    venu@portfolio:~$
                  </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isStreaming}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder={isStreaming ? "ATHINA is typing..." : "type a command or ask anything..."}
                    className="flex-1 bg-transparent font-mono text-[13px] text-green-300 outline-none placeholder:text-green-900/50 caret-green-400 disabled:opacity-40"
                  />
                  {!input && !isStreaming && (
                    <motion.span
                      className="w-[7px] h-[14px] bg-green-500 inline-block flex-shrink-0"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick prompts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mt-5"
        >
          {[
            "What projects has Venu built?",
            "Tell me about the sign language project",
            "What are his AI skills?",
            "Is Venu available for work?",
            "How can I contact Venu?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); inputRef.current?.focus(); }}
              disabled={isStreaming}
              className="px-3 py-1.5 text-xs font-mono rounded border border-green-900/35 text-green-800 hover:text-green-500 hover:border-green-800/50 hover:bg-green-900/8 transition-all duration-200 disabled:opacity-40"
            >
              &gt; {q}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalChat;
