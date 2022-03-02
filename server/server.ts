import * as express from "express";
import { Application } from "express";
import * as cors from "cors";
import { getEmail } from "./answerService";
import { merchant } from "./merchant";

export function initServer() {
  const app: Application = express();
  app.use(cors());
  app.route("/").get((req, res) => {
    res.status(200).send("<h1>Api is running</h1>");
  });
  app.route("/messages").get(getEmail)
  app.route("/transactions").get(merchant)

  const PORT = process.env["PORT"] || 9000;
  app.listen(PORT, () => {
    console.log("HTTP REST API Server running at port " + PORT);
  });
}
function getEmails() {
  throw new Error("Function not implemented.");
}

