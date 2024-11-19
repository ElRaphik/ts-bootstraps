import IConfig from "../interfaces/IConfig";
import ICustomClient from "../interfaces/ICustomClient";
import tmi from 'tmi.js';
import Handler from "./Handler";
import Command from "./Command";
import CommandHandler from "./CommandHandler";

export default class CustomClient extends tmi.Client implements ICustomClient {
    config: IConfig;
    developmentMode: boolean;
    handler: Handler
    commandHandler: CommandHandler
    commands: Map<string, Command> = new Map<string, Command>();
    cooldowns: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();

    constructor() {
        const config = require(`${process.cwd()}/data/config.json`)

        super({
            channels: [config.watchedChannel],
            identity: {
                username: config.botUsername,
                password: `oauth:${config.userAccessToken}`,
            }
        })

        this.config = config;
        this.developmentMode = (process.argv.slice(2).includes('--development'));
        this.handler = new Handler(this);
        this.commandHandler = new CommandHandler(this)
    }

    Init(): void {
        this.developmentMode ? console.log(`INFO: Starting the app in development mode.`) : console.warn(`WARNING: Starting the app in production mode.`);

        this.LoadHandlers();
        this.connect();
    }

    LoadHandlers(): void {
        this.handler.LoadCommands();
        this.handler.LoadEvents();
    }
}