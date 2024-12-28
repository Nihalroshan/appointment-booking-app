import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import booking from "./routes/booking.js"

const app = express();
const PORT = 3001;
app.use(cors());

app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api", booking);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
