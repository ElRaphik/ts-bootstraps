import { ChatUserstate } from "tmi.js"
import ICommandHandler from "../interfaces/ICommandHandler";
import Command from "./Command";
import CustomClient from "./CustomClient";

export default class CommandHandler implements ICommandHandler {
    client: CustomClient;

    constructor(client: CustomClient) {
        this.client = client;
    }

    Execute(commandName: string, tags: ChatUserstate, args: string[]): Promise<[string]> | void {
        const command: Command = this.client.commands.get(commandName)!;

        if (!command) return this.client.say(this.client.config.watchedChannel, `Command \`${commandName}\` not found.`);

        if (command.dev && !this.client.config.devUserIds.includes(tags.id!))
            return this.client.say(this.client.config.watchedChannel, `Command \`${command.name}\` is only available for developers.`);

        if (command.permissions.length > 0 && !command.permissions.some(permission => tags.badges?.[permission]))
            return this.client.say(this.client.config.watchedChannel, `You don't have the required permissions to use this command.`);

        const { cooldowns } = this.client;

        if (!cooldowns.has(command.name))
            cooldowns.set(command.name, new Map<string, number>());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(tags.id!) && (now < (timestamps.get(tags.id!) || 0) + cooldownAmount)) {
            
            const timeLeft = ((((timestamps.get(tags.id!) || 0) + cooldownAmount) - now) / 1000).toFixed(1)
            return this.client.say(this.client.config.watchedChannel, `Please wait ${timeLeft} seconds before using the \`${command.name}\` command again.`);
        }

        timestamps.set(tags.id!, now);
        setTimeout(() => timestamps.delete(tags.id!), cooldownAmount);

        try {
            return command.Execute(args);
        } catch (e) {
            console.log(e);
        }
    }
}