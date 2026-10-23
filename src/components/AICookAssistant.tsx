import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Key, AlertTriangle, Trash2, Loader2 } from 'lucide-react';
import { geminiAI } from '../services/geminiAI';
import { Language } from '../types';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  lang: Language;
}

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AICookAssistant: React.FC<Props> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [apiKey, setApiKey] = useState(geminiAI.getApiKey());
  const [showKeyInput, setShowKeyInput] = useState(!geminiAI.isConfigured());
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const t = UI_STRINGS[lang];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveKey = () => {
    if (!apiKey.trim()) return;
    geminiAI.setApiKey(apiKey.trim());
    setShowKeyInput(false);
    setError('');
  };

  const handleClearKey = () => {
    geminiAI.clearApiKey();
    setApiKey('');
    setShowKeyInput(true);
    setMessages([]);
  };

  const handleAsk = async (queryText?: string) => {
    const textToSend = queryText || prompt;
    if (!textToSend.trim()) return;

    if (!geminiAI.isConfigured()) {
      setShowKeyInput(true);
      setError('Please enter your Gemini API key first.');
      return;
    }

    const userMsg: ChatMessage = {
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsThinking(true);
    setError('');

    try {
      const aiResponse = await geminiAI.askChef(textToSend);
      const aiMsg: ChatMessage = {
        role: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setError(err?.message || 'Failed to get AI response. Check your API key and try again.');
    } finally {
      setIsThinking(false);
    }
  };

  const samplePrompts = [t.aiPromptExample1, t.aiPromptExample2, t.aiPromptExample3];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* AI Header Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-700 via-orange-600 to-amber-900 text-white p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-60 h-60 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{t.aiChefTitle}</h1>
            <p className="text-amber-100 text-xs md:text-sm font-medium">{t.aiChefSubtitle}</p>
          </div>
        </div>

        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-bold border border-emerald-400/40">
          <Sparkles className="w-3 h-3" />
          <span>Powered by Google Gemini 2.0 Flash — Real AI</span>
        </div>

        {/* API Key Configuration */}
        {showKeyInput && (
          <div className="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-200 text-xs font-bold">
              <Key className="w-4 h-4" />
              <span>Enter your Google Gemini API Key to activate AI Cook</span>
            </div>
            <p className="text-amber-100/70 text-[11px]">
              Get your free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" className="underline text-white font-bold">aistudio.google.com/apikey</a>. It stays saved in your browser only.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-2 rounded-xl bg-white text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none"
              />
              <button onClick={handleSaveKey} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition">
                Save Key
              </button>
            </div>
          </div>
        )}

        {/* Input & Submit */}
        {!showKeyInput && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder={t.aiPromptExample1}
                className="flex-1 px-4 py-3.5 rounded-2xl bg-white text-stone-900 placeholder:text-stone-400 font-medium text-sm focus:outline-none shadow-md"
              />
              <button
                onClick={() => handleAsk()}
                disabled={isThinking}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{isThinking ? 'Thinking...' : t.askAiBtn}</span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-amber-200 font-semibold">Try:</span>
                {samplePrompts.map((s, idx) => (
                  <button key={idx} onClick={() => { setPrompt(s); handleAsk(s); }}
                    className="text-xs bg-white/15 hover:bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-xl font-medium transition text-left max-w-[200px] truncate">
                    "{s}"
                  </button>
                ))}
              </div>
              <button onClick={handleClearKey} className="text-xs text-amber-300/60 hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg transition" title="Remove API Key">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2 text-sm text-red-800">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error</p>
            <p className="text-xs mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl ${
                msg.role === 'user'
                  ? 'bg-amber-600 text-white rounded-br-lg'
                  : 'bg-white border border-stone-200 text-stone-900 rounded-bl-lg shadow-sm'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-2 text-amber-700 text-xs font-bold">
                    <Bot className="w-4 h-4" />
                    <span>AI Jain Chef</span>
                    <span className="text-stone-400 font-normal ml-auto">{msg.timestamp}</span>
                  </div>
                )}
                <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? '' : 'prose prose-sm max-w-none'}`}>
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="text-[10px] text-amber-200 text-right mt-1">{msg.timestamp}</div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 rounded-3xl rounded-bl-lg p-4 shadow-sm max-w-[85%]">
                <div className="flex items-center gap-2 text-amber-700">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-semibold">{t.aiThinking}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      )}
    </div>
  );
};
