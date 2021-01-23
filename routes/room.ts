import express, { Request, Response } from 'express';
import Room from '../Controllers/Room';

const router = express.Router();

/**
 * Gets all rooms
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const rooms = Room.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Gets room with given ID
 * @param roomID Room ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const room = Room.getRoom(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Creates room and returns created room
 * @param name Name of the room
 */
router.post('/', (req: Request, res: Response) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).json({ msg: 'You have to enter a room name' });
  }
  try {
    const createdRoom = Room.createRoom(name);
    res.status(200).json(createdRoom);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Updates room with given ID and returns that room
 * @param roomId Room ID
 * @param name New name of the room
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const updatedRoom = Room.updateRoom({
      roomId: req.params.id,
      name: req.body.name,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * Deletes room with given ID and returns that room
 * @param roomId Room ID
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deletedRoom = Room.deleteRoom(req.params.id);
    res.status(200).json(deletedRoom);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;
