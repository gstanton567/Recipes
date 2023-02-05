import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Ingredient } from '../classes/ingredient';
import { Quantity } from '../classes/quantity';
import { Meal } from '../classes/meal';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  getMeals(): Observable<Meal[]>  {
    const mealsRef = collection(this.firestore, 'newMeals')
    return collectionData(mealsRef, { idField: 'id'}) as Observable<Meal[]>

  }

  async createRecipe(name: string, ingredients: Ingredient[], instructions: string) {
    var tempArr: Ingredient[] = []

    for(var ingredient of ingredients) {
      tempArr.push({name: ingredient.name, quantity: Object.assign({}, new Quantity(ingredient.quantity.quantities, ingredient.quantity.units))})
    }
    console.log()
    await setDoc(doc(this.firestore, "newMeals", name), {
      name: name,
      ingredients: tempArr,
      instructions: instructions
    });
  }
}
