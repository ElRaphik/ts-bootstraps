import CustomClient from "../classes/CustomClient";

export default interface IHandler {
    client: CustomClient;
    
    // LoadCommands(): void;
    LoadEvents(): void;
  }
  