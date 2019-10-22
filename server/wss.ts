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
}

export default WSS;
