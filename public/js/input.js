import KeybordState from './KeyboardState.js';

export function setUpInputs(entity){
    const input = new KeybordState();
    
    

    //add keybord and action to do if it is pressed
    input.addingMapping('Space',keyState =>{
        if(keyState){
            //if space is 1-> pressed: start jumping
            //entity jump
            entity.Jump.start();
        }
        else {
            //cancel jump
            entity.Jump.cancel();
        }
        //velocity needed for movments
        //why because if we need a courbe like parabol, linear etc y =f(y)
        //entity.vel.set(200,-600);
    });

    input.addingMapping('ArrowLeft',keyState => {
        //left
        entity.Walk.direction = -keyState;
    });

    input.addingMapping('ArrowRight',keyState => {
        //move right
        entity.Walk.direction = keyState;

    });
    return input;
}