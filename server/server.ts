import WSS from "./wss";
import { QueueElement } from "./util";
import { SpotifyInterface, SpotifySong } from "./spotify";

class Server {
  wssPort: number;
  wss: WSS;
  queue: QueueElement[];
  spotify: SpotifyInterface;

  constructor(wssPort?: number) {
    if (wssPort === undefined) wssPort = 8080;
    this.wssPort = wssPort;
    this.wss = new WSS(this, this.wssPort);
    this.queue = [
      new SpotifySong(
        "Brutus: Drive",
        "https://open.spotify.com/track/4nABlTrsl6CCdAM45tgRrQ?si=KEp1moRyT7qie-lr2GohSA",
        "spotify:track:4nABlTrsl6CCdAM45tgRrQ"
      ),
      {
        "type": "youtube",
        "title": "Cat.",
        "href": "http://example.org"
      },
    ];
    this.spotify = new SpotifyInterface();
  }

  getQueue() {
    return this.queue;
  }
}

new Server();

export default Server;
