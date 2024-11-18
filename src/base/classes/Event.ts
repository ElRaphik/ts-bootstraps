import Events from "../../base/enums/Events";
import IEvent from "../interfaces/IEvent";
import CustomClient from "./CustomClient";
import IEventOptions from "../interfaces/IEventOptions";

export default class Event implements IEvent {
    client: CustomClient;
    name: Events;
    description: string;
    once: boolean;

    constructor(client: CustomClient, options: IEventOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.once = options.once;
    }

    Execute(...args: any[]): void {
        // This method should be overridden by specific event implementations
        throw new Error("Method 'execute' must be implemented.");
    }
}