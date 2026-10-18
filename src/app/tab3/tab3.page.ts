import { Component } from '@angular/core';
import { Entry } from './entry';
import { FirebaseService } from '../services/firebase.service';

import { AlertService } from '../services/alert.service';
import { ModalController } from '@ionic/angular';
import { EntryService } from '../services/entry/entry.service';
import { AddMealEntryModalComponent } from '../components/addMealEntryModal/add-meal-entry-modal/add-meal-entry-modal.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  savedEntries: Entry[] = []
  tempEntries: Entry[] = []
  daysWithEntries: any[] = []
  name: string = ""
  constructor(private firebaseService: FirebaseService, private modalController: ModalController, private entryService: EntryService, private alertService: AlertService) {

  }

  async ngOnInit() {
    try {
      await this.entryService.getUserEntries()
      this.tempEntries = this.entryService.mealEntries
      let dataArr = await this.getDaysForMonthAndYear()
      this.daysWithEntries = this.createHighlightedDates(dataArr)
      this.observeDatetimeMonthChange()
    } catch (err) {
      await this.alertService.showDBError(err)
    }



  }

  createHighlightedDates(daysNeededArr: any[]) {
    let tempArr = []

    for (let entryDate of daysNeededArr) {
      tempArr.push({
        date: entryDate,
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      })
    }
    console.log(tempArr)
    return tempArr
  }
  async deleteEntry(entryIndex: number) {
    await this.entryService.deleteEntry(entryIndex)
    this.tempEntries = this.entryService.mealEntries

  }

  async addEntry() {
    let modal = await this.modalController.create({
      component: AddMealEntryModalComponent,
    })
    await modal.present()
    await modal.onDidDismiss()
    this.tempEntries = this.entryService.mealEntries
  }



  async submitUserEdits() {
    this.entryService.submitUserEdits()
    this.tempEntries = this.entryService.mealEntries

  }




  observeDatetimeMonthChange() {
    let previous = '';
    const targetNode = document.querySelector('ion-datetime');
    const config: MutationObserverInit = {
      attributes: true,
      childList: true,
      subtree: true,
    };
    const callbackProcess = async (
      mutationsList: { type: string }[],
      _observer: unknown
    ): Promise<string[]> => {

      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          const e = document
            .querySelector('ion-datetime')
            ?.shadowRoot?.querySelector('ion-label')?.textContent;

          if (e && e !== previous) {
            console.log(e)
            previous = e;
            try {
              this.daysWithEntries = this.createHighlightedDates(await this.getDaysForMonthAndYear(e))
            } catch (error) {
              this.alertService.showDBError(error)
            }

            return e?.split(' ');
          }
        }
      }
    };

    const observer = new MutationObserver(callbackProcess);
    observer.observe(targetNode, config);
  }

  async getDaysForMonthAndYear(dateString?: string) {
    return await this.firebaseService.getDaysForMonthAndYear(dateString)
  }

  async getUserEntries(dateSelectedEvent: any) {
    console.log(dateSelectedEvent)
    await this.entryService.getUserEntries(dateSelectedEvent)
    this.tempEntries = this.entryService.mealEntries
  }





}
