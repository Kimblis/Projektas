import express from 'express';
import userRoute from './routes/user';
import roomRoute from './routes/room';
import messageRoute from './routes/message';

const app = express();

app.use(express.json());

app.use('/users', userRoute);
app.use('/rooms', roomRoute);
app.use('/messages', messageRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
