class Response{

    constructor(message){
        this.message=message;
    }
    createResponse(){
        if(this.message!=null && this.message.command){
            switch(this.message.command){
                case "LK":
                    return this.keepLink();
                    break;
                case"TKQ":
                    return this.keepLink();
                    break;
                case"TKQ2":
                    return this.keepLink();
                    break;
                case"AL":
                    return this.keepLink();
                    break;
                case "UPLOAD":
                    return this.keepLink();
        }
        }
    }
    keepLink(){
        const response={...this.message};
        this.message.content=null;
        return this.message.toString();
    }
    

}

module.exports =Response;