import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

export interface QueueElementProps {
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

interface QueueProps {
  queue: QueueElementProps[],
}

class Queue extends React.Component<QueueProps & WithTranslation> {
  constructor(props: QueueProps & WithTranslation) {
    super(props);
  }

  update(data: object) {

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
            {this.props.queue.map(el => <QueueElement {...el} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

let QueueT = withTranslation()(Queue);

export { QueueT as Queue };
