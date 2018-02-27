import Entity  from './Entity.js';
import Velocity from './trails/velocity.js';
import Jump from './trails/jump.js';

import {loadMarioSprite} from './sprites.js';

export function createMario(){
    return loadMarioSprite()
    .then(marioSprite=>{
        const mario = new Entity();
        mario.addTrait(new Velocity());
        mario.addTrait(new Jump());
        //we can attach a method from outside a class like this 
        //ps this function/method has access to 'this' object
        mario.draw = function dawMario(context){
            marioSprite.draw('mario',context,this.pos.x,this.pos.y);
        }
        
        
        /*mario.update = function UpdateMario(deltaTime){
            this.pos.x +=this.vel.x * deltaTime;
            this.pos.y +=this.vel.y * deltaTime;
        }*/
    
        return mario;
    });
    
}