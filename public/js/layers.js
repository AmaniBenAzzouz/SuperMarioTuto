export function createBackgroundLayer(level,sprites){
    //make all background in one canvas so when we update we call it all
    //as one peace and not each element apart
    const backgroundBuffer = document.createElement('canvas');
    backgroundBuffer.width = 256;
    backgroundBuffer.height = 240;
    const context = backgroundBuffer.getContext('2d');
    level.tiles.forEach((tile,x,y) => {
        //the function will be excuted in level class with 
        //passed argument from there
        sprites.drawTile(tile.name,context,x,y);
    });
   
    /*backgrounds.forEach(element => {
        drawBackground(element,backgroundBuffer.getContext('2d'),sprites);  
    });*/

    return function drawBackgroundLayer(context){
        //draw the background image
        context.drawImage(backgroundBuffer,0,0);
    }
}
//this function is needed only inside this file so no need to export it!
function drawBackground(background,context,sprites){
    background.ranges.forEach(([x1,x2,y1,y2]) => {
        for(let x=x1; x< x2; x++){
            for(let y =y1; y< y2 ;y++){
               sprites.drawTile(background.title,context,x,y);
            }
        }  
    });
}

export function createSprite(entities){
    return function drawSpriteLayer(context){
        entities.forEach(entity =>{
            entity.draw(context);
        })
        
    }
}
export function createCollesionLayer(level) {
        const tileResolver = level.tileCollider.tiles;
        const tileSize = tileResolver.tileSize;
    
        const resolvedTiles = new Matrix();
    
        const getByIndexOriginal = tileResolver.getByIndex;
    
        tileResolver.getByIndex = function getByIndexFake(x, y) {
            resolvedTiles.set(x, y, true);
            return getByIndexOriginal.call(tileResolver, x, y);
        }
    
        return function drawCollisions(context) {
            context.strokeStyle = 'blue';
            resolvedTiles.forEach((value, x, y) => {
                context.beginPath();
                context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
                context.stroke();
            });
            resolvedTiles.clear();
        };
    }