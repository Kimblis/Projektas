import express, { Request, Response } from 'express';
import Message from '../Controllers/Message';

const router = express.Router();

/**
 * Gets last 10 messages across all rooms
 */
router.get('/latest', (req: Request, res: Response) => {
  try {
    const messages = Message.getLastTenMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets all messages in given room
 * @param roomId room ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const messages = Message.getAllMessagesByRoom(req.params.id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets last 10 messages sent by given user
 * @param userId user ID
 */
router.get('/latest/:id', (req: Request, res: Response) => {
  try {
    const messages = Message.getLastTenMessagesByUser(req.params.id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Creates a new message and returns that message
 * @param message Message content
 * @param roomID Room ID
 * @param userID User ID
 */
router.post('/', (req: Request, res: Response) => {
  const { message, roomId, userId } = req.body;
  if (!message || !roomId || !userId) {
    res.status(400).json({ msg: 'You have to enter message name, user ID and room ID' });
  }
  try {
    const addedMessage = Message.addMessage(userId, roomId, message);
    res.status(200).json(addedMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Updates message with given ID and returns updated message
 * @param messageID: Message ID
 * @param userID User ID
 * @param roomID Room ID
 * @param message New message content
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const updatedUser = Message.updateMessage({
      messageId: req.params.id,
      userId: req.body.userId,
      roomId: req.body.userId,
      message: req.body.message,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Deletes message with given ID and returns that message
 * @param messageID Message ID
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deletedMessage = Message.deleteMessage(req.params.id);
    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;
