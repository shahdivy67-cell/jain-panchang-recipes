export type Language = 'en' | 'gu' | 'hi';

export interface PanchangTithiInfo {
  date: string; // YYYY-MM-DD
  tithiName: {
    en: string;
    gu: string;
    hi: string;
  };
  paksha: {
    en: 'Shukla Paksha (Sud)' | 'Krishna Paksha (Vad)';
    gu: 'શુક્લ પક્ષ (સુદ)' | 'કૃષ્ણ પક્ષ (વદ)';
    hi: 'शुक्ल पक्ष (सुद)' | 'कृष्ण पक्ष (वद)';
  };
  isTithiParva: boolean; // Chaudas, Atham, Pacham, Poonam, Amas
  parvaRuleNote: {
    en: string;
    gu: string;
    hi: string;
  };
  sunrise: string;
  sunset: string;
  navkarsi: string;
  porshi: string;
  sadhPorshi: string;
  chauhviar: string;
  festival?: {
    en: string;
    gu: string;
    hi: string;
  };
}

export type RecipeCategory = 'tithi' | 'normal' | 'no-cheese-butter-bread';

export interface RecipeReview {
  id: string;
  userName: string;
  rating: number; // 0 to 5
  comment: string;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: {
    en: string;
    gu: string;
    hi: string;
  };
  description: {
    en: string;
    gu: string;
    hi: string;
  };
  category: RecipeCategory;
  tags: string[]; // e.g. ["Tithi Special", "Zero Dairy", "No Potato No Onion", "Paryushan Special"]
  videoUrl: string; // Direct link or blob URL
  thumbnailUrl: string;
  authorName: string;
  authorAvatar?: string;
  ingredients: string[]; // All strictly 100% Jain verified ingredients
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  instructions: {
    en: string[];
    gu: string[];
    hi: string[];
  };
  rating: number;
  ratingCount: number;
  reviews: RecipeReview[];
  viewsCount: number;
  likesCount: number;
  isBookmarked?: boolean;
  createdAt: string;
  hasBread: boolean;
  hasButter: boolean;
  hasCheese: boolean;
  isTithiCompliant: boolean; // No greens, no root veg, dry seeds/lentils/dairy allowed
}
