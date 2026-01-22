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
  recipeTotalCount:number
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
  description: string;
  bookmark:string[]
}

export interface individualBlog {
  name: string;
  title: string;
  category: string;
  date: string;
  image: string;
  quick_summary: string;
  health_benefits: string[];
  description: string;
}

export interface userData {
  _id: string;
  name:string
  email: string;
  password: string;
  isVerify: boolean;
  isAdmin: boolean;
  isOwner:boolean
}


export interface authSignin{
  message:string ,
  user:{
    email:string,
    isAdmin:boolean,
    isVerify:boolean,
    name:string
    password:string
    _id:string,
    _v:number
  }
}