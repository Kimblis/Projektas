import express from 'express';
import userRoute from './Routes/User';
import roomRoute from './Routes/Room';
import messageRoute from './Routes/Message';
import logger from './Middleware/logger';

const app = express();

app.use(express.json());
app.use(logger);

app.use('/users', userRoute);
app.use('/rooms', roomRoute);
app.use('/messages', messageRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
