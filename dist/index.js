"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("./controllers"));
var app = express_1.default();
var PORT = 3000;
app.use(express_1.default.json());
app.use("/api", controllers_1.default);
app.get("/", function (req, res) {
    res.redirect("/api/health");
});
app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT);
});
