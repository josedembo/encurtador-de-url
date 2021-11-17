import mongoose from "mongoose";
import { config } from "dotenv";
config();

export class MongoConnection {

    public async connect(): Promise<void> {
        try {
            mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`, () => {
                console.log("database conectado");
            });

        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}