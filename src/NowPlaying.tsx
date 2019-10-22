import React from "react";
import { useTranslation } from "react-i18next";

export interface NowPlayingProps {
  type: string,
  title: string,
  href: string,
  status: string,
}

export const NowPlaying: React.FC<NowPlayingProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="NowPlaying">
      <div className="Desc">{t("nowplaying.desc")}:</div>
      <div className={`Type ${props.type}`}></div>
      <div className="PlayStatus">
        <a className={props.status}></a>
      </div>
      <div className="Title">
        <a href={props.href}
          target="_blank"
          rel="noopener noreferrer">
          {props.title}
        </a>
      </div>
    </div>
  )
}
