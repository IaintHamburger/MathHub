"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const quest_routes_js_1 = __importDefault(require("./routes/quest_routes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 模組化路由函式
app.use('/quest', quest_routes_js_1.default);
app.get("/", (req, res) => {
    res.send("MathHub API is running...");
});
const PORT = process.env.PORT || "5000";
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
