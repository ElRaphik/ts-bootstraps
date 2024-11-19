import { ChatUserstate } from "tmi.js";
import Command from "../../base/classes/Command";
import CustomClient from "../../base/classes/CustomClient";

export default class Info extends Command {
    
    constructor(client: CustomClient) {
        super(client, {
            name: 'info',
            description: 'Displays information about the bot',
            usage: 'info',
            aliases: ['botinfo', 'about'],
            cooldown: 5,
            permissions: [],
            dev: false
        });
    }

    async Execute(tags: ChatUserstate): Promise<void> {
        const { client } = this;
        const uptime = this.formatUptime(process.uptime());
        const message = `Bot Info:
            • Uptime: ${uptime}
            • Commands: ${client.commands.size}
            • Prefix: ${client.config.prefix}
            • Version: ${process.env.npm_package_version || 'Unknown'}
            `;

        client.say(client.config.watchedChannel, message);
    }

    private formatUptime(seconds: number): string {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
    }

}