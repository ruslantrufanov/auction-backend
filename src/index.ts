import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import auctionRoutes from './routes/auctions';
import bidRoutes from './routes/bids';
import userRoutes from './routes/users';

import runDemo from './scripts/runDemo';

const MONGO_URI = 'mongodb+srv://trufanovruslan33_db_user:lJhbRhkkJja4AO9T@cluster0.udmtua5.mongodb.net/?appName=Cluster0';

async function start() {
    await mongoose.connect(MONGO_URI);
    console.log('Mongo connected');

    const app = express();
    app.use(express.json());

    app.use('/api/auctions', auctionRoutes);
    app.use('/api/bids', bidRoutes);
    app.use('/api/users', userRoutes);

    await runDemo();

    app.use(express.static(path.join(__dirname, '../public')));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
}

start();
