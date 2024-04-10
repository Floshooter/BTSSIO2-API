const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const boutiqueRoute = require('./routes/boutiqueRoute');
const articleRoute = require('./routes/articleRoute');

const whiteList = ['http://localhost:8001', 'http://localhost:3000'];
const corsOptions = {
   origin: "*",
   credentials: true,
   optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use('/users', userRoute);
app.use('/boutique',boutiqueRoute);
app.use('/article', articleRoute);

const port = 8001;
module.exports = app.listen(port, () => {
    console.log(`Le serveur a été démarré sur le port ${port}`);
}); 