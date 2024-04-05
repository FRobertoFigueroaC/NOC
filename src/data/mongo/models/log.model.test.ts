import mongoose from 'mongoose';
import { envs } from '../../../config/plugins/envs.plugin';
import { MongoDatabase } from '../init';
import { LogModel } from './log.model';

describe('log.model tests', () => {

  beforeAll(async ()  => {
   await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
   });
  });

  afterAll(() => {
   mongoose.connection.close();
  })
  
  test('should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'testing',
      level: 'low'
    }
    const log = await LogModel.create(logData);

    expect(log).toBeInstanceOf(LogModel);
    expect(log).toEqual(expect.objectContaining({
      ...logData, 
      id: expect.any(String),
      createdAt: expect.any(Date)
    }));

    await LogModel.findByIdAndDelete(log.id);

  });

  test('should return schema object', () => {
    const schema = LogModel.schema.obj;
    expect(schema).toEqual(expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        createdAt: expect.any(Object)
    }));
  });

});