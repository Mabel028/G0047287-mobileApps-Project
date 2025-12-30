import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe, RecipeDetails } from '../models/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) { }

  searchRecipes(query: string): Observable<{ results: Recipe[] }> {
    return this.http.get<{ results: Recipe[] }>(
      `${this.baseUrl}/complexSearch?query=${query}&apiKey=${this.apiKey}`
    );
  }

 getRecipeDetails(id: number) {
  const unit = localStorage.getItem('unit') || 'metric';

  return this.http.get(
    `${this.baseUrl}/${id}/information`,
    {
      params: {
        apiKey: this.apiKey,
        units: unit
      }
    }
  );
}

}
