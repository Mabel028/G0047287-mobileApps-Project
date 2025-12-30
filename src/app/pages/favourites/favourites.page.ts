import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonThumbnail, 
  IonLabel, 
  IonButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonThumbnail, IonLabel, IonButton, CommonModule, RouterLink]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];

  ngOnInit() {
    this.loadFavourites();
  }

  loadFavourites() {
    const saved = localStorage.getItem('favourites');
    this.favourites = saved ? JSON.parse(saved) : [];
  }

  removeFavourite(id: number) {
    this.favourites = this.favourites.filter(r => r.id !== id);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }
}
