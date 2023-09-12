const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://hariharan210325:NtfylH7ws1iilTSY@cluster0.y06popu.mongodb.net/application-form?retryWrites=true`)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.log(err);
    })

const applicationFormRoutes = require('./routes/application-form');
const userRoutes = require('./routes/users');



// NtfylH7ws1iilTSY

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    next();
});

app.use("/api/application-form", applicationFormRoutes);
app.use("/api/auth", userRoutes);



module.exports = app;