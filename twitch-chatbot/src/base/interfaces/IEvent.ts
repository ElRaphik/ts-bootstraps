import CustomClient from "../classes/CustomClient";
import Events from "../../base/enums/Events";

export default interface IEvent {
    client: CustomClient;
    name: Events;
    description: string;
    once: boolean;
}