export interface QueueElement {
  type: string;
  title: string;
  href: string;
}

export interface PlayerInterface {
  type: string,
  current_title: string,
  current_href: string,
  current_status: string,
}
