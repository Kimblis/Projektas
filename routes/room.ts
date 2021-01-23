import express from 'express';
import Room from '../components/Room';

const router = express.Router();

/**
 * Gets all rooms
 */
router.get('/', (req, res) => {
  try {
    const rooms = Room.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets room with given ID
 */
router.get('/:id', (req, res) => {
  try {
    const room = Room.getRoom(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Creates room
 */
router.post('/', (req, res) => {
  const roomName = req.body.name;
  if (!roomName) {
    res.status(400).json({ msg: 'You have to enter a room name' });
  }
  try {
    Room.createRoom(roomName);
    res.status(200).json({ msg: `New user with name ${roomName} was created` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Updates room with given ID
 */
router.put('/:id', (req, res) => {
  try {
    Room.updateRoom({
      roomId: req.params.id,
      name: req.body.name,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    res.status(200).json({ msg: `updated room with id ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Deletes room with given ID
 */
router.delete('/:id', (req, res) => {
  try {
    Room.deleteRoom(req.params.id);
    res.status(200).json({ msg: `Room with id ${req.params.id} was deleted` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;
