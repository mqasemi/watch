
 const net = require('net');
 const MessageParser = require('./Helper/MessageParser');
 const Response = require('./Helper/response');
const express = require('express');
const Message =require('./Helper/message');


(function(exports, require, module, __filename, __dirname) {
   
    
    const port = 7070;
    const host = '127.0.0.1';
    const app = express()
    const commandPort=5556;
    let messageparser=new MessageParser();
    const server = net.createServer();
    server.listen(port, host, () => {
        console.log('TCP Server is running on port ' + port + '.');
    });
   
    let sockets = [];
    app.get('/setInterSal/:id/:deviceId', (req, res) =>{
        if(sockets.length>=1){
            let message=new Message();
            
            message.manufacture="3G";
            message.content=null;
            message.command="UPLOAD";
            message.params=[];
            message.params.push(req.params.id);
            message.id=req.params.deviceId;
            var buffer = Buffer.from(message.toString());
            sockets[0].write(buffer);

        }
            
    })

    app.listen(commandPort, () => console.log(`Example app listening on port ${commandPort}!`))
    server.on('connection', function(sock) {
        console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
        sockets.push(sock);
    
        sock.on('data', function(data) {
            
           dataStr=data.toString('ascii');
           
           dataStr=dataStr.replace('[','');
           dataStr=dataStr.replace(']','');
           mess=messageparser.inputStringToMessage(dataStr);
           let response=new Response(mess);
            console.log('DATA ' + sock.remoteAddress + ': ' + mess);
            responseStr=response.createResponse();
            
            if(responseStr && responseStr.length>0){
                var buffer = Buffer.from(responseStr);
                sock.write(buffer);
            }
                
            
            // Write the data back to all the connected, the client will receive it as data from the server
            // sockets.forEach(function(sock, index, array) {
            //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
            // });
        });
        sock.on('error', function(data) {
         
        });
        // Add a 'close' event handler to this instance of socket
        sock.on('close', function(data) {
            let index = sockets.findIndex(function(o) {
                return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
            })
            if (index !== -1) sockets.splice(index, 1);
            console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
        });
    });
    
    
    
 })();

