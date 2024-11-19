import { ChatUserstate } from "tmi.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";

export default class Commands extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "commands",
            description: "Lists all available commands",
            usage: "commands",
            aliases: ["cmds", "help"],
            cooldown: 10,
            permissions: [],
            dev: false
        });
    }

    Execute(tags: ChatUserstate): void {
        const { client } = this;
        const commands = Array.from(client.commands.values())
            .filter(cmd => !cmd.dev || client.config.devUserIds.includes(tags.id!))
            .map(cmd => cmd.name);

        const message = `Available commands: ${commands.join(', ')}. Use ${client.config.prefix}help <command> for more info on a specific command.`;

        client.say(client.config.watchedChannel, message);
    }
}
