import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Calendar, UtensilsCrossed, Bot, Upload, RefreshCw, Globe, ChevronDown } from 'lucide-react';
import { Recipe, RecipeCategory, Language } from './types';
import { cloudService } from './services/cloudService';
import { UI_STRINGS } from './utils/i18n';
import { JainPanchangView } from './components/JainPanchangView';
import { RecipeCard } from './components/RecipeCard';
import { FilterDrawer } from './components/FilterDrawer';
import { ReviewModal } from './components/ReviewModal';
import { UploadRecipeModal } from './components/UploadRecipeModal';
import { AICookAssistant } from './components/AICookAssistant';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'panchang' | 'recipes' | 'ai-chef'>('recipes');

  // Cloud Recipes State
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States (Multi-select enabled)
  const [selectedCategories, setSelectedCategories] = useState<RecipeCategory[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [reviewRecipe, setReviewRecipe] = useState<Recipe | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Infinite Scroll Pagination
  const [visibleCount, setVisibleCount] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const t = UI_STRINGS[lang];

  // Fetch initial cloud data
  const loadCloudRecipes = async () => {
    setLoading(true);
    try {
      const data = await cloudService.getRecipes();
      setRecipes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCloudRecipes();
  }, []);

  // Filter Logic
  const filteredRecipes = recipes.filter((rec) => {
    // Multi-category match
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(rec.category)) {
        return false;
      }
    }

    // Multi-ingredient match: recipe must contain at least one (or subset) of selected ingredients
    if (selectedIngredients.length > 0) {
      const hasAnySelected = selectedIngredients.some((ing) => rec.ingredients.includes(ing));
      if (!hasAnySelected) return false;
    }

    // Search query match
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const titleMatch = (rec.title.en + rec.title.gu + rec.title.hi).toLowerCase().includes(q);
      const descMatch = (rec.description.en + rec.description.gu + rec.description.hi).toLowerCase().includes(q);
      const tagMatch = rec.tags.some((t) => t.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !tagMatch) return false;
    }

    return true;
  });

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  // Infinite Scroll Trigger
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loadingMore) {
        setLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + 3);
          setLoadingMore(false);
        }, 500);
      }
    },
    [hasMore, loadingMore]
  );

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Review submission
  const handleReviewSubmit = async (recipeId: string, review: { userName: string; rating: number; comment: string }) => {
    const res = await cloudService.addReview(recipeId, review);
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? res.updatedRecipe : r))
    );
  };

  // Recipe upload to cloud
  const handleRecipeUploaded = async (newRecipeData: any) => {
    const saved = await cloudService.uploadRecipe(newRecipeData);
    setRecipes((prev) => [saved, ...prev]);
    setActiveTab('recipes');
  };

  // Like toggle
  const handleToggleLike = async (recipeId: string) => {
    const newLikes = await cloudService.toggleLike(recipeId);
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, likesCount: newLikes } : r))
    );
  };

  const toggleCategory = (cat: RecipeCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedIngredients([]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Jain Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              卐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-900 text-lg md:text-xl tracking-tight">
                  JainPanchang & Food
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {t.cloudSynced}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action buttons + Language Selector */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                  lang === 'en' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('gu')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                  lang === 'gu' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                ગુજ
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                  lang === 'hi' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Upload Video Button */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow transition flex items-center gap-1.5 active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.uploadNav}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 border-t border-stone-100 flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'recipes'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>{t.recipesNav} (Pinterest Feed)</span>
          </button>

          <button
            onClick={() => setActiveTab('panchang')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'panchang'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.panchangNav} & Tithi</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-chef')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'ai-chef'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>{t.aiChefNav}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              AI Smart
            </span>
          </button>
        </div>
      </header>

      {/* Main Body Content based on Tab */}
      <main className="flex-1 pb-16">
        {activeTab === 'panchang' && <JainPanchangView lang={lang} />}

        {activeTab === 'ai-chef' && <AICookAssistant lang={lang} />}

        {activeTab === 'recipes' && (
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
            {/* Filter Drawer & Ingredient Selector */}
            <FilterDrawer
              lang={lang}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
              onClearFilters={clearAllFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Pinterest Style Multi-Column Grid Feed */}
            {loading ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-600 mx-auto" />
                <p className="text-sm font-semibold text-stone-600">Loading pure Jain video recipes from Cloud...</p>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-sm max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  🍲
                </div>
                <h3 className="text-lg font-bold text-stone-800">{t.noRecipesFound}</h3>
                <p className="text-xs text-stone-500">
                  Try unchecking some ingredient filters or asking our AI Cook Assistant in the tab above!
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl shadow hover:bg-amber-700 transition"
                >
                  {t.clearAll}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      lang={lang}
                      onOpenReviewModal={(rec) => setReviewRecipe(rec)}
                      onToggleLike={handleToggleLike}
                      isLiked={cloudService.isRecipeLiked(recipe.id)}
                    />
                  ))}
                </div>

                {/* Infinite Scroll Loader & Trigger element */}
                <div ref={observerRef} className="py-8 text-center">
                  {loadingMore ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                      <span>{t.infiniteFeedScroll}</span>
                    </div>
                  ) : hasMore ? (
                    <span className="text-xs text-stone-400 font-medium">
                      Scroll to discover more authentic Jain creations...
                    </span>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-500 text-xs font-medium">
                      <span>{t.reachedEnd}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Review Modal (0 to 5 Stars & Reviews Saved to Cloud) */}
      <ReviewModal
        recipe={reviewRecipe}
        lang={lang}
        onClose={() => setReviewRecipe(null)}
        onSubmitReview={handleReviewSubmit}
      />

      {/* Upload Recipe Video Modal (Phone Gallery Pick) */}
      {isUploadOpen && (
        <UploadRecipeModal
          lang={lang}
          onClose={() => setIsUploadOpen(false)}
          onRecipeUploaded={handleRecipeUploaded}
        />
      )}
    </div>
  );
}

export default App;
