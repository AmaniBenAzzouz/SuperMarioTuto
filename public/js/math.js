export class Vectors{
    constructor(x,y){
       this.set(x,y);
    }
    set(x,y){
        this.x = x;
        this.y = y;
    }
}

//const matrix = new Matrix();
//matrix.set(4,5,'sky');
//const tile = matrix.get(mario.pos.x * tile_size, mario.pos.y* tile_size);

export class Matrix{
    constructor(){
        this.grid = [];
    }
    forEach(callback){
        this.grid.forEach((column,x)=>{
            column.forEach((value,y)=>{
                callback(value,x,y);
                //sprites.drawTile(tile.name,context,x,y);
            });
        });
    }
    set(x,y,value){
        if(! this.grid[x]){
            this.grid[x] = []; 
        }
        this.grid[x][y] = value;
    }
    get(x,y){
        const col = this.grid[x];
        if(col) return col[y];
        else return undefined;
    }
}
//attach something to window to be used in the console
window.Matrix = Matrix;