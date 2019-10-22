import React from "react";
import { WithTranslation, withTranslation, useTranslation } from "react-i18next";

interface SearchToggleProps {
  className: string,
  active?: boolean,
}

const SearchToggle: React.FC<SearchToggleProps> = (props) => {
  let active = (props.active === undefined) ? true : props.active;

  return (
    <label className={`SearchToggle ${props.className}`}>
      <input type="checkbox" defaultChecked={active} />
      <span />
    </label>
  )
}

interface SearchState {
  last_search: number,
  search_timer: number,
  term: string,
}

class Search extends React.Component<WithTranslation, SearchState> {
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      last_search: performance.now(),
      search_timer: -1,
      term: "",
    }
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="Search">
        <div className="Toggles">
          <SearchToggle className="SpotifyToggle" />
          <SearchToggle className="YoutubeToggle" />
        </div>
        <div className="SearchBar">
          <input type="text"
            placeholder={t("search.placeholder")}
            value={this.state.term}
            onChange={evt => this.term_changed(evt)} />
        </div>
      </div>
    );
  }

  term_changed(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      term: evt.target.value,
    }, () => this.check_search());
  }

  check_search() {
    let now = window.performance.now();
    let diff = now - this.state.last_search;
    if (now - this.state.last_search >= 1E3) {
      console.log(`Searching for ${this.state.term}...`);
      this.setState({
        last_search: now,
        search_timer: -1,
      });
    } else if (this.state.search_timer === -1) {
      let timer = window.setTimeout(() => this.check_search(), 1E3 - diff);
      this.setState({search_timer: timer});
    }
  }
}

export default withTranslation()(Search);
