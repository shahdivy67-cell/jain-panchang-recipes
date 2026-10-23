import React, { useState } from 'react';
import { Upload, Film, Check, AlertCircle, Sparkles } from 'lucide-react';
import { RecipeCategory, Language } from '../types';
import { JAIN_INGREDIENTS_LIST } from '../data/ingredients';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  lang: Language;
  onRecipeUploaded: (data: any) => Promise<void>;
  onClose: () => void;
}

export const UploadRecipeModal: React.FC<Props> = ({
  lang,
  onRecipeUploaded,
  onClose
}) => {
  const t = UI_STRINGS[lang];
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<RecipeCategory>('tithi');
  const [authorName, setAuthorName] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [instructionsText, setInstructionsText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredientFilterGroup, setIngredientFilterGroup] = useState<string>('All');

  // Handle Gallery Pick of video file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(objectUrl);
    }
  };

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const groups = ['All', 'Grains & Flours', 'Pulses & Lentils', 'Dairy & Fats', 'Vegetables (Above Ground)', 'Spices & Herbs', 'Nuts & Dry Fruits', 'Bakery & Pantry'];

  const filteredIngredientList = ingredientFilterGroup === 'All'
    ? JAIN_INGREDIENTS_LIST
    : JAIN_INGREDIENTS_LIST.filter((i) => i.group === ingredientFilterGroup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    try {
      // Direct video url from user's gallery upload or fallback high quality video
      const finalVideoUrl = videoPreviewUrl || 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-soup-plate-with-herbs-43093-large.mp4';
      const steps = instructionsText.trim()
        ? instructionsText.split('\n').filter(Boolean)
        : [
            'Prepare all Jain compliant ingredients as listed.',
            'Cook with pure ahimsak method according to Jain traditions.',
            'Serve fresh with family before sunset.'
          ];

      const newRecipeData = {
        title: { en: title, gu: title, hi: title },
        description: { en: description || 'Delicious pure Jain recipe', gu: description || 'સ્વાદિષ્ટ શુદ્ધ જૈન વાનગી', hi: description || 'स्वादिष्ट शुद्ध जैन व्यंजन' },
        category,
        tags: [category === 'tithi' ? 'Tithi Compliant' : 'Jain Satvik', 'Community Video'],
        videoUrl: finalVideoUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        authorName: authorName.trim(),
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        ingredients: selectedIngredients.length > 0 ? selectedIngredients : ['besan', 'ghee', 'cumin-seeds'],
        prepTimeMinutes: 15,
        cookTimeMinutes: 20,
        servings: 4,
        instructions: {
          en: steps,
          gu: steps,
          hi: steps
        },
        hasBread: selectedIngredients.includes('pure-bread'),
        hasButter: selectedIngredients.includes('butter'),
        hasCheese: selectedIngredients.includes('processed-cheese'),
        isTithiCompliant: category === 'tithi'
      };

      await onRecipeUploaded(newRecipeData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{t.uploadTitle}</h3>
            <p className="text-xs text-amber-100 mt-0.5">{t.uploadSubtitle}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-amber-200 text-lg font-bold">
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Gallery Pick Video Input */}
          <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-4 bg-amber-50/50 text-center transition">
            <input
              type="file"
              accept="video/*"
              id="gallery-video-input"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="gallery-video-input" className="cursor-pointer flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                <Film className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-amber-900">{t.videoFile}</span>
              <span className="text-xs text-stone-500 mt-1">{t.videoHint}</span>
              {videoFile && (
                <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                </div>
              )}
            </label>

            {/* Video preview if picked */}
            {videoPreviewUrl && (
              <div className="mt-3 max-w-xs mx-auto rounded-xl overflow-hidden aspect-video bg-black shadow">
                <video src={videoPreviewUrl} controls className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Recipe Name & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t.recipeTitle} *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Jain Poha Cutlet / Methi-free Thepla"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">{t.yourName} *</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Jinal Shah"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">{t.categorySelect}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('tithi')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                  category === 'tithi'
                    ? 'bg-amber-600 text-white border-amber-600 shadow'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                🌾 {t.tithiCat}
              </button>
              <button
                type="button"
                onClick={() => setCategory('normal')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                  category === 'normal'
                    ? 'bg-amber-600 text-white border-amber-600 shadow'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                ✨ {t.normalCat}
              </button>
              <button
                type="button"
                onClick={() => setCategory('no-cheese-butter-bread')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                  category === 'no-cheese-butter-bread'
                    ? 'bg-amber-600 text-white border-amber-600 shadow'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                🌱 {t.noCheeseButterBreadCat}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Recipe Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how this dish is prepared cleanly without potatoes, onions, garlic or greens..."
              className="w-full p-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* 100% Jain Ingredients Selector from World Catalog */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-700">
                {t.ingredientsUsed} ({selectedIngredients.length} selected)
              </label>
              <span className="text-[11px] text-amber-700 font-semibold">100% Jain Certified</span>
            </div>

            {/* Filter group buttons */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {groups.map((grp) => (
                <button
                  key={grp}
                  type="button"
                  onClick={() => setIngredientFilterGroup(grp)}
                  className={`px-2.5 py-1 text-[11px] rounded-lg font-medium whitespace-nowrap transition ${
                    ingredientFilterGroup === grp
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {grp}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-40 overflow-y-auto p-2 bg-stone-50 border border-stone-200 rounded-xl">
              {filteredIngredientList.map((item) => {
                const isChecked = selectedIngredients.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleIngredient(item.id)}
                    className={`p-2 rounded-lg text-left text-xs flex items-center justify-between transition border ${
                      isChecked
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="line-clamp-1">{item.name[lang]}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              {t.instructionsTitle} (One step per line)
            </label>
            <textarea
              rows={3}
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              placeholder="Step 1: Roast cumin in pure ghee...&#10;Step 2: Add besan and curd gravy..."
              className="w-full p-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            <span>{isSubmitting ? 'Syncing to Cloud Feed...' : t.submitUpload}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
