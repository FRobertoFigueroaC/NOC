import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string
}

export class MongoDatabase {
  
  static async connect (options: ConnectionOptions){

    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName
      });
      return true;
      // console.log('Mongo connected successfully!')
    } catch (error) {
      // console.log('Mongo connection error');
      throw error;
    }

  }

}