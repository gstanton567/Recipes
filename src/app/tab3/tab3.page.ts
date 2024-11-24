import { Component } from '@angular/core';
import { Entry } from './entry';
import { FirebaseService } from '../services/firebase.service';

import { AlertService } from '../services/alert.service';

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
  constructor(private firebaseService: FirebaseService, private alertService: AlertService) {

  }

  async ngOnInit() {
    try {
      await this.getUserEntries()
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
  deleteEntry(entryIndex: number) {
    this.tempEntries.splice(entryIndex, 1)
    console.log("temp", this.tempEntries)
  }

  async addEntry() {
    this.tempEntries.push(new Entry("", "", new Date().toDateString(), ""))
    await this.alertService.showAlert("Meal Entry Added", "You can now fill in information for this entry. Don't forget to save afterwards!")

  }



  async submitUserEdits() {
    this.savedEntries = [];
    for (let entry of this.tempEntries) {
      this.savedEntries.push(entry)
    }
    console.log(this.savedEntries)
    try {
      await this.firebaseService.saveEntries(this.savedEntries)
      await this.alertService.showAlert("Submission Saved", "Entries Saved Successfully")
    }
    catch (e) {
      console.log(e);
    }
  }

  async getUserEntries(dateSelectedEvent?: any) {
    let dateString = new Date().toDateString()
    if (dateSelectedEvent) {
      dateString = new Date(dateSelectedEvent.detail.value).toDateString()

    }
    try {
      let entryList = await this.firebaseService.getEntriesByDate(dateString)
      if (entryList.length > 0) {
        this.tempEntries = entryList[0].entries as Entry[]
      }
      else {
        this.tempEntries = []
      }
    } catch (err) {
      this.alertService.showDBError(err)
    }




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





}
