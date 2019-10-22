import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

interface QueueElementProps {
  type: string,
  title: string,
  href: string,
}

const QueueElement: React.FC<QueueElementProps> = (props) => {
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

class Queue extends React.Component<WithTranslation> {
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
            <QueueElement type="spotify" title="ABC - DEF" href="https://example.com" />
            <QueueElement type="youtube" title="Cat." href="https://example.com" />
          </tbody>
        </table>
      </div>
    );
  }
}

export default withTranslation()(Queue);
