const express = require('express');
require('dotenv').config();
const app = express();
const ApiError = require('./src/utils/ApiError');
const { connectDB } = require('./src/config/db');
const taskRoutes  = require('./src/routes/task.routes.js')
const errorHandler = require('./src/middlewares/error.middleware.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Working fine"
    });
});

// main routes
app.use('/api/v1',taskRoutes);


const startServer = async () => {
    try {
        const PORT = process.env.PORT;
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