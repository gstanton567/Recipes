import { Ingredient } from "./ingredient";

export class Meal {
    id: string
    constructor(public name: string, public ingredients: Ingredient[], public instructions: string) {

    }
}