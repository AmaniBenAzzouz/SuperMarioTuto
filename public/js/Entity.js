import {Vectors } from './math.js';
export class Trait{
    constructor(name){
      this.name = name;
    }
    update(){
        console.warn("Not supported trait");
    }
}
export default class Entity{
    constructor(){
        this.pos = new Vectors(0,0);
        this.vel = new Vectors(0,0);
        this.size = new Vectors(0,0);
        this.traits =[]  ;//mario movments
    }
    addTrait(trait){
        this.traits.push(trait);
        //add method dynamically
        //this method methodName = some function
        this[trait.name] = trait;
    }
    //if we update mario we update all active movments
    update(deltaTime){
        this.traits.forEach(trait =>{
            trait.update(this,deltaTime);
        })
    }
}