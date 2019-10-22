import React from "react";
import logo from "./logo.svg";
import spotify from "./spotify.svg";
import youtube from "./youtube.svg";
import "./App.css";
import Search from "./Search";
import { Queue, QueueElementProps } from "./Queue";
import { WithTranslation, withTranslation } from "react-i18next";

interface AppState {
  sock: WebSocket,
  queue: QueueElementProps[],
}

class App extends React.Component<WithTranslation, AppState> {
  constructor(props: WithTranslation) {
    super(props);

    let sock = new WebSocket(`ws://${window.location.hostname}:8080`);
    sock.addEventListener("open", (evt: Event) => this.sockOpen(evt));
    sock.addEventListener("message", (evt: MessageEvent) => this.sockMessage(evt))

    this.state = {
      sock: sock,
      queue: []
    }
  }

  sockOpen(evt: Event) {
    this.sockSend("getQueue");
  }

  sockMessage(evt: MessageEvent) {
    console.log("Sock message: %s", evt.data);

    let message = JSON.parse(evt.data);
    switch (message.type) {
      case "queue":
        let data = message.data as QueueElementProps[];
        this.setState({
          queue: data
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
    const { t, i18n } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1>{t("appname")}</h1>
        </header>
        <main className="App-main">
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
