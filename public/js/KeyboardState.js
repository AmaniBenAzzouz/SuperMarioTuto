const PRESSED  = 1;
const RELEASED = 0;
export default class KeybordState {
    constructor(){
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addingMapping(code,callback){
        this.keyMap.set(code,callback);
    }

    handelEvent(event){
        const {code} = event;
        //if event is not added do nothing 
        //else prevent it from firing twice using preventDefault
        if(!this.keyMap.has(code)){
           return ;
        }
        
        event.preventDefault();    
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        if(this.keyStates.get(code) === keyState){
            return ;
        }
        this.keyStates.set(code, keyState);
        //execute the callback function
        console.log(this.keyStates);
        this.keyMap.get(code)(keyState);
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