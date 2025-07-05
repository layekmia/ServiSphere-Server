const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const serviceRouter = require('./routes/Service');
const bookingRouter = require('./routes/booking')

const app = express();

// middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Api working')
})

connectDB();

app.use('/api/services/' , serviceRouter);
app.use('/api/bookings/', bookingRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
  