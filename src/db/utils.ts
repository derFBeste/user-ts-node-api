import * as mongoose from "mongoose";

export function connectToMongo() {
  mongoose.connect("mongodb://localhost:9002", {
    pass: "example",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: "root",
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("connected");
  });
}
