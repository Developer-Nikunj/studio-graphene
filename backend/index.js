const express = require('express');
require('dotenv').config();
const app = express();
const ApiError = require('./src/utils/ApiError');
const { connectDB } = require('./src/config/db');
const taskRoutes = require('./src/routes/task.routes.js')
const errorHandler = require('./src/middlewares/error.middleware.js');
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
    'https://opulent-capybara-pj554wr5jx5gf7p5q-3000.app.github.dev',
    'http://localhost:3000', // for local dev
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Working fine"
    });
});

// main routes
app.use('/api/v1', taskRoutes);


const startServer = async () => {
    try {
        const PORT = process.env.PORT || 3001;
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
};

startServer();


app.use(errorHandler);