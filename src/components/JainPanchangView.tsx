import React, { useState, useMemo } from 'react';
import { Calendar, Sunrise, Sunset, Clock, Sparkles, AlertCircle, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { computeDailyPanchang, computeMonthCalendar, getUpcomingFestivals, DailyPanchang, JainFestival } from '../engine/panchangEngine';
import { Language } from '../types';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  lang: Language;
}

export const JainPanchangView: React.FC<Props> = ({ lang }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const t = UI_STRINGS[lang];

  const panchang = useMemo(() => computeDailyPanchang(selectedDate), [selectedDate]);
  const upcomingFestivals = useMemo(() => getUpcomingFestivals(new Date(), 12), []);

  const monthCalendar = useMemo(() => {
    if (viewMode !== 'monthly') return [];
    return computeMonthCalendar(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  }, [selectedDate, viewMode]);

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
  const handleToday = () => setSelectedDate(new Date());

  const handlePrevMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() - 1);
    setSelectedDate(next);
  };
  const handleNextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() + 1);
    setSelectedDate(next);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      {/* View Toggle */}
      <div className="flex items-center justify-center gap-2">
        <button onClick={() => setViewMode('daily')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${viewMode === 'daily' ? 'bg-amber-600 text-white shadow' : 'bg-stone-100 text-stone-600'}`}>
          Daily Tithi
        </button>
        <button onClick={() => setViewMode('monthly')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${viewMode === 'monthly' ? 'bg-amber-600 text-white shadow' : 'bg-stone-100 text-stone-600'}`}>
          Monthly Calendar
        </button>
      </div>

      {/* Top Banner with Today's Tithi Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/20 pb-5 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{t.todayTithi}</span>
              <span className="text-amber-200">•</span>
              <MapPin className="w-3 h-3 text-amber-200" />
              <span className="text-amber-200 text-[10px]">Ahmedabad, Gujarat</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {panchang.tithiName[lang]}
            </h1>
            <p className="text-amber-100 font-medium text-sm md:text-base mt-1">
              {panchang.pakshaName[lang]} • {selectedDate.toLocaleDateString(lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={viewMode === 'monthly' ? handlePrevMonth : handlePrevDay} className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleToday} className="px-4 py-2 rounded-xl bg-white text-orange-900 font-bold text-sm shadow hover:bg-amber-50 active:scale-95 transition">
              Today
            </button>
            <button onClick={viewMode === 'monthly' ? handleNextMonth : handleNextDay} className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition backdrop-blur-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Parva Alert & Food Rule */}
        <div className={`p-4 rounded-2xl flex items-start gap-3 backdrop-blur-md ${
          panchang.tithi.isParva
            ? 'bg-amber-950/40 border border-amber-300/40 text-amber-100'
            : 'bg-white/15 border border-white/20 text-white'
        }`}>
          <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${panchang.tithi.isParva ? 'text-amber-300' : 'text-white'}`} />
          <div>
            <div className="font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
              <span>{t.ruleHeader}:</span>
              {panchang.tithi.isParva && (
                <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Parva Tithi (પર્વ તિથિ)
                </span>
              )}
            </div>
            <p className="text-sm mt-1 leading-relaxed opacity-95">
              {panchang.parvaRule[lang]}
            </p>
          </div>
        </div>

        {/* Festival Badge if exists */}
        {panchang.festivals.length > 0 && panchang.festivals.map((f, i) => (
          <div key={i} className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-900 font-bold flex items-center gap-2 text-sm shadow">
            <span className="text-base">🪔</span>
            <span>{f.name[lang]}</span>
            <span className="text-xs font-normal ml-auto opacity-70">{f.tithiRef}</span>
          </div>
        ))}
      </div>

      {/* Daily Timings Grid */}
      {viewMode === 'daily' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <TimingCard icon={<Sunrise className="w-5 h-5" />} label={t.sunrise} value={panchang.sun.sunrise} color="amber" />
          <TimingCard icon={<Sunset className="w-5 h-5" />} label={t.sunset} value={panchang.sun.sunset} color="orange" />
          <TimingCard icon={<Clock className="w-5 h-5" />} label={t.navkarsi} value={panchang.jainTimings.navkarsi} color="blue" />
          <TimingCard icon={<Clock className="w-5 h-5" />} label={t.porshi} value={panchang.jainTimings.porshi} color="purple" />
          <TimingCard icon={<Clock className="w-5 h-5" />} label={t.sadhPorshi} value={panchang.jainTimings.sadhPorshi} color="emerald" />
          <TimingCard icon={<Calendar className="w-5 h-5" />} label={t.paksha} value={panchang.pakshaName[lang].split('(')[0].trim()} color="rose" />
        </div>
      )}

      {/* Monthly Calendar Grid */}
      {viewMode === 'monthly' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900 mb-4">
            {selectedDate.toLocaleDateString(lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-stone-500 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for first day offset */}
            {Array.from({ length: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {monthCalendar.map((day) => {
              const dayNum = parseInt(day.date.split('-')[2]);
              const isToday = day.date === new Date().toISOString().split('T')[0];
              const hasFest = day.festivals.length > 0;
              return (
                <button
                  key={day.date}
                  onClick={() => { setSelectedDate(new Date(day.date + 'T12:00:00')); setViewMode('daily'); }}
                  className={`p-1.5 rounded-xl text-left text-[11px] transition border hover:shadow-md ${
                    isToday ? 'bg-amber-600 text-white border-amber-600 shadow' :
                    day.tithi.isParva ? 'bg-red-50 border-red-200 text-red-900' :
                    'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-bold text-sm">{dayNum}</div>
                  <div className={`truncate font-medium ${isToday ? 'text-amber-100' : 'text-stone-500'}`}>
                    {day.tithiName[lang].split('(')[0].trim().substring(0, 6)}
                  </div>
                  {day.tithi.isParva && !isToday && <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-0.5" />}
                  {hasFest && <div className="text-[9px] truncate text-amber-700 font-bold">🪔</div>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Jain Festivals */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
          <span className="text-xl">🕉️</span>
          <span>{t.panchangCalendar} (2026–2028)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {upcomingFestivals.map((fest, idx) => {
            const festDate = new Date(fest.dateStr + 'T12:00:00');
            const dateLabel = festDate.toLocaleDateString(lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            return (
              <div key={idx} className="p-3.5 rounded-2xl border border-stone-100 hover:border-amber-300 hover:bg-amber-50/40 transition flex items-center justify-between">
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{fest.name[lang]}</p>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">{dateLabel} • {fest.tithiRef}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-medium whitespace-nowrap">Pavitra Parva</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper component for timing cards
function TimingCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const bgMap: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-600',
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
  };
  return (
    <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col items-center text-center">
      <div className={`w-10 h-10 rounded-xl ${bgMap[color] || bgMap.amber} flex items-center justify-center mb-2`}>{icon}</div>
      <span className="text-xs text-stone-500 font-medium">{label}</span>
      <span className="text-base font-bold text-stone-900 mt-1">{value}</span>
    </div>
  );
}
