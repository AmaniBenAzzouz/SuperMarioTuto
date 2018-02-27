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
            return { tile }
        }
    }
    matchByPosition(posX,posY){
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        )

    }
}
//window.TileResolver = TileResolver;