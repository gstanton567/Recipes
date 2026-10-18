import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Entry } from 'src/app/tab3/entry';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {


  mealEntries: Entry[] = []
  constructor(private firebaseService: FirebaseService, private alertService: AlertService) { }


  async getUserEntries(dateSelectedEvent?: any) {
    let dateString = new Date().toDateString()
    if (dateSelectedEvent) {
      dateString = new Date(dateSelectedEvent.detail.value).toDateString()

    }
    try {
      let entryList = await this.firebaseService.getEntriesByDate(dateString)
      if (entryList.length > 0) {
        this.mealEntries = entryList[0].entries as Entry[]
      }
      else {
        this.mealEntries = []
      }
    } catch (err) {
      this.alertService.showDBError(err)
    }




  }


  async deleteEntry(entryIndex: number) {
    this.mealEntries.splice(entryIndex, 1)
    await this.submitUserEdits()

  }

  async submitUserEdits() {
    try {
      await this.firebaseService.saveEntries(this.mealEntries)
      await this.alertService.showAlert("Submission Saved", "Entries Saved Successfully")
    }
    catch (e) {
      console.log(e);
    }
  }
}
