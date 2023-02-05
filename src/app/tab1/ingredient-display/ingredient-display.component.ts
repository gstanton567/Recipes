import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ingredient-display',
  templateUrl: './ingredient-display.component.html',
  styleUrls: ['./ingredient-display.component.scss'],
})
export class IngredientDisplayComponent implements OnInit {

  @Input() name: string
  @Input() quantity: number
  @Input() unit: string
  @Output() nameChange = new EventEmitter<string>();
  @Output() quantityChange = new EventEmitter<number>();
  @Output() unitChange = new EventEmitter<string>();
  constructor() {

   }

  ngOnInit() {}

  updateValue() {
    this.nameChange.emit(this.name);
    this.quantityChange.emit(this.quantity);
    this.unitChange.emit(this.unit);
    
  }
}
