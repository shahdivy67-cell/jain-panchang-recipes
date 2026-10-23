import React, { useState } from 'react';
import { Star, X, MessageSquare, User, Send, Check } from 'lucide-react';
import { Recipe, RecipeReview, Language } from '../types';
import { UI_STRINGS } from '../utils/i18n';

interface Props {
  recipe: Recipe | null;
  lang: Language;
  onClose: () => void;
  onSubmitReview: (recipeId: string, review: { userName: string; rating: number; comment: string }) => Promise<void>;
}

export const ReviewModal: React.FC<Props> = ({
  recipe,
  lang,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!recipe) return null;
  const t = UI_STRINGS[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmitReview(recipe.id, {
        userName: userName.trim(),
        rating,
        comment: comment.trim() || 'Jai Jinendra! Tried this recipe, wonderful Jain preparation.'
      });
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg leading-tight">{t.rateThisRecipe}</h3>
            <p className="text-xs text-amber-100 line-clamp-1 mt-0.5">{recipe.title[lang]}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submittedSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-stone-900">Review Saved to Cloud!</h4>
              <p className="text-sm text-stone-500">Thank you for helping fellow Jain food enthusiasts.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Picker (0 to 5 stars) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800">
                  {t.giveRatingLabel} <span className="text-amber-600 font-bold ml-1">{rating} / 5</span>
                </label>
                <div className="flex items-center gap-1.5 py-1">
                  {[0, 1, 2, 3, 4, 5].map((starVal) => {
                    if (starVal === 0) {
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(0)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-bold mr-2 ${
                            rating === 0
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                          }`}
                        >
                          0★
                        </button>
                      );
                    }
                    const isFilled = (hoverRating !== null ? hoverRating : rating) >= starVal;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => setRating(starVal)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            isFilled ? 'fill-current text-amber-500' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">
                  {t.yourName} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Priyank Shah"
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Review Textarea */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">
                  {t.writeReview}
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share how it turned out, taste on fasting days, tips..."
                  className="w-full p-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Syncing to Cloud...' : t.submitReview}</span>
              </button>
            </form>
          )}

          {/* Past Reviews List */}
          <div className="pt-4 border-t border-stone-200">
            <h4 className="font-bold text-sm text-stone-800 mb-3 flex items-center justify-between">
              <span>Community Reviews</span>
              <span className="text-xs font-normal text-stone-500">
                {recipe.reviews?.length || 0} reviews
              </span>
            </h4>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {(!recipe.reviews || recipe.reviews.length === 0) ? (
                <p className="text-xs text-stone-400 italic">No reviews yet. Be the first to review!</p>
              ) : (
                recipe.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-stone-50 rounded-xl text-xs space-y-1 border border-stone-100">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800">{rev.userName}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold">{rev.rating}★</span>
                      </div>
                    </div>
                    <p className="text-stone-600">{rev.comment}</p>
                    <span className="text-[10px] text-stone-400 block">{rev.createdAt}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
