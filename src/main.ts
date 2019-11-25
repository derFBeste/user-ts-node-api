import * as express from "express";
import { Event, User } from "./db/models";
import { RegisterRoutes } from "./routes/routes";
import { connectToMongo } from "./db/utils";
import { populateDB } from "./tests/utils/populateDb";

const app = express();
const port = 9000;

RegisterRoutes(app);

connectToMongo();

app.listen(port, () => console.log(`Server started on port ${port}`));
