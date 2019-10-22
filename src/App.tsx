import React from "react";
import logo from "./logo.svg";
import spotify from "./spotify.svg";
import youtube from "./youtube.svg";
import "./App.css";
import Search from "./Search"
import { useTranslation } from "react-i18next";

const get_img = (type: string) => type === "spotify" ? spotify : youtube;

interface QueueElementProps {
  type: string,
  title: string,
  href: string,
}

const QueueElement: React.FC<QueueElementProps> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <tr>
      <td className={props.type} aria-label={props.type} />
      <td>
        <a href={props.href}
          target="_blank"
          rel="noopener noreferrer">
          {props.title}
        </a>
      </td>
    </tr>
  );
}

const Queue: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="Queue">
      <h2>{t("queue.heading")}</h2>
      <table>
        <thead>
          <tr>
            <th className="type" scope="col">{t("queue.type")}</th>
            <th scope="col">{t("queue.title")}</th>
          </tr>
        </thead>
        <tbody>
          <QueueElement type="spotify" title="ABC - DEF" href="https://example.com" />
          <QueueElement type="youtube" title="Cat." href="https://example.com" />
        </tbody>
      </table>
    </div>
  );
}

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
