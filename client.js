const net = require('net');
const client = new net.Socket();
const port = 7070;
//const host = '198.143.182.60';
const host = '127.0.0.1';

client.connect(port, host, function() {
    console.log('Connected');
    client.write("[3G*9403094122*00CD*UD]");
});
client.on('data', function(data) {
    console.log('Server Says : ' + data);
});
client.on('close', function() {
    console.log('Connection closed');
});
