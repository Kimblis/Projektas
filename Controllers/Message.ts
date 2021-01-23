import User from './User';
import Room from './Room';
import { v4 as uuidv4 } from 'uuid';
import { IMessage, IMessageWithUser, IUser } from '../types';
import { General, Database } from './General';

const linkUserWithMessage = (message: IMessage): IMessageWithUser => {
  const user = User.getUser(message.userId);
  return { ...message, user };
};

export default {
  /**
   * returns message with given ID
   * @param messageId message ID
   */
  getMessage(messageId: string): IMessage {
    if (!messageId) {
      throw Error('You must specify message ID');
    }
    const messages = General.readFromDatabase(Database.Messages) as Array<IMessage>;
    const neededMessage = messages.find((message) => message.messageId === messageId);
    if (!neededMessage) {
      throw Error('Message with such credentials does not exist');
    }
    return neededMessage;
  },

  /**
   * Returns all messages in specific room
   * @param roomId room id
   */
  getAllMessagesByRoom(roomId: string): IMessage[] {
    const messages = General.readFromDatabase(Database.Messages) as Array<IMessage>;
    const roomMessages = messages.filter((message) => message.roomId === roomId);
    if (!roomMessages.length) {
      throw Error('There are no messages in given room');
    }
    return roomMessages;
  },

  /**
   * Returns all messages sent by given user
   * @param userId user ID
   */
  getAllUserMessages(userId: string): IMessage[] {
    const messages = General.readFromDatabase(Database.Messages) as Array<IMessage>;
    const user = messages.filter((message) => message.userId === userId);
    if (!user.length) {
      throw Error('This user does not have any messages');
    }
    return user;
  },

  /**
   * Returns the last message in specific room
   * @param roomId room id
   */
  getLastMessage(roomId: string): IMessage | undefined {
    const roomMessages = this.getAllMessagesByRoom(roomId);
    return roomMessages?.pop();
  },

  /**
   * Returns last 10 messages
   */
  getLastTenMessages(): Array<IMessage> {
    const messages = General.readFromDatabase(Database.Messages) as Array<IMessage>;
    return messages.slice(-10);
  },

  /**
   * Returns last 10 messages sent by given user
   * @param userId user ID
   */
  getLastTenMessagesByUser(userId: string): Array<IMessage> | undefined {
    const messages = this.getAllUserMessages(userId);
    return messages.slice(-10);
  },

  /**
   * Adds message to specified room
   * @param userId user who sends the message
   * @param roomId room that receives the message
   * @param message message being send
   */
  addMessage(userId: string, roomId: string, message: string): IMessage {
    const lastMessage = this.getLastMessage(roomId);
    if (lastMessage?.userId === userId) {
      const timeNow = new Date();
      const timeMessageCreated = Date.parse(lastMessage.createdAt.toString());
      const secondsBetweenMessages = (timeNow.getTime() - timeMessageCreated) / 1000;

      if (secondsBetweenMessages < 5) {
        throw Error('What ya doin you little spammer?');
      }
    }
    const newMessage = {
      message,
      userId,
      roomId,
      messageId: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const messages = (General.readFromDatabase(Database.Messages) as Array<IMessage>) || [];
    messages.push(newMessage);
    General.writeToDatabase(Database.Messages, messages);
    return newMessage;
  },

  /**
   * Returns all messages linked with the user who sent them in specified room.
   * @param roomName name of the room
   */
  getAllMessagesByRoomWithUser(roomName: string): IMessageWithUser[] {
    const room = Room.getRoom(roomName);
    const messages = this.getAllMessagesByRoom(room.roomId);
    return messages.map((message) => linkUserWithMessage(message));
  },

  /**
   * Deletes message with given ID
   * @param messageId message ID
   */
  deleteMessage(messageId: string): IMessage {
    const message = this.getMessage(messageId);
    const allMessages = General.readFromDatabase(Database.Messages) as Array<IMessage>;
    const messages = allMessages.filter((message) => message.messageId !== messageId);
    General.writeToDatabase(Database.Messages, messages);
    return message;
  },

  /**
   * Updates given message
   * @param newUserInfo new message info
   */
  updateMessage(newMessageInfo: IMessage): IMessage {
    const { messageId, roomId, userId, updatedAt, message: content } = newMessageInfo;
    const message = this.getMessage(messageId);
    this.deleteMessage(messageId);
    const updatedMessage = {
      messageId,
      userId,
      roomId,
      updatedAt,
      createdAt: message.createdAt,
      message: content,
    };
    const messages = General.readFromDatabase(Database.Messages) as Array<IMessage>;
    messages.push(updatedMessage);
    General.writeToDatabase(Database.Messages, messages);
    return updatedMessage;
  },
};
