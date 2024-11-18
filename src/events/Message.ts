import CustomClient from "../base/classes/CustomClient";
import Event from "../base/classes/Event"
import Events from "../base/enums/Events";
import { ChatUserstate } from 'tmi.js';

export default class Message extends Event {
    
    constructor(client: CustomClient) {
        super(client, {
            name: Events.Message,
            description: "Message event",
            once: false
        })
    }

    async Execute(channel: string, tags: ChatUserstate, message: string, self: boolean): Promise<void> {
        if ( self ) return;

        console.log(`${tags['display-name']}: ${message}`)
    }
}