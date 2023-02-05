import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Meal } from 'src/app/classes/meal';
import { Ingredient } from 'src/app/classes/ingredient';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss'],
})
export class RecipeEditorComponent implements OnInit {

  @Input() payload: any;
  meal: Meal; 
  ingredients: Ingredient[]
  setQuantity: number[]  = []
  setUnit: string[] = []

  constructor(public alertController: AlertController,
    private modalController: ModalController, private alertService: AlertService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.meal = this.payload.meal as Meal
    this.ingredients = this.payload.meal.ingredients
    for(var ingredient of this.ingredients)
    {
      this.setQuantity.push(ingredient.quantity.quantities[0])
      this.setUnit.push(ingredient.quantity.units[0])
    }
    console.log(this.ingredients)
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
        console.log(this.ingredients)
        for(var i = 0; i < this.ingredients.length; i++) {
          this.ingredients[i].quantity.quantities[0] = this.setQuantity[i]
          console.log(this.setQuantity[i])
          this.ingredients[i].quantity.units[0] = this.setUnit[i]
          console.log(this.setUnit[i])

        }
        this.firebaseService.createRecipe(this.meal.name, this.ingredients, this.meal.instructions).then(() => {
          this.alertService.showAlert('Success!', 'Changes to this recipe have been successfully submitted')
        })
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
  

  

}
