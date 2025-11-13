const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
dotenv.config()
app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:3000',          
    'sample-todo2-irji.vercel.app'  
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


mongoose.connect(process.env.MONGO_URL, {
    dbName: 'sampletodo2'
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
})

const todoroutes = require('./routes/todos')
app.use('/api/todos', todoroutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('Server started running on PORT ', PORT);
})