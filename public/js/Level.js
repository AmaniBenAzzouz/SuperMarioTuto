import Compositor from './compositor.js';
import {Matrix} from './math.js';
import TileCollider from './TileCollider.js';
export default class Level{
    constructor(){
        this.comp = new Compositor();
        this.entities = new Set();//we add to set
        this.tiles = new Matrix();
        this.TileCollider = new TileCollider(this.tiles);
    }

    update(deltaTime){
        this.entities.forEach(entity =>{
            entity.update(deltaTime);//super mario position
            this.TileCollider.test(entity);
            //depending on current postion
            //and all elements postions to check if there is collision
        });
    }
}