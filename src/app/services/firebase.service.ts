import { Injectable } from '@angular/core';
import { collectionData, doc, docData, FieldPath, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Ingredient } from '../classes/ingredient';
import { Quantity } from '../classes/quantity';
import { Meal } from '../classes/meal';
import { Entry } from '../tab3/entry';
import * as firebase from 'firebase/compat';
import { FirebaseApp } from '@angular/fire/compat';
import { DateConfigService } from './date-config.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private daysWithEntriesForMonth: string[] = []
  constructor(private firestore: Firestore, private dateConfigService: DateConfigService) { }

  getMeals(): Observable<Meal[]> {
    const mealsRef = collection(this.firestore, 'newMeals')
    return collectionData(mealsRef, { idField: 'id' }) as Observable<Meal[]>

  }

  async createRecipe(name: string, ingredients: Ingredient[] | string, instructions: string) {
    let tempArr: Ingredient[] | string = []
    if(ingredients instanceof Array) {
    for (let ingredient of ingredients) {
        tempArr.push({ name: ingredient.name, quantity: Object.assign({}, new Quantity(ingredient.quantity.quantities, ingredient.quantity.units)) })

    }
  } else {
    tempArr = ingredients;
  }
    await setDoc(doc(this.firestore, "newMeals", name), {
      name: name,
      ingredients: tempArr,
      instructions: instructions
    });
  }

  async saveEntries(entries: Entry[]) {
    let tempArr = []
    let path = 'MealEntries/'
    console.log(path)

    for (let entry of entries) {
      tempArr.push(
        {
          mealtime: entry.mealtime,
          foodItems: entry.foodItems,
          date: entry.date,
          notes: entry.notes

        }
      )
    }
    await setDoc(doc(this.firestore, path, entries[0].date), {
      entries: tempArr,

    });

    let todayDateString = this.dateConfigService.dateToDateTimeString(new Date())
  if(!this.daysWithEntriesForMonth.includes(todayDateString)) {
    this.daysWithEntriesForMonth.push(todayDateString)
  }

  let todayDateArr = todayDateString.split("-")
  let monthDateString = todayDateArr[0] + "-" + todayDateArr[1]
  console.log(this.daysWithEntriesForMonth)
  await setDoc(doc(this.firestore, "EntryDates/", monthDateString), {
    entryDates: this.daysWithEntriesForMonth,

  });

  }

  async getEntriesByDate(dateString: string) {

    console.log(dateString)
    const q = query(collection(this.firestore, "MealEntries"), where("__name__", "==", dateString));
    let dataArr: any[]= []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dataArr.push(doc.data())
    });
    return dataArr

  }

  async getDaysForMonthAndYear(dateString?: string){
    if(!dateString) {
      dateString = this.dateConfigService.getMonthYearString(new Date())
    } else {

      //month year string
      var dateArr = dateString.split(' ');
      dateString = parseInt(dateArr[1]) + "-" + (this.dateConfigService.getMonthNumFromName(dateArr[0]))
    }
    console.log(dateString)

    
    const q = query(collection(this.firestore, "EntryDates"), where("__name__", "==", dateString));
    let dataArr: any[]= []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dataArr = doc.data().entryDates
    });
    this.daysWithEntriesForMonth = dataArr
    console.log(dataArr)
    return dataArr
  }
}
