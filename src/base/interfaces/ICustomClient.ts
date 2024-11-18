import IConfig from "./IConfig";
import tmi from 'tmi.js'

export default interface ICustomClient {
    config: IConfig;
    developmentMode: boolean;

    Init(): void;
    LoadHandlers(): void;
}