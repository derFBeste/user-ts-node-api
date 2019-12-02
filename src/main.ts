import * as express from "express";
import { RegisterRoutes } from "./routes/routes";
import { connectToMongo } from "./db/utils";
// tslint:disable-next-line:no-var-requires
const bodyParser = require("body-parser");

const app = express();
const port = 9000;

app.use(bodyParser.json());

RegisterRoutes(app);
connectToMongo();

app.listen(port, () => console.log(`Server started on port ${port}`));
