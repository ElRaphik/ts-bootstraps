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

        const args = message.trim().split(/ +/g) //!< each word of the message is an entry of this array
        // we will try to check
        // if it's a command so it's starting by a command
        if (args[0].startsWith(this.client.config.prefix)) {
            const commandArg = args.shift()!.toLowerCase()
            const commandName = commandArg.slice(this.client.config.prefix.length)
            const command = this.client.commands.get(commandName)
            
            if (!command) {
                this.client.say(this.client.config.watchedChannel, `Command \`${commandName}\` not found.`)
                return;
            }

            try {
                await this.client.commandHandler.Execute(commandArg.slice(this.client.config.prefix.length), tags, args)
            } catch (err) {
                console.error(err);
            }
        }
    }
}