import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonThumbnail,
  IonButton,
  IonInput
  
  
} from '@ionic/angular/standalone';
import { RecipeService} from '../../services/recipe.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput,IonButton, IonLabel, IonThumbnail, CommonModule, FormsModule,  RouterLink]
})
export class HomePage implements OnInit {

  searchQuery = '';
  recipes: any[] = [];

  featuredRecipe: any = null;
  otherRecipes: any[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // loads default data
    this.recipes = [];
  }

  searchRecipes() {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.recipeService.searchRecipes(this.searchQuery)
      .subscribe((response: any) => {
        if (response.results.length > 0) {
          this.featuredRecipe = response.results[0];
          this.otherRecipes = response.results.slice(1);
        } else {
          this.featuredRecipe = null;
          this.otherRecipes = [];
        }
      });
  }
}

