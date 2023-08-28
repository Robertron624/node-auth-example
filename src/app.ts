require('dotenv').config();
import express from 'express';
import config from "config"
import connectToMongo from './utils/connect';
import log from './utils/logger';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

const port = config.get("port") ||  3001;

app.listen(port, () => {
    log.info(`Server listing at http://localhost:${port}`);

    connectToMongo();

});
