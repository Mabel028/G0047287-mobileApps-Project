import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import{RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  recipe: any;
  recipeId!: number;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  
  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    this.recipeService.getRecipeDetails(this.recipeId)
      .subscribe((data: any)  => {
        this.recipe = data;
      });
}
}
