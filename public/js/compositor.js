//is a set of functions we can push them and excute them when needed
export default class Compositor {
    constructor(){
        this.layers =[];
    }

    draw(context,camera){
        this.layers.forEach(layer =>{
            //console.log(layer);
            //execute the function returned by createBackgroundLayer
            layer(context,camera);
        });

    }
}