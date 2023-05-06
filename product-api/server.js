import express from "express";

const app = express();
const env = process.env;
const PORT = env.PORT || 8081;

app.get("/api/status", (req, res) => {
    return res.json({
        service: "product-api",
        status: "up",
        httpStatus: 200
    })
})


app.listen(PORT, () => {
    console.log(`server listening on  port:${PORT}`)
})
