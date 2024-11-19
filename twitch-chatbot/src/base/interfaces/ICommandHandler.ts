import { ChatUserstate } from "tmi.js";
import CustomClient from "../classes/CustomClient";
import Commands from "../enums/Commands";

export default interface ICommandHandler {
    client: CustomClient;
    
    Execute(command: Commands, tags: ChatUserstate, args: string[]): void;
}