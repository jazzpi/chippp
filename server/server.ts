import WSS from "./wss";
import { QueueElement, PlayerInterface } from "./util";
import { SpotifyInterface, SpotifySong } from "./spotify";

class Server {
  wssPort: number;
  wss: WSS;
  queue: QueueElement[];
  spotify: SpotifyInterface;
  activePlayer: PlayerInterface;
  current_href: string;

  constructor(wssPort?: number) {
    if (wssPort === undefined) wssPort = 8080;
    this.wssPort = wssPort;
    this.wss = new WSS(this, this.wssPort);
    this.queue = [
      new SpotifySong(
        "Brutus: Drive",
        "https://open.spotify.com/track/4nABlTrsl6CCdAM45tgRrQ",
        "spotify:track:4nABlTrsl6CCdAM45tgRrQ"
      ),
      new SpotifySong(
        "Blood Command: S01E02.Return.Of.The.Arsonist.720p.HDTV.x264",
        "https://open.spotify.com/track/4wGI9mWsQA6KMkS92NMTeY",
        "spotify:track:4wGI9mWsQA6KMkS92NMTeY"
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
    this.current_href = "";
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

  async playerChanged(iface: PlayerInterface) {
    console.log(`Player ${iface.type} changed`);
    if (iface.current_href !== this.current_href) {
      console.log(`${iface.current_href} != ${this.current_href}`);
      await this.playNext();
      this.wss.emitQueue();
    }
    this.wss.emitStatus();
  }

  async playNext() {
    let next = this.queue.shift();
    this.current_href = next.href;
    if (next.type === "spotify") {
      this.activePlayer = this.spotify;
    } else {
      console.error(`Unknown player type: ${next.type}`)
      throw Error("Unknown player type");
    }

    return this.activePlayer.playNow(next);
  }

  async play() {
    return this.activePlayer.play();
  }

  async pause() {
    return this.activePlayer.pause();
  }
}

new Server();

export default Server;
