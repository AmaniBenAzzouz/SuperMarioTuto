const PRESSED  = 1;
const RELEASED = 0;
export default class KeybordState {
    constructor(){
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addingMapping(keyCode,callback){
        this.keyMap.set(keyCode,callback);
    }

    handelEvent(event){
        const {keyCode} = event;
        //if event is not added do nothing 
        //else prevent it from firing twice using preventDefault
        if(!this.keyMap.has(keyCode)){
           return ;
        }
        
        event.preventDefault();    
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        if(this.keyStates.get(keyCode) === keyState){
            return ;
        }
        this.keyStates.set(keyCode, keyState);
        //execute the callback function
        console.log(this.keyStates);
        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window){
        ['keyup','keydown'].forEach((eventName)=>{
            window.addEventListener(eventName,(event)=>{
                this.handelEvent(event);
            })
        });
        // array.foreach(function(){})
        
    }
}