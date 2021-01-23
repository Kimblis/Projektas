import fs from 'fs';
import path from 'path';
import { ComponentsArray } from '../types';

export enum Database {
  Users = 'users',
  Rooms = 'rooms',
  Messages = 'messages',
}

export const General = {
  buildPath(database: Database): string {
    return path.join(`${__dirname}/../Mocks/${database}.json`);
  },

  /**
   * Overwrites database with given data.
   * @param database database name
   * @param data data to be written into database
   */
  writeToDatabase(database: Database, data: ComponentsArray): void {
    if (!fs.existsSync(this.buildPath(database))) {
      throw Error('Database does not exist');
    }
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync(this.buildPath(database), stringifiedData);
  },

  /**
   * Returns all data from specified database
   * @param database database name
   */
  readFromDatabase(database: Database): ComponentsArray {
    const data = fs.readFileSync(this.buildPath(database), 'utf8');
    if (!data) {
      throw Error(`There are no data in ${database} database`);
    }
    return JSON.parse(data);
  },
};
