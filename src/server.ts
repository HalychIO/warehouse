import dotenv from 'dotenv';
import app from "./app";
import {prisma} from "./config/prisma";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await prisma.$connect();

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (err) {

        console.error('❌ Error starting server:', err);

        await prisma.$disconnect();

        process.exit(1);

    }
}

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

start();