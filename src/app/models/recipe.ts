export interface Recipe{

    id: string; 
    title: string;
    image: string;
    ingredients: string[];
    instructions: string;
    isFavourite: boolean;
}

export interface RecipeDetails{
  id: number;
  title: string;
  image: string;
  extendedIngredients: {
    original: string;
    measures: {
      us: {
        amount: number;
        unitLong: string;
      };
      
      metric: {
        amount: number;
        unitLong: string;
      };
    };
  }[];
    
  analyzedInstructions: {
    steps: {
      number:number;
      step: string;
    }[];
  }[];

  }