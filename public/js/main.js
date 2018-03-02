import {loadLevel} from  './loaders.js';
import {loadBackgroundSprites, loadMarioSprite} from './sprites.js';
import {createBackgroundLayer,createCollesionLayer} from './layers.js';
import {createMario} from './createMario.js';
import Timer from './Timer.js';
import Level from './Level.js';
import {setUpInputs} from './input.js';
import Camera from './Camera.js';
import {setupMousedebbug} from './debbug.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');
//context.fillStyle ="black";
//context.fillRect(0,0,20,20);


//parallel load of promisses no one need to wait for the other
// so we start them at the same time
Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario,level])=>{

    const gravity = 2000;
    mario.pos.set(64,64);
    const camera = new Camera();
    window.camera = camera;
    //createCollesionLayer(level);
    level.entities.add(mario);
    level.comp.layers.push(createCollesionLayer(level));

    const input = setUpInputs(mario);

    input.listenTo(window);
    setupMousedebbug(canvas,mario,camera);
    
    const timer = new Timer(1/60);
    //timer.start();
    timer.update = function updateGame(deltaTime){
        //we draw all element in the compositor
        mario.update(deltaTime);
        level.comp.draw(context,camera);
        /*marioSprite.draw('mario',context,positions.x,positions.y);
        we moved this as own function : see above */
        level.update(deltaTime);
        //console.log(mario.pos);
        mario.vel.y += gravity * deltaTime; //gravity : return to bottom slowely 0.5 each frame
            
        //requestAnimationFrame(updateGame);
        //setTimeout(updateGame,1000/144,performance.now());
        //request animation passes time == performance.now in setTimeOut
    }
    timer.start();
});



/*loadImage('img/tiles.png').then(
  image => { 
    const sprites = new spriteSheet(image,16,16);//complete image + unity size
    sprites.define('ground',0,0);
    //sprites.draw('ground',context,20,20);
    sprites.define('sky',3,23);
    loadLevel('1-1')
    .then(level =>{
        level.backgrounds.forEach(element => {
            drawBackground(element,context,sprites);  
        });
        
    });

    
    //for(let x = 0; x<25; x++){
    //    for(let y =12; y< 14 ;y++){
    //        sprites.drawTile('ground',context,x,y);
    //    }
    //}
    
    //context.drawImage(image,
    //0,0,16,16,
    //0,0,16,16
    //);
    
})*/
//the uses promise results in this case an image

//to check if our charachter colledate with an abstacle we need:
//1-on each frame loop all obstacles with positions and check if theay touch our charachter
//2-or we on each update save all elements(character + obstacles) positions
//in a grid x,y and check if there is an intersection
//solution 1 is enough if obstacles are not moving
//solution 2 is better if obstacles are movvings