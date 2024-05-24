const express = require('express')
const cors = require('cors');
const userRoute = require('./routes/user.routes.js');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/api/user', userRoute);

app.listen(PORT, "192.168.0.106", (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port: ${PORT}`);
    }
});
