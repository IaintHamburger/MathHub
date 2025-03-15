import express from "express";

import cors from "cors";
import path from "node:path";

//You may use typescript feature in this file, and it will compile correctly.
// interface Env {
//     port: string;
// }
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }) //get env file from parent directory

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (_, res) => {
    res.send("MathHub API is running...");
});

const PORT = process.env.PORT || 5000;
console.log(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
