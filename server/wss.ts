import WebSocket from "ws";
import uuidv4 from "uuid/v4";

import Server from "./server";

class WSS {
  parent: Server;
  port: number;
  wss: WebSocket.Server;
  connections: Record<string, WebSocket>;

  constructor(parent: Server, port?: number) {
    this.parent = parent;

    this.port = port;

    this.wss = new WebSocket.Server({
      port: this.port,
    });
    this.wss.on("connection", (ws: WebSocket) => this.onConnection(ws))
    console.log("Created server at port %d", this.port);

    this.connections = {};
  }

  onConnection(ws: WebSocket) {
    this.connections[uuidv4()] = ws;
    ws.on("message", (message: string) => this.onMessage(ws, message));

    ws.send("something");
  }

  onMessage(ws: WebSocket, message: string) {
    let response;

    if (message.startsWith("getQueue")) {
      response = this.getQueue();
    }

    ws.send(JSON.stringify(response));
  }

  getQueue() {
    return this.parent.getQueue();
  }
}

export default WSS;
