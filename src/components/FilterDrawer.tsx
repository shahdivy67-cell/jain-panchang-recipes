import React, { useState } from 'react';
import { Filter, X, Check, Globe2 } from 'lucide-react';
import { JAIN_INGREDIENTS_LIST, JainIngredient } from '../data/ingredients';
import { Language, RecipeCategory } from '../types';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  lang: Language;
  selectedCategories: RecipeCategory[];
  onToggleCategory: (cat: RecipeCategory) => void;
  selectedIngredients: string[];
  onToggleIngredient: (id: string) => void;
  onClearFilters: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const FilterDrawer: React.FC<Props> = ({
  lang,
  selectedCategories,
  onToggleCategory,
  selectedIngredients,
  onToggleIngredient,
  onClearFilters,
  searchQuery,
  onSearchChange
}) => {
  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const t = UI_STRINGS[lang];

  const categories: { id: RecipeCategory; label: string; icon: string }[] = [
    { id: 'tithi', label: t.tithiCat, icon: '🌾' },
    { id: 'normal', label: t.normalCat, icon: '✨' },
    { id: 'no-cheese-butter-bread', label: t.noCheeseButterBreadCat, icon: '🌱' }
  ];

  const ingredientGroups = [
    'All',
    'Grains & Flours',
    'Pulses & Lentils',
    'Dairy & Fats',
    'Vegetables (Above Ground)',
    'Spices & Herbs',
    'Nuts & Dry Fruits',
    'Bakery & Pantry'
  ];

  const filteredIngredients = activeGroup === 'All'
    ? JAIN_INGREDIENTS_LIST
    : JAIN_INGREDIENTS_LIST.filter((i) => i.group === activeGroup);

  const hasActiveFilters = selectedCategories.length > 0 || selectedIngredients.length > 0 || searchQuery.trim().length > 0;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
      {/* Search Input & Reset Button */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="flex-1 px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-2xl transition flex items-center justify-center gap-1"
          >
            <X className="w-4 h-4" />
            <span>{t.clearAll}</span>
          </button>
        )}
      </div>

      {/* Multi-select Category Pills */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          Categories (Multi-Select Supported):
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const isSelected = selectedCategories.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => onToggleCategory(c.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable Multi-Ingredient Filter Tab */}
      <div className="pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 py-1"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>
              {t.filterByIngredients} ({selectedIngredients.length} selected)
            </span>
          </button>
          {selectedIngredients.length > 0 && (
            <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
              Filtering recipes with your items
            </span>
          )}
        </div>

        {isIngredientsOpen && (
          <div className="mt-3 space-y-3 bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
            {/* Group Badges */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {ingredientGroups.map((grp) => (
                <button
                  key={grp}
                  onClick={() => setActiveGroup(grp)}
                  className={`text-[11px] px-2.5 py-1 rounded-xl font-medium whitespace-nowrap transition ${
                    activeGroup === grp
                      ? 'bg-stone-900 text-white font-bold'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {grp}
                </button>
              ))}
            </div>

            {/* Ingredient Pills Multi-Select */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 max-h-52 overflow-y-auto pr-1">
              {filteredIngredients.map((item) => {
                const isSelected = selectedIngredients.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggleIngredient(item.id)}
                    className={`p-2 rounded-xl text-left text-xs transition border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <span className="line-clamp-1">{item.name[lang]}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
