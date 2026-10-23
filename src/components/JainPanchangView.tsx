import React, { useState } from 'react';
import { Calendar, Sunrise, Sunset, Clock, Sparkles, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPanchangForDate, JAIN_FESTIVALS } from '../data/panchang';
import { Language } from '../types';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  lang: Language;
}

export const JainPanchangView: React.FC<Props> = ({ lang }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const t = UI_STRINGS[lang];
  const panchang = getPanchangForDate(selectedDate);

  const handlePrevDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() - 1);
    setSelectedDate(next);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* Top Banner with Today's Tithi Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/20 pb-5 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{t.todayTithi}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {panchang.tithiName[lang]}
            </h1>
            <p className="text-amber-100 font-medium text-sm md:text-base mt-1">
              {panchang.paksha[lang]} • {selectedDate.toLocaleDateString(lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Date Navigator Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition backdrop-blur-sm"
              title="Previous Day"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 rounded-xl bg-white text-orange-900 font-bold text-sm shadow hover:bg-amber-50 active:scale-95 transition"
            >
              Today
            </button>
            <button
              onClick={handleNextDay}
              className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition backdrop-blur-sm"
              title="Next Day"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Parva Alert & Food Rule */}
        <div className={`p-4 rounded-2xl flex items-start gap-3 backdrop-blur-md ${
          panchang.isTithiParva 
            ? 'bg-amber-950/40 border border-amber-300/40 text-amber-100' 
            : 'bg-white/15 border border-white/20 text-white'
        }`}>
          <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${panchang.isTithiParva ? 'text-amber-300' : 'text-white'}`} />
          <div>
            <div className="font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
              <span>{t.ruleHeader}:</span>
              {panchang.isTithiParva && (
                <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Parva Tithi (પર્વ તિથિ)
                </span>
              )}
            </div>
            <p className="text-sm mt-1 leading-relaxed opacity-95">
              {panchang.parvaRuleNote[lang]}
            </p>
          </div>
        </div>

        {/* Festival Badge if exists */}
        {panchang.festival && (
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-900 font-bold flex items-center gap-2 text-sm shadow">
            <span className="text-base">🪔</span>
            <span>{panchang.festival[lang]}</span>
          </div>
        )}
      </div>

      {/* Timings Grid (Suryoday, Sunset/Chauhviar, Navkarsi, Porshi) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-2">
            <Sunrise className="w-5 h-5" />
          </div>
          <span className="text-xs text-stone-500 font-medium">{t.sunrise}</span>
          <span className="text-base font-bold text-stone-900 mt-1">{panchang.sunrise}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-2">
            <Sunset className="w-5 h-5" />
          </div>
          <span className="text-xs text-stone-500 font-medium">{t.sunset}</span>
          <span className="text-base font-bold text-orange-700 mt-1">{panchang.sunset}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs text-stone-500 font-medium">{t.navkarsi}</span>
          <span className="text-base font-bold text-stone-900 mt-1">{panchang.navkarsi}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs text-stone-500 font-medium">{t.porshi}</span>
          <span className="text-base font-bold text-stone-900 mt-1">{panchang.porshi}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs text-stone-500 font-medium">{t.sadhPorshi}</span>
          <span className="text-base font-bold text-stone-900 mt-1">{panchang.sadhPorshi}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-xs text-stone-500 font-medium">{t.paksha}</span>
          <span className="text-xs font-bold text-stone-800 mt-1 text-center line-clamp-1">{panchang.paksha[lang]}</span>
        </div>
      </div>

      {/* Jain Major Festivals & Fasting Days */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
          <span className="text-xl">🕉️</span>
          <span>{t.panchangCalendar}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {JAIN_FESTIVALS.map((fest, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-stone-100 hover:border-amber-300 hover:bg-amber-50/40 transition flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-stone-800 text-sm">{fest.name[lang]}</p>
                <p className="text-xs text-amber-700 font-medium mt-0.5">{fest.dateRange}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-medium">
                Pavitra Parva
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
