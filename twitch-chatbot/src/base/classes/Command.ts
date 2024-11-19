import Commands from "../enums/Commands";
import ICommand from "../interfaces/ICommand";
import ICommandOptions from "../interfaces/ICommandOptions";
import CustomClient from "./CustomClient";

export default class Command implements ICommand {
    client: CustomClient;
    name: string;
    description: string;
    usage: string;
    aliases: string[];
    cooldown: number;
    permissions: string[];
    dev: boolean = false;
    
    constructor(client: CustomClient, options: ICommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.usage = options.usage;
        this.aliases = options.aliases;
        this.cooldown = options.cooldown;
        this.permissions = options.permissions;
        this.dev = options.dev;
    }

    Execute(args: string[]): void {
        // This method should be overridden by specific command implementations
        throw new Error("Method 'execute' must be implemented.");
    }
}
