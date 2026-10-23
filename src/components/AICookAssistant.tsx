import React, { useState } from 'react';
import { Bot, Send, Sparkles, ChefHat, CheckCircle2, Clock, Info } from 'lucide-react';
import { askJainAIChef, AICookResponse } from '../services/aiChefService';
import { Language } from '../types';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  lang: Language;
}

export const AICookAssistant: React.FC<Props> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<AICookResponse[]>([]);
  const t = UI_STRINGS[lang];

  const handleAsk = (queryText?: string) => {
    const textToSearch = queryText || prompt;
    if (!textToSearch.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      const results = askJainAIChef(textToSearch, lang);
      setSuggestions(results);
      setIsThinking(false);
    }, 600);
  };

  const samplePrompts = [
    t.aiPromptExample1,
    t.aiPromptExample2,
    t.aiPromptExample3
  ];

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

        {/* Input & Form */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
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
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span>{isThinking ? 'Analyzing...' : t.askAiBtn}</span>
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-amber-200 font-semibold">Try:</span>
          {samplePrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(s);
                handleAsk(s);
              }}
              className="text-xs bg-white/15 hover:bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-xl font-medium transition text-left"
            >
              "{s}"
            </button>
          ))}
        </div>
      </div>

      {/* AI Processing Loader */}
      {isThinking && (
        <div className="p-8 text-center bg-white rounded-3xl border border-amber-100 shadow-sm space-y-3 animate-pulse">
          <ChefHat className="w-10 h-10 text-amber-600 mx-auto animate-bounce" />
          <h3 className="text-base font-bold text-stone-800">{t.aiThinking}</h3>
          <p className="text-xs text-stone-500">Checking Tithi compliance, zero kandmool, and Ahimsak ingredients...</p>
        </div>
      )}

      {/* Results View */}
      {!isThinking && suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>AI Cook Recommended Creations</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      item.category === 'tithi'
                        ? 'bg-amber-100 text-amber-900'
                        : item.category === 'no-cheese-butter-bread'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-orange-100 text-orange-900'
                    }`}>
                      {item.category === 'tithi' ? '🌾 Tithi Safe' : item.category === 'no-cheese-butter-bread' ? '🌱 No Cheese/Butter/Bread' : '✨ Standard Jain'}
                    </span>
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {item.cookTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">{item.recipeName}</h3>

                  {/* Matched Ingredients */}
                  <div className="mb-3">
                    <span className="text-xs font-bold text-stone-700 block mb-1">Using Your Ingredients:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.matchedIngredients.map((ing, i) => (
                        <span key={i} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg font-medium">
                          ✓ {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Recommended */}
                  <div className="mb-3">
                    <span className="text-xs font-bold text-stone-700 block mb-1">Pantry Spices to Add:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.additionalRecommendedSpices.map((spice, i) => (
                        <span key={i} className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-lg">
                          + {spice}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Steps */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-stone-700 block mb-1">How to Make:</span>
                    <ol className="text-xs text-stone-600 list-decimal list-inside space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-100">
                      {item.steps.map((st, i) => (
                        <li key={i} className="leading-relaxed">{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Compliance Tag */}
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="font-medium">{item.jainComplianceNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
