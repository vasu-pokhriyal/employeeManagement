import cors from 'cors'
import logger from 'morgan';
import bodyParser from 'body-parser'
import express from 'express'
import router from './models/routes'
import constants from './utils/constants'
import { failAction } from "./utils/response";
import db from "./connection/mongoose";
const cluster = require("cluster");


const os = require("os");
const clusterWorkerSize = os.cpus().length;
console.log(clusterWorkerSize)
 let server;
if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on("exit", function (worker) {
      console.log("Worker", worker.id, " has exitted.");
    });
  } else {
    const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//connectToMongoDB()


app.use("/api/v1", router);

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        return res.status(400).json({
            statusCode: 400,
            data: null,
            message: err.error.message.toString().replace(/[\""]+/g, "")
        });
    }
    console.log("err",err)
    res.status(500).json(err)
});
 server = app.listen(constants.API_PORT, () => console.log(`LISTENING ON PORT ${constants.API_PORT}`));

  }


  export default server