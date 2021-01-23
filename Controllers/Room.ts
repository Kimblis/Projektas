import { IRoom } from '../types';
import { General, Database } from './General';
import { v4 as uuidv4 } from 'uuid';

export default {
  /**
   * Returns a room specified by room id or name
   * @param roomIdentificator room id or name
   */
  getRoom(roomIdentificator: string): IRoom {
    if (!roomIdentificator) {
      throw Error('You must specify room name or room id in order to find a room');
    }

    const rooms = General.readFromDatabase(Database.Rooms) as Array<IRoom>;
    const neededRoom = rooms.find((room) => room.name === roomIdentificator || room.roomId === roomIdentificator);
    if (!neededRoom) {
      throw Error('Room with such credentials does not exist');
    }
    return neededRoom;
  },

  /**
   * Returns all rooms from database
   */
  getAllRooms(): Array<IRoom> {
    return General.readFromDatabase(Database.Rooms) as Array<IRoom>;
  },

  /**
   * Creates a new room with given name.
   * @param name name of the room
   */
  createRoom(name: string): IRoom {
    const room = this.getRoom(name);
    if (room) {
      throw Error(`Room with such a name already exist and it's id is  ${room.roomId}`);
    }
    const newRoom = {
      name,
      roomId: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const rooms = (General.readFromDatabase(Database.Rooms) as Array<IRoom>) || [];
    rooms.push(newRoom);
    General.writeToDatabase(Database.Rooms, rooms);
    return newRoom;
  },

  /**
   * Deletes room with given ID
   * @param roomId room ID
   */
  deleteRoom(roomId: string): IRoom {
    const room = this.getRoom(roomId);
    const allRooms = General.readFromDatabase(Database.Rooms) as Array<IRoom>;
    const rooms = allRooms.filter((room) => room.roomId !== roomId);
    General.writeToDatabase(Database.Rooms, rooms);
    return room;
  },

  /**
   * Updates given room with new info
   * @param newUserInfo new room info
   */
  updateRoom(newRoomInfo: IRoom): IRoom {
    const { name, roomId, updatedAt } = newRoomInfo;
    const room = this.getRoom(roomId);
    this.deleteRoom(roomId);
    const updatedRoom = {
      name,
      roomId,
      updatedAt,
      createdAt: room.createdAt,
    };
    const rooms = (General.readFromDatabase(Database.Rooms) as Array<IRoom>) || [];
    rooms.push(updatedRoom);
    General.writeToDatabase(Database.Rooms, rooms);
    return updatedRoom;
  },
};
