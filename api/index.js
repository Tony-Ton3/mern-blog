import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config(); //configure dotenv to hide sensitive info

mongoose.connect(process.env.MONGO) //connect to MongoDB backend
.then(() => console.log('MongoDB is connected'))
.catch((err) => console.log(err));

const app = express(); //create express server for routing
app.use(express.json()); //parse incoming requests with JSON payloads

app.listen(3000, () => {
    console.log('Server running on port 3000!');
});

//routing flow: index.js => routes => controllers => models
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Interal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})