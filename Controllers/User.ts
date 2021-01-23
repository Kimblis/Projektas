import { IUser } from '../types';
import { General, Database } from './General';
import { v4 as uuidv4 } from 'uuid';

export default {
  /**
   * Returns the user specified by id or name
   * @param userIdentificator user name or id
   */
  getUser(userIdentificator: string): IUser {
    if (!userIdentificator) {
      throw Error('You must specify user name or user id in order to find a room');
    }
    const users = General.readFromDatabase(Database.Users) as Array<IUser>;
    const neededUser = users.find((user) => user.name === userIdentificator || user.userId === userIdentificator);
    if (!neededUser) {
      throw Error('User with such credentials does not exist');
    }
    return neededUser;
  },

  /**
   * Returns all users from database
   */
  getAllUsers(): Array<IUser> {
    return General.readFromDatabase(Database.Users) as Array<IUser>;
  },

  /**
   * Adds a new user
   * @param name user name
   */
  addUser(name: string): IUser {
    const user = this.getUser(name);
    if (user) {
      throw Error(`User with such a name already exist and it's id is ${user.userId}`);
    }
    const newUser = {
      name,
      userId: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const users = (General.readFromDatabase(Database.Users) as Array<IUser>) || [];
    users.push(newUser);
    General.writeToDatabase(Database.Users, users);
    return newUser;
  },

  /**
   * Deletes user with given ID
   * @param userId user ID
   */
  deleteUser(userId: string): IUser {
    const user = this.getUser(userId);
    const allUsers = General.readFromDatabase(Database.Users) as Array<IUser>;
    const users = allUsers.filter((user) => user.userId !== userId);
    General.writeToDatabase(Database.Users, users);
    return user;
  },

  /**
   * Updates given user with new info
   * @param newUserInfo new user info
   */
  updateUser(newUserInfo: IUser): IUser {
    const { name, userId, updatedAt } = newUserInfo;
    const user = this.getUser(userId);
    this.deleteUser(userId);
    const updatedUser = {
      name,
      userId,
      updatedAt,
      createdAt: user.createdAt,
    };
    const users = (General.readFromDatabase(Database.Users) as Array<IUser>) || [];
    users.push(updatedUser);
    General.writeToDatabase(Database.Users, users);
    return updatedUser;
  },
};
