import CustomClient from "../../base/classes/CustomClient"
import Command from "../../base/classes/Command"

export default class Ping extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "ping",
            description: "Ping command",
            usage: "ping",
            aliases: [],
            cooldown: 5,
            permissions: [],
            dev: false
        }
    )};

    Execute(): void {
        this.client.say(this.client.config.watchedChannel, "Pong!");
    }
}