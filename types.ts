interface IPerson {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IPerson {
  name: string;
}

export interface IMessage extends IPerson {
  messageId: string;
  message: string;
  roomId: string;
}

export interface IRoom {
  roomId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageWithUser {
  messageId: string;
  roomId: string;
  userId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export type ComponentsArray = Array<IMessage | IRoom | IUser>;
