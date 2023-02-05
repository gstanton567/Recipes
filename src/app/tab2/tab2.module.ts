import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { RecipeCreatorComponent } from './recipe-creator/recipe-creator.component';
import { IngredientDisplayComponent } from '../tab1/ingredient-display/ingredient-display.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule, 
  ],
  declarations: [Tab2Page, RecipeEditorComponent, RecipeCreatorComponent, IngredientDisplayComponent]
})
export class Tab2PageModule {}
