import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Meal } from '../classes/meal';
import { RecipeCreatorComponent } from './recipe-creator/recipe-creator.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  meals: Meal[] = []
  
  constructor(private firebaseService: FirebaseService, private cd: ChangeDetectorRef, private modalController: ModalController) {}
  ngOnInit() {
    this.firebaseService.getMeals().subscribe((meals: Meal[]) => {
      this.meals = meals
      this.cd.detectChanges()
    })
  }

  async openActionsModal(i: number) {
    const payload = {
     meal: this.meals[i]
    }
      const modal = await this.modalController.create({
        component: RecipeEditorComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          payload: payload,
        },
      });
      return await modal.present();
    
  }

  async openCreatorModal() {
    console.log("here")
      const modal = await this.modalController.create({
        component: RecipeCreatorComponent,
        cssClass: 'my-custom-class',
        componentProps: {
        },
      });
      return await modal.present();
    
  }
  
}
