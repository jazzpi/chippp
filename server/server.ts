import WSS from "./wss";
import { QueueElement, PlayerInterface } from "./util";
import { SpotifyInterface, SpotifySong } from "./spotify";

class Server {
  wssPort: number;
  wss: WSS;
  queue: QueueElement[];
  spotify: SpotifyInterface;
  activePlayer: PlayerInterface;

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
    this.spotify.on("Changed", (iface: PlayerInterface) => this.playerChanged(iface));
    this.activePlayer = this.spotify;
  }

  getQueue() {
    return this.queue;
  }

  getStatus() {
    return {
      type: this.activePlayer.type,
      title: this.activePlayer.current_title,
      href: this.activePlayer.current_href,
      status: this.activePlayer.current_status,
    };
  }

  playerChanged(iface: PlayerInterface) {
    console.log(`Player ${iface.type} changed`);
    this.wss.emitStatus();
  }
}

new Server();

export default Server;
