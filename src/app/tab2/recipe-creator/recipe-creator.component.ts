import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Meal } from 'src/app/classes/meal';
import { Ingredient } from 'src/app/classes/ingredient';
import { Quantity } from 'src/app/classes/quantity';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.scss'],
})
export class RecipeCreatorComponent implements OnInit {

  meal: Meal;
  ingredients: Ingredient[] = []
  name: string
  instructions: string
  constructor(public alertController: AlertController,
    private modalController: ModalController, private alertService: AlertService,private firebaseService: FirebaseService) { }

  ngOnInit() {
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
        await this.firebaseService.createRecipe(this.name, this.ingredients, this.instructions).then(() => {
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
    

    return true;
  }

  addIngredient() {
    this.ingredients.push(new Ingredient("", new Quantity([], [])))
  }

  deleteIngredient(name: string) {
    console.log(this.ingredients)
    var index = this.ingredients.findIndex(item => item.name == name)
    this.ingredients.splice(index, 1)
    console.log(this.ingredients)
  }
}
