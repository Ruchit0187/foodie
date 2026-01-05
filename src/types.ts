
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
  name:string
  cookingTimeMinutes:number
  likes:[]
  count:number
  bookmark:[]
}
export interface recipeRoute{
    filterRecipes:recipeDataTypes[] 
}
