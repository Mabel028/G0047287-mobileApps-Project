import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonRadio, IonLabel, IonRadioGroup } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonRadio, IonLabel, IonRadioGroup, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
unit: 'metric' | 'us' = 'metric';
  
  ngOnInit() {
    const savedUnit = localStorage.getItem('unit');
    if (savedUnit === 'us' || savedUnit ==='metric'){
      this.unit = savedUnit;
    }
  }
 saveUnit() {
    localStorage.setItem('unit', this.unit);
  }
}
