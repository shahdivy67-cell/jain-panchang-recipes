import React, { useState } from 'react';
import { Star, MessageSquare, Clock, Heart, ChefHat, Play, X, Sparkles } from 'lucide-react';
import { Recipe, Language } from '../types';
import { JAIN_INGREDIENTS_LIST } from '../data/ingredients';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  recipe: Recipe;
  lang: Language;
  onOpenReviewModal: (recipe: Recipe) => void;
  onToggleLike: (recipeId: string) => void;
  isLiked: boolean;
}

export const RecipeCard: React.FC<Props> = ({
  recipe,
  lang,
  onOpenReviewModal,
  onToggleLike,
  isLiked
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const t = UI_STRINGS[lang];

  // Map ingredient ids to localized names
  const ingredientNames = recipe.ingredients.map((ingId) => {
    const item = JAIN_INGREDIENTS_LIST.find((i) => i.id === ingId);
    return item ? item.name[lang] : ingId;
  });

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Media / Video Header (Pinterest Style Card) */}
      <div className="relative aspect-[4/3] sm:aspect-video w-full bg-stone-900 overflow-hidden cursor-pointer">
        {isPlayingVideo ? (
          <div className="relative w-full h-full bg-black">
            <video
              src={recipe.videoUrl}
              autoPlay
              controls
              playsInline
              loop
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlayingVideo(false);
              }}
              className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-1.5 rounded-full z-10 transition backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsPlayingVideo(true)}
            className="w-full h-full relative group"
          >
            <img
              src={recipe.thumbnailUrl}
              alt={recipe.title[lang]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-amber-500/90 group-hover:bg-amber-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition duration-300 backdrop-blur-sm pl-1">
                <Play className="w-6 h-6 fill-current" />
              </div>
            </div>

            {/* Category Pill */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {recipe.category === 'tithi' && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow backdrop-blur-sm">
                  🌾 Tithi Safe
                </span>
              )}
              {recipe.category === 'no-cheese-butter-bread' && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow backdrop-blur-sm">
                  🌱 No Cheese/Butter/Bread
                </span>
              )}
              {recipe.category === 'normal' && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-600 text-white shadow backdrop-blur-sm">
                  ✨ Standard Jain
                </span>
              )}
            </div>

            {/* Duration / Cooking time pill */}
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
            </div>
          </div>
        )}
      </div>

      {/* Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Author info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {recipe.authorAvatar ? (
                <img
                  src={recipe.authorAvatar}
                  alt={recipe.authorName}
                  className="w-7 h-7 rounded-full object-cover border border-amber-300"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                  {recipe.authorName.charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium text-stone-600">{recipe.authorName}</span>
            </div>

            {/* Like button */}
            <button
              onClick={() => onToggleLike(recipe.id)}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition ${
                isLiked
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-stone-100 text-stone-600 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
              <span>{recipe.likesCount}</span>
            </button>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug line-clamp-2 hover:text-amber-700 transition">
            {recipe.title[lang]}
          </h3>

          {/* Description */}
          <p className="text-stone-600 text-xs sm:text-sm mt-1.5 line-clamp-2">
            {recipe.description[lang]}
          </p>

          {/* Ingredients Preview Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ingredientNames.slice(0, 4).map((name, i) => (
              <span
                key={i}
                className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-lg font-medium"
              >
                {name}
              </span>
            ))}
            {ingredientNames.length > 4 && (
              <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-lg font-medium">
                +{ingredientNames.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Rating and Action footer */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          {/* Average Rating (0 to 5 stars) */}
          <button
            onClick={() => onOpenReviewModal(recipe)}
            className="flex items-center gap-1.5 text-left group/rate"
          >
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              <span className="text-sm font-extrabold text-stone-900 ml-1">
                {recipe.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-stone-400 group-hover/rate:text-amber-700 underline">
              ({recipe.ratingCount} {t.reviewsCount})
            </span>
          </button>

          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition"
          >
            {showFullDetails ? 'Hide Steps' : 'View Recipe'}
          </button>
        </div>

        {/* Expandable recipe steps */}
        {showFullDetails && (
          <div className="mt-4 pt-4 border-t border-amber-100 text-left space-y-3 bg-amber-50/40 p-3 rounded-2xl animate-fadeIn">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                {t.ingredientsTitle}:
              </h4>
              <ul className="text-xs text-stone-700 list-disc list-inside space-y-0.5">
                {ingredientNames.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                {t.instructionsTitle}:
              </h4>
              <ol className="text-xs text-stone-700 list-decimal list-inside space-y-1">
                {recipe.instructions[lang].map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
