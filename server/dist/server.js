"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const express = require("express");
const cors = require("cors");
const answerService_1 = require("./answerService");
const merchant_1 = require("./merchant");
function initServer() {
    const app = express();
    app.use(cors());
    app.route("/").get((req, res) => {
        res.status(200).send("<h1>Api is running</h1>");
    });
    app.route("/messages").get(answerService_1.getEmail);
    app.route("/transactions").get(merchant_1.merchant);
    const PORT = process.env["PORT"] || 9000;
    app.listen(PORT, () => {
        console.log("HTTP REST API Server running at port " + PORT);
    });
}
exports.initServer = initServer;
function getEmails() {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=server.js.map