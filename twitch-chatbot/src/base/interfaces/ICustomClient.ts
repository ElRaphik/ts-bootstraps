import Command from "../classes/Command";
import IConfig from "./IConfig";
import tmi from 'tmi.js'

export default interface ICustomClient {
    config: IConfig;
    developmentMode: boolean;

    commands: Map<string, Command>;
    cooldowns: Map<string, Map<string, number>>;

    Init(): void;
    LoadHandlers(): void;
}