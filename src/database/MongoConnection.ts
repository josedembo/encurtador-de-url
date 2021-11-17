import { config } from "../config/constants";
import mongoose from "mongoose";

export class MongoConnection {

    public async connect(): Promise<void> {
        try {
            mongoose.connect(config.MONGO_CONNECTION, () => {
                console.log("database conectado");
            });

        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}