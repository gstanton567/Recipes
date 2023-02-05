import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  myClassVariable: number = 1
  constructor() {

  }

  ngOnInit() {
    console.log(this.myClassVariable)
    this.myClassVariable = 2
    console.log(this.myClassVariable)
    this.changeClassVariable()
  }

  changeClassVariable() {
    var localVariable = this.myClassVariable + 1
    console.log(localVariable)
    console.log(this.myClassVariable)
  }


}
