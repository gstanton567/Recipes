import { Injectable } from "@angular/core";
import { Ingredient } from "src/app/classes/ingredient";
import { Meal } from "src/app/classes/meal";

@Injectable()
export class ShoppingService {
    ingredients: Ingredient[] = []

    total(ingredient: Ingredient) {
        var found = 0;
        for (var item of this.ingredients) {
            if (item.name == ingredient.name)
            {
                this.updateQuantity(ingredient, item) 
                found++
            }
        }
        if(found == 0) {
            this.ingredients.push(ingredient)
        }
    }

    updateQuantity(ingredient: Ingredient, item: Ingredient) {
        for (let i = 0; i < ingredient.quantity.units.length; i++) {
          let found = false;
          for (let j = 0; j < item.quantity.units.length; j++) {
            if (ingredient.quantity.units[i] === item.quantity.units[j]) {
              // Convert the quantity values to numbers before adding them
              item.quantity.quantities[j] = Number(item.quantity.quantities[j]) + Number(ingredient.quantity.quantities[i]);
              found = true;
              break;
            }
          }
          if (!found) {
            item.quantity.units.push(ingredient.quantity.units[i]);
            item.quantity.quantities.push(ingredient.quantity.quantities[i]);
          }
        }
      }

        

    

    randomize(meals: Meal[]) {
        this.ingredients = []
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
            console.log(weeksMeals)
            return weeksMeals
    }
}