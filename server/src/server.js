const env = require('dotenv');
env.config({path:'./config.env'});
const app = require('./app');
const {dbConnection} = require('./dbConnection');

const port = process.env.BACKEND_PORT || 8000;
dbConnection()
app.listen(port,()=>{
    console.log(`server is listening on port ${port} `);
})


