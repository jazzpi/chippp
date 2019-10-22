import React from "react";
import logo from "./logo.svg";
import spotify from "./spotify.svg";
import youtube from "./youtube.svg";
import "./App.css";
import Search from "./Search";
import Queue from "./Queue";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
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

export default App;
