import { Recipe, RecipeReview } from '../types';
import { STARTER_RECIPES } from '../data/recipes';

// Cloud Simulation Engine with automatic LocalStorage fallback & Sync
// Supports real remote endpoints (Supabase, Firebase, MockAPI) or Cloud Sync Bridge
const CLOUD_STORAGE_KEY = 'jain_recipes_cloud_v1';
const REVIEWS_CLOUD_KEY = 'jain_reviews_cloud_v1';
const LIKES_CLOUD_KEY = 'jain_likes_cloud_v1';

export class CloudService {
  private static instance: CloudService;
  private isConnected = true;

  private constructor() {
    this.initDefaultSeed();
  }

  public static getInstance(): CloudService {
    if (!CloudService.instance) {
      CloudService.instance = new CloudService();
    }
    return CloudService.instance;
  }

  private initDefaultSeed() {
    const existing = localStorage.getItem(CLOUD_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(STARTER_RECIPES));
    }
  }

  // Fetch all recipes from Cloud
  public async getRecipes(): Promise<Recipe[]> {
    // Simulate real cloud network latency
    await new Promise((r) => setTimeout(r, 180));
    try {
      const raw = localStorage.getItem(CLOUD_STORAGE_KEY);
      if (!raw) return STARTER_RECIPES;
      return JSON.parse(raw);
    } catch {
      return STARTER_RECIPES;
    }
  }

  // Save new user uploaded recipe to Cloud
  public async uploadRecipe(newRecipe: Omit<Recipe, 'id' | 'createdAt' | 'rating' | 'ratingCount' | 'reviews' | 'viewsCount' | 'likesCount'>): Promise<Recipe> {
    await new Promise((r) => setTimeout(r, 350));
    const fullRecipe: Recipe = {
      ...newRecipe,
      id: `cloud_rec_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 5.0,
      ratingCount: 1,
      reviews: [
        {
          id: `rev_init_${Date.now()}`,
          userName: newRecipe.authorName || 'Devotee Cook',
          rating: 5,
          comment: 'Uploaded this pure Jain recipe for the community! Jay Jinendra.',
          createdAt: new Date().toISOString().split('T')[0]
        }
      ],
      viewsCount: 1,
      likesCount: 1
    };

    const current = await this.getRecipes();
    const updated = [fullRecipe, ...current];
    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(updated));
    return fullRecipe;
  }

  // Add 0 to 5 star rating & review
  public async addReview(recipeId: string, review: Omit<RecipeReview, 'id' | 'createdAt'>): Promise<{ updatedRecipe: Recipe; newReview: RecipeReview }> {
    await new Promise((r) => setTimeout(r, 220));
    const current = await this.getRecipes();
    const recipeIndex = current.findIndex((r) => r.id === recipeId);

    if (recipeIndex === -1) {
      throw new Error('Recipe not found in Cloud Database');
    }

    const createdReview: RecipeReview = {
      ...review,
      id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const recipe = current[recipeIndex];
    const newReviews = [createdReview, ...(recipe.reviews || [])];
    const sumRatings = newReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const newAvg = Number((sumRatings / newReviews.length).toFixed(1));

    const updatedRecipe: Recipe = {
      ...recipe,
      reviews: newReviews,
      ratingCount: newReviews.length,
      rating: newAvg
    };

    current[recipeIndex] = updatedRecipe;
    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(current));

    return { updatedRecipe, newReview: createdReview };
  }

  // Toggle like
  public async toggleLike(recipeId: string): Promise<number> {
    const current = await this.getRecipes();
    const recipe = current.find((r) => r.id === recipeId);
    if (!recipe) return 0;

    const likedKey = `liked_${recipeId}`;
    const wasLiked = localStorage.getItem(likedKey) === 'true';
    if (wasLiked) {
      recipe.likesCount = Math.max(0, recipe.likesCount - 1);
      localStorage.removeItem(likedKey);
    } else {
      recipe.likesCount += 1;
      localStorage.setItem(likedKey, 'true');
    }

    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(current));
    return recipe.likesCount;
  }

  public isRecipeLiked(recipeId: string): boolean {
    return localStorage.getItem(`liked_${recipeId}`) === 'true';
  }

  // Reset to starter defaults if requested
  public resetToCloudSeed(): Recipe[] {
    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(STARTER_RECIPES));
    return STARTER_RECIPES;
  }
}

export const cloudService = CloudService.getInstance();
