import { Ingredient } from "./ingredient";

export class Meal {
    id: string
    constructor(public name: string, public ingredients: Ingredient[] | string, public instructions: string) {

    }
}