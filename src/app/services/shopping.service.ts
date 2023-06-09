import { Injectable } from "@angular/core";
import { Ingredient } from "src/app/classes/ingredient";
import { Meal } from "src/app/classes/meal";

@Injectable()
export class ShoppingService {
    static ingredients: Ingredient[] = []

    total(newListIngredient: Ingredient) {
        var found = 0;
        for (var existingIngredient of ShoppingService.ingredients) {
            if (newListIngredient.name == existingIngredient.name)
            {
                this.updateQuantity(newListIngredient, existingIngredient) 
                found++
            }
        }
        if(found == 0) {
          ShoppingService.ingredients.push(newListIngredient)
        }
    }

    updateQuantity(newListIngredient: Ingredient, existingIngredient: Ingredient) {
        for (let i = 0; i < newListIngredient.quantity.units.length; i++) {
          let found = false;
          for (let j = 0; j < existingIngredient.quantity.units.length; j++) {
            if (newListIngredient.quantity.units[i] === existingIngredient.quantity.units[j]) {
              // Convert the quantity values to numbers before adding them
              existingIngredient.quantity.quantities[j] = Number(existingIngredient.quantity.quantities[j]) + Number(existingIngredient.quantity.quantities[i]);
              found = true;
              break;
            }
          }
          if (!found) {
            existingIngredient.quantity.units.push(existingIngredient.quantity.units[i]);
            existingIngredient.quantity.quantities.push(existingIngredient.quantity.quantities[i]);
          }
        }
      }

        

    

    randomize(meals: Meal[]) {
      ShoppingService.ingredients = []
        var weeksMeals = [];
        var tempArray = [];
        var totalNum = 0;
        meals.forEach(val => {
            var store = Object.assign({}, val)
            tempArray.push(store)
        } );
        console.log(tempArray)    
        totalNum = tempArray.length - 1       
        for(var i = 0; i <=4; i++) {
                var rand = Math.round((Math.random()) * totalNum) 
                weeksMeals.push(tempArray[rand])
                tempArray.splice(rand, 1)

                totalNum--;
            }
            return weeksMeals
    }
}