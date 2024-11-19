import Commands from "../enums/Commands";

export default interface ICommandOptions {
    name: string;
    description: string;
    usage: string;
    aliases: string[];
    cooldown: number;
    permissions: string[];
    dev: boolean;
}