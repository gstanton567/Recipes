import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Meal } from 'src/app/classes/meal';
import { Ingredient } from 'src/app/classes/ingredient';
import { Quantity } from 'src/app/classes/quantity';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss'],
})
export class RecipeEditorComponent implements OnInit {

  @Input() payload: any;
  meal: Meal; 
  individualIngredients: Ingredient[]
  groupIngredients: string
  setQuantity: number[]  = []
  setUnit: string[] = []
  individual: boolean

  constructor(public alertController: AlertController,
    private modalController: ModalController, private alertService: AlertService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.meal = this.payload.meal as Meal
    if(this.payload.meal.ingredients instanceof Array) {
      this.individualIngredients = this.payload.meal.ingredients
      for(var ingredient of this.individualIngredients)
      {
        this.setQuantity.push(ingredient.quantity.quantities[0])
        this.setUnit.push(ingredient.quantity.units[0])
      }
      this.individual = true;
    } else {
      this.groupIngredients = this.payload.meal.ingredients
      this.individual = false
    }
  }

  async showWarning() {
    const alert = await this.alertController.create({
      header: 'Warning',
      subHeader: 'Closing will not save the current changes to this recipe.',
      message: 'Are you sure you wish to close?',
      buttons: ['Cancel',
        {
          text: 'Yes',
          handler: () => {
            this.modalController.dismiss()
          }
        }]
    });
    await alert.present()
  }

  async submitUserEdits() {
    //validate user input
    if (!this.validateInput()) {
      this.alertService.showAlert('Invalid Entry', 'One of the fields necessary to edit a recipe is empty. Please fill in all fields to continue.')
      return;
    }
    else {
      try {
        if(this.individual) {
          for(var i = 0; i < this.individualIngredients.length; i++) {
            this.individualIngredients[i].quantity.quantities[0] = this.setQuantity[i]
            console.log(this.setQuantity[i])
            this.individualIngredients[i].quantity.units[0] = this.setUnit[i]
            console.log(this.setUnit[i])
  
          }
          this.firebaseService.createRecipe(this.meal.name, this.individualIngredients, this.meal.instructions).then(() => {
            this.alertService.showAlert('Success!', 'Changes to this recipe have been successfully submitted')
          })
        } else {
          this.firebaseService.createRecipe(this.meal.name, this.groupIngredients, this.meal.instructions).then(() => {
            this.alertService.showAlert('Success!', 'Changes to this recipe have been successfully submitted')
          })
        }
        
      } catch (err) {
        console.log(err)
        this.alertService.showDBError(err)
      }
    }
    this.modalController.dismiss()
  }

  validateInput(): boolean {
    if (this.meal != undefined ) {
      //data is valid
    } else {
      return false
    }
    return true;
  }
  

  addIngredient() {
    this.individualIngredients.push(new Ingredient("", new Quantity([], [])))
  }

  deleteIngredient(name: string) {
    var index = this.individualIngredients.findIndex(item => item.name == name)
    this.individualIngredients.splice(index, 1)
  }

}
