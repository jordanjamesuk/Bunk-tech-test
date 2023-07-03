import express from 'express';
import payouts from './routes/payout.routes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// check to see if API exists within a docker container
let listenIP = '127.0.0.1';
if (process.env.DOCKER) listenIP = '0.0.0.0';

const app = express();

app.use(cors());
app.use('/payouts', payouts);

const server = app.listen(3000, listenIP, () =>
    console.log(`Server: ${listenIP}`)
);

//supertest purposes
export default server;
