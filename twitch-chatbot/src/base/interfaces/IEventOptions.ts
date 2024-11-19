import Events from "../../base/enums/Events";

export default interface IEventOptions {
  name: Events;
  description: string;
  once: boolean;
}