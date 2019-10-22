import WSS from "./wss";

class Server {
  wssPort: number;
  wss: WSS;

  constructor(wssPort?: number) {
    if (wssPort === undefined) wssPort = 8080;
    this.wssPort = wssPort;
    this.wss = new WSS(this, this.wssPort);
  }

  getQueue() {
    return [
      {"type": "spotify", "title": "ABC - DEF", "href": "http://example.com"},
      {"type": "youtube", "title": "Cat.", "href": "http://example.org"},
    ]
  }
}

new Server();

export default Server;
