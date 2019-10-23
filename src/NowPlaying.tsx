import React from "react";
import { useTranslation } from "react-i18next";
import assert from "assert";

export interface NowPlayingProps {
  type: string,
  title: string,
  href: string,
  status: string,
  updateFromStatus?(status: string): void,
}

export const NowPlaying: React.FC<NowPlayingProps> = (props) => {
  const { t } = useTranslation();
  if (props.updateFromStatus === undefined) {
    assert(false);
    return <div />;
  }
  const update: (status: string) => void = props.updateFromStatus;
  return (
    <div className="NowPlaying">
      <div className="Desc">{t("nowplaying.desc")}:</div>
      <div className={`Type ${props.type}`}></div>
      <div className="PlayStatus">
        <a className={props.status} href="#" onClick={() => update(props.status)}></a>
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
