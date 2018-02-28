export default class TileResolver {
    constructor(matrix,tileSize = 16){
        this.matrix = matrix;
        this.tileSize = tileSize;
    }
    //take x pos and return pos in the grid
    toIndex(pos){
        return Math.floor(pos/this.tileSize);
    }
    getByIndex(indexX,indexY){
        const tile = this.matrix.get(indexX,indexY);
        if(tile){
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return { tile ,y1 ,y2}
        }
    }

    toIndexRange(pos1, pos2){
        const pMax = Math.ceil(pos2/ this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;

        }
        while(pos < pMax)

        return range;
    }

    searchByRange(x1,x2,y1,y2){
        const matches = [];
         
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match  = this.getByIndex(indexX, indexY);
                matches.push(match);
            });

        });

        return matches;
    }

    matchByPosition(posX,posY){
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        )

    }
}
window.TileResolver = TileResolver;