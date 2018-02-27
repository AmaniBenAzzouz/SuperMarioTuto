import Level from './Level.js';
import {createBackgroundLayer,createSprite} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';

export function loadImage(url){
    //The function passed to new Promise is called executor. 
    //When the promise is created, it’s called automatically
    /*return  new Promise(function(resolve, reject) {
        
    });*/
    //arrow function 
    return new Promise((resolve,reject) => {
            const image = new Image();
            image.addEventListener('load',()=>{
                //when image is loaded call resolve (mission completed)
                resolve(image);
            });
            image.src = url;    
    });
    /**
    The resulting promise object has internal properties:
    state – initially is “pending”, then changes to “fulfilled” or “rejected”,
    result – an arbitrary value, initially undefined
    **/

}

function createTiles(level,backgrounds){
    backgrounds.forEach(background =>{
        background.ranges.forEach(([x1,x2,y1,y2]) => {
                for(let x=x1; x< x2; x++){
                    for(let y =y1; y< y2 ;y++){
                        level.tiles.set(x,y,{name : background.title});
                    }
                }  
        });
})
}
export function loadLevel(name){
   return Promise.all([
            fetch(`/levels/${name}.json`).then(r =>r.json()),
            loadBackgroundSprites()
        ])
        .then( ([levelSpec,BackgroundSprites]) => {
            const level = new Level();
            createTiles(level,levelSpec.backgrounds);
            //console.table(level.tiles.grid);
            const backgroundLayer = createBackgroundLayer(level,BackgroundSprites);
            level.comp.layers.push(backgroundLayer);
            const spriteLayer = createSprite(level.entities);
            level.comp.layers.push(spriteLayer);

            return level;
        })
}