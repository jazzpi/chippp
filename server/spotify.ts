import dbus from "dbus-next";
import assert from "assert";
import EventEmitter from "events";

import { QueueElement, PlayerInterface } from "./util";

const SPOTIFY_NAME = "org.mpris.MediaPlayer2.spotify";
const MPRIS_PATH = "/org/mpris/MediaPlayer2";
const MPRIS_IFACE = "org.mpris.MediaPlayer2.Player";
const PROP_IFACE = "org.freedesktop.DBus.Properties";

export class SpotifyInterface extends EventEmitter implements PlayerInterface {
  type: string;
  current_title: string;
  current_href: string;
  current_status: string;
  bus: dbus.SessionBus;
  obj: dbus.ProxyObject;
  player: dbus.Interface;
  properties: dbus.Interface;

  constructor() {
    super();
    console.log("Constructing Spotify Handler...");
    this.type = "spotify";
    this.current_title = "Unknown Artist: Unknown Song";
    this.current_href = "#";
    this.current_status = "Stopped";
    this.bus = dbus.sessionBus();
    this.initAsync();
  }

  async initAsync() {
    this.obj = await this.bus.getProxyObject(SPOTIFY_NAME, MPRIS_PATH);
    this.player = this.obj.getInterface(MPRIS_IFACE);
    this.properties = this.obj.getInterface(PROP_IFACE);
    this.properties.on("PropertiesChanged",
                       (iface, changed, invalidated) => this.propsChanged(iface, changed, invalidated));
    await this.updateMetadata();
    await this.updateStatus();
    console.log("Constructed Spotify Handler!");
    console.log(`After Construction: ${this.current_status} - ${this.current_title} (${this.current_href})`);
  }

  propsChanged(iface: string, changed: Record<string, dbus.Variant>, invalidated: dbus.Variant[]) {
    if (iface != MPRIS_IFACE) {
      console.warn(`Properties changed on unknown interface: ${iface}`);
      return;
    }

    let prev_title = this.current_title;
    let prev_href = this.current_href;
    let prev_status = this.current_status;

    for (let k in changed) {
      switch (k) {
        case "Metadata":
          this.updateMetadata(changed[k]);
          break;
        case "PlaybackStatus":
          this.updateStatus(changed[k]);
          break;
        default:
          console.warn(`Unknown property changed: ${k}`);
      }
    }

    if (prev_title !== this.current_title || prev_href !== this.current_href ||
        prev_status !== this.current_status) {
      this.emit("Changed", this);
      console.log(`After PropertiesChanged: ${this.current_status} - ${this.current_title} (${this.current_href})`);
    }
  }

  async updateMetadata(metadata?: dbus.Variant) {
    if (metadata === undefined) metadata = await this.properties.Get(MPRIS_IFACE, "Metadata");
    assert(metadata.signature === "a{sv}");
    let artist = this.formatArtist(metadata.value["xesam:artist"]);
    let title = metadata.value["xesam:title"].value;


    this.current_title = `${artist}: ${title}`;
    this.current_href = metadata.value["xesam:url"].value;
  }

  async updateStatus(status?: dbus.Variant) {
    if (status === undefined) status = await this.properties.Get(MPRIS_IFACE, "PlaybackStatus");
    assert(status.signature === "s");
    this.current_status = status.value;
  }

  formatArtist(artists: dbus.Variant) {
    assert(artists.signature === "as");
    if (artists.value.length === 0) {
      return "UNKNOWN";
    }
    return artists.value.join(", ");
  }

  async playNow(song: SpotifySong) {
    await this.player.OpenUri(song.uri);
  }
}

export class SpotifySong implements QueueElement {
  type: string;
  title: string;
  href: string;
  uri: string;

  constructor(title: string, href: string, uri: string) {
    this.type = "spotify";
    this.title = title;
    this.href = href;
    this.uri = uri;
  }
}
