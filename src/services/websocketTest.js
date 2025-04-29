const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log('Connected to WebSocket server');
});

ws.on('message', function incoming(data) {
  console.log('Received:', data);
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});
