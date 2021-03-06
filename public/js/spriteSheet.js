export default class spriteSheet {
    constructor(image,width,height){
        this.image = image;
        this.height = height;
        this.width = width;
        this.tiles = new Map();
    }

    define(name,x,y,width,height){
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        //draw imag IMG to a canvas to attached to the document
        buffer.getContext('2d')
              .drawImage(
                  this.image,
                  x ,y ,width ,height,
                  0,0,width, height
                );
        this.tiles.set(name,buffer);
    }

    defineTile(name,x,y){
        this.define(name,x*this.width,y*this.height,this.width,this.height);
    }
    draw(name,context,x,y){
        const buffer = this.tiles.get(name);
        //Draw imag IMG and attched the container canvas (append to document)
        context.drawImage(buffer,x,y);

    }

    drawTile(name,context,x,y){
        this.draw(name,context, x* this.width, y*this.height);
    }
}