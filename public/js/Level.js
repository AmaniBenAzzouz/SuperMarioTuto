import Compositor from './compositor.js';
import {Matrix} from './math.js';
import TileCollider from './TileCollider.js';
export default class Level{
    constructor(){
        this.comp = new Compositor();
        this.entities = new Set();//we add to set
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
        this.gravity = 2000;
    }

    update(deltaTime){
        this.entities.forEach(entity =>{
            entity.update(deltaTime);//super mario position
            
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
            //depending on current postion
            //and all elements postions to check if there is collision
        });
    }
}