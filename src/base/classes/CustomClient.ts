import IConfig from "../interfaces/IConfig";
import ICustomClient from "../interfaces/ICustomClient";
import tmi from 'tmi.js';
import Handler from "./Handler";

export default class CustomClient extends tmi.Client implements ICustomClient {
    config: IConfig;
    developmentMode: boolean;
    handler: Handler

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
    }

    Init(): void {
        this.developmentMode ? console.log(`INFO: Starting the app in development mode.`) : console.warn(`WARNING: Starting the app in production mode.`);

        this.LoadHandlers();
        this.connect();
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
    }
}