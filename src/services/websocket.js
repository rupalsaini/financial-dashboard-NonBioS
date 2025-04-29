class SimulatedWebSocket {
  constructor(symbol) {
    this.symbol = symbol;
    this.callbacks = new Set();
    this.interval = null;
    this.basePrice = 186.40; // AAPL base price
  }

  connect() {
    this.interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 2;
      const newPrice = (this.basePrice + randomChange).toFixed(2);
      const percentChange = ((randomChange / this.basePrice) * 100).toFixed(2);
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      const data = {
        symbol: this.symbol,
        price: newPrice,
        change: percentChange,
        volume: volume,
        timestamp: new Date().toISOString()
      };

      this.callbacks.forEach(callback => callback(data));
    }, 2000); // Update every 2 seconds
  }

  onMessage(callback) {
    this.callbacks.add(callback);
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.callbacks.clear();
  }
}

export default SimulatedWebSocket;
