import express from "express";

import * as db from "./config/db/initialData.js"
import userRoutes from "./model/user/routes/userRoute.js"
import checkToken from "./config/auth/checkToken.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.dataLoader();
app.get("/api/status", (req, res) => {
    return res.json({
        service: "auth-api",
        status: "up",
        httpStatus: 200
    })
})
app.use(express.json());

app.use(userRoutes);

//from here on, it is necessary to pass a token 
//protecting our end-points




app.listen(PORT, () => {
    console.log(`server listening on  port:${PORT}`)
})
