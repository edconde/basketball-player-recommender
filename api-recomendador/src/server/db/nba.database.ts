import * as mongoose from 'mongoose';
import { AppLogger } from '../logger';

class NbaDB {
  private static readonly DATABASE_URI = process.env.MONGODB_CONNECTION_STRING;
  private static instance: NbaDB;

  private constructor() {}

  public static getInstance(): NbaDB {
    if (!NbaDB.instance) {
      NbaDB.instance = new NbaDB();
    }
    return NbaDB.instance;
  }

  public connect() {
    AppLogger.info(NbaDB.DATABASE_URI);
    mongoose.connect(NbaDB.DATABASE_URI, {});
    mongoose.connection.once('open', () => {
      AppLogger.info('Connected to Mongo via Mongoose');
    });
    mongoose.connection.on('error', (err) => {
      AppLogger.error('Unable to connect to Mongo via Mongoose', err);
    });
  }
}

export default NbaDB.getInstance();
