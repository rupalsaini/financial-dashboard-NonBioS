const WebSocket = require('ws');
const http = require('http');

// Create HTTP server
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Sample market data
const marketData = {
  AAPL: 186.40,
  MSFT: 392.38,
  GOOGL: 160.83,
  AMZN: 179.71,
  NVDA: 915.11
};

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial data
  ws.send(JSON.stringify({ type: 'marketData', data: marketData }));

  // Simulate real-time updates every 5 seconds
  const interval = setInterval(() => {
    Object.keys(marketData).forEach(symbol => {
      // Add random price movement (-1% to +1%)
      marketData[symbol] *= (1 + (Math.random() * 0.02 - 0.01));
      marketData[symbol] = parseFloat(marketData[symbol].toFixed(2));
    });
    ws.send(JSON.stringify({ type: 'marketData', data: marketData }));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
