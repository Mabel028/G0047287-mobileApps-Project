import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon,IonList, IonItem, IonLabel,  } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonList, IonItem, IonLabel, IonIcon,
    CommonModule, FormsModule
  ]
})
export class RecipeDetailsPage implements OnInit {

  recipe: any = null;
  unit: 'metric' | 'us' = 'metric';
  isFavourite = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Load unit preference
    const savedUnit = localStorage.getItem('unit');
    if (savedUnit === 'us' || savedUnit === 'metric') {
      this.unit = savedUnit;
    }

    // Fetch recipe
   this.recipeService.getRecipeDetails(id).subscribe({
  next: (data) => {
    this.recipe = data;
    this.syncFavouriteState();
  }
});

  }

  // Check if recipe is already in favourites
  syncFavouriteState() {
  if (!this.recipe) return;

  const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
  this.isFavourite = favs.some((r: any) => r.id === this.recipe.id);
}


  // Toggle recipe in favourites
  toggleFavourite() {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (this.isFavourite) {
      // Remove from favourites
      const index = favs.indexOf(this.recipe.id);
      if (index > -1) favs.splice(index, 1);
      this.isFavourite = false;
      this.showToast('Removed from favourites');
    } else {
      // Add to favourites
      favs.push({id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image});

      this.isFavourite = true;
      this.showToast('Added to favourites ❤️');
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
  }

  // Convert units for display
  convertAmount(amount: number, unit: string) {
    if (this.unit === 'metric') return `${amount} ${unit}`;
    if (unit === 'grams') return `${(amount / 28.35).toFixed(2)} oz`;
    if (unit === 'milliliters') return `${(amount / 29.57).toFixed(2)} oz`;
    if (unit === 'liters') return `${(amount * 33.81).toFixed(2)} oz`;
    return `${amount} ${unit}`;
  }


  get displayIngredients() {
  if (!this.recipe || !this.recipe.extendedIngredients) {
    return [];
  }

  return this.recipe.extendedIngredients.map((ing: any) => {
    return {
      ...ing,
      displayAmount: this.convertAmount(ing.amount, ing.unit)
    };
  });
}


async showToast(message: string) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 2000,
    position: 'bottom',
    color: 'primary'
  });
  await toast.present();
}

}
