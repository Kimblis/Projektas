import express from 'express';
import Message from '../components/Message';

const router = express.Router();

/**
 * Gets last 10 messages across all rooms
 */
router.get('/latest', (req, res) => {
  try {
    const messages = Message.getLastTenMessages();
    res.json(messages);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets all messages in given room
 */
router.get('/:id', (req, res) => {
  try {
    const messages = Message.getAllMessagesByRoom(req.params.id);
    res.json(messages);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets last 10 messages sent by given user
 */
router.get('/latest/:id', (req, res) => {
  try {
    const messages = Message.getLastTenMessagesByUser(req.params.id);
    res.json(messages);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Creates a new message
 */
router.post('/', (req, res) => {
  const { message, roomId, userId } = req.body;
  if (!message || !roomId || !userId) {
    res.status(400).json({ msg: 'You have to enter message name, user ID and room ID' });
  }
  try {
    Message.addMessage(userId, roomId, message);
    res.status(200).json({ msg: `New Message was added to room with id ${roomId}` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Updates message with given ID
 */
router.put('/:id', (req, res) => {
  try {
    Message.updateMessage({
      messageId: req.params.id,
      userId: req.body.userId,
      roomId: req.body.userId,
      message: req.body.message,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    res.status(200).json({ msg: `updated Message with id ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Deletes message with given ID
 */
router.delete('/:id', (req, res) => {
  try {
    Message.deleteMessage(req.params.id);
    res.status(200).json({ msg: `Message with id ${req.params.id} was deleted` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;
