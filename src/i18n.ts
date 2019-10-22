import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        appname: "Chips Party Player",
        spotify: "Spotify",
        youtube: "YouTube",
        queue: {
          type: "Type",
          title: "Title",
          heading: "Queue",
        },
        search: {
          placeholder: "Add a song/video",
        },
        nowplaying: {
          desc: "Now Playing",
        }
      }
    },
    de: {
      translations: {
        queue: {
          position: "Pos",
          type: "Typ",
          title: "Titel",
          heading: "Warteliste",
        },
        search: {
          placeholder: "Lied/Video hinzufügen",
        },
        nowplaying: {
          desc: "Jetzt läuft",
        }
      }
    }
  },

  fallbackLng: "en",
  debug: true,

  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: ".",

  interpolation: {
    escapeValue: false,
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
