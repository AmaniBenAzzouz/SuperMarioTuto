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

    return function drawBackgroundLayer(context,camera){
        //draw the background image
        context.drawImage(backgroundBuffer,-camera.pos.x,-camera.pos.y);
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

export function createSprite(entities , width =64 ,height=64 ){
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;

    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context,camera){

        entities.forEach(entity => {
            spriteBufferContext.clearRect(0,0,width,height);
            entity.draw(spriteBufferContext);
            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y
            );
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
    
        return function drawCollisions(context, camera) {
            context.strokeStyle = 'blue';
            resolvedTiles.forEach((value, x, y) => {
                context.beginPath();
                context.rect(x * tileSize - camera.pos.x,
                             y * tileSize - camera.pos.y,
                              tileSize, tileSize);
                context.stroke();
            });
            level.entities.forEach(entity => {
                context.beginPath();
                context.strokeStyle = 'red';

                context.rect(entity.pos.x - camera.pos.x ,
                             entity.pos.y - camera.pos.y,
                             entity.size.x, entity.size.y);
                context.stroke();
            });
            resolvedTiles.clear();
        };
    }