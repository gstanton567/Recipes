import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { EntryService } from 'src/app/services/entry/entry.service';
import { Entry } from 'src/app/tab3/entry';

@Component({
  selector: 'app-add-meal-entry-modal',
  templateUrl: './add-meal-entry-modal.component.html',
  styleUrls: ['./add-meal-entry-modal.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true
})
export class AddMealEntryModalComponent implements OnInit {

  tempEntry: Entry = new Entry("Breakfast", "", new Date().toDateString(), "")
  mealtimeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-Workout'];

  constructor(private modalController: ModalController, private entryService: EntryService) { }

  ngOnInit() {
    window.addEventListener('ionKeyboardDidShow', (event) => {
      const activeElement = document.activeElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  async save() {
    this.entryService.mealEntries.push(this.tempEntry)
    await this.entryService.submitUserEdits()
    await this.dismissModal()

  }

  async dismissModal() {
    await this.modalController.dismiss()
  }



}
