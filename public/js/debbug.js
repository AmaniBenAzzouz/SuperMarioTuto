export function setupMousedebbug(canvas,entity,camera){

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
                entity.vel.set(0,0);
                entity.pos.set(event.offsetX + camera.pos.x ,event.offsetY+ camera.pos.y);
            }
        });
    });
}