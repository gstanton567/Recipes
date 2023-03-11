import { Component, ChangeDetectorRef } from '@angular/core';
import { Ingredient } from '../classes/ingredient';
import { FirebaseService } from '../services/firebase.service';
import { Meal } from '../classes/meal';
import { ShoppingService } from '../services/shopping.service';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  meals: Meal[] = []
  ingredients: Ingredient[] = []
  ingredientsDisplay: any[]=  []

  constructor(public shoppingService: ShoppingService, private firebaseService: FirebaseService, private cd: ChangeDetectorRef, private analytics: AngularFireAnalytics) {
  }

  ngOnInit() {
    
  }

  totalIngredients(meals: Meal[]) {
    //create a list of all the ingredients for the 5 weekly meals
    for(var meal of this.meals) {
      for(var ingredient of meal.ingredients) {
        this.shoppingService.total(ingredient);
      }
    }

  }

  generateMeals() {
    //trying out firebase analytics
    this.analytics.logEvent('Generated Meals')

    this.firebaseService.getMeals().subscribe((meals: Meal[]) => {

      //setup 5 meals for weekly meal generator
      var randomMeals = this.shoppingService.randomize(meals)
      this.meals = randomMeals
      this.totalIngredients(randomMeals)
      this.ingredients = ShoppingService.ingredients

      this.ingredientsDisplay = this.generateIngredientsDisplay()
      this.cd.detectChanges()
    })
    
  }

  generateIngredientsDisplay() {
    var retArray = []
    var tempArr = []

    //generate list of ingredients for weekly meals
    for (var ingredient of this.ingredients) {
      tempArr = []
      for (var i = 0; i < ingredient.quantity.quantities.length; i++)
      {
        tempArr.push({quantity: ingredient.quantity.quantities[i], unit: ingredient.quantity.units[i]})
      }
      //deep copy
      retArray.push(tempArr.slice())
    }

    //sort alphabetically
    retArray.sort((a, b) => a.unit - b.unit)

    return retArray
  }

}
