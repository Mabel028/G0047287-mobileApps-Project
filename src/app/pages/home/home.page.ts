import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonThumbnail 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  recipes = [
    { id: 1, title: 'Pasta Carbonara', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Chicken Curry', image: 'https://via.placeholder.com/150' }
  ];

  constructor() { }

  ngOnInit() {}
}
