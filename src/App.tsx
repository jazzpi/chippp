import React from "react";
import logo from "./logo.svg";
import spotify from "./spotify.svg";
import youtube from "./youtube.svg";
import "./App.css";
import Search from "./Search";
import Queue from "./Queue";
import { WithTranslation, withTranslation } from "react-i18next";

interface AppState {
  sock: WebSocket,
}

class App extends React.Component<WithTranslation, AppState> {
  constructor(props: WithTranslation) {
    super(props);

    let sock = new WebSocket(`ws://${window.location.hostname}:8080`);
    sock.addEventListener("open", (evt: Event) => this.sockOpen(evt));
    sock.addEventListener("message", (evt: MessageEvent) => this.sockMessage(evt))

    this.state = {
      sock: sock,
    }
  }

  sockOpen(evt: Event) {
  }

  sockMessage(evt: MessageEvent) {
    console.log("Sock message: %s", evt.data);
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
          <Queue />
          <p>
            Edit <code>src/App.tsx</code> and save to reload!
          </p>
        </main>
      </div>
    );
  }
}

export default withTranslation()(App);
