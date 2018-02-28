import {loadLevel} from  './loaders.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer,createCollesionLayer} from './layers.js';
import {createMario} from './createMario.js';
import Timer from './Timer.js';
import KeybordState from './KeyboardState.js';
import Level from './Level.js';

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
    //createCollesionLayer(level);
    const SPACE = 32;
    const input = new KeybordState();
    
    level.entities.add(mario);
    level.comp.layers.push(createCollesionLayer(level));

    //add keybord and action to do if it is pressed
    input.addingMapping(SPACE,keyState =>{
    if(keyState){
        //if space is 1-> pressed: start jumping
        //mario jump
        mario.Jump.start();
    }
    else {
        //cancel jump
        mario.Jump.cancel();
    }
    //velocity needed for movments
    //why because if we need a courbe like parabol, linear etc y =f(y)
    //mario.vel.set(200,-600);
});
input.listenTo(window);
['mousedown','mousemove'].forEach(eventName =>{
    canvas.addEventListener(eventName,event => {
        //var buttonPressed = instanceOfMouseEvent.button
        /**
         * A number representing a given button:

            0: Main button pressed, usually the left button or the un-initialized state
            1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
            2: Secondary button pressed, usually the right button
            3: Fourth button, typically the Browser Back button
            4: Fifth button, typically the Browser Forward button
        */
        if(event.buttons === 1){
            mario.vel.set(0,0);
            mario.pos.set(event.offsetX,event.offsetY);
        }
    });
});
    const timer = new Timer(1/60);
    //timer.start();
    timer.update = function updateGame(deltaTime){
        //we draw all element in the compositor
        mario.update(deltaTime);
        level.comp.draw(context);
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