 class Message {
     manufacture;
     id;
     length;
     command;
     content;
     toString(){
          let contentStr='';
          if(this.content!=null)
               contentStr=this.content.toString();
          contentStr=this.command + contentStr;
          let contentLength=(contentStr.split ('').map (function (c) { return c.charCodeAt (0); })).length;
          var hex = ('0000' + contentLength.toString(16).toUpperCase()).slice(-4); //009A
          let finalmessage='['+this.manufacture+'*'+this.id+'*'+hex+'*'+contentStr+']';
          return finalmessage;//(finalmessage.split ('').map (function (c) { return c.charCodeAt (0); }));

     }
}
module.exports =Message;