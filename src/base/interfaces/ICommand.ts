import CustomClient from "../classes/CustomClient";
import Commands from "../enums/Commands";

export default interface ICommand {
    client: CustomClient
    name: string;
    description: string;
    usage: string;
    aliases: string[];
    cooldown: number;
    permissions: string[];
    dev: boolean;
}