const express = require('express');
//const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require('./config/db');
var cors = require("cors");
//configure dotenv
dotenv.config();

//rest object

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.get('/test',(req,res)=>{
    res.status(200).send('<hw>Welcome</h1>');
});

//port
const PORT = process.env.PORT || 8000;

//conditionally Listen
mySqlPool.query('SELECT 1').then(()=>{
    console.log("MySQL DB Connected".bgCyan.white);
    //listen
    app.listen(PORT,()=>{
        console.log(`Server Running on port ${process.env.PORT}`.bgMagenta.white);
    });
})
.catch((error)=>{
    console.log(error);
});
