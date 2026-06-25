import { useState, useEffect, useRef } from "react";
import API from "../../services/api";
import Loader from "../../components/common/Loader";

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
        isUser ? "primary-gradient" : "bg-violet-100"}`}>
        {isUser
          ? <span className="material-symbols-outlined text-white text-sm">person</span>
          : <span className="material-symbols-outlined text-violet-600 text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}>smart_toy</span>
        }
      </div>
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "primary-gradient text-white rounded-tr-sm"
            : "bg-white border border-outline-variant/40 text-on-surface rounded-tl-sm"
          }`}>
          <p className="whitespace-pre-wrap">{msg.content}</p>
        </div>
        <span className="text-[10px] text-on-surface-variant px-1">
          {new Date(msg.timestamp || Date.now()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-violet-100 flex-shrink-0 flex items-center justify-center">
        <span className="material-symbols-outlined text-violet-600 text-sm"
          style={{ fontVariationSettings: '"FILL" 1' }}>smart_toy</span>
      </div>
      <div className="bg-white border border-outline-variant/40 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0,1,2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const STARTERS = [
  "Explain Newton's laws of motion",
  "What is the difference between RAM and ROM?",
  "How does photosynthesis work?",
  "Explain machine learning in simple terms",
];

export default function Chatbot() {
  const [sessions,   setSessions]   = useState([]);
  const [sessionId,  setSessionId]  = useState(null);
  const [messages,   setMessages]   = useState([]);
  const [input,      setInput]      = useState("");
  const [typing,     setTyping]     = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [sideOpen,   setSideOpen]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Load sessions
  useEffect(() => {
    API.get("/chatbot/sessions")
      .then(r => setSessions(r.data.data || []))
      .catch(console.error);
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const loadSession = async (id) => {
    setLoading(true);
    setSideOpen(false);
    try {
      const r = await API.get(`/chatbot/sessions/${id}`);
      setSessionId(id);
      setMessages(r.data.data.messages || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const newChat = () => {
    setSessionId(null);
    setMessages([]);
    setSideOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const deleteSession = async (id, e) => {
    e.stopPropagation();
    await API.delete(`/chatbot/sessions/${id}`).catch(() => {});
    setSessions(prev => prev.filter(s => s._id !== id));
    if (sessionId === id) newChat();
  };

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || typing) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: msg, timestamp: new Date() }]);
    setTyping(true);
    try {
      const res = await API.post("/chatbot/message", { message: msg, sessionId });
      const data = res.data.data;
      if (!sessionId) {
        setSessionId(data.sessionId);
        setSessions(prev => [{ _id: data.sessionId, sessionTitle: msg.slice(0, 50) }, ...prev]);
      }
      setMessages(prev => [...prev, { role: "assistant", content: data.message, timestamp: data.timestamp }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again.", timestamp: new Date() }]);
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="flex h-[calc(100vh-57px)]">
      {/* Sessions sidebar */}
      <>
        {sideOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSideOpen(false)} />}
        <aside className={`absolute md:relative z-40 md:z-auto inset-y-0 left-0 w-64 bg-white border-r border-outline-variant/30 flex flex-col transition-transform duration-200 ${
          sideOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="p-3 border-b border-outline-variant/30">
            <button onClick={newChat}
              className="w-full flex items-center gap-2 px-3 py-2.5 primary-gradient text-white text-sm font-semibold rounded-xl">
              <span className="material-symbols-outlined text-base">add</span>
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.length === 0
              ? <p className="text-xs text-on-surface-variant text-center py-8">No chat history yet</p>
              : sessions.map(s => (
                <button key={s._id} onClick={() => loadSession(s._id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors group relative ${
                    sessionId === s._id ? "bg-primary/10 text-primary" : "hover:bg-surface-container text-on-surface-variant"}`}>
                  <p className="font-medium truncate pr-6">{s.sessionTitle || "Chat Session"}</p>
                  <p className="text-[10px] mt-0.5 opacity-60">{new Date(s.updatedAt || s.createdAt).toLocaleDateString()}</p>
                  <button onClick={(e) => deleteSession(s._id, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </button>
              ))
            }
          </div>
        </aside>
      </>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/30 bg-white">
          <button onClick={() => setSideOpen(o => !o)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container">
            <span className="material-symbols-outlined text-base">menu</span>
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-violet-600 text-base"
                style={{ fontVariationSettings: '"FILL" 1' }}>smart_toy</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Knowledge Guru AI</p>
              <p className="text-[10px] text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                Powered by Gemini
              </p>
            </div>
          </div>
          <button onClick={newChat} className="text-xs text-primary font-semibold px-3 py-1.5 bg-primary/10 rounded-lg">
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/50">
          {loading ? (
            <Loader fullScreen={false} text="Loading chat..." />
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto gap-5">
              <div className="w-16 h-16 primary-gradient rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl"
                  style={{ fontVariationSettings: '"FILL" 1' }}>smart_toy</span>
              </div>
              <div>
                <p className="font-bold text-lg">Ask me anything!</p>
                <p className=" text-sm text-on-surface-variant mt-1">I'm your AI learning assistant. Ask about any topic, concept, or get help understanding difficult subjects.</p>

              </div>
              <div className="h-full flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto gap-5">
                {STARTERS.map((s, i) => (
                  <button key={i} onClick={() => send(s)}
                    className="text-left px-4 py-3 bg-white border border-outline-variant rounded-xl text-xs text-on-surface-variant hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-primary text-xs mr-1.5">arrow_forward</span>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m, i) => <Message key={i} msg={m} />)}
              {typing && <TypingIndicator />}
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="p-3 border-t border-outline-variant/30 bg-white">
          <div className="flex items-end gap-2 bg-surface-container rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/20">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
              onKeyDown={handleKey}
              placeholder="Ask about any topic…"
              rows={1}
              disabled={typing}
              className="flex-1 bg-transparent text-sm resize-none outline-none max-h-28 text-on-surface placeholder:text-on-surface-variant/60 disabled:opacity-60"
            />
            <button onClick={() => send()} disabled={!input.trim() || typing}
              className="w-9 h-9 primary-gradient text-white rounded-xl flex items-center justify-center flex-shrink-0 hover:opacity-90 disabled:opacity-40 transition-opacity">
              {typing
                ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <span className="material-symbols-outlined text-base">send</span>
              }
            </button>
          </div>
          <p className="text-center text-[10px] text-on-surface-variant mt-2">
            Shift+Enter for new line · Enter to send
          </p>
        </div>
      </div>
    </div>
  );
}