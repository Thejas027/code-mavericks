const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Coordinates for KSRTC Bus Stand and SJCE College
const source = { lat: 12.3053, lng: 76.6558 }; // KSRTC Bus Stand, Mysore
const destination = { lat: 12.2947, lng: 76.6407 }; // SJCE College, Mysore

let currentPosition = { ...source };
let steps = 100; // Number of steps for movement
let currentStep = 0;

// Function to simulate the movement of the bus
const moveBus = () => {
  const deltaLat = (destination.lat - source.lat) / steps;
  const deltaLng = (destination.lng - source.lng) / steps;

  currentPosition.lat += deltaLat;
  currentPosition.lng += deltaLng;

  io.emit('busLocation', currentPosition); // Emit updated position

  currentStep++;
  if (currentStep >= steps) {
    clearInterval(movementInterval); // Stop when destination is reached
  }
};

const movementInterval = setInterval(moveBus, 1000); // Update every 1 second

// Socket.io setup
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('busLocation', source); // Send initial position to client

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.static('public'));

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
