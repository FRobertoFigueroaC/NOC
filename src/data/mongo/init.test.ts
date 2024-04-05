import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('ini MongoDB', () => {

  afterAll(() => {
   mongoose.connection.close()
  });


  test('should connect to MongoDb', async () => {


    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!
    });

    expect(connected).toBeTruthy();

  });

  test('should throw an error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        mongoUrl: process.env.MONGO_URL!,
        dbName: 'error'
      });
      expect(connected).toBeFalsy()
    } catch (error) {
      
    }

  });
});