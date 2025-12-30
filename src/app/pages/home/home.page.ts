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
  IonIcon,
  IonThumbnail,
  IonButton,
  IonInput,
  IonButtons
  
  
} from '@ionic/angular/standalone';
import { RecipeService} from '../../services/recipe.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonIcon,IonToolbar, IonList, IonItem, IonButtons, IonInput,IonButton, IonLabel, IonThumbnail, CommonModule, FormsModule,  RouterLink]
})
export class HomePage implements OnInit {

  searchQuery = '';
  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  searchRecipes() {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.recipeService.searchRecipes(this.searchQuery)
      .subscribe((response: any) => {
        this.recipes = response.results;
      });
  }
}


