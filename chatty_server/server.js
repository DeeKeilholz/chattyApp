// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public')).listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({server});

let counter = 0;

// Set up a callback that will run when a client connects to the server

// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');

    // on connection, increment the number of clients connected
    counter++;

    // Broadcast the number of clients connected
    wss.broadcast({type: "counter", count: counter})

    //when this socket connection receives a message, execute my callback function handleMessage
    ws.on('message', handleMessage)

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected')
        // decrement the counter
        counter--;
        // broadcast the amount of clients connected to all clients
        wss.broadcast({type: "counter", count: counter})
    })

})

//receives message from app
handleMessage = (message) => {
    // object username and content
    const received = JSON.parse(message)
    // defining id
    var id = uuid.v1()
    // add id to received
    received['id'] = id
    //adding type to object received
    // var type = 'incomingMessage'
    // received['type'] = type
    received.type = "incomingMessage"

    wss.broadcast(received);
    console.log("Message received from app:", received)
};

// sends messages back to each client
wss.broadcast = (data) => {
    wss.clients.forEach(function(client) {
        client.send(JSON.stringify(data));
        console.log("Message the server broadcasts to clients:", data)
    })
}
