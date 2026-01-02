import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonIcon,
  IonThumbnail,
  IonButton,
  IonInput,
  IonText,
  IonButtons,
  IonSpinner
  
} from '@ionic/angular/standalone';
import { RecipeService} from '../../services/recipe.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonSpinner, IonText, IonIcon, IonToolbar, IonList, IonItem, IonButtons, IonInput,IonButton, IonLabel, IonThumbnail, CommonModule, NgIf,
    NgFor,FormsModule,  RouterLink]
})
export class HomePage implements OnInit {

  searchQuery = '';
  recipes: any[] = [];
  isLoading = false;
  noResults = false;
  errorMessage = '';



  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

 searchRecipes() {
  if (!this.searchQuery.trim()) return;

  this.isLoading = true;
   this.noResults = false;
   this.errorMessage = '';
   this.recipes = [];

  this.recipeService.searchRecipes(this.searchQuery)
    .subscribe({
      next: (response: any) => {
        this.isLoading = false;

        if (!response.results || response.results.length === 0) {
          this.noResults = true;
        } else {
          this.recipes = response.results;
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Unable to fetch recipes. Please try again later.';
      }
    });
}



}


