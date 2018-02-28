import {Trait} from '../Entity.js';

export default class Walk extends Trait{
    constructor(){
        super('Walk');
        this.direction  = 0;
        this.speed = 6000;
    }
    
    update(entity,deltaTime){
        entity.vel.x = this.speed * this.direction * deltaTime;
    }
}