const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL, {
    dbName: 'sample todo 2'
})
.then(() =>console.log('MongoDb connected'))
.catch((err) => console.log('MongoDb connection Failed: ', err))

const todoroutes = require('./routes/todos')
app.use('/api/todos', todoroutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('Serve started running on PORT ', PORT);
})