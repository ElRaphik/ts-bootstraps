import path from "path";
import IHandler from "../interfaces/IHandler";
import CustomClient from "./CustomClient";
import { glob } from "glob";
import Event from "./Event";
import Command from "./Command";

export default class Handler implements IHandler {
    client: CustomClient;

    constructor(client: CustomClient) {
        this.client = client;
    }

    async LoadCommands(): Promise<void> {
        const files = (await glob(`build/commands/**/*.js`)).map(filePath => path.resolve(filePath));
    
        files.map(async (file: string) => {
          const command: Command = new(await import(file)).default(this.client);       
    
          if (!command.name)
            return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a name.`);
    
            this.client.commands.set(command.name, command as Command);
          
          return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} loaded successfully.`);
        });
      }

    async LoadEvents(): Promise<void> {
        const files = (await glob(`build/events/**/*.js`)).map(filePath => path.resolve(filePath))

        files.map(async (file: string) => {
            const event: Event = new(await import(file)).default(this.client);

            if(!event.name)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a name.`);
            
            const execute = (...args: any) => event.Execute(...args);

            if (event.once) this.client.once(event.name, execute);
            else this.client.on(event.name, execute);

            return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} loaded successfully.`);
        })
    }
}