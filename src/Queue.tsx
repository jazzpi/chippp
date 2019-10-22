import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

interface QueueElementProps {
  type: string,
  title: string,
  href: string,
}

class QueueElement extends React.Component<QueueElementProps> {
  render() {
    return (
      <tr key={this.props.href}>
        <td className={this.props.type} aria-label={this.props.type} />
        <td>
          <a href={this.props.href}
            target="_blank"
            rel="noopener noreferrer">
            {this.props.title}
          </a>
        </td>
      </tr>
    );
  }
}

interface QueueState {
  queue: QueueElement[],
}

class Queue extends React.Component<WithTranslation, QueueState> {
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      queue: [
        new QueueElement({
          type: "spotify",
          title: "ABC - DEF",
          href: "https://example.com",
        }),
        new QueueElement({
          type: "youtube",
          title: "Cat.",
          href: "https://example.org",
        })
      ],
    };
  }

  render() {
    const { t } = this.props;
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
            {this.state.queue.map(el => el.render())}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withTranslation()(Queue);
