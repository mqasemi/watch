

const net = require('net');
const MessageParser = require('./Helper/MessageParser');
const Response = require('./Helper/response');


const port = 7070;
const host = '127.0.0.1';
let messageparser=new MessageParser();
const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

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
        if(responseStr && responseStr.length>0)
            sock.write(responseStr);
        
        // Write the data back to all the connected, the client will receive it as data from the server
        // sockets.forEach(function(sock, index, array) {
        //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        // });
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


