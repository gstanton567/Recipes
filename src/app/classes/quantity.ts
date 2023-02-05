import { Injectable } from '@angular/core';



export class Quantity {
    constructor(public quantities: number[], public units: string[]) {
        this.fixUnits()

    }
    fixUnits() {
        var i = 0;
        for (i = 0; i < this.units.length; i++) {
            if (!this.units[i]) {
                this.units[i] = ""
            }
            this.units[i] = this.units[i].toLowerCase()
        }
        console.log(this.units)
    }
}




