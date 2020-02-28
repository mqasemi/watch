const Message = require('./message');
const ContentFactory = require('./contentFactory');


class MessageParser {

inputStringToMessage(inputString){
    
    let message=new Message();
    const messagePart=inputString.split('*');
    if(messagePart!=null && messagePart.length>=3)
    {   let command='';
        message.manufacture=messagePart[0];
        message.id=messagePart[1];
        message.length=messagePart[2];
        const contents=messagePart[3].split(',');
        if(contents!=null&& contents.length>=1){
           command =contents[0];
           message.command=command;
           let contentFactory=new ContentFactory(command,contents,messagePart[1]);
           message.content=contentFactory.create();
           

        }
        

    }else{
        return null;
    }

    return  message;
}

}


module.exports =MessageParser;