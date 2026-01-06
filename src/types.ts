interface ingredients {
  name: string;
  quantity: string;
}

export interface recipeDataTypes {
  _id: string;
  category: string;
  difficulty: string;
  image: string;
  ingredients: ingredients[];
  name: string;
  cookingTimeMinutes: number;
  likes: [];
  count: number;
  bookmark: [];
}
export interface recipeRoute {
  filterRecipes: recipeDataTypes[];
}
export interface blogData {
  _id: string;
  name: string;
  title: string;
  category: string;
  date: Date;
  image: string;
  quick_summary: string;
  health_benefits: string[];
  blog_likes: string[];
}
