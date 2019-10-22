import WebSocket from "ws";
import uuidv4 from "uuid/v4";

import Server from "./server";

class WSS {
  parent: Server;
  port: number;
  wss: WebSocket.Server;

  constructor(parent: Server, port?: number) {
    this.parent = parent;

    this.port = port;

    this.wss = new WebSocket.Server({
      port: this.port,
      clientTracking: true,
    });
    this.wss.on("connection", (ws: WebSocket) => this.onConnection(ws));
    console.log("Created server at port %d", this.port);
  }

  onConnection(ws: WebSocket) {
    ws.on("message", (message: string) => this.onMessage(ws, message));
  }

  onMessage(ws: WebSocket, data: string) {
    console.log("Sock message: %s", data);

    let response, message;
    let err = false;

    try {
      message = JSON.parse(data);
    } catch (e) {
      err = true;
      response = {
        "type": "messageParsingErr",
        "data": {
          "type": typeof(e),
          "err": e
        }
      }
    }

    if (!err) {
      switch (message.type) {
        case "getQueue":
          response = this.getQueue();
          break;
        default:
          console.error("Unknown message type %s", message.type);
          response = {
            type: "unknownMessageType",
            data: message.type
          }
      }
    }

    ws.send(JSON.stringify(response));
  }

  getQueue() {
    return {
      type: "queue",
      data: this.parent.getQueue()
    };
  }

  getStatus() {
    return {
      type: "status",
      data: this.parent.getStatus()
    };
  }

  emitStatus() {
    let message = JSON.stringify(this.getStatus());

    this.wss.clients.forEach((ws: WebSocket) => {
      ws.send(message);
    })
  }
}

export default WSS;
