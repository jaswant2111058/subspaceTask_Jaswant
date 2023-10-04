require("dotenv").config()
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const app = express();
//const rateLimit = require('express-rate-limit');
const api = require("./routes/api")

// const limiter = rateLimit({
//     windowMs:  60 * 1000, 
//     max: 100,
//   });
//   app.use(limiter);


app.use(
    cors({
        origin: "*",
        exposedHeaders: 'Authorization'
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api",api)

app.use((req, res) => {
    res.status(404).send('Route not found error 404');
  });

app.listen(process.env.PORT || '5000', () => {
    console.log(`Server started at port ${process.env.PORT || '5000'}`);
});
