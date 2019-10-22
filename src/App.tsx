import React from "react";
import "./logo.svg";
import "./spotify.svg";
import "./youtube.svg";
import "./App.css";
import Search from "./Search";
import { Queue, QueueElementProps } from "./Queue";
import { NowPlaying, NowPlayingProps } from "./NowPlaying";
import { WithTranslation, withTranslation } from "react-i18next";

interface AppState {
  sock: WebSocket,
  queue: QueueElementProps[],
  nowPlaying: NowPlayingProps,
}

class App extends React.Component<WithTranslation, AppState> {
  constructor(props: WithTranslation) {
    super(props);

    let sock = new WebSocket(`ws://${window.location.hostname}:8080`);
    sock.addEventListener("open", (evt: Event) => this.sockOpen(evt));
    sock.addEventListener("message", (evt: MessageEvent) => this.sockMessage(evt))

    this.state = {
      sock: sock,
      queue: [],
      nowPlaying: {
        type: "unknown",
        title: "UNKNOWN",
        href: "#",
        status: "Stopped",
      }
    }
  }

  sockOpen(evt: Event) {
    this.sockSend("getQueue");
    this.sockSend("getStatus");
  }

  sockMessage(evt: MessageEvent) {
    console.log("Sock message: %s", evt.data);

    let message = JSON.parse(evt.data);
    let data;
    switch (message.type) {
      case "queue":
        data = message.data as QueueElementProps[];
        this.setState({
          queue: data
        });
        break;
      case "status":
        data = message.data as NowPlayingProps;
        this.setState({
          nowPlaying: data
        });
        break;
      default:
        console.error("Unknown message type %s", message.type);
    }
  }

  sockSend(req_type: string, req_data?: any) {
    this.state.sock.send(JSON.stringify({
      type: req_type,
      data: req_data,
    }));
  }

  render() {
    const { t } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1>{t("appname")}</h1>
        </header>
        <main className="App-main">
          <NowPlaying {...this.state.nowPlaying} />
          <Search />
          <Queue queue={this.state.queue} />
          <p>
            Edit <code>src/App.tsx</code> and save to reload!
          </p>
        </main>
      </div>
    );
  }
}

export default withTranslation()(App);
